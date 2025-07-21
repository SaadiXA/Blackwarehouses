from fastapi import APIRouter, HTTPException, Depends, Query
from motor.motor_asyncio import AsyncIOMotorDatabase
from typing import List, Optional
from models import ContactForm, ContactFormCreate, APIResponse, PaginatedResponse
from database import get_database
from datetime import datetime

router = APIRouter(prefix="/api/contact", tags=["Contact"])

@router.post("/submit", response_model=APIResponse)
async def submit_contact_form(
    form_data: ContactFormCreate,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Submit a new contact form"""
    try:
        # Create contact form object
        contact = ContactForm(**form_data.dict())
        contact_dict = contact.dict()
        
        result = await db.contact_forms.insert_one(contact_dict)
        
        # TODO: Send email notification to admin
        # TODO: Send auto-reply email to customer
        
        return APIResponse(
            success=True,
            message="تم إرسال طلبك بنجاح! سنتواصل معك في أقرب وقت.",
            data={"id": contact.id}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error submitting contact form: {str(e)}")

@router.get("/forms", response_model=PaginatedResponse)
async def get_contact_forms(
    page: int = Query(1, ge=1),
    per_page: int = Query(20, ge=1, le=100),
    status: Optional[str] = Query(None),
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Get paginated list of contact forms (admin only)"""
    try:
        # Build filter
        filter_query = {}
        if status:
            filter_query["status"] = status
        
        # Get total count
        total = await db.contact_forms.count_documents(filter_query)
        
        # Calculate pagination
        skip = (page - 1) * per_page
        total_pages = (total + per_page - 1) // per_page
        
        # Get contact forms sorted by creation date (newest first)
        cursor = db.contact_forms.find(filter_query).sort("created_at", -1).skip(skip).limit(per_page)
        forms = await cursor.to_list(length=per_page)
        
        # Convert MongoDB ObjectIds
        for form in forms:
            form["id"] = str(form.get("_id", ""))
            if "_id" in form:
                del form["_id"]
        
        return PaginatedResponse(
            success=True,
            data=forms,
            total=total,
            page=page,
            per_page=per_page,
            total_pages=total_pages
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving contact forms: {str(e)}")

@router.get("/forms/{form_id}", response_model=ContactForm)
async def get_contact_form(form_id: str, db: AsyncIOMotorDatabase = Depends(get_database)):
    """Get a specific contact form by ID (admin only)"""
    try:
        form = await db.contact_forms.find_one({"id": form_id})
        if not form:
            raise HTTPException(status_code=404, detail="Contact form not found")
        
        # Convert MongoDB ObjectId
        form["id"] = str(form.get("_id", form_id))
        if "_id" in form:
            del form["_id"]
            
        return ContactForm(**form)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving contact form: {str(e)}")

@router.put("/forms/{form_id}/status", response_model=APIResponse)
async def update_contact_form_status(
    form_id: str,
    status: str,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Update contact form status (admin only)"""
    try:
        valid_statuses = ["pending", "contacted", "completed"]
        if status not in valid_statuses:
            raise HTTPException(
                status_code=400, 
                detail=f"Invalid status. Must be one of: {', '.join(valid_statuses)}"
            )
        
        result = await db.contact_forms.update_one(
            {"id": form_id},
            {"$set": {"status": status}}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Contact form not found")
        
        return APIResponse(
            success=True,
            message="Contact form status updated successfully"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error updating contact form status: {str(e)}")

@router.delete("/forms/{form_id}", response_model=APIResponse)
async def delete_contact_form(form_id: str, db: AsyncIOMotorDatabase = Depends(get_database)):
    """Delete a contact form (admin only)"""
    try:
        result = await db.contact_forms.delete_one({"id": form_id})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Contact form not found")
        
        return APIResponse(
            success=True,
            message="Contact form deleted successfully"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deleting contact form: {str(e)}")

@router.get("/stats")
async def get_contact_statistics(db: AsyncIOMotorDatabase = Depends(get_database)):
    """Get contact form statistics (admin only)"""
    try:
        total = await db.contact_forms.count_documents({})
        pending = await db.contact_forms.count_documents({"status": "pending"})
        contacted = await db.contact_forms.count_documents({"status": "contacted"})
        completed = await db.contact_forms.count_documents({"status": "completed"})
        
        # Get submissions by month
        pipeline = [
            {
                "$group": {
                    "_id": {
                        "year": {"$year": "$created_at"},
                        "month": {"$month": "$created_at"}
                    },
                    "count": {"$sum": 1}
                }
            },
            {
                "$sort": {"_id.year": 1, "_id.month": 1}
            }
        ]
        
        monthly_stats = await db.contact_forms.aggregate(pipeline).to_list(length=None)
        
        return {
            "success": True,
            "data": {
                "total": total,
                "pending": pending,
                "contacted": contacted,
                "completed": completed,
                "monthly": monthly_stats
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving contact statistics: {str(e)}")
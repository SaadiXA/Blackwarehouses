from fastapi import APIRouter, HTTPException, Depends, Query
from motor.motor_asyncio import AsyncIOMotorDatabase
from typing import List, Optional
from models import Service, ServiceCreate, APIResponse, PaginatedResponse
from database import get_database

router = APIRouter(prefix="/api/services", tags=["Services"])

@router.get("/", response_model=PaginatedResponse)
async def get_services(
    page: int = Query(1, ge=1),
    per_page: int = Query(10, ge=1, le=50),
    category: Optional[str] = Query(None),
    is_active: bool = Query(True),
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Get paginated list of services"""
    try:
        # Build filter
        filter_query = {"is_active": is_active}
        if category:
            filter_query["category"] = category
        
        # Get total count
        total = await db.services.count_documents(filter_query)
        
        # Calculate pagination
        skip = (page - 1) * per_page
        total_pages = (total + per_page - 1) // per_page
        
        # Get services
        cursor = db.services.find(filter_query).skip(skip).limit(per_page)
        services = await cursor.to_list(length=per_page)
        
        # Convert MongoDB ObjectIds
        for service in services:
            service["id"] = str(service.get("_id", ""))
            if "_id" in service:
                del service["_id"]
        
        return PaginatedResponse(
            success=True,
            data=services,
            total=total,
            page=page,
            per_page=per_page,
            total_pages=total_pages
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving services: {str(e)}")

@router.get("/{service_id}", response_model=Service)
async def get_service(service_id: str, db: AsyncIOMotorDatabase = Depends(get_database)):
    """Get a specific service by ID"""
    try:
        service = await db.services.find_one({"id": service_id})
        if not service:
            raise HTTPException(status_code=404, detail="Service not found")
        
        # Convert MongoDB ObjectId
        service["id"] = str(service.get("_id", service_id))
        if "_id" in service:
            del service["_id"]
            
        return Service(**service)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving service: {str(e)}")

@router.post("/", response_model=APIResponse)
async def create_service(
    service_data: ServiceCreate,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Create a new service"""
    try:
        # Create service object
        service = Service(**service_data.dict())
        service_dict = service.dict()
        
        result = await db.services.insert_one(service_dict)
        
        return APIResponse(
            success=True,
            message="Service created successfully",
            data={"id": service.id}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating service: {str(e)}")

@router.put("/{service_id}", response_model=APIResponse)
async def update_service(
    service_id: str,
    service_data: ServiceCreate,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Update an existing service"""
    try:
        update_data = service_data.dict()
        
        result = await db.services.update_one(
            {"id": service_id},
            {"$set": update_data}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Service not found")
        
        return APIResponse(
            success=True,
            message="Service updated successfully"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error updating service: {str(e)}")

@router.delete("/{service_id}", response_model=APIResponse)
async def delete_service(service_id: str, db: AsyncIOMotorDatabase = Depends(get_database)):
    """Soft delete a service (mark as inactive)"""
    try:
        result = await db.services.update_one(
            {"id": service_id},
            {"$set": {"is_active": False}}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Service not found")
        
        return APIResponse(
            success=True,
            message="Service deleted successfully"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deleting service: {str(e)}")

@router.get("/categories/list")
async def get_service_categories(db: AsyncIOMotorDatabase = Depends(get_database)):
    """Get list of all service categories"""
    try:
        categories = await db.services.distinct("category", {"is_active": True})
        
        return {
            "success": True,
            "data": categories
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving categories: {str(e)}")
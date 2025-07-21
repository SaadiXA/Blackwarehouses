from fastapi import APIRouter, HTTPException, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase
from typing import List
from models import CompanyInfo, CompanyInfoUpdate, APIResponse
from database import get_database

router = APIRouter(prefix="/api/company", tags=["Company"])

@router.get("/info", response_model=CompanyInfo)
async def get_company_info(db: AsyncIOMotorDatabase = Depends(get_database)):
    """Get company information"""
    try:
        company_info = await db.company_info.find_one()
        if not company_info:
            raise HTTPException(status_code=404, detail="Company information not found")
        
        # Convert MongoDB ObjectId to string for the response
        company_info["id"] = str(company_info.get("_id", ""))
        if "_id" in company_info:
            del company_info["_id"]
            
        return CompanyInfo(**company_info)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving company info: {str(e)}")

@router.put("/info", response_model=APIResponse)
async def update_company_info(
    update_data: CompanyInfoUpdate,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Update company information"""
    try:
        # Remove None values from update data
        update_dict = {k: v for k, v in update_data.dict().items() if v is not None}
        
        if not update_dict:
            raise HTTPException(status_code=400, detail="No data provided for update")
        
        result = await db.company_info.update_one(
            {},  # Update the first (and should be only) company record
            {"$set": update_dict}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Company information not found")
        
        return APIResponse(
            success=True,
            message="Company information updated successfully"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error updating company info: {str(e)}")

@router.get("/stats")
async def get_company_statistics(db: AsyncIOMotorDatabase = Depends(get_database)):
    """Get company statistics"""
    try:
        stats = await db.statistics.find_one()
        if not stats:
            # Return default stats if none exist
            default_stats = {
                "projects_completed": 100,
                "happy_clients": 150,
                "years_experience": 5,
                "team_members": 25
            }
            return {"success": True, "data": default_stats}
        
        # Remove MongoDB ObjectId
        if "_id" in stats:
            del stats["_id"]
            
        return {"success": True, "data": stats}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving statistics: {str(e)}")
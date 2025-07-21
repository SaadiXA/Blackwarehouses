from fastapi import APIRouter, HTTPException, Depends, Query
from motor.motor_asyncio import AsyncIOMotorDatabase
from typing import List, Optional
from models import Project, ProjectCreate, APIResponse, PaginatedResponse
from database import get_database

router = APIRouter(prefix="/api/projects", tags=["Projects"])

@router.get("/", response_model=PaginatedResponse)
async def get_projects(
    page: int = Query(1, ge=1),
    per_page: int = Query(12, ge=1, le=50),
    category: Optional[str] = Query(None),
    is_featured: Optional[bool] = Query(None),
    is_active: bool = Query(True),
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Get paginated list of projects/gallery items"""
    try:
        # Build filter
        filter_query = {"is_active": is_active}
        if category:
            filter_query["category"] = category
        if is_featured is not None:
            filter_query["is_featured"] = is_featured
        
        # Get total count
        total = await db.projects.count_documents(filter_query)
        
        # Calculate pagination
        skip = (page - 1) * per_page
        total_pages = (total + per_page - 1) // per_page
        
        # Get projects sorted by creation date (newest first)
        cursor = db.projects.find(filter_query).sort("created_at", -1).skip(skip).limit(per_page)
        projects = await cursor.to_list(length=per_page)
        
        # Convert MongoDB ObjectIds
        for project in projects:
            project["id"] = str(project.get("_id", ""))
            if "_id" in project:
                del project["_id"]
        
        return PaginatedResponse(
            success=True,
            data=projects,
            total=total,
            page=page,
            per_page=per_page,
            total_pages=total_pages
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving projects: {str(e)}")

@router.get("/featured")
async def get_featured_projects(
    limit: int = Query(6, ge=1, le=20),
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Get featured projects for gallery display"""
    try:
        cursor = db.projects.find({
            "is_featured": True,
            "is_active": True
        }).sort("created_at", -1).limit(limit)
        
        projects = await cursor.to_list(length=limit)
        
        # Convert MongoDB ObjectIds
        for project in projects:
            project["id"] = str(project.get("_id", ""))
            if "_id" in project:
                del project["_id"]
        
        return {
            "success": True,
            "data": projects
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving featured projects: {str(e)}")

@router.get("/{project_id}", response_model=Project)
async def get_project(project_id: str, db: AsyncIOMotorDatabase = Depends(get_database)):
    """Get a specific project by ID"""
    try:
        project = await db.projects.find_one({"id": project_id})
        if not project:
            raise HTTPException(status_code=404, detail="Project not found")
        
        # Convert MongoDB ObjectId
        project["id"] = str(project.get("_id", project_id))
        if "_id" in project:
            del project["_id"]
            
        return Project(**project)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving project: {str(e)}")

@router.post("/", response_model=APIResponse)
async def create_project(
    project_data: ProjectCreate,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Create a new project"""
    try:
        # Create project object
        project = Project(**project_data.dict())
        project_dict = project.dict()
        
        result = await db.projects.insert_one(project_dict)
        
        return APIResponse(
            success=True,
            message="Project created successfully",
            data={"id": project.id}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating project: {str(e)}")

@router.put("/{project_id}", response_model=APIResponse)
async def update_project(
    project_id: str,
    project_data: ProjectCreate,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Update an existing project"""
    try:
        update_data = project_data.dict()
        
        result = await db.projects.update_one(
            {"id": project_id},
            {"$set": update_data}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Project not found")
        
        return APIResponse(
            success=True,
            message="Project updated successfully"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error updating project: {str(e)}")

@router.delete("/{project_id}", response_model=APIResponse)
async def delete_project(project_id: str, db: AsyncIOMotorDatabase = Depends(get_database)):
    """Soft delete a project (mark as inactive)"""
    try:
        result = await db.projects.update_one(
            {"id": project_id},
            {"$set": {"is_active": False}}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Project not found")
        
        return APIResponse(
            success=True,
            message="Project deleted successfully"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deleting project: {str(e)}")

@router.get("/categories/list")
async def get_project_categories(db: AsyncIOMotorDatabase = Depends(get_database)):
    """Get list of all project categories"""
    try:
        categories = await db.projects.distinct("category", {"is_active": True})
        
        return {
            "success": True,
            "data": categories
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving categories: {str(e)}")
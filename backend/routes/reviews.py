from fastapi import APIRouter, HTTPException, Depends, Query
from motor.motor_asyncio import AsyncIOMotorDatabase
from typing import List, Optional
from models import Review, ReviewCreate, APIResponse, PaginatedResponse
from database import get_database

router = APIRouter(prefix="/api/reviews", tags=["Reviews"])

@router.get("/", response_model=PaginatedResponse)
async def get_reviews(
    page: int = Query(1, ge=1),
    per_page: int = Query(10, ge=1, le=50),
    is_active: bool = Query(True),
    min_rating: Optional[int] = Query(None, ge=1, le=5),
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Get paginated list of reviews"""
    try:
        # Build filter
        filter_query = {"is_active": is_active}
        if min_rating:
            filter_query["rating"] = {"$gte": min_rating}
        
        # Get total count
        total = await db.reviews.count_documents(filter_query)
        
        # Calculate pagination
        skip = (page - 1) * per_page
        total_pages = (total + per_page - 1) // per_page
        
        # Get reviews sorted by date (newest first)
        cursor = db.reviews.find(filter_query).sort("date", -1).skip(skip).limit(per_page)
        reviews = await cursor.to_list(length=per_page)
        
        # Convert MongoDB ObjectIds
        for review in reviews:
            review["id"] = str(review.get("_id", ""))
            if "_id" in review:
                del review["_id"]
        
        return PaginatedResponse(
            success=True,
            data=reviews,
            total=total,
            page=page,
            per_page=per_page,
            total_pages=total_pages
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving reviews: {str(e)}")

@router.get("/featured")
async def get_featured_reviews(
    limit: int = Query(10, ge=1, le=20),
    min_rating: int = Query(4, ge=1, le=5),
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Get top-rated reviews for display on website"""
    try:
        cursor = db.reviews.find({
            "is_active": True,
            "rating": {"$gte": min_rating}
        }).sort([("rating", -1), ("date", -1)]).limit(limit)
        
        reviews = await cursor.to_list(length=limit)
        
        # Convert MongoDB ObjectIds
        for review in reviews:
            review["id"] = str(review.get("_id", ""))
            if "_id" in review:
                del review["_id"]
        
        return {
            "success": True,
            "data": reviews
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving featured reviews: {str(e)}")

@router.get("/stats")
async def get_review_statistics(db: AsyncIOMotorDatabase = Depends(get_database)):
    """Get review statistics"""
    try:
        # Get average rating
        pipeline = [
            {"$match": {"is_active": True}},
            {"$group": {
                "_id": None,
                "average_rating": {"$avg": "$rating"},
                "total_reviews": {"$sum": 1}
            }}
        ]
        
        stats = await db.reviews.aggregate(pipeline).to_list(length=1)
        
        if not stats:
            return {
                "success": True,
                "data": {
                    "average_rating": 0,
                    "total_reviews": 0,
                    "rating_distribution": {}
                }
            }
        
        avg_rating = round(stats[0]["average_rating"], 1)
        total_reviews = stats[0]["total_reviews"]
        
        # Get rating distribution
        rating_distribution = {}
        for rating in range(1, 6):
            count = await db.reviews.count_documents({
                "is_active": True,
                "rating": rating
            })
            rating_distribution[str(rating)] = count
        
        return {
            "success": True,
            "data": {
                "average_rating": avg_rating,
                "total_reviews": total_reviews,
                "rating_distribution": rating_distribution
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving review statistics: {str(e)}")

@router.get("/{review_id}", response_model=Review)
async def get_review(review_id: str, db: AsyncIOMotorDatabase = Depends(get_database)):
    """Get a specific review by ID"""
    try:
        review = await db.reviews.find_one({"id": review_id})
        if not review:
            raise HTTPException(status_code=404, detail="Review not found")
        
        # Convert MongoDB ObjectId
        review["id"] = str(review.get("_id", review_id))
        if "_id" in review:
            del review["_id"]
            
        return Review(**review)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving review: {str(e)}")

@router.post("/", response_model=APIResponse)
async def create_review(
    review_data: ReviewCreate,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Create a new review"""
    try:
        # Create review object
        review = Review(**review_data.dict())
        review_dict = review.dict()
        
        result = await db.reviews.insert_one(review_dict)
        
        return APIResponse(
            success=True,
            message="Review created successfully",
            data={"id": review.id}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating review: {str(e)}")

@router.put("/{review_id}", response_model=APIResponse)
async def update_review(
    review_id: str,
    review_data: ReviewCreate,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Update an existing review"""
    try:
        update_data = review_data.dict()
        
        result = await db.reviews.update_one(
            {"id": review_id},
            {"$set": update_data}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Review not found")
        
        return APIResponse(
            success=True,
            message="Review updated successfully"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error updating review: {str(e)}")

@router.delete("/{review_id}", response_model=APIResponse)
async def delete_review(review_id: str, db: AsyncIOMotorDatabase = Depends(get_database)):
    """Soft delete a review (mark as inactive)"""
    try:
        result = await db.reviews.update_one(
            {"id": review_id},
            {"$set": {"is_active": False}}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Review not found")
        
        return APIResponse(
            success=True,
            message="Review deleted successfully"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deleting review: {str(e)}")
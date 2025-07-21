from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import logging
from pathlib import Path

# Import database connection functions
from database import connect_to_mongo, close_mongo_connection

# Import route modules
from routes.company import router as company_router
from routes.services import router as services_router
from routes.projects import router as projects_router
from routes.contact import router as contact_router
from routes.reviews import router as reviews_router

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    logger.info("Starting up Al-Sawda Warehouses API...")
    await connect_to_mongo()
    yield
    # Shutdown
    logger.info("Shutting down Al-Sawda Warehouses API...")
    await close_mongo_connection()

# Create FastAPI app with lifespan
app = FastAPI(
    title="Al-Sawda Warehouses API",
    description="API for شركة المستودعات السوداء المحدودة - Interior & Exterior Design Company",
    version="1.0.0",
    lifespan=lifespan
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],  # In production, replace with specific domains
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(company_router)
app.include_router(services_router)
app.include_router(projects_router)
app.include_router(contact_router)
app.include_router(reviews_router)

# Root endpoint
@app.get("/api/")
async def root():
    return {
        "message": "مرحباً بك في API شركة المستودعات السوداء المحدودة",
        "message_en": "Welcome to Al-Sawda Warehouses Limited Company API",
        "version": "1.0.0",
        "status": "active"
    }

# Health check endpoint
@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "message": "Al-Sawda Warehouses API is running smoothly"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
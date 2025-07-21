from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List
from datetime import datetime
import uuid

# Contact Form Models
class ContactFormCreate(BaseModel):
    name: str
    phone: str
    email: Optional[EmailStr] = None
    service: Optional[str] = None
    message: Optional[str] = None

class ContactForm(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    phone: str
    email: Optional[EmailStr] = None
    service: Optional[str] = None
    message: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    status: str = "pending"  # pending, contacted, completed

# Service Models
class Service(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    title_en: Optional[str] = None
    description: str
    description_en: Optional[str] = None
    icon: str
    category: str
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)

class ServiceCreate(BaseModel):
    title: str
    title_en: Optional[str] = None
    description: str
    description_en: Optional[str] = None
    icon: str
    category: str

# Project/Gallery Models
class Project(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    title_en: Optional[str] = None
    description: str
    description_en: Optional[str] = None
    image_url: str
    category: str
    location: Optional[str] = None
    completion_date: Optional[datetime] = None
    is_featured: bool = False
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)

class ProjectCreate(BaseModel):
    title: str
    title_en: Optional[str] = None
    description: str
    description_en: Optional[str] = None
    image_url: str
    category: str
    location: Optional[str] = None
    completion_date: Optional[datetime] = None
    is_featured: bool = False

# Review Models
class Review(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    rating: int = Field(..., ge=1, le=5)
    text: str
    date: datetime = Field(default_factory=datetime.utcnow)
    is_verified: bool = True
    is_active: bool = True
    google_review_id: Optional[str] = None

class ReviewCreate(BaseModel):
    name: str
    rating: int = Field(..., ge=1, le=5)
    text: str
    date: Optional[datetime] = None
    google_review_id: Optional[str] = None

# Company Info Models
class CompanyInfo(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    name_en: Optional[str] = None
    tagline: str
    tagline_en: Optional[str] = None
    description: str
    description_en: Optional[str] = None
    phone: str
    email: EmailStr
    address: str
    address_en: Optional[str] = None
    rating: float = Field(..., ge=0, le=5)
    review_count: int = 0
    working_hours_weekdays: str
    working_hours_friday: str
    whatsapp: str
    map_url: Optional[str] = None
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class CompanyInfoUpdate(BaseModel):
    name: Optional[str] = None
    name_en: Optional[str] = None
    tagline: Optional[str] = None
    tagline_en: Optional[str] = None
    description: Optional[str] = None
    description_en: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[EmailStr] = None
    address: Optional[str] = None
    address_en: Optional[str] = None
    rating: Optional[float] = Field(None, ge=0, le=5)
    review_count: Optional[int] = None
    working_hours_weekdays: Optional[str] = None
    working_hours_friday: Optional[str] = None
    whatsapp: Optional[str] = None
    map_url: Optional[str] = None

# Newsletter Subscription Model
class NewsletterSubscription(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)

class NewsletterSubscriptionCreate(BaseModel):
    email: EmailStr

# Statistics Model
class Statistics(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    projects_completed: int = 0
    happy_clients: int = 0
    years_experience: int = 0
    team_members: int = 0
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class StatisticsUpdate(BaseModel):
    projects_completed: Optional[int] = None
    happy_clients: Optional[int] = None
    years_experience: Optional[int] = None
    team_members: Optional[int] = None

# API Response Models
class APIResponse(BaseModel):
    success: bool
    message: str
    data: Optional[dict] = None

class PaginatedResponse(BaseModel):
    success: bool
    data: List[dict]
    total: int
    page: int
    per_page: int
    total_pages: int
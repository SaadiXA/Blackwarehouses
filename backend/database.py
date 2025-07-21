from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from typing import Optional
import os
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

class Database:
    client: Optional[AsyncIOMotorClient] = None
    database: Optional[AsyncIOMotorDatabase] = None

database = Database()

async def get_database() -> AsyncIOMotorDatabase:
    return database.database

async def connect_to_mongo():
    """Create database connection"""
    mongo_url = os.environ.get('MONGO_URL')
    db_name = os.environ.get('DB_NAME', 'alsawda_warehouses')
    
    print(f"Connecting to MongoDB: {db_name}")
    
    database.client = AsyncIOMotorClient(mongo_url)
    database.database = database.client[db_name]
    
    # Test the connection
    try:
        await database.client.admin.command('ismaster')
        print("✅ MongoDB connection successful")
        
        # Initialize default data
        await initialize_default_data()
        
    except Exception as e:
        print(f"❌ MongoDB connection failed: {e}")
        raise

async def close_mongo_connection():
    """Close database connection"""
    if database.client:
        database.client.close()
        print("✅ MongoDB connection closed")

async def initialize_default_data():
    """Initialize the database with default data"""
    
    # Initialize company info
    company_collection = database.database.company_info
    existing_company = await company_collection.find_one()
    
    if not existing_company:
        default_company = {
            "name": "شركة المستودعات السوداء المحدودة",
            "name_en": "Al-Sawda Warehouses Limited Company",
            "tagline": "للديكور الداخلي والخارجي والمقاولات العامة",
            "tagline_en": "Interior & Exterior Design and General Contracting",
            "description": "نحول أحلامك إلى واقع بلمسة فنية متميزة تجمع بين الأصالة والحداثة في جميع أنحاء المملكة العربية السعودية",
            "description_en": "We transform your dreams into reality with distinguished artistic touch combining authenticity and modernity throughout Saudi Arabia",
            "phone": "+966 56 897 9993",
            "email": "info@alsawda-warehouses.sa",
            "address": "ضحضاح، نجران 66271، المملكة العربية السعودية",
            "address_en": "Dhadhah, Najran 66271, Saudi Arabia",
            "rating": 4.8,
            "review_count": 17,
            "working_hours_weekdays": "السبت - الخميس: 8:00 ص - 11:00 م",
            "working_hours_friday": "الجمعة: 4:00 م - 10:00 م",
            "whatsapp": "+966568979993",
            "map_url": "https://g.co/kgs/wxTrhyM"
        }
        await company_collection.insert_one(default_company)
        print("✅ Company info initialized")

    # Initialize services
    services_collection = database.database.services
    services_count = await services_collection.count_documents({})
    
    if services_count == 0:
        default_services = [
            {
                "title": "ديكور داخلي",
                "title_en": "Interior Design",
                "description": "تصميم وتنفيذ ديكورات داخلية عصرية وفاخرة تناسب جميع الأذواق والميزانيات، من الفلل والقصور إلى المكاتب والمحلات التجارية مع استخدام أجود المواد.",
                "description_en": "Design and implementation of modern and luxurious interior decorations suitable for all tastes and budgets, from villas and palaces to offices and shops using the finest materials.",
                "icon": "fas fa-home",
                "category": "design",
                "is_active": True
            },
            {
                "title": "ديكور خارجي",
                "title_en": "Exterior Design", 
                "description": "تصميم الحدائق والمساحات الخارجية والواجهات المعمارية بلمسة فنية متميزة تعكس جمال البيئة السعودية وتراعي المناخ المحلي.",
                "description_en": "Design of gardens, outdoor spaces and architectural facades with a distinctive artistic touch that reflects the beauty of the Saudi environment and takes into account the local climate.",
                "icon": "fas fa-tree",
                "category": "design",
                "is_active": True
            },
            {
                "title": "المقاولات العامة",
                "title_en": "General Contracting",
                "description": "تنفيذ مشاريع البناء والتشييد بأعلى معايير الجودة والسلامة، من الأساسات حتى التشطيبات النهائية مع ضمان الالتزام بالمواعيد.",
                "description_en": "Implementation of construction projects with the highest standards of quality and safety, from foundations to final finishes with guaranteed commitment to deadlines.",
                "icon": "fas fa-tools",
                "category": "construction",
                "is_active": True
            },
            {
                "title": "التصميم المعماري",
                "title_en": "Architectural Design",
                "description": "خدمات التصميم المعماري الإبداعي التي تجمع بين الوظيفية والجمال، مع مراعاة البيئة المحلية والثقافة السعودية والمعايير العالمية.",
                "description_en": "Creative architectural design services that combine functionality and beauty, taking into account the local environment, Saudi culture and international standards.",
                "icon": "fas fa-drafting-compass",
                "category": "design",
                "is_active": True
            },
            {
                "title": "التشطيبات الفاخرة",
                "title_en": "Luxury Finishes",
                "description": "تنفيذ أعمال التشطيبات بأجود المواد وأحدث التقنيات، لضمان نتائج تفوق التوقعات وتدوم طويلاً مع ضمان شامل على الأعمال.",
                "description_en": "Implementation of finishing works with the finest materials and latest technologies, to ensure results that exceed expectations and last long with comprehensive warranty.",
                "icon": "fas fa-paint-brush",
                "category": "finishing",
                "is_active": True
            },
            {
                "title": "تجهيز المنشآت التقنية",
                "title_en": "Technical Facility Supply",
                "description": "نقدم حلولاً شاملة لتجهيز الشركات والمكاتب والمدارس بأحدث الأجهزة التقنية. نوفر أجهزة كمبيوتر مكتبية ومحمولة، راوترات، مودمات، وأجهزة متنقلة من علامات تجارية موثوقة.",
                "description_en": "We provide comprehensive solutions for equipping companies, offices and schools with the latest technical devices. We supply desktop and laptop computers, routers, modems, and mobile devices from trusted brands.",
                "icon": "fas fa-laptop",
                "category": "technology",
                "is_active": True
            }
        ]
        await services_collection.insert_many(default_services)
        print("✅ Services initialized")

    # Initialize statistics
    stats_collection = database.database.statistics
    existing_stats = await stats_collection.find_one()
    
    if not existing_stats:
        default_stats = {
            "projects_completed": 100,
            "happy_clients": 150,
            "years_experience": 5,
            "team_members": 25
        }
        await stats_collection.insert_one(default_stats)
        print("✅ Statistics initialized")

    print("✅ Database initialization completed")
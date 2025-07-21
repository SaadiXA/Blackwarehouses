"""
Seed script to populate the database with initial data
Run this to add projects, reviews, and other sample data
"""

import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime, timedelta
import os
from pathlib import Path
from dotenv import load_dotenv
import random

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

async def seed_database():
    """Seed the database with sample data"""
    
    mongo_url = os.environ.get('MONGO_URL')
    db_name = os.environ.get('DB_NAME', 'alsawda_warehouses')
    
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
    
    print("🌱 Starting database seeding...")
    
    # Seed projects/gallery
    await seed_projects(db)
    
    # Seed reviews
    await seed_reviews(db)
    
    # Update statistics
    await update_statistics(db)
    
    client.close()
    print("✅ Database seeding completed!")

async def seed_projects(db):
    """Seed project gallery data"""
    
    # Check if projects already exist
    existing_count = await db.projects.count_documents({})
    if existing_count > 0:
        print(f"📸 Projects already exist ({existing_count} projects), skipping...")
        return
    
    # Project images from the user's provided URLs
    project_images = [
        {
            "url": "https://i.ibb.co/vv1YCV0X/unnamed-13.webp",
            "title": "تصميم مكتب فاخر في السعودية",
            "description": "أثاث إيطالي يدوي الصنع",
            "category": "مكاتب"
        },
        {
            "url": "https://i.ibb.co/K898SWs/2025-02-25-7.webp",
            "title": "صالة معيشة فاخرة بطراز عصري",
            "description": "واحة الفخامة العصرية",
            "category": "غرف معيشة"
        },
        {
            "url": "https://i.ibb.co/4g8qr5gJ/unnamed-11.webp",
            "title": "ديكور صالة فاخرة سعودية",
            "description": "أناقة تتجسد في كل التفاصيل",
            "category": "غرف معيشة"
        },
        {
            "url": "https://i.ibb.co/sLhjdXM/unnamed-12.webp",
            "title": "تصميم فيلا فاخرة - الرياض",
            "description": "مشروع متكامل للديكور الداخلي",
            "category": "فلل"
        },
        {
            "url": "https://i.ibb.co/KzbyP5CZ/unnamed-10.webp",
            "title": "تصميم خارجي وتنسيق حدائق",
            "description": "لمسة طبيعية خلابة",
            "category": "حدائق"
        },
        {
            "url": "https://i.ibb.co/KzfcCL55/2025-02-25-6.webp",
            "title": "واجهة معمارية حديثة",
            "description": "تصميم عصري بلمسة فنية",
            "category": "واجهات"
        },
        {
            "url": "https://i.ibb.co/xK3hkmQ4/2025-02-25-4.webp",
            "title": "ديكور داخلي متميز",
            "description": "جمال وأناقة في كل زاوية",
            "category": "ديكور داخلي"
        },
        {
            "url": "https://i.ibb.co/h11p2wmw/2025-02-25-5.webp",
            "title": "تصميم حديث للمساحات",
            "description": "إبداع في التفاصيل",
            "category": "ديكور داخلي"
        },
        {
            "url": "https://i.ibb.co/TMMJNSKP/unnamed-8.webp",
            "title": "ديكور فاخر للمنازل",
            "description": "لمسة ملكية راقية",
            "category": "منازل"
        },
        {
            "url": "https://i.ibb.co/fVG1GK1Z/unnamed-9.webp",
            "title": "تصميم معماري متطور",
            "description": "عمارة حديثة بروح عربية",
            "category": "معماري"
        },
        {
            "url": "https://i.ibb.co/MxSd9d1T/unnamed-7.webp",
            "title": "ديكور خارجي رائع",
            "description": "جمال الطبيعة مع الفن",
            "category": "ديكور خارجي"
        },
        {
            "url": "https://i.ibb.co/4R5xyZHz/2024-12-23.webp",
            "title": "تصميم عصري للمكاتب",
            "description": "بيئة عمل محفزة ومريحة",
            "category": "مكاتب"
        }
    ]
    
    # Create project documents
    projects = []
    for i, img in enumerate(project_images):
        project = {
            "id": f"project_{i+1}",
            "title": img["title"],
            "description": img["description"],
            "image_url": img["url"],
            "category": img["category"],
            "location": "المملكة العربية السعودية",
            "completion_date": datetime.now() - timedelta(days=random.randint(30, 365)),
            "is_featured": i < 8,  # First 8 are featured
            "is_active": True,
            "created_at": datetime.now() - timedelta(days=random.randint(1, 200))
        }
        projects.append(project)
    
    # Insert projects
    await db.projects.insert_many(projects)
    print(f"📸 Seeded {len(projects)} projects")

async def seed_reviews(db):
    """Seed customer reviews"""
    
    # Check if reviews already exist
    existing_count = await db.reviews.count_documents({})
    if existing_count > 0:
        print(f"⭐ Reviews already exist ({existing_count} reviews), skipping...")
        return
    
    # Customer reviews data
    reviews_data = [
        {
            "name": "أحمد السعيد",
            "rating": 5,
            "text": "خدمة ممتازة وفريق عمل محترف جداً! نفذوا مشروع ديكور منزلي بدقة وإتقان فاق التوقعات.",
            "date": datetime.now() - timedelta(days=30)
        },
        {
            "name": "فاطمة الزهراني",
            "rating": 5,
            "text": "أفضل شركة ديكور تعاملت معها في السعودية. الجودة عالية والأسعار مناسبة والالتزام بالمواعيد ممتاز.",
            "date": datetime.now() - timedelta(days=45)
        },
        {
            "name": "محمد العتيبي",
            "rating": 5,
            "text": "تجربة رائعة مع شركة المستودعات السوداء. صمموا مكتبي بشكل احترافي وبلمسة عصرية مميزة.",
            "date": datetime.now() - timedelta(days=60)
        },
        {
            "name": "نورا القحطاني",
            "rating": 4,
            "text": "فريق عمل متميز وخدمة عملاء ممتازة. أنصح بالتعامل معهم لجميع أعمال الديكور والتشطيبات.",
            "date": datetime.now() - timedelta(days=75)
        },
        {
            "name": "عبدالله المطيري",
            "rating": 5,
            "text": "مذهل! حولوا بيتي إلى تحفة فنية. كل التفاصيل نُفذت بعناية فائقة ومواد عالية الجودة.",
            "date": datetime.now() - timedelta(days=90)
        },
        {
            "name": "سارة الدوسري",
            "rating": 4,
            "text": "جودة العمل جيدة جداً والتصاميم إبداعية. سأوصي بهم لأصدقائي بكل ثقة.",
            "date": datetime.now() - timedelta(days=105)
        },
        {
            "name": "خالد الشمري",
            "rating": 5,
            "text": "أفضل تجربة ديكور في حياتي! الفريق محترف والنتائج تفوق الخيال. شكراً لكم.",
            "date": datetime.now() - timedelta(days=120)
        },
        {
            "name": "ريم العنزي",
            "rating": 4,
            "text": "خدمة ممتازة وأسعار تنافسية. التزموا بالمواعيد والنتيجة النهائية أكثر من رائعة.",
            "date": datetime.now() - timedelta(days=135)
        },
        {
            "name": "يوسف الحربي",
            "rating": 5,
            "text": "تعامل راقي واهتمام بالتفاصيل. نفذوا مشروع تصميم المطعم بطريقة احترافية مميزة.",
            "date": datetime.now() - timedelta(days=150)
        },
        {
            "name": "مريم البقمي",
            "rating": 4,
            "text": "فريق عمل ودود ومتعاون. الديكور جميل والتشطيبات عالية الجودة. أنصح بالتعامل معهم.",
            "date": datetime.now() - timedelta(days=165)
        }
    ]
    
    # Create review documents
    reviews = []
    for i, review_data in enumerate(reviews_data):
        review = {
            "id": f"review_{i+1}",
            "name": review_data["name"],
            "rating": review_data["rating"],
            "text": review_data["text"],
            "date": review_data["date"],
            "is_verified": True,
            "is_active": True,
            "google_review_id": f"google_review_{i+1}"
        }
        reviews.append(review)
    
    # Insert reviews
    await db.reviews.insert_many(reviews)
    print(f"⭐ Seeded {len(reviews)} reviews")

async def update_statistics(db):
    """Update company statistics"""
    
    # Count actual data
    projects_count = await db.projects.count_documents({"is_active": True})
    reviews_count = await db.reviews.count_documents({"is_active": True})
    
    # Update or create statistics
    stats_data = {
        "projects_completed": max(projects_count, 100),
        "happy_clients": max(reviews_count * 10, 150),
        "years_experience": 5,
        "team_members": 25,
        "updated_at": datetime.now()
    }
    
    await db.statistics.update_one(
        {},
        {"$set": stats_data},
        upsert=True
    )
    
    print("📊 Updated company statistics")

if __name__ == "__main__":
    asyncio.run(seed_database())
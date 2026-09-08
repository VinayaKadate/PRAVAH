from fastapi import APIRouter, HTTPException
from app.core.firebase import get_db

router = APIRouter()

@router.get("/stats")
def get_dashboard_stats():
    db = get_db()
    if not db:
        raise HTTPException(status_code=500, detail="Database not initialized")
    
    config = db.collection("pravah_config")
    
    stats_doc = config.document("stats").get()
    monthly_doc = config.document("monthly").get()
    region_doc = config.document("region_split").get()
    sector_doc = config.document("sector_invest").get()

    return {
        "stats": stats_doc.to_dict().get("data", []) if stats_doc.exists else [],
        "monthly_trends": monthly_doc.to_dict().get("data", []) if monthly_doc.exists else [],
        "region_split": region_doc.to_dict().get("data", []) if region_doc.exists else [],
        "sector_investments": sector_doc.to_dict().get("data", []) if sector_doc.exists else []
    }

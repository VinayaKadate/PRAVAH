from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="MAITRI Portal API",
    description="Backend services for the MAITRI 2.0 Single Window Clearance System",
    version="1.0.0"
)

# Configure CORS so the React frontend can communicate with this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], # Vite dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Welcome to the MAITRI API"}

@app.get("/health")
def health_check():
    return {"status": "ok"}

from fastapi import FastAPI,Depends
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine,text
from sqlalchemy.orm import sessionmaker,Session

import os
import random

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(DATABASE_URL)
localSession = sessionmaker(autocommit=False,autoflush=False,bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_headers=["*"],
    allow_methods=["*"]
)

def getDatabase():
    Database = localSession()
    try:
        yield Database
    finally:
        Database.close()
        
@app.get("/")
def read_root():
    return {"Database":"Open"}

@app.get("/example/{method}")
def randomExample(method:str,db:Session=Depends(getDatabase)):
    query = text("SELECT data FROM example WHERE method = :type")
    results = db.execute(query,{"type":method}).fetchall()
    randomExample = random.choice(results)
    return randomExample[0]
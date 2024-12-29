from fastapi import FastAPI
from helpers.new_year_resolutions import new_year_resolutions
from pydantic import BaseModel
from typing import List

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}



@app.get("/resolutions")
def read_resolutions():
    return new_year_resolutions

class ResolutionRequest(BaseModel):
    name: str
    resolutions: List[str]

@app.post("/add_resolutions")
def add_resolutions(request: ResolutionRequest):
    with open("/home/hrushik/Desktop/visualboard/backend/resolutions.txt", "a") as file:
        file.write(f"Name: {request.name}\n")
        file.write("Resolutions:\n")
        for resolution in request.resolutions:
            file.write(f"- {resolution}\n")
        file.write("\n")
    return {"message": "Resolutions added successfully"}




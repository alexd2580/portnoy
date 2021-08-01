from typing import Optional
from uuid import UUID, uuid4

from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


class HelloResponse(BaseModel):
    Hello: str


class Thing(BaseModel):
    id: UUID
    name: str


@app.get("/", response_model=HelloResponse)
def index():
    return {"Hello": "World"}


@app.get("/things", response_model=list[Thing])
def things():
    things = [{"id": uuid4(), "name": "first"}, {"id": uuid4(), "name": "second"}]
    return things

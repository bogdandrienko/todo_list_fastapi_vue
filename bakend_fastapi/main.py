from typing import Union
from fastapi import FastAPI, Request
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware  # NEW
import random
import time
import json

app = FastAPI()

# NEW
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Item(BaseModel):
    name: str
    price: float
    is_offer: Union[bool, None] = None


@app.get("/todos/")
async def todos_get():
    time.sleep(1.0)

    with open('db.json', 'r') as file:
        json_obj = json.load(fp=file)

    return {"response": json_obj, "status": 200}


@app.post("/todos/")
async def todos_post(request: Request):
    time.sleep(1.0)

    response = await request.form()  # response = await request.json()

    todo_title = response.get("title")
    todo_description = response.get("description")

    with open('db.json', 'r') as file:
        json_obj = json.load(fp=file)
        json_obj.append({f"title": todo_title, f"description": todo_description})
    with open('db.json', 'w') as file:
        json.dump(json_obj, file)

    return {"response": "successful created", "status": 201}


@app.put("/todos/")
async def todos_put(request: Request):
    time.sleep(1.0)

    response = await request.form()  # response = await request.json()

    todo_id = response.get("id")
    todo_title = response.get("title")
    todo_description = response.get("description")

    with open('db.json', 'r') as file:
        json_obj = json.load(fp=file)
        json_obj[int(todo_id)] = {f"title": todo_title, f"description": todo_description}
    with open('db.json', 'w') as file:
        json.dump(json_obj, file)

    return {"response": "successful created", "status": 201}


@app.get("/")
async def read_root():
    time.sleep(1.0)
    return {"response": {"Hello": f"World {random.randint(1, 1000)}"}}


@app.get("/items/{item_id}")
async def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}


@app.put("/items/{item_id}")
def update_item(item_id: int, item: Item):
    return {"item_name": item.name, "item_id": item_id}

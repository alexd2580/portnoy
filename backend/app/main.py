from fastapi import FastAPI

from app.api import article, article_option
from app.models import Base, engine

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(article.router)
app.include_router(article_option.router)

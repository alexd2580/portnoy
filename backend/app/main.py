import random
from typing import Literal, Optional, Union
from uuid import UUID

from fastapi import Depends, FastAPI
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.models import Base, SessionLocal, engine
from app.models.article import Article

Base.metadata.create_all(bind=engine)

app = FastAPI()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


Piece = Union[Literal["pants"], Literal["t-shirt"]]
Sex = Union[Literal["male"], Literal["female"]]
Size = Union[
    Literal["xxs"],
    Literal["xs"],
    Literal["s"],
    Literal["m"],
    Literal["l"],
    Literal["xl"],
    Literal["xxl"],
]
Color = Union[
    Literal["red"],
    Literal["green"],
    Literal["blue"],
    Literal["white"],
    Literal["black"],
]


class ArticleSchema(BaseModel):
    id: UUID
    piece: Piece
    sex: Sex
    size: Size
    color: Color

    class Config:
        orm_mode = True


@app.post("/options")
def post_options(session: Session = Depends(get_db)):
    pieces = ["pants", "t-shirt"]
    sexes = ["male", "female"]
    sizes = ["xxs", "xs", "s", "m", "l", "xl", "xxl"]
    colors = ["red", "green", "blue", "white", "black"]
    for piece in pieces:
        for sex in sexes:
            for size in sizes:
                for color in colors:
                    if random.random() > 0.4:
                        continue

                    article = Article(piece=piece, sex=sex, size=size, color=color)
                    session.add(article)
    session.commit()


@app.get("/options", response_model=list[ArticleSchema])
def get_options(
    piece: Optional[Piece] = None,
    sex: Optional[Sex] = None,
    size: Optional[Size] = None,
    color: Optional[Color] = None,
    session: Session = Depends(get_db),
):
    q = session.query(Article)
    if piece:
        q = q.filter_by(piece=piece)
    if sex:
        q = q.filter_by(sex=sex)
    if size:
        q = q.filter_by(size=size)
    if color:
        q = q.filter_by(color=color)

    articles = q.all()
    return articles


@app.delete("/options")
def delete_options(session: Session = Depends(get_db)):
    session.query(Article).delete()
    session.commit()

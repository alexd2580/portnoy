import random
from typing import Optional

import fastapi
from sqlalchemy.orm import Session

from app.models import get_db
from app.models.article import Article
from app.schemas.article import ArticleSchema
from app.types.article import Color, Piece, Sex, Size

router = fastapi.APIRouter(prefix="/articles")


@router.post("")
def post_articles(session: Session = fastapi.Depends(get_db)):
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


@router.get("", response_model=list[ArticleSchema])
def get_articles(
    piece: Optional[Piece] = None,
    sex: Optional[Sex] = None,
    size: Optional[Size] = None,
    color: Optional[Color] = None,
    session: Session = fastapi.Depends(get_db),
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


@router.delete("")
def delete_options(session: Session = fastapi.Depends(get_db)):
    session.query(Article).delete()
    session.commit()

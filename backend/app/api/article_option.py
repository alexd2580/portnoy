from typing import Optional

import fastapi
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models import get_db
from app.models.article import Article
from app.schemas.article_option import ArticleOptions
from app.types.article import Color, Piece, Sex, Size

router = fastapi.APIRouter(prefix="/article-options")


@router.get("", response_model=ArticleOptions)
def get_article_options(
    piece: Optional[Piece] = None,
    sex: Optional[Sex] = None,
    size: Optional[Size] = None,
    color: Optional[Color] = None,
    session: Session = fastapi.Depends(get_db),
):
    q = session.query(Article)
    q = q.with_entities(
        func.json_group_array(Article.piece.distinct()).label("piece"),
        func.json_group_array(Article.sex.distinct()).label("sex"),
        func.json_group_array(Article.size.distinct()).label("size"),
        func.json_group_array(Article.color.distinct()).label("color"),
    )
    if piece:
        q = q.filter_by(piece=piece)
    if sex:
        q = q.filter_by(sex=sex)
    if size:
        q = q.filter_by(size=size)
    if color:
        q = q.filter_by(color=color)

    article_options = q.one()
    return article_options

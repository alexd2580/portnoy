from uuid import UUID

from pydantic import BaseModel

from app.types.article import Color, Piece, Sex, Size


class ArticleSchema(BaseModel):
    id: UUID
    piece: Piece
    sex: Sex
    size: Size
    color: Color

    class Config:
        orm_mode = True

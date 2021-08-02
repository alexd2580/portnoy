from pydantic import BaseModel, Json

from app.types.article import Color, Piece, Sex, Size


class ArticleOptions(BaseModel):
    piece: Json[list[Piece]]
    sex: Json[list[Sex]]
    size: Json[list[Size]]
    color: Json[list[Color]]

    class Config:
        orm_mode = True

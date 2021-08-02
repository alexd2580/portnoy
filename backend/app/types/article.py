from typing import Literal, Union

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

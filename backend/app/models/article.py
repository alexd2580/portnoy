import uuid

from sqlalchemy import Column, String

from app.models import Base


class Article(Base):
    __tablename__ = "article"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    piece = Column(String, index=True)
    sex = Column(String, index=True)
    size = Column(String, index=True)
    color = Column(String, index=True)

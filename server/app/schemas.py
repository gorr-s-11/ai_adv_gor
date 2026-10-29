from pydantic import BaseModel, Field

class StoryRequest(BaseModel):
    characterName: str
    genre: str
    world: str
    description: str
    steps: int = Field(ge=1, le=50)

class GeneratedStory(BaseModel):
    title: str
    pages: list[str]
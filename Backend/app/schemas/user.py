from pydantic import BaseModel, ConfigDict


class UserResponse(BaseModel):
    display_name: str
    public_id: int
    model_config = ConfigDict(from_attributes=True)
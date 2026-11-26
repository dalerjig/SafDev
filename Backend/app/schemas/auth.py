from typing import Any

from pydantic import BaseModel, ConfigDict, Field, SecretStr, field_validator


class RegisterRequest(BaseModel):
    display_name: str = Field(min_length=1, max_length=64)

    @field_validator("display_name", mode="before")

    @classmethod
    def strip_display_name(cls, value: Any) -> Any:
        if isinstance(value, str):
            return value.strip()
        return value
    
    password: SecretStr = Field(min_length=10, max_length=128)
    model_config = ConfigDict(extra="forbid")
    # invite_token: SecretStr

class LoginRequest(BaseModel):
    public_id: int = Field(ge=100000, le=999999)
    password: SecretStr = Field(min_length=10, max_length=128)
    model_config = ConfigDict(extra="forbid")
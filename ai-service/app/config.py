from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    PORT: int = 8000
    HOST: str = "127.0.0.1"
    LOG_LEVEL: str = "info"
    LITELLM_URL: str = "http://127.0.0.1:4001"
    LITELLM_MASTER_KEY: str = "sk-careercraft-dev-key"
    INTERNAL_SERVICE_TOKEN: str = "sk-careercraft-internal-token"
    AI_MOCK_MODE: bool = False

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

settings = Settings()

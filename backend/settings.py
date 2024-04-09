from starlette.config import Config
from starlette.datastructures import Secret

config = Config(env_file=".env")

VESPA_APP_URL = config("VESPA_APP_URL", default="http://localhost:4080")
OPENAI_API_KEY = config(
    "OPENAI_API_KEY", default="__OPENAI_API_KEY_NOT_SET__", cast=Secret
)

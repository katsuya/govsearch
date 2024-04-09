from starlette.applications import Starlette
from starlette.middleware import Middleware
from starlette.responses import FileResponse
from starlette.routing import Mount, Route, WebSocketRoute
from starlette.staticfiles import StaticFiles
from content_size_limit_asgi import ContentSizeLimitMiddleware

from .graphql import graphql_app
from .logger import init_logger
from .cache import cache_questions, cache_generate_summary

init_logger()

app = Starlette(
    debug=True,
    on_startup=[cache_questions.connect, cache_generate_summary.connect],
    on_shutdown=[cache_questions.disconnect, cache_generate_summary.disconnect],
    middleware=[
        Middleware(
            ContentSizeLimitMiddleware,
            max_content_size=1024 * 32,
        ),
    ],
    routes=[
        Route(
            "/graphql", graphql_app.handle_request, methods=["GET", "POST", "OPTIONS"]
        ),
        WebSocketRoute("/ws/graphql", graphql_app.handle_websocket),
        Mount("/assets", StaticFiles(directory="build/client/assets"), name="assets"),
        Mount("/favicon.ico", FileResponse("build/client/favicon.ico")),
        Route("/{path:path}", FileResponse("build/client/index.html")),
    ],
)

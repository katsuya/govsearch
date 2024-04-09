import logging
from ariadne import load_schema_from_path, make_executable_schema
from ariadne.asgi import GraphQL
from ariadne.asgi.handlers import GraphQLTransportWSHandler
from .resolver import query, subscription


type_defs = load_schema_from_path("schema/graphql_qa.graphql")
schema = make_executable_schema(type_defs, query, subscription)
graphql_app = GraphQL(
    schema,
    debug=True,
    logger=logging.getLogger("graphql"),
    websocket_handler=GraphQLTransportWSHandler(),
)

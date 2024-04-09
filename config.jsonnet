local docker_compose = {
  image: 'govsearch:latest',
  build: '.',
  entrypoint: ['/usr/bin/env'],
  environment: {
    TZ: 'UTC',
  },
};
local docker_compose_frontend = docker_compose {
  command: [
    'npx',
    'remix',
    'vite:dev',
    '--host',
    '0.0.0.0',
    '--port',
    '7861',
  ],
  ports: ['7861:7861'],
  depends_on: ['backend'],
};
local docker_compose_backend = docker_compose {
  command: [
    'uvicorn',
    'backend:app',
    '--host',
    '0.0.0.0',
    '--port',
    '7860',
    '--log-level',
    'debug',
    '--reload',
  ],
  environment+: {
    OPENAI_API_KEY: null,
  },
  ports: ['7860:7860'],
  depends_on: ['vespa'],
};
local docker_compose_vespa = {
  image: 'vespaengine/vespa:8.324.16',
  volumes: [
    'vespa:/opt/vespa/var',
  ],
  ports: [
    '4080:4080',
    '19071:19071',
    '19092:19092',
  ],
  // NOTE: https://github.com/vespa-engine/vespa/blob/master/vespabase/src/vespa.service.in
  ulimits: {
    nofile: { soft: 32768, hard: 262144 },
    nproc: { soft: 32768, hard: 409600 },
  },
};

local tsconfig_compiler_options = {
  allowJs: false,
  allowSyntheticDefaultImports: true,
  allowUnreachableCode: false,
  esModuleInterop: true,
  experimentalDecorators: false,
  forceConsistentCasingInFileNames: true,
  incremental: true,
  isolatedModules: true,
  noEmit: true,
  noFallthroughCasesInSwitch: true,
  noImplicitAny: true,
  noUncheckedIndexedAccess: true,
  resolveJsonModule: true,
  skipLibCheck: false,
  strict: true,
  strictNullChecks: true,
  target: 'ES2022',
};
local tsconfig = {
  compilerOptions: tsconfig_compiler_options {
    baseUrl: '.',
    jsx: 'react-jsx',
    module: 'ESNext',
    moduleResolution: 'Bundler',
    lib: ['DOM', 'DOM.Iterable', 'ES2022'],
    paths: {
      '~/*': ['./frontend/*'],
    },
  },
  include: [
    'env.d.ts',
    'frontend/**/*.ts',
    'frontend/**/*.tsx',
  ],
};
local tsconfig_scripts = {
  compilerOptions: tsconfig_compiler_options {
    baseUrl: '.',
    module: 'commonjs',
    moduleResolution: 'Node',
    lib: ['DOM', 'DOM.Iterable', 'ES2022'],
    paths: {
      '~/*': ['./scripts/*'],
    },
  },
  include: [
    'scripts/**/*.ts',
  ],
};

{
  'docker-compose.yml': std.manifestYamlDoc(
    {
      version: '3.4',
      services: {
        frontend: docker_compose_frontend,
        backend: docker_compose_backend,
        vespa: docker_compose_vespa,
      },
      volumes: {
        vespa: null,
      },
    },
    indent_array_in_object=true,
  ),
  'docker-compose.vespa.yml': std.manifestYamlDoc(
    {
      version: '3.4',
      services: {
        vespa: docker_compose_vespa,
      },
      volumes: {
        vespa: null,
      },
    },
    indent_array_in_object=true,
  ),
  'tsconfig.json': tsconfig,
  'tsconfig.scripts.json': tsconfig_scripts,
}

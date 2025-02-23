/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FLIGHT_SEARCH_BE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

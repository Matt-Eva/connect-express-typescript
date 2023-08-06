export {};

declare global {
    namespace NodeJS {
        interface ProcessEnv{
            NEO_URL: string;
            NEO_USER: string;
            NEO_PASSWORD: string;
            SESSION_SECRET: string;
            FRONTEND_URL: string;
        }
    }
}
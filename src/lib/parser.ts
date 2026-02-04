export type Framework = 'Express' | 'Next.js' | 'FastAPI' | 'Django' | 'Laravel' | 'Spring Boot' | 'Ruby on Rails' | 'Go (Fiber/Gin)' | 'Rust (Actix)' | 'Generic';

export interface CORSAnalysis {
    errorType: string;
    reason: string;
    solution: string;
    codeSnippet: string;
    framework: Framework;
    confidence: number;
}

export const analyzeCORSError = (errorMessage: string): CORSAnalysis => {
    const lowerMessage = errorMessage.toLowerCase();

    // 1. Next.js / Vercel detection
    if (lowerMessage.includes('next.js') || lowerMessage.includes('vercel') || lowerMessage.includes('_next')) {
        return {
            errorType: 'Next.js Middleware/Route Restriction',
            reason: "Next.js prevents cross-origin requests by default in App Router or middleware. The requested resource lacks the 'Access-Control-Allow-Origin' header.",
            solution: "Update your next.config.ts or middleware.ts to include the appropriate CORS headers for the specific API routes.",
            framework: 'Next.js',
            confidence: 0.95,
            codeSnippet: `// next.config.ts\nconst nextConfig = {\n  async headers() {\n    return [\n      {\n        source: "/api/:path*",\n        headers: [\n          { key: "Access-Control-Allow-Credentials", value: "true" },\n          { key: "Access-Control-Allow-Origin", value: "*" }, // replace with your actual origin\n          { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },\n          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },\n        ]\n      }\n    ]\n  }\n};`,
        };
    }

    // 2. Go / Fiber / Gin
    if (lowerMessage.includes('go-fiber') || lowerMessage.includes('gin-gonic')) {
        return {
            errorType: 'Golang CORS Policy',
            reason: "Your Go backend is rejecting the request because the CORS middleware is either missing or incorrectly configured for the specified origin.",
            solution: "Initialize the CORS middleware and specify the allowed origins, methods, and headers.",
            framework: 'Go (Fiber/Gin)',
            confidence: 0.9,
            codeSnippet: `// Fiber Example\napp.Use(cors.New(cors.Config{\n    AllowOrigins: "http://localhost:3000",\n    AllowHeaders: "Origin, Content-Type, Accept",\n}))\n\n// Gin Example\nimport "github.com/gin-contrib/cors"\nrouter.Use(cors.Default())`,
        };
    }

    // 3. Actix-web (Rust)
    if (lowerMessage.includes('actix') || lowerMessage.includes('rust')) {
        return {
            errorType: 'Rust Actix-Web CORS Error',
            reason: "The actix-cors middleware didn't find the requesting origin in its whitelist.",
            solution: "Add Cors::default() or custom policy to your App initialization.",
            framework: 'Rust (Actix)',
            confidence: 0.85,
            codeSnippet: `use actix_cors::Cors;\n\nApp::new()\n    .wrap(\n        Cors::default()\n            .allowed_origin("http://localhost:3000")\n            .allowed_methods(vec!["GET", "POST"])\n            .max_age(3600)\n    )`,
        };
    }

    // 4. Laravel detection
    if (lowerMessage.includes('laravel') || lowerMessage.includes('symphony')) {
        return {
            errorType: 'Laravel CORS Restriction',
            reason: "Laravel's built-in fruitcake/laravel-cors or core middleware is rejecting the request because the origin is not whitelisted.",
            solution: "Ensure you've published the cors config and added your domain to 'allowed_origins' in config/cors.php.",
            framework: 'Laravel',
            confidence: 0.92,
            codeSnippet: `// config/cors.php\n'paths' => ['api/*', 'sanctum/csrf-cookie'],\n'allowed_methods' => ['*'],\n'allowed_origins' => ['http://localhost:3000'],\n'allowed_headers' => ['*'],\n'supports_credentials' => true,`,
        };
    }

    // 5. Django detection
    if (lowerMessage.includes('django') || lowerMessage.includes('csrf') || lowerMessage.includes('python')) {
        return {
            errorType: 'Django CORS Violation',
            reason: "Django requires 'django-cors-headers' to be installed and the origin to be in CORS_ALLOWED_ORIGINS.",
            solution: "Install django-cors-headers and add your origin to CORS_ALLOWED_ORIGINS in settings.py.",
            framework: 'Django',
            confidence: 0.9,
            codeSnippet: `# settings.py\nINSTALLED_APPS = [\n    ...\n    'corsheaders',\n    ...\n]\n\nMIDDLEWARE = [\n    'corsheaders.middleware.CorsMiddleware',\n    ...\n]\n\nCORS_ALLOWED_ORIGINS = [\n    "http://localhost:3000",\n]`,
        };
    }

    // 6. Preflight / OPTIONS specific
    if (lowerMessage.includes('preflight') || lowerMessage.includes('options')) {
        return {
            errorType: 'Preflight (OPTIONS) Failed',
            reason: "A preflight request (OPTIONS) was sent by the browser to check permissions, but the server didn't respond with a 2xx status or correct headers.",
            solution: "Handle OPTIONS requests on your server and return Access-Control-Allow headers. Many frameworks handle this automatically if CORS is enabled.",
            framework: 'Generic',
            confidence: 0.8,
            codeSnippet: `// Node.js / Express\napp.options('*', cors()); // Enable pre-flight for all routes`,
        };
    }

    // 7. Credentials / Cookies
    if (lowerMessage.includes('credentials') || lowerMessage.includes('cookie')) {
        return {
            errorType: 'Credentials Mismatch',
            reason: "The request includes credentials (like cookies or auth headers), but 'Access-Control-Allow-Credentials' is not set to true on the server, or the origin is wildcapped (*).",
            solution: "Set 'Access-Control-Allow-Credentials: true' and ensure 'Access-Control-Allow-Origin' is NOT '*'.",
            framework: 'Express',
            confidence: 0.88,
            codeSnippet: `app.use(cors({\n  origin: 'http://localhost:3000',\n  credentials: true\n}));`,
        };
    }

    // 8. Missing Header common case
    if (lowerMessage.includes('allow-origin') && lowerMessage.includes('missing')) {
        return {
            errorType: 'Missing Allow-Origin Header',
            reason: "The server did not return the required 'Access-Control-Allow-Origin' header. This is the most common CORS error.",
            solution: "Add CORS middleware to your server. If you are using Express, use the 'cors' package.",
            framework: 'Express',
            confidence: 0.9,
            codeSnippet: `const cors = require('cors');\nconst app = require('express')();\n\napp.use(cors()); // Insecure: allows all origins\n// OR\napp.use(cors({\n  origin: 'https://your-frontend.com'\n}));`,
        };
    }

    // Default fallback
    return {
        errorType: 'Generic CORS Violation',
        reason: "A policy on the server is preventing this origin from accessing the resource (CORS policy blocking).",
        solution: "Inspect your server logs to see the rejected origin and add it to your CORS whitelist.",
        framework: 'Generic',
        confidence: 0.5,
        codeSnippet: `// Standard CORS Headers\nAccess-Control-Allow-Origin: *\nAccess-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE\nAccess-Control-Allow-Headers: Content-Type, Authorization`,
    };
};



export type Framework = 'Express' | 'Next.js' | 'FastAPI' | 'Django' | 'Laravel' | 'Spring Boot' | 'Ruby on Rails' | 'Generic';

export interface CORSAnalysis {
    errorType: string;
    reason: string;
    solution: string;
    codeSnippet: string;
    framework: Framework;
}

export const analyzeCORSError = (errorMessage: string): CORSAnalysis => {
    const lowerMessage = errorMessage.toLowerCase();

    // Laravel detection
    if (lowerMessage.includes('laravel') || lowerMessage.includes('symphony')) {
        return {
            errorType: 'Laravel CORS Restriction',
            reason: "Laravel's built-in CORS middleware is rejecting the request because the origin is not whitelisted in the config.",
            solution: "Publish the cors config and add your domain to 'allowed_origins' in config/cors.php.",
            framework: 'Laravel',
            codeSnippet: `// config/cors.php\n'paths' => ['api/*', 'sanctum/csrf-cookie'],\n'allowed_methods' => ['*'],\n'allowed_origins' => ['http://localhost:3000'],\n'allowed_headers' => ['*'],`,
        };
    }

    // Django detection
    if (lowerMessage.includes('django') || lowerMessage.includes('csrf')) {
        return {
            errorType: 'Django CORS Violation',
            reason: "Django requires 'django-cors-headers' to be installed and the origin to be in CORS_ALLOWED_ORIGINS.",
            solution: "Add your origin to CORS_ALLOWED_ORIGINS in settings.py.",
            framework: 'Django',
            codeSnippet: `# settings.py\nINSTALLED_APPS = [\n    ...\n    'corsheaders',\n    ...\n]\n\nMIDDLEWARE = [\n    'corsheaders.middleware.CorsMiddleware',\n    ...\n]\n\nCORS_ALLOWED_ORIGINS = [\n    "http://localhost:3000",\n]`,
        };
    }

    // Spring Boot detection
    if (lowerMessage.includes('spring') || lowerMessage.includes('java')) {
        return {
            errorType: 'Spring Boot CORS Security',
            reason: "Spring Security or WebMvc is blocking the cross-origin request by default.",
            solution: "Add a @CrossOrigin annotation to your Controller or configure a WebMvcConfigurer bean.",
            framework: 'Spring Boot',
            codeSnippet: `// In your Controller\n@CrossOrigin(origins = "http://localhost:3000")\n@GetMapping("/api/data")\n\n// OR Global Config\n@Bean\npublic WebMvcConfigurer corsConfigurer() {\n    return new WebMvcConfigurer() {\n        @Override\n        public void addCorsMappings(CorsRegistry registry) {\n            registry.addMapping("/**").allowedOrigins("*");\n        }\n    };\n}`,
        };
    }

    // Ruby on Rails detection
    if (lowerMessage.includes('rails') || lowerMessage.includes('rack-cors')) {
        return {
            errorType: 'Rails CORS Policy',
            reason: "The rack-cors gem is either not installed or not configured to allow this origin.",
            solution: "Configure the rack-cors middleware in config/initializers/cors.rb.",
            framework: 'Ruby on Rails',
            codeSnippet: `# config/initializers/cors.rb\nRails.application.config.middleware.insert_before 0, Rack::Cors do\n  allow do\n    origins 'localhost:3000'\n    resource '*',\n      headers: :any,\n      methods: [:get, :post, :put, :patch, :delete, :options, :head]\n  end\nend`,
        };
    }

    // Common CORS error patterns
    if (lowerMessage.includes('allow-origin') && lowerMessage.includes('missing')) {
        return {
            errorType: 'Missing Allow-Origin Header',
            reason: "The server didn't send the 'Access-Control-Allow-Origin' header, so the browser blocked the response.",
            solution: "Add the CORS middleware or set the 'Access-Control-Allow-Origin' header to your origin (or '*' for public APIs).",
            framework: 'Express',
            codeSnippet: `const cors = require('cors');\napp.use(cors()); // Allow all origins`,
        };
    }

    if (lowerMessage.includes('preflight') && lowerMessage.includes('invalid')) {
        return {
            errorType: 'Preflight Request Failed',
            reason: "The OPTIONS request (preflight) sent by the browser was rejected by the server.",
            solution: "Ensure your server handles OPTIONS requests and returns a 200/204 status with appropriate CORS headers.",
            framework: 'FastAPI',
            codeSnippet: `from fastapi.middleware.cors import CORSMiddleware\n\napp.add_middleware(\n    CORSMiddleware,\n    allow_origins=["*"],\n    allow_methods=["*"],\n    allow_headers=["*"],\n)`,
        };
    }

    if (lowerMessage.includes('method') && (lowerMessage.includes('not allowed') || lowerMessage.includes('disallowed'))) {
        return {
            errorType: 'Disallowed HTTP Method',
            reason: "The request method (e.g., PUT, DELETE) is not allowed by the server's CORS policy.",
            solution: "Update 'Access-Control-Allow-Methods' to include the method you are using.",
            framework: 'Generic',
            codeSnippet: `Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS`,
        };
    }

    // Default fallback
    return {
        errorType: 'Generic CORS Violation',
        reason: "A policy on the server is preventing this origin from accessing the resource.",
        solution: "Check your server's CORS configuration and ensure the 'Origin' matches the 'Access-Control-Allow-Origin' header.",
        framework: 'Generic',
        codeSnippet: `// Standard CORS Headers\nAccess-Control-Allow-Origin: *\nAccess-Control-Allow-Methods: GET, POST, OPTIONS\nAccess-Control-Allow-Headers: Content-Type`,
    };
};


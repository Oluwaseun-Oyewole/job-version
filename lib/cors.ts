import { NextRequest, NextResponse } from "next/server";

// CORS configuration
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://job-version.vercel.app",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
    "Origin",
  ],
  credentials: true,
};

export function corsHandler(req: NextRequest, response: NextResponse) {
  const origin = req.headers.get("origin");

  // Check if origin is allowed
  if (origin && corsOptions.origin.includes(origin)) {
    response.headers.set("Access-Control-Allow-Origin", origin);
  } else if (process.env.NODE_ENV === "development") {
    // Allow all origins in development
    response.headers.set("Access-Control-Allow-Origin", "*");
  }

  response.headers.set("Access-Control-Allow-Credentials", "true");
  response.headers.set(
    "Access-Control-Allow-Methods",
    corsOptions.methods.join(", ")
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    corsOptions.allowedHeaders.join(", ")
  );

  return response;
}

// Wrapper function for API routes
export function withCors(
  handler: (req: NextRequest) => Promise<NextResponse> | NextResponse
) {
  return async (req: NextRequest) => {
    // Handle preflight requests
    if (req.method === "OPTIONS") {
      const response = new NextResponse(null, { status: 200 });
      return corsHandler(req, response);
    }

    // Handle actual requests
    const response = await handler(req);
    return corsHandler(req, response);
  };
}

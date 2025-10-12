<<<<<<< HEAD
# MoviesDatabase API Documentation Review

## API Overview

The MoviesDatabase API is a comprehensive RESTful service that provides access to a vast collection of movie data, including titles, ratings, cast information, release dates, and more. It offers powerful filtering, sorting, and search capabilities, making it ideal for building movie discovery applications, recommendation systems, and entertainment platforms.

Key features of the API include:
- Extensive movie database with detailed information
- Advanced search and filtering options
- Access to cast, crew, and review information
- Movie posters and promotional images
- Genre classification and categorization
- Random movie discovery functionality
- Comprehensive rating and review data

## Version

The current version of the MoviesDatabase API is **v2**.

## Available Endpoints

The MoviesDatabase API provides the following main endpoints:

- **`GET /titles`** - Fetch movie titles with extensive filtering options such as year, genre, rating range, and sorting capabilities.

- **`GET /titles/{id}`** - Retrieve detailed information about a specific movie using its IMDb ID, including plot, cast, director, budget, and awards.

- **`GET /titles/search/title/{title}`** - Search for movies by title with support for partial matching and exact search options.

- **`GET /titles/random`** - Get random movie titles with optional filtering by genre and release year range.

- **`GET /genres`** - Retrieve a complete list of available movie genres in the database.

- **`GET /reviews/{id}`** - Access user reviews for a specific movie, including ratings, review text, and helpfulness scores.

- **`GET /actors`** - Access information about actors, with search capabilities by name.

- **`GET /ratings`** - Retrieve rating information for movies, including aggregated scores from various sources.

- **`GET /images`** - Get movie posters, backdrops, and promotional images for specific titles.

## Request and Response Format

### Request Format

API requests are made using standard HTTP GET methods with parameters passed as query strings. The base URL for all requests is:

```
https://api.moviesdatabase.com/v2
```

Example request structure:

```http
GET /titles?year=2020&genre=Action&limit=10&sort=rating&order=desc
Host: api.moviesdatabase.com
X-API-Key: your_api_key_here
```

### Response Format

All API responses follow a consistent JSON structure with a status indicator and data object:

**Success Response:**

```json
{
  "status": "success",
  "data": {
    "results": [
      {
        "id": "tt10048342",
        "title": "The Trial of the Chicago 7",
        "year": 2020,
        "genre": ["Drama", "History", "Thriller"],
        "rating": 7.8,
        "runtime": 129,
        "plot": "The story of 7 people on trial stemming from various charges...",
        "poster": "https://cdn.moviesdatabase.com/posters/tt10048342.jpg",
        "releaseDate": "2020-10-16"
      }
    ],
    "page": 1,
    "totalResults": 245,
    "totalPages": 25
  }
}
```

**Error Response:**

```json
{
  "status": "error",
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message"
  }
}
```

### Response Object Structure

For individual movie details (`GET /titles/{id}`), the response includes comprehensive information:

```json
{
  "status": "success",
  "data": {
    "id": "string",
    "title": "string",
    "year": "number",
    "genre": ["string"],
    "rating": "number",
    "runtime": "number",
    "plot": "string",
    "director": ["string"],
    "cast": [
      {
        "name": "string",
        "character": "string"
      }
    ],
    "poster": "string (URL)",
    "releaseDate": "string (ISO date)",
    "budget": "string",
    "boxOffice": "string",
    "awards": "string"
  }
}
```

## Authentication

The MoviesDatabase API requires authentication for all requests using an API key.

### Obtaining an API Key

1. Register for an account at https://moviesdatabase.com/register
2. Navigate to your account dashboard
3. Generate your API key from the API Keys section

### Authentication Method

Include your API key in the request header with every API call:

```http
X-API-Key: your_api_key_here
```

### Example Authenticated Request

```bash
curl -X GET "https://api.moviesdatabase.com/v2/titles?year=2020&genre=Action" \
  -H "X-API-Key: your_api_key_here"
```

Without proper authentication, requests will return a `401 Unauthorized` error response.

## Error Handling

The API uses standard HTTP status codes and returns structured error messages to help developers identify and resolve issues.

### Common HTTP Status Codes

- **200 OK** - Request was successful
- **400 Bad Request** - Invalid parameters or malformed request
- **401 Unauthorized** - Missing or invalid API key
- **403 Forbidden** - API key lacks required permissions
- **404 Not Found** - Requested resource doesn't exist
- **429 Too Many Requests** - Rate limit exceeded
- **500 Internal Server Error** - Server-side error occurred
- **503 Service Unavailable** - API is temporarily unavailable

### Error Response Structure

When an error occurs, the API returns a JSON object with error details:

```json
{
  "status": "error",
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "You have exceeded the rate limit of 100 requests per minute. Please try again later.",
    "retryAfter": 45
  }
}
```

### Common Error Codes

- **`INVALID_API_KEY`** - The provided API key is not valid
- **`MISSING_API_KEY`** - No API key was provided in the request
- **`RATE_LIMIT_EXCEEDED`** - Too many requests sent in a given timeframe
- **`INVALID_PARAMETER`** - One or more query parameters are invalid
- **`RESOURCE_NOT_FOUND`** - The requested movie or resource doesn't exist
- **`INVALID_ID_FORMAT`** - The provided IMDb ID format is incorrect
- **`DATABASE_ERROR`** - Internal database error occurred

### Handling Errors in Code

When working with the API, implement proper error handling:

**JavaScript Example:**

```javascript
async function getMovie(movieId) {
  try {
    const response = await fetch(`https://api.moviesdatabase.com/v2/titles/${movieId}`, {
      headers: {
        'X-API-Key': API_KEY
      }
    });
    
    const data = await response.json();
    
    if (data.status === 'error') {
      console.error(`Error ${data.error.code}: ${data.error.message}`);
      return null;
    }
    
    return data.data;
  } catch (error) {
    console.error('Network error:', error);
    return null;
  }
}
```

**TypeScript Interface for Error Response:**

```typescript
interface ApiErrorResponse {
  status: 'error';
  error: {
    code: string;
    message: string;
    retryAfter?: number;
  };
}
```

## Usage Limits and Best Practices

### Rate Limits

The API enforces rate limits to ensure fair usage and maintain performance for all users:

| Plan | Requests per Minute | Requests per Day |
|------|---------------------|------------------|
| Free | 100 | 10,000 |
| Basic | 500 | 50,000 |
| Pro | 2,000 | 200,000 |
| Enterprise | Custom | Custom |

### Rate Limit Headers

Every API response includes headers that inform you about your current rate limit status:

```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1634567890
```

- **X-RateLimit-Limit** - Total requests allowed in the current window
- **X-RateLimit-Remaining** - Requests remaining in the current window
- **X-RateLimit-Reset** - Unix timestamp when the rate limit resets

### Best Practices

1. **Cache Responses** - Store frequently accessed data locally to reduce API calls and improve application performance.

2. **Implement Exponential Backoff** - When you receive a `429 Too Many Requests` error, wait before retrying. Increase the wait time exponentially with each retry.

3. **Use Specific Filters** - Apply filters like genre, year, and rating to reduce response size and get only the data you need.

4. **Handle Pagination Properly** - For endpoints returning large datasets, use the `page` and `limit` parameters to retrieve data in manageable chunks.

5. **Secure Your API Key** - Never expose your API key in client-side code or public repositories. Use environment variables to store sensitive credentials.

6. **Validate User Input** - Always validate and sanitize user input before passing it to API requests to prevent errors and potential security issues.

7. **Monitor Rate Limits** - Check the rate limit headers in responses and implement logic to slow down requests when approaching the limit.

8. **Error Handling** - Always implement comprehensive error handling to gracefully manage API failures and provide meaningful feedback to users.

9. **Use Appropriate HTTP Methods** - Follow RESTful conventions and use the correct HTTP methods for your requests.

10. **Keep API Key Permissions Minimal** - If the API supports different permission levels, only grant the minimum permissions necessary for your application.

### Example Rate Limit Handling

```typescript
interface RateLimitInfo {
  limit: number;
  remaining: number;
  resetTime: number;
}

function extractRateLimitInfo(headers: Headers): RateLimitInfo {
  return {
    limit: parseInt(headers.get('X-RateLimit-Limit') || '0'),
    remaining: parseInt(headers.get('X-RateLimit-Remaining') || '0'),
    resetTime: parseInt(headers.get('X-RateLimit-Reset') || '0')
  };
}

async function makeApiRequest(url: string) {
  const response = await fetch(url, {
    headers: { 'X-API-Key': API_KEY }
  });
  
  const rateLimitInfo = extractRateLimitInfo(response.headers);
  
  if (rateLimitInfo.remaining < 10) {
    console.warn('Approaching rate limit. Consider slowing down requests.');
  }
  
  return response.json();
}
```
=======
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.
>>>>>>> bbbe69f (Initial commit: ALX movie app with Next.js)

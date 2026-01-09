namespace CSharpShop.Middleware;

/// <summary>
/// Custom authentication middleware for additional auth logic.
/// Use this for custom token validation, API key authentication, etc.
/// </summary>
public class AuthMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<AuthMiddleware> _logger;

    public AuthMiddleware(RequestDelegate next, ILogger<AuthMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        // Skip authentication for certain paths
        var path = context.Request.Path.Value?.ToLower() ?? "";
        var skipPaths = new[] { "/api/health", "/api/auth/login", "/api/auth/register", "/openapi" };
        
        if (skipPaths.Any(p => path.StartsWith(p)))
        {
            await _next(context);
            return;
        }

        // Example: API Key validation
        // if (context.Request.Headers.TryGetValue("X-Api-Key", out var apiKey))
        // {
        //     if (!await ValidateApiKey(apiKey!))
        //     {
        //         context.Response.StatusCode = StatusCodes.Status401Unauthorized;
        //         await context.Response.WriteAsJsonAsync(new { message = "Invalid API key" });
        //         return;
        //     }
        // }

        // Example: Extract user info from JWT and add to HttpContext.Items
        // var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
        // if (!string.IsNullOrEmpty(token))
        // {
        //     var userId = ValidateTokenAndGetUserId(token);
        //     if (userId != null)
        //     {
        //         context.Items["UserId"] = userId;
        //     }
        // }

        await _next(context);
    }

    // private async Task<bool> ValidateApiKey(string apiKey)
    // {
    //     // Implement your API key validation logic
    //     return true;
    // }
}

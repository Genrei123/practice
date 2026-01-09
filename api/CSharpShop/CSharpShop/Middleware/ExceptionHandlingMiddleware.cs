using System.Net;
using System.Text.Json;

namespace CSharpShop.Middleware;

/// <summary>
/// Global exception handling middleware.
/// Catches unhandled exceptions and returns a consistent error response.
/// </summary>
public class ExceptionHandlingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionHandlingMiddleware> _logger;

    public ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            await HandleExceptionAsync(context, ex);
        }
    }

    private async Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        _logger.LogError(exception, "An unhandled exception occurred: {Message}", exception.Message);

        var response = context.Response;
        response.ContentType = "application/json";

        var (statusCode, message) = exception switch
        {
            UnauthorizedAccessException => (HttpStatusCode.Unauthorized, "Unauthorized access"),
            KeyNotFoundException => (HttpStatusCode.NotFound, "Resource not found"),
            ArgumentException => (HttpStatusCode.BadRequest, exception.Message),
            InvalidOperationException => (HttpStatusCode.BadRequest, exception.Message),
            _ => (HttpStatusCode.InternalServerError, "An internal server error occurred")
        };

        response.StatusCode = (int)statusCode;

        var errorResponse = new ErrorResponse
        {
            Success = false,
            Message = message,
            StatusCode = (int)statusCode,
            Timestamp = DateTime.UtcNow
        };

        // Include exception details in development
        if (context.RequestServices.GetService<IWebHostEnvironment>()?.IsDevelopment() == true)
        {
            errorResponse.Details = exception.Message;
            errorResponse.StackTrace = exception.StackTrace;
        }

        var jsonOptions = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
        await response.WriteAsync(JsonSerializer.Serialize(errorResponse, jsonOptions));
    }
}

public class ErrorResponse
{
    public bool Success { get; set; }
    public string Message { get; set; } = string.Empty;
    public int StatusCode { get; set; }
    public DateTime Timestamp { get; set; }
    public string? Details { get; set; }
    public string? StackTrace { get; set; }
}

using System.Diagnostics;

namespace CSharpShop.Middleware;

/// <summary>
/// Middleware for logging HTTP requests and responses.
/// Tracks request duration and logs important information.
/// </summary>
public class RequestLoggingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<RequestLoggingMiddleware> _logger;

    public RequestLoggingMiddleware(RequestDelegate next, ILogger<RequestLoggingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var stopwatch = Stopwatch.StartNew();
        var requestId = Guid.NewGuid().ToString("N")[..8];

        // Log request
        _logger.LogInformation(
            "[{RequestId}] {Method} {Path} - Started",
            requestId,
            context.Request.Method,
            context.Request.Path);

        try
        {
            await _next(context);
        }
        finally
        {
            stopwatch.Stop();

            var statusCode = context.Response.StatusCode;
            var logLevel = statusCode >= 500 ? LogLevel.Error :
                          statusCode >= 400 ? LogLevel.Warning :
                          LogLevel.Information;

            _logger.Log(
                logLevel,
                "[{RequestId}] {Method} {Path} - {StatusCode} ({Duration}ms)",
                requestId,
                context.Request.Method,
                context.Request.Path,
                statusCode,
                stopwatch.ElapsedMilliseconds);
        }
    }
}

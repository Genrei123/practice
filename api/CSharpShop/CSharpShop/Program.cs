using CSharpShop.Database;
using CSharpShop.Middleware;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// ===========================================
// CONFIGURATION
// ===========================================
var configuration = builder.Configuration;

// ===========================================
// DATABASE CONFIGURATION (PostgreSQL - Neon)
// ===========================================
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(configuration.GetConnectionString("DefaultConnection")));

// ===========================================
// CORS CONFIGURATION
// ===========================================
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(
                "http://localhost:3000",      // Next.js dev server
                "https://localhost:3000",
                "http://localhost:5173",      // Vite dev server (if needed)
                "https://your-production-domain.com" // Production domain
            )
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });

    // Development: Allow all origins (be careful in production!)
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

// ===========================================
// SERVICES CONFIGURATION
// ===========================================
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApi();

// Add custom services here
// builder.Services.AddScoped<IAuthService, AuthService>();
// builder.Services.AddScoped<ICartService, CartService>();
// builder.Services.AddScoped<IProductService, ProductService>();

// ===========================================
// AUTHENTICATION (JWT - configure later)
// ===========================================
// builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
//     .AddJwtBearer(options => { ... });

var app = builder.Build();

// ===========================================
// MIDDLEWARE PIPELINE
// ===========================================

// Global exception handling
app.UseMiddleware<ExceptionHandlingMiddleware>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseCors("AllowAll"); // Allow all in development
}
else
{
    app.UseCors("AllowFrontend"); // Restrict in production
}

app.UseHttpsRedirection();

// Authentication & Authorization (uncomment when ready)
// app.UseAuthentication();
app.UseAuthorization();

// Request logging middleware
app.UseMiddleware<RequestLoggingMiddleware>();

// Map controllers
app.MapControllers();

// ===========================================
// API HEALTH CHECK ENDPOINT
// ===========================================
app.MapGet("/api/health", () => Results.Ok(new { status = "healthy", timestamp = DateTime.UtcNow }))
    .WithName("HealthCheck")
    .WithTags("Health");

// ===========================================
// DATABASE CONNECTION CHECK ENDPOINT
// ===========================================
app.MapGet("/api/health/db", async (AppDbContext db) =>
{
    try
    {
        // Try to connect and run a simple query
        var canConnect = await db.Database.CanConnectAsync();
        
        if (canConnect)
        {
            return Results.Ok(new
            {
                status = "connected",
                database = db.Database.GetDbConnection().Database,
                server = db.Database.GetDbConnection().DataSource,
                timestamp = DateTime.UtcNow
            });
        }
        
        return Results.Problem("Cannot connect to database", statusCode: 503);
    }
    catch (Exception ex)
    {
        return Results.Problem(
            detail: ex.Message,
            title: "Database connection failed",
            statusCode: 503
        );
    }
})
.WithName("DatabaseHealthCheck")
.WithTags("Health");


app.Run();

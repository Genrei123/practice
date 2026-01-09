using Microsoft.EntityFrameworkCore;

namespace CSharpShop.Database;

/// <summary>
/// Database initializer for seeding data and ensuring database is created.
/// Call this during application startup.
/// </summary>
public static class DatabaseInitializer
{
    public static async Task InitializeAsync(IServiceProvider serviceProvider)
    {
        using var scope = serviceProvider.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        var logger = scope.ServiceProvider.GetRequiredService<ILogger<AppDbContext>>();

        try
        {
            // Ensure database is created
            await context.Database.EnsureCreatedAsync();
            
            // Or use migrations
            // await context.Database.MigrateAsync();

            // Seed initial data
            await SeedDataAsync(context, logger);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "An error occurred while initializing the database");
            throw;
        }
    }

    private static async Task SeedDataAsync(AppDbContext context, ILogger logger)
    {
        // Check if data already exists
        // if (await context.Users.AnyAsync())
        // {
        //     logger.LogInformation("Database already seeded");
        //     return;
        // }

        logger.LogInformation("Seeding database...");

        // ===========================================
        // SEED CATEGORIES
        // ===========================================
        // var categories = new List<Category>
        // {
        //     new() { Id = Guid.NewGuid(), Name = "Pancit", Slug = "pancit" },
        //     new() { Id = Guid.NewGuid(), Name = "Bilao", Slug = "bilao" },
        //     new() { Id = Guid.NewGuid(), Name = "Add-ons", Slug = "add-ons" },
        // };
        // await context.Categories.AddRangeAsync(categories);

        // ===========================================
        // SEED PRODUCTS
        // ===========================================
        // var products = new List<Product>
        // {
        //     new() { Id = Guid.NewGuid(), Name = "Pancit Canton", Price = 250.00m, ... },
        //     new() { Id = Guid.NewGuid(), Name = "Pancit Bihon", Price = 250.00m, ... },
        // };
        // await context.Products.AddRangeAsync(products);

        // ===========================================
        // SEED ADMIN USER
        // ===========================================
        // var adminUser = new User
        // {
        //     Id = Guid.NewGuid(),
        //     Email = "admin@csharpshop.com",
        //     PasswordHash = BCrypt.Net.BCrypt.HashPassword("admin123"),
        //     FirstName = "Admin",
        //     LastName = "User",
        //     Role = "Admin"
        // };
        // await context.Users.AddAsync(adminUser);

        await context.SaveChangesAsync();
        logger.LogInformation("Database seeding completed");
    }
}

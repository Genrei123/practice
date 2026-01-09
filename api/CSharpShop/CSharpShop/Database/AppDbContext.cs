using Microsoft.EntityFrameworkCore;
using CSharpShop.Models;

namespace CSharpShop.Database;

/// <summary>
/// Main database context for the CSharpShop application.
/// Add your DbSets and entity configurations here.
/// </summary>
public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
        
    }

    // ===========================================
    // DB SETS - Add your entities here
    // ===========================================
    // public DbSet<User> Users => Set<User>();
    // public DbSet<Product> Products => Set<Product>();
    // public DbSet<Order> Orders => Set<Order>();
    // public DbSet<OrderItem> OrderItems => Set<OrderItem>();
    // public DbSet<Cart> Carts => Set<Cart>();
    // public DbSet<CartItem> CartItems => Set<CartItem>();
    // public DbSet<Category> Categories => Set<Category>();
    public DbSet<User> Users => Set<User>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Apply configurations from assembly
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);

        // ===========================================
        // ENTITY CONFIGURATIONS
        // ===========================================
        
        // Example: User configuration
        // modelBuilder.Entity<User>(entity =>
        // {
        //     entity.HasKey(e => e.Id);
        //     entity.Property(e => e.Email).IsRequired().HasMaxLength(255);
        //     entity.HasIndex(e => e.Email).IsUnique();
        // });

        // Example: Product configuration
        // modelBuilder.Entity<Product>(entity =>
        // {
        //     entity.HasKey(e => e.Id);
        //     entity.Property(e => e.Name).IsRequired().HasMaxLength(200);
        //     entity.Property(e => e.Price).HasPrecision(18, 2);
        //     entity.HasOne(e => e.Category)
        //           .WithMany(c => c.Products)
        //           .HasForeignKey(e => e.CategoryId);
        // });

        // Example: Soft delete global query filter
        // modelBuilder.Entity<User>().HasQueryFilter(u => !u.IsDeleted);
    }

    // ===========================================
    // OVERRIDE SAVE CHANGES FOR AUDITING
    // ===========================================
    public override int SaveChanges()
    {
        UpdateTimestamps();
        return base.SaveChanges();
    }

    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        UpdateTimestamps();
        return await base.SaveChangesAsync(cancellationToken);
    }

    private void UpdateTimestamps()
    {
        var entries = ChangeTracker.Entries()
            .Where(e => e.Entity is BaseEntity && 
                       (e.State == EntityState.Added || e.State == EntityState.Modified));

        foreach (var entry in entries)
        {
            var entity = (BaseEntity)entry.Entity;
            entity.UpdatedAt = DateTime.UtcNow;

            if (entry.State == EntityState.Added)
            {
                entity.CreatedAt = DateTime.UtcNow;
            }
        }
    }
}

/// <summary>
/// Base entity with common audit fields.
/// Inherit from this class for automatic timestamp tracking.
/// </summary>
public abstract class BaseEntity
{
    public Guid Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}

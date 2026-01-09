namespace CSharpShop.Database.Configurations;

// ===========================================
// ENTITY CONFIGURATIONS
// ===========================================
// Use this folder for IEntityTypeConfiguration<T> implementations
// This keeps entity configurations separate from AppDbContext

// Example:
// using Microsoft.EntityFrameworkCore;
// using Microsoft.EntityFrameworkCore.Metadata.Builders;
// using CSharpShop.Models;
// 
// public class UserConfiguration : IEntityTypeConfiguration<User>
// {
//     public void Configure(EntityTypeBuilder<User> builder)
//     {
//         builder.ToTable("Users");
//         builder.HasKey(x => x.Id);
//         
//         builder.Property(x => x.Email)
//             .IsRequired()
//             .HasMaxLength(255);
//         
//         builder.HasIndex(x => x.Email)
//             .IsUnique();
//         
//         builder.Property(x => x.FirstName)
//             .IsRequired()
//             .HasMaxLength(100);
//         
//         builder.Property(x => x.LastName)
//             .IsRequired()
//             .HasMaxLength(100);
//     }
// }

// public class ProductConfiguration : IEntityTypeConfiguration<Product>
// {
//     public void Configure(EntityTypeBuilder<Product> builder)
//     {
//         builder.ToTable("Products");
//         builder.HasKey(x => x.Id);
//         
//         builder.Property(x => x.Name)
//             .IsRequired()
//             .HasMaxLength(200);
//         
//         builder.Property(x => x.Price)
//             .HasPrecision(18, 2);
//         
//         builder.Property(x => x.Description)
//             .HasMaxLength(2000);
//         
//         builder.HasOne(x => x.Category)
//             .WithMany(x => x.Products)
//             .HasForeignKey(x => x.CategoryId)
//             .OnDelete(DeleteBehavior.Restrict);
//     }
// }

// public class OrderConfiguration : IEntityTypeConfiguration<Order>
// {
//     public void Configure(EntityTypeBuilder<Order> builder)
//     {
//         builder.ToTable("Orders");
//         builder.HasKey(x => x.Id);
//         
//         builder.Property(x => x.TotalAmount)
//             .HasPrecision(18, 2);
//         
//         builder.HasOne(x => x.User)
//             .WithMany(x => x.Orders)
//             .HasForeignKey(x => x.UserId)
//             .OnDelete(DeleteBehavior.Restrict);
//         
//         builder.HasMany(x => x.Items)
//             .WithOne(x => x.Order)
//             .HasForeignKey(x => x.OrderId);
//     }
// }

using System.ComponentModel.DataAnnotations;

namespace CSharpShop.Models.DTOs;

// ===========================================
// AUTH DTOs
// ===========================================
public class LoginRequest
{
    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required]
    public string Password { get; set; } = string.Empty;
}

public class RegisterRequest
{
    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required]
    [MinLength(6)]
    public string Password { get; set; } = string.Empty;

    [Required]
    public string FirstName { get; set; } = string.Empty;

    [Required]
    public string LastName { get; set; } = string.Empty;

    public string? Phone { get; set; }
}

public class AuthResponse
{
    public string Token { get; set; } = string.Empty;
    public string RefreshToken { get; set; } = string.Empty;
    public DateTime ExpiresAt { get; set; }
    public UserDto User { get; set; } = new();
}

public class UserDto
{
    public Guid Id { get; set; }
    public string Email { get; set; } = string.Empty;
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string FullName => $"{FirstName} {LastName}";
}

// ===========================================
// CART DTOs
// ===========================================
public class AddToCartRequest
{
    [Required]
    public string ProductId { get; set; } = string.Empty;
    
    [Range(1, 100)]
    public int Quantity { get; set; } = 1;
    
    public List<string>? AddOnIds { get; set; }
    public string? SeasoningId { get; set; }
    public string? SpecialInstructions { get; set; }
}

public class UpdateCartItemRequest
{
    [Range(1, 100)]
    public int Quantity { get; set; }
}

public class CartDto
{
    public Guid Id { get; set; }
    public List<CartItemDto> Items { get; set; } = new();
    public decimal Subtotal { get; set; }
    public decimal Tax { get; set; }
    public decimal Total { get; set; }
    public int ItemCount { get; set; }
}

public class CartItemDto
{
    public Guid Id { get; set; }
    public string ProductId { get; set; } = string.Empty;
    public string ProductName { get; set; } = string.Empty;
    public string? ProductImage { get; set; }
    public decimal UnitPrice { get; set; }
    public int Quantity { get; set; }
    public decimal TotalPrice { get; set; }
    public List<AddOnDto>? AddOns { get; set; }
    public string? SeasoningName { get; set; }
}

public class AddOnDto
{
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public decimal Price { get; set; }
}

// ===========================================
// ORDER DTOs
// ===========================================
public class CreateOrderRequest
{
    [Required]
    public string DeliveryAddress { get; set; } = string.Empty;
    
    [Required]
    public string ContactNumber { get; set; } = string.Empty;
    
    public string? PromoCode { get; set; }
    public string? Notes { get; set; }
    public string PaymentMethod { get; set; } = "COD"; // COD, GCash, Card
}

public class OrderDto
{
    public Guid Id { get; set; }
    public string OrderNumber { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public List<OrderItemDto> Items { get; set; } = new();
    public decimal Subtotal { get; set; }
    public decimal Discount { get; set; }
    public decimal DeliveryFee { get; set; }
    public decimal Total { get; set; }
    public string DeliveryAddress { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public DateTime? DeliveredAt { get; set; }
}

public class OrderItemDto
{
    public string ProductName { get; set; } = string.Empty;
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal TotalPrice { get; set; }
}

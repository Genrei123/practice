using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using CSharpShop.Models;
using CSharpShop.Models.DTOs;
using Microsoft.EntityFrameworkCore;
using CSharpShop.Database;

namespace CSharpShop.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ILogger<AuthController> _logger;
        private readonly AppDbContext _context;

        public AuthController(ILogger<AuthController> logger, AppDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            User? user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email && u.PasswordHash == request.Password);
            if (user == null)
            {
                return Unauthorized(new { message = "Invalid email or password" });
            }
            return Ok(new
            {
                message = "Login successful",
                user = new
                {
                    id = user.Id,
                    email = user.Email,
                    username = user.Username,
                    firstName = user.firstName,
                    lastName = user.lastName,
                    phoneNumber = user.phoneNumber
                }
            });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            // Check if user already exists
            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
            if (existingUser != null)
            {
                return BadRequest(new { message = "User with this email already exists" });
            }

            User newUser = new User
            {
                Username = request.Email,
                Email = request.Email,
                firstName = request.FirstName,
                lastName = request.LastName,
                phoneNumber = request.Phone ?? string.Empty,
                PasswordHash = request.Password // In production, hash the password!
            };

            await _context.Users.AddAsync(newUser);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Registration successful",
                user = new
                {
                    id = newUser.Id,
                    email = newUser.Email,
                    username = newUser.Username,
                    firstName = newUser.firstName,
                    lastName = newUser.lastName,
                    phoneNumber = newUser.phoneNumber
                }
            });
        }
    }
}
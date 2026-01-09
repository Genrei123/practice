namespace CSharpShop.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string phoneNumber { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
    }
}

using FirstAPI.Models;
using FirstAPI.Models.DTOs.DoctorSpecialities;
using Microsoft.EntityFrameworkCore;

namespace FirstAPI.Contexts
{
    public class UserContext : DbContext
    {

        public UserContext(DbContextOptions options) : base(options)
        {

        }
        
        public DbSet<User> Users { get; set; }
        
        // protected override void OnModelCreating(ModelBuilder modelBuilder)
        // {
        //        }

    }
}
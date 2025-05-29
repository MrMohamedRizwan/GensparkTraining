using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FirstAPI.Models.Bank;
using Microsoft.EntityFrameworkCore;

namespace BankAppApi.context
{
    public class BankContext : DbContext
    {
        public BankContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Transaction>()
                            .HasOne(t => t.Account)
                            .WithMany(a => a.Transactions)
                            .HasForeignKey(t => t.AccountId);
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MyWebApi.Models;

namespace MyWebApi.Context
{
    public class VideoContext : DbContext
    {
        public VideoContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<Video> Videos { get; set; }
        
    }
}
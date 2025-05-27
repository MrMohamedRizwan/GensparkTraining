using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackendApplication.Models;
using Microsoft.EntityFrameworkCore;

namespace BackendApplication.Contexts
{
    public class TwitterContext : DbContext
    {
        public TwitterContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<User> users{ get; set; }
        public DbSet<FollowersFollowing> followersfollowings { get; set; }
        public DbSet<Hashtag> HashTags { get; set; }
        public DbSet<Like> like { get; set; }
        public DbSet<Tweet> tweet { get; set; }
        public DbSet<TweetHashtag> tweetHashtags { get; set; }
        protected override void OnModelCreating (ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Like>()
                .HasKey(l => new { l.UserId, l.TweetId });

            modelBuilder.Entity<TweetHashtag>()
                .HasKey(th => new { th.TweetId, th.HashTagID });

            modelBuilder.Entity<FollowersFollowing>()
                .HasKey(ff => new { ff.FollowerId, ff.FollowingId });

            modelBuilder.Entity<FollowersFollowing>()
                .HasOne(ff => ff.Follower)
                .WithMany(u => u.Following)
                .HasForeignKey(ff => ff.FollowerId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<FollowersFollowing>()
                .HasOne(ff => ff.Following)
                .WithMany(u => u.Followers)
                .HasForeignKey(ff => ff.FollowingId)
                .OnDelete(DeleteBehavior.Restrict);
        }
        
    }
}
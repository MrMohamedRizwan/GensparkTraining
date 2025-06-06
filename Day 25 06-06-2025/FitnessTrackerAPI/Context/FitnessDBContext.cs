using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using FitnessTrackerAPI.Models;
using FitnessTrackerAPI.Models.Diet;
using FitnessTrackerAPI.Models.WorkoutModel;
using Microsoft.EntityFrameworkCore;

namespace FitnessTrackerAPI.Context
{
    public class FitnessDBContext : DbContext
    {
        public FitnessDBContext(DbContextOptions options) : base(options)
        {


        }

        public DbSet<User> Users { get; set; }
        public DbSet<Progress> Progress { get; set; }
        public DbSet<PlanAssignment> PlanAssignment { get; set; }
        public DbSet<Coach> Coach { get; set; }
        public DbSet<Client> Client { get; set; }
        public DbSet<Workout> Workout { get; set; }
        public DbSet<WorkoutExercise> WorkoutExercise { get; set; }
        public DbSet<WorkoutPlan> WorkoutPlan { get; set; }
        public DbSet<DietMeal> DietMeal { get; set; }
        public DbSet<DietPlan> DietPlans { get; set; }



        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // ----- User -----
            modelBuilder.Entity<User>()
                .HasKey(u => u.Email); // Assuming Email is unique and used as PK

            modelBuilder.Entity<User>()
                .HasOne(u => u.Client)
                .WithOne(c => c.User)
                .HasForeignKey<Client>(c => c.Email)
                .HasPrincipalKey<User>(u => u.Email);

            modelBuilder.Entity<User>()
                .HasOne(u => u.Coach)
                .WithOne(c => c.User)
                .HasForeignKey<Coach>(c => c.Email)
                .HasPrincipalKey<User>(u => u.Email);

            // ----- Client -----
            modelBuilder.Entity<Client>()
                .HasKey(c => c.Id);

            modelBuilder.Entity<Client>()
                .HasMany(c => c.Workouts)
                .WithOne(w => w.Client)
                .HasForeignKey(w => w.ClientId);

            modelBuilder.Entity<Client>()
                .HasMany(c => c.Progress)
                .WithOne(p => p.Client)
                .HasForeignKey(p => p.ClientId);

            modelBuilder.Entity<Client>()
                .HasMany(c => c.PlanAssignments)
                .WithOne(pa => pa.Client)
                .HasForeignKey(pa => pa.ClientId);

            // ----- Coach -----
            modelBuilder.Entity<Coach>()
                .HasKey(c => c.Id);

            modelBuilder.Entity<Coach>()
                .HasMany(c => c.WorkoutPlans)
                .WithOne(wp => wp.Coach)
                .HasForeignKey(wp => wp.CoachId);

            modelBuilder.Entity<Coach>()
                .HasMany(c => c.DietPlans)
                .WithOne(dp => dp.Coach)
                .HasForeignKey(dp => dp.CoachId);

            // ----- WorkoutPlan -----
            modelBuilder.Entity<WorkoutPlan>()
                .HasKey(wp => wp.Id);

            modelBuilder.Entity<WorkoutPlan>()
                .HasMany(wp => wp.Exercises)
                .WithOne(e => e.WorkoutPlan)
                .HasForeignKey(e => e.WorkoutPlanId);

            modelBuilder.Entity<WorkoutPlan>()
                .HasMany(wp => wp.Assignments)
                .WithOne(pa => pa.WorkoutPlan)
                .HasForeignKey(pa => pa.WorkoutPlanId);

            // ----- WorkoutExercise -----
            modelBuilder.Entity<WorkoutExercise>()
                .HasKey(we => we.Id);

            // ----- DietPlan -----
            modelBuilder.Entity<DietPlan>()
                .HasKey(dp => dp.Id);

            modelBuilder.Entity<DietPlan>()
                .HasMany(dp => dp.Meals)
                .WithOne(m => m.DietPlan)
                .HasForeignKey(m => m.DietPlanId);

            // ----- DietMeal -----
            modelBuilder.Entity<DietMeal>()
                .HasKey(dm => dm.Id);

            // ----- Progress -----
            modelBuilder.Entity<Progress>()
                .HasKey(p => p.Id);

            // ----- PlanAssignment -----
            modelBuilder.Entity<PlanAssignment>()
                .HasKey(pa => pa.Id);

            modelBuilder.Entity<PlanAssignment>()
                .HasOne(pa => pa.DietPlan)
                .WithMany()
                .HasForeignKey(pa => pa.DietPlanId);

            modelBuilder.Entity<PlanAssignment>()
                .HasOne(pa => pa.WorkoutPlan)
                .WithMany()
                .HasForeignKey(pa => pa.WorkoutPlanId);
        }
        
    }
}
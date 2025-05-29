using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FirstAPI.Models;
using FirstAPI.Models.Bank;
using FirstAPI.Models.DTOs;
using Microsoft.EntityFrameworkCore;

namespace FirstAPI.Contexts
{
    public class ClinicContext : DbContext
    {
       public ClinicContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<Account> Accounts { get; set; }
    public DbSet<Transaction> Transactions { get; set; }
        public DbSet<Patient> patients { get; set; }
        public DbSet<Doctor> doctors { get; set; }
        public DbSet<Appointment> appointmnets { get; set; }
        public DbSet<Specality> specialities { get; set; }
        public DbSet<DoctorSpecality> doctorspecialities { get; set; }
        
        public DbSet<User> users { get; set; }
        public DbSet<DoctorsBySpecialityResponseDto> DoctorBySpecalityResponseDTOs;

        public async Task<List<DoctorsBySpecialityResponseDto>> GetDoctorsbySpeciality(string speciality)
        {
            return await this.Set<DoctorsBySpecialityResponseDto>()
                        .FromSqlInterpolated($"select * from proc_GetDoctorsBySpeciality({speciality})")
                        .ToListAsync();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasKey(u => u.UserId);

            modelBuilder.Entity<User>().HasOne(u => u.UserFollower)
                                        .WithMany(us => us.Followers)
                                        .HasForeignKey(u => u.FollwerId)
                                        .HasConstraintName("FK_Followers")
                                        .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Appointment>().HasKey(app => app.AppointmnetNumber).HasName("PK_AppointmentNumber");

            modelBuilder.Entity<Appointment>().HasOne(app => app.Patient)
                                              .WithMany(p => p.Appointmnets)
                                              .HasForeignKey(app => app.PatientId)
                                              .HasConstraintName("FK_Appoinment_Patient")
                                              .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Appointment>().HasOne(app => app.Doctor)
                                              .WithMany(d => d.Appointmnets)
                                              .HasForeignKey(app => app.DoctorId)
                                              .HasConstraintName("FK_Appoinment_Doctor")
                                              .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<DoctorSpecality>().HasKey(ds => ds.SerialNumber);

            modelBuilder.Entity<DoctorSpecality>().HasOne(ds => ds.Doctor)
                                                   .WithMany(d => d.DoctorSpecialities)
                                                   .HasForeignKey(ds => ds.DoctorId)
                                                   .HasConstraintName("FK_Speciality_Doctor")
                                                   .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<DoctorSpecality>().HasOne(ds => ds.Speciality)
                                                   .WithMany(s => s.DoctorSpecialities)
                                                   .HasForeignKey(ds => ds.SpecialityId)
                                                   .HasConstraintName("FK_Speciality_Spec")
                                                   .OnDelete(DeleteBehavior.Restrict);
                                                        

                
                modelBuilder.Entity<Account>()
                    .HasKey(a => a.Id);

                modelBuilder.Entity<Account>()
                    .Property(a => a.HolderName)
                    .IsRequired()
                    .HasMaxLength(100);

                modelBuilder.Entity<Account>()
                    .Property(a => a.Balance);

                // Transaction Table with Foreign Key
                modelBuilder.Entity<Transaction>()
                    .HasKey(t => t.Id);

                modelBuilder.Entity<Transaction>()
                    .Property(t => t.Amount);

                modelBuilder.Entity<Transaction>()
                    .Property(t => t.Type)
                    .IsRequired()
                    .HasMaxLength(20);

                    modelBuilder.Entity<Transaction>()
                        .HasOne(t => t.Account)
                        .WithMany(a => a.Transactions)
                        .HasForeignKey(t => t.AccountId);

        }

    }
}
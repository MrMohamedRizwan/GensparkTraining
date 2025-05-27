using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FirstAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace FirstAPI.Contexts
{
    public class ClinicContext : DbContext
    {
        public ClinicContext(DbContextOptions options) :base(options)
        {
            
        }
        public DbSet<Patient> patients { get; set; }
        public DbSet<Doctor> Doctors { get; set; }
        public DbSet<Appointment> Appointmnets { get; set; }
        public DbSet<Specality> Specialities { get; set; }
        public DbSet<DoctorSpecality> DoctorSpecialities { get; set; }
    }
}
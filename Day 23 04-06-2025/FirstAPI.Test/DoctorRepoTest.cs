using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FirstAPI.Contexts;
using FirstAPI.Models;
using FirstAPI.Repositories;
using FirstAPI.Interfaces;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;

namespace FirstAPI.Test
{
    public class DoctorRepoTest
    {
        private ClinicContext _context;

        [SetUp]
        public void Setup()
        {
            var options = new DbContextOptionsBuilder<ClinicContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            _context = new ClinicContext(options);
        }

        [TearDown]
        public void TearDown()
        {
            _context.Dispose();
        }

        private Doctor CreateTestDoctor(string email = "test@gmail.com")
        {
            return new Doctor
            {
                Name = "Doctor",
                YearsOfExperience = 5,
                Email = email
            };
        }

        [Test]
        public async Task AddDoctorTest()
        {
            var email = "test@gmail.com";
            var password = Encoding.UTF8.GetBytes("test123");
            var key = Guid.NewGuid().ToByteArray();

            var user = new User
            {
                Username = email,
                Password = password,
                HashKey = key,
                Role = "Doctor"
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            var doctor = CreateTestDoctor(email);
            IRepository<int, Doctor> _doctorRepository = new DoctorRepository(_context);

            var result = await _doctorRepository.Add(doctor);

            Assert.That(result, Is.Not.Null);
            Assert.That(result.Id, Is.EqualTo(1));
            Assert.That(result.Email, Is.EqualTo("test@gmail.com"));
        }

        [Test]
        public async Task GetDoctorPassTest()
        {
            var email = "test@gmail.com";
            var password = Encoding.UTF8.GetBytes("test123");
            var key = Guid.NewGuid().ToByteArray();

            var user = new User
            {
                Username = email,
                Password = password,
                HashKey = key,
                Role = "Doctor"
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            var doctor = CreateTestDoctor(email);
            IRepository<int, Doctor> _doctorRepository = new DoctorRepository(_context);
            var addedDoctor = await _doctorRepository.Add(doctor);

            var result = await _doctorRepository.Get(addedDoctor.Id);

            Assert.That(result.Id, Is.EqualTo(addedDoctor.Id));
            Assert.That(result.Email, Is.EqualTo("test@gmail.com"));
        }

        [Test]
        public async Task GetAllDoctorsTest()
        {
            IRepository<int, Doctor> _doctorRepository = new DoctorRepository(_context);

            var doctors = new List<Doctor>
            {
                CreateTestDoctor("1@gmail.com"),
                CreateTestDoctor("2@gmail.com"),
                CreateTestDoctor("3@gmail.com"),
            };

            foreach (var doc in doctors)
            {
                await _doctorRepository.Add(doc);
            }

            var result = await _doctorRepository.GetAll();
            var results = result.ToList();

            Assert.That(results.Count, Is.EqualTo(doctors.Count));
        }

        [Test]
        public async Task UpdateDoctorTest()
        {
            IRepository<int, Doctor> _doctorRepository = new DoctorRepository(_context);
            var doctor = await _doctorRepository.Add(CreateTestDoctor());

            doctor.Name = "Updated";
            doctor.YearsOfExperience = 10;

            var updatedDoctor = await _doctorRepository.Update(doctor.Id, doctor);

            Assert.That(updatedDoctor, Is.Not.Null);
            Assert.That(updatedDoctor.Id, Is.EqualTo(doctor.Id));
            Assert.That(updatedDoctor.Name, Is.EqualTo("Updated"));
            Assert.That(updatedDoctor.YearsOfExperience, Is.EqualTo(10));
        }

        [Test]
        public async Task DeleteDoctorTest()
        {
            IRepository<int, Doctor> _doctorRepository = new DoctorRepository(_context);
            var doctor = await _doctorRepository.Add(CreateTestDoctor());

            var deleteResult = await _doctorRepository.Delete(doctor.Id);

            Assert.That(deleteResult.Id, Is.EqualTo(doctor.Id));

            var ex = Assert.ThrowsAsync<Exception>(async () => await _doctorRepository.Get(doctor.Id));
            Assert.That(ex.Message, Is.EqualTo("No Doctor with the given ID"));
        }
    }
}

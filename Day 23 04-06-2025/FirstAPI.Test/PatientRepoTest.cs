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
    public class PatientRepoTest
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

        private Patient CreateTestPatient(string email = "testpatient@gmail.com")
        {
            return new Patient
            {
                Name = "Patient",
                Age = 30,
                Email = email,
                Phone = "1234567890"
            };
        }

        [Test]
        public async Task AddPatientTest()
        {
            var email = "testpatient@gmail.com";
            var password = Encoding.UTF8.GetBytes("patient123");
            var key = Guid.NewGuid().ToByteArray();

            var user = new User
            {
                Username = email,
                Password = password,
                HashKey = key,
                Role = "Patient"
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            var patient = CreateTestPatient(email);
            IRepository<int, Patient> _PatinetRepository = new PatinetRepository(_context);

            var result = await _PatinetRepository.Add(patient);

            Assert.That(result, Is.Not.Null);
            Assert.That(result.Id, Is.EqualTo(1));
            Assert.That(result.Email, Is.EqualTo("testpatient@gmail.com"));
        }

        [Test]
        public async Task GetPatientPassTest()
        {
            var email = "testpatient@gmail.com";
            var password = Encoding.UTF8.GetBytes("patient123");
            var key = Guid.NewGuid().ToByteArray();

            var user = new User
            {
                Username = email,
                Password = password,
                HashKey = key,
                Role = "Patient"
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            var patient = CreateTestPatient(email);
            IRepository<int, Patient> _PatinetRepository = new PatinetRepository(_context);
            var addedPatient = await _PatinetRepository.Add(patient);

            var result = await _PatinetRepository.Get(addedPatient.Id);

            Assert.That(result.Id, Is.EqualTo(addedPatient.Id));
            Assert.That(result.Email, Is.EqualTo("testpatient@gmail.com"));
        }

        [Test]
        public async Task GetAllPatientsTest()
        {
            IRepository<int, Patient> _PatinetRepository = new PatinetRepository(_context);

            var patients = new List<Patient>
            {
                CreateTestPatient("p1@gmail.com"),
                CreateTestPatient("p2@gmail.com"),
                CreateTestPatient("p3@gmail.com"),
            };

            foreach (var p in patients)
            {
                await _PatinetRepository.Add(p);
            }

            var result = await _PatinetRepository.GetAll();
            var results = result.ToList();

            Assert.That(results.Count, Is.EqualTo(patients.Count));
        }

        [Test]
        public async Task UpdatePatientTest()
        {
            IRepository<int, Patient> _PatinetRepository = new PatinetRepository(_context);
            var patient = await _PatinetRepository.Add(CreateTestPatient());

            patient.Name = "UpdatedPatient";
            patient.Age = 45;

            var updatedPatient = await _PatinetRepository.Update(patient.Id, patient);

            Assert.That(updatedPatient, Is.Not.Null);
            Assert.That(updatedPatient.Id, Is.EqualTo(patient.Id));
            Assert.That(updatedPatient.Name, Is.EqualTo("UpdatedPatient"));
            Assert.That(updatedPatient.Age, Is.EqualTo(45));
        }

        [Test]
        public async Task DeletePatientTest()
        {
            IRepository<int, Patient> _PatinetRepository = new PatinetRepository(_context);
            var patient = await _PatinetRepository.Add(CreateTestPatient());

            var deleteResult = await _PatinetRepository.Delete(patient.Id);

            Assert.That(deleteResult.Id, Is.EqualTo(patient.Id));

            var ex = Assert.ThrowsAsync<Exception>(async () => await _PatinetRepository.Get(patient.Id));
            Assert.That(ex.Message, Is.EqualTo("No Patient with the given ID"));
        }
    }
}

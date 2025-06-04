using FirstAPI.Contexts;
using FirstAPI.Models;
using FirstAPI.Repositories;
using FirstAPI.Interfaces;
using FirstAPI.Services;
using FirstAPI.Models.DTOs;
using FirstAPI.Models.DTOs.DoctorSpecialities;
using FirstAPI.Misc;
using Microsoft.EntityFrameworkCore;
using Moq;
using AutoMapper;

namespace FirstAPI.Test;

public class DoctorServiceTest
{
    private ClinicContext _context;
    [SetUp]
    public void Setup()
    {
        var options = new DbContextOptionsBuilder<ClinicContext>()
                            .UseInMemoryDatabase("TestDb")
                            .Options;
        _context = new ClinicContext(options);
    }
    [TestCase("General")]
    public async Task TestGetDoctorBySpeciality(string speciality)
    {
        Mock<DoctorRepository> doctorRepositoryMock = new Mock<DoctorRepository>(_context);
        Mock<SpecialityRepository> specialityRepositoryMock = new(_context);
        Mock<DoctorSpecialityRepository> doctorSpecialityRepositoryMock = new(_context);
        Mock<UserRepository> userRepositoryMock = new(_context);
        Mock<AppointmnetRepository> appointmnetRepositoryMock = new(_context);
        Mock<OtherFuncinalitiesImplementation> otherContextFunctionitiesMock = new(_context);
        Mock<EncryptionService> encryptionServiceMock = new();
        Mock<IMapper> mapperMock = new();

        otherContextFunctionitiesMock.Setup(ocf => ocf.GetDoctorsBySpeciality(It.IsAny<string>()))
                                    .ReturnsAsync((string specilaity)=>new List<DoctorsBySpecialityResponseDto>{
                                   new DoctorsBySpecialityResponseDto
                                        {
                                            Dname = "test",
                                            Yoe = 2,
                                            Id=1
                                        }
                            });
        IDoctorService doctorService = new DoctorService(doctorRepositoryMock.Object,
                                                        specialityRepositoryMock.Object,
                                                        doctorSpecialityRepositoryMock.Object,
                                                        userRepositoryMock.Object,
                                                        appointmnetRepositoryMock.Object,
                                                        otherContextFunctionitiesMock.Object,
                                                        encryptionServiceMock.Object,
                                                        mapperMock.Object
                                                        );


        //Assert.That(doctorService, Is.Not.Null);
        //Action
        var result = await doctorService.GetDoctorsBySpeciality(speciality);
        //Assert
        // Assert.That(result.Count(), Is.EqualTo(1));
    }
    [Test]
    public async Task TestGetDoctorBySpeciality_ShouldReturnDoctorsList_WhenSpecialityExists()
    {
        // Arrange
        string speciality = "Cardiology";

        var _context = new Mock<ClinicContext>(); 

        var doctorRepositoryMock = new Mock<DoctorRepository>(_context.Object);
        var specialityRepositoryMock = new Mock<SpecialityRepository>(_context.Object);
        var doctorSpecialityRepositoryMock = new Mock<DoctorSpecialityRepository>(_context.Object);
        var userRepositoryMock = new Mock<UserRepository>(_context.Object);
        var appointmnetRepositoryMock = new Mock<AppointmnetRepository>(_context.Object);
        var otherContextFunctionitiesMock = new Mock<OtherFuncinalitiesImplementation>(_context.Object);
        var encryptionServiceMock = new Mock<EncryptionService>();
        var mapperMock = new Mock<IMapper>();

        otherContextFunctionitiesMock.Setup(ocf => ocf.GetDoctorsBySpeciality(It.IsAny<string>()))
            .ReturnsAsync((string spec) => new List<DoctorsBySpecialityResponseDto>
            {
            new DoctorsBySpecialityResponseDto
            {
                Dname = "Dr. Test",
                Yoe = 5,
                Id = 101
            }
            });

        var doctorService = new DoctorService(
            doctorRepositoryMock.Object,
            specialityRepositoryMock.Object,
            doctorSpecialityRepositoryMock.Object,
            userRepositoryMock.Object,
            appointmnetRepositoryMock.Object,
            otherContextFunctionitiesMock.Object,
            encryptionServiceMock.Object,
            mapperMock.Object
        );

        // Act
        var result = await doctorService.GetDoctorsBySpeciality(speciality);

        // Assert
        Assert.That(result, Is.Not.Null);
        Assert.That(result.Count(), Is.EqualTo(1));
        Assert.That(result.First().Name, Is.EqualTo("Dr. Test"));
        Assert.That(result.First().YearsOfExperience, Is.EqualTo(5));
        Assert.That(result.First().Id, Is.EqualTo(101));
    }

    [TearDown]
    public void TearDown() 
    {
        _context.Dispose();
    }


}
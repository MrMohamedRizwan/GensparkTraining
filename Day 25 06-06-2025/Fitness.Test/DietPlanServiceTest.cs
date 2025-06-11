// using NUnit.Framework;
// using Moq;
// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Security.Claims;
// using System.Threading.Tasks;
// using AutoMapper;
// using FitnessTrackerAPI.Services;
// using FitnessTrackerAPI.Interfaces;
// using FitnessTrackerAPI.Models;
// using FitnessTrackerAPI.Models.Diet;
// using FitnessTrackerAPI.Models.DTOs;
// using FitnessTrackerAPI.Models.WorkoutModel;
// using FitnessTrackerAPI.Context;
// using Microsoft.EntityFrameworkCore;

// namespace FitnessTrackerAPI.Tests.Services
// {
//     [TestFixture]
//     public class DietPlanServiceTests
//     {
//         private Mock<IMapper> _mapperMock;
//         private Mock<IRepository<string, User>> _userRepositoryMock;
//         private Mock<IEncryptionService> _encryptionServiceMock;
//         private Mock<IRepository<Guid, Coach>> _coachRepositoryMock;
//         private Mock<IRepository<Guid, DietMeal>> _dietMealRepositoryMock;
//         private Mock<IRepository<Guid, DietPlan>> _dietPlanRepositoryMock;
//         private Mock<IRepository<Guid, WorkoutPlan>> _workoutPlanRepositoryMock;
//         private Mock<IRepository<Guid, WorkoutExercise>> _workoutExerciseRepositoryMock;
//         private Mock<IRepository<Guid, PlanAssignment>> _planAssignmentRepositoryMock;
//         private Mock<IRepository<Guid, Client>> _clientRepositoryMock;
//         // private FitnessDBContext _context;
//         private DietPlanService _dietPlanService;

//         [SetUp]
//         public void Setup()
//         {
//             _mapperMock = new Mock<IMapper>();
//             _userRepositoryMock = new Mock<IRepository<string, User>>();
//             _encryptionServiceMock = new Mock<IEncryptionService>();
//             _coachRepositoryMock = new Mock<IRepository<Guid, Coach>>();
//             _dietMealRepositoryMock = new Mock<IRepository<Guid, DietMeal>>();
//             _dietPlanRepositoryMock = new Mock<IRepository<Guid, DietPlan>>();
//             _workoutPlanRepositoryMock = new Mock<IRepository<Guid, WorkoutPlan>>();
//             _workoutExerciseRepositoryMock = new Mock<IRepository<Guid, WorkoutExercise>>();
//             _planAssignmentRepositoryMock = new Mock<IRepository<Guid, PlanAssignment>>();
//             _clientRepositoryMock = new Mock<IRepository<Guid, Client>>();

//             // var options = new DbContextOptionsBuilder<FitnessDBContext>()
//             //     .UseInMemoryDatabase(databaseName: "TestDB")
//             //     .Options;
//             // _context = new FitnessDBContext(options);

//             _dietPlanService = new DietPlanService(
//                 _mapperMock.Object,
//                 _encryptionServiceMock.Object,
//                 _userRepositoryMock.Object,
//                 _coachRepositoryMock.Object,
//                 _dietMealRepositoryMock.Object,
//                 _dietPlanRepositoryMock.Object,
//                 _workoutPlanRepositoryMock.Object,
//                 _workoutExerciseRepositoryMock.Object,
//                 // _context,
//                 _planAssignmentRepositoryMock.Object,
//                 _clientRepositoryMock.Object
//             );
//         }

//         [Test]
//         public async Task AddMeal_ShouldThrowException_IfDuplicateTitle()
//         {
//             // Arrange
//             var coachId = Guid.NewGuid();
//             var claim = new Claim("UserId", coachId.ToString());
//             var identity = new ClaimsIdentity(new[] { claim });
//             var principal = new ClaimsPrincipal(identity);

//             var existingPlan = new DietPlan { CoachId = coachId, DietTitle = "Test" };
//             _dietPlanRepositoryMock.Setup(repo => repo.GetAll())
//                 .ReturnsAsync(new List<DietPlan> { existingPlan });

//             var dto = new DietPlanCreateRequestDTO { DietTitle = "Test", Meals = new List<DietMealDTO>() };

//             // Act & Assert
//             var ex = Assert.ThrowsAsync<Exception>(() => _dietPlanService.AddMeal(dto, principal));
//             Assert.That(ex.Message, Is.EqualTo("A diet plan with this title already exists. Choose a new title or edit the previous diet plan"));
//         }

//         [Test]
//         public async Task GetAllDietPlansDTO_ReturnsCorrectResult()
//         {
//             // Arrange
//             var coachId = Guid.NewGuid();
//             var claim = new Claim("UserId", coachId.ToString());
//             var identity = new ClaimsIdentity(new[] { claim });
//             var principal = new ClaimsPrincipal(identity);

//             var plan = new DietPlan { Id = Guid.NewGuid(), CoachId = coachId, DietTitle = "Plan1" };
//             _dietPlanRepositoryMock.Setup(r => r.GetAll()).ReturnsAsync(new List<DietPlan> { plan });

//             var meal = new DietMeal
//             {
//                 Id = Guid.NewGuid(),
//                 DietPlanId = plan.Id,
//                 MealType = "Lunch",
//                 Description = "Chicken",
//                 Calories = 500,
//                 ProteinGrams = 30,
//                 CarbsGrams = 20,
//                 FatGrams = 10
//             };

//             _dietMealRepositoryMock.Setup(r => r.GetAll())
//                 .ReturnsAsync(new List<DietMeal> { meal });

//             // Act
//             var result = await _dietPlanService.GetAllDietPlansDTO(principal);

//             // Assert
//             Assert.That(result, Is.Not.Null);
//             Assert.That(result.Count, Is.EqualTo(1));
//             Assert.That(result[0].MealTypes.Count, Is.EqualTo(1));
//             Assert.That(result[0].MealTypes[0].MealType, Is.EqualTo("Lunch"));
//         }
//     }
// }

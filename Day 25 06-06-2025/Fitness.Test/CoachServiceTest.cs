// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Security.Claims;
// using System.Threading.Tasks;
// using AutoMapper;
// using FitnessTrackerAPI.Context;
// using FitnessTrackerAPI.Interfaces;
// using FitnessTrackerAPI.Models;
// using FitnessTrackerAPI.Models.Diet;
// using FitnessTrackerAPI.Models.DTOs;
// using FitnessTrackerAPI.Models.WorkoutModel;
// using FitnessTrackerAPI.Services;
// using Microsoft.EntityFrameworkCore;
// using Moq;

// using NUnit.Framework;

// namespace FitnessTrackerAPI.Tests.Services
// {
//     [TestFixture]
//     public class CoachServiceTests
//     {
//         private Mock<IMapper> _mapperMock;
//         private Mock<IEncryptionService> _encryptionServiceMock;
//         private Mock<IRepository<string, User>> _userRepoMock;
//         private Mock<IRepository<Guid, Coach>> _coachRepoMock;
//         private Mock<IRepository<Guid, DietMeal>> _dietMealRepoMock;
//         private Mock<IRepository<Guid, DietPlan>> _dietPlanRepoMock;
//         private Mock<IRepository<Guid, WorkoutPlan>> _workoutPlanRepoMock;
//         private Mock<IRepository<Guid, WorkoutExercise>> _workoutExerciseRepoMock;
//         private Mock<IRepository<Guid, PlanAssignment>> _planAssignmentRepoMock;
//         private Mock<IRepository<Guid, Client>> _clientRepoMock;
//         private FitnessDBContext _context;
//         private CoachService _coachService;

//         [SetUp]
//         public void Setup()
//         {
//             var options = new DbContextOptionsBuilder<FitnessDBContext>()
//                 .UseInMemoryDatabase(Guid.NewGuid().ToString())
//                 .Options;

//             _context = new FitnessDBContext(options);

//             _mapperMock = new Mock<IMapper>();
//             _encryptionServiceMock = new Mock<IEncryptionService>();
//             _userRepoMock = new Mock<IRepository<string, User>>();
//             _coachRepoMock = new Mock<IRepository<Guid, Coach>>();
//             _dietMealRepoMock = new Mock<IRepository<Guid, DietMeal>>();
//             _dietPlanRepoMock = new Mock<IRepository<Guid, DietPlan>>();
//             _workoutPlanRepoMock = new Mock<IRepository<Guid, WorkoutPlan>>();
//             _workoutExerciseRepoMock = new Mock<IRepository<Guid, WorkoutExercise>>();
//             _planAssignmentRepoMock = new Mock<IRepository<Guid, PlanAssignment>>();
//             _clientRepoMock = new Mock<IRepository<Guid, Client>>();

//             _coachService = new CoachService(
//                 _mapperMock.Object,
//                 _encryptionServiceMock.Object,
//                 _userRepoMock.Object,
//                 _coachRepoMock.Object,
//                 _dietMealRepoMock.Object,
//                 _dietPlanRepoMock.Object,
//                 _workoutPlanRepoMock.Object,
//                 _workoutExerciseRepoMock.Object,
//                 _context,
//                 _planAssignmentRepoMock.Object,
//                 _clientRepoMock.Object
//             );
//         }



//         [Test]
//         public async Task AddCoach_ShouldAddCoachAndReturnResponse()
//         {
//             // Arrange
//             var request = new CoachAddRequestDTO { Email = "coach@example.com", Password = "pass" };

//             _userRepoMock.Setup(r => r.Get(request.Email)).ReturnsAsync((User)null);
//             _mapperMock.Setup(m => m.Map<CoachAddRequestDTO, User>(request)).Returns(new User { Email = request.Email });
//             // _encryptionServiceMock.Setup(e => e.EncryptData(It.IsAny<EncryptModel>())).ReturnsAsync(new EncryptResponseModel { EncryptedData = "hashed" });
//             _userRepoMock.Setup(r => r.Add(It.IsAny<User>())).ReturnsAsync((User u) => u);
//             _mapperMock.Setup(m => m.Map<CoachAddRequestDTO, Coach>(request)).Returns(new Coach { Email = request.Email });
//             _coachRepoMock.Setup(r => r.Add(It.IsAny<Coach>())).ReturnsAsync(new Coach { Id = Guid.NewGuid(), Email = request.Email });

//             // Act
//             var result = await _coachService.AddCoach(request);

//             // Assert
//             Assert.That(request.Email, Is.EqualTo(result.Email));
//         }

//         [Test]
//         public async Task GetClientsWithoutAssignedPlans_ShouldReturnPaginatedResult()
//         {
//             // Arrange
//             var clients = new List<Client>
//     {
//         new Client { Id = Guid.NewGuid(), Name = "John", Email = "john@example.com" },
//         new Client { Id = Guid.NewGuid(), Name = "Doe", Email = "doe@example.com" }
//     };

//             var assignments = new List<PlanAssignment>
//     {
//         new PlanAssignment { ClientId = clients[0].Id } // John is assigned
//     };

//             _clientRepoMock.Setup(r => r.GetAll()).ReturnsAsync(clients);
//             _planAssignmentRepoMock.Setup(r => r.GetAll()).ReturnsAsync(assignments);

//             // Act
//             var result = await _coachService.GetClientsWithoutAssignedPlans(1, 10);

//             // Assert
//             Assert.That(result.Items.Count, Is.EqualTo(1));
//             Assert.That(result.Items[0].Email, Is.EqualTo("doe@example.com"));
//             Assert.That(result.TotalRecords, Is.EqualTo(1));
//             Assert.That(result.PageNumber, Is.EqualTo(1));
//             Assert.That(result.PageSize, Is.EqualTo(10));
//         }


//         [Test]
//         public async Task MarkPlanAsCompletedAsync_ShouldUpdateStatus_WhenValid()
//         {
//             // Arrange
//             var coachId = Guid.NewGuid();
//             var planId = Guid.NewGuid();

//             var user = new ClaimsPrincipal(new ClaimsIdentity(new[]
//             {
//                 new Claim("UserId", coachId.ToString())
//             }));

//             var plan = new PlanAssignment
//             {
//                 Id = planId,
//                 AssignedByCoachId = coachId,
//                 CompletionStatus = null
//             };

//             await _context.PlanAssignment.AddAsync(plan);
//             await _context.SaveChangesAsync();

//             // Act
//             var result = await _coachService.MarkPlanAsCompletedAsync(planId, user);

//             // Assert
//             Assert.That(result, Is.True);
//             var updated = await _context.PlanAssignment.FindAsync(planId);
//             Assert.That("Completed", Is.EqualTo(updated.CompletionStatus));
//         }
//         [TearDown]
//         public void TearDown()
//         {
//             _context?.Dispose();
//         }
//     }
// }

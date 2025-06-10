// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Security.Claims;
// using System.Threading;
// using System.Threading.Tasks;
// using AutoMapper;
// using FitnessTrackerAPI.Context;
// using FitnessTrackerAPI.Interfaces;
// using FitnessTrackerAPI.Models;
// using FitnessTrackerAPI.Models.Diet;
// using FitnessTrackerAPI.Models.DTOs;
// using FitnessTrackerAPI.Models.WorkoutModel;
// using FitnessTrackerAPI.Services;
// using Moq;
// using NUnit.Framework;

// namespace Fitness.Test
// {
//     [TestFixture]
//     public class CoachServiceTests
//     {
//         private CoachService _coachService;
//         private Mock<IMapper> _mapperMock;
//         private Mock<IEncryptionService> _encryptionServiceMock;
//         private Mock<IRepository<string, User>> _userRepositoryMock;
//         private Mock<IRepository<Guid, Coach>> _coachRepositoryMock;
//         private Mock<IRepository<Guid, DietMeal>> _dietMealRepositoryMock;
//         private Mock<IRepository<Guid, DietPlan>> _dietPlanRepositoryMock;
//         private Mock<IRepository<Guid, WorkoutPlan>> _workoutPlanRepositoryMock;
//         private Mock<IRepository<Guid, WorkoutExercise>> _workoutExerciseRepositoryMock;
//         private Mock<IRepository<Guid, PlanAssignment>> _planAssignmentRepositoryMock;
//         private Mock<IRepository<Guid, Client>> _clientRepositoryMock;
//         private Mock<FitnessDBContext> _contextMock;

//         [SetUp]
//         public void Setup()
//         {
//             _mapperMock = new Mock<IMapper>();
//             _encryptionServiceMock = new Mock<IEncryptionService>();
//             _userRepositoryMock = new Mock<IRepository<string, User>>();
//             _coachRepositoryMock = new Mock<IRepository<Guid, Coach>>();
//             _dietMealRepositoryMock = new Mock<IRepository<Guid, DietMeal>>();
//             _dietPlanRepositoryMock = new Mock<IRepository<Guid, DietPlan>>();
//             _workoutPlanRepositoryMock = new Mock<IRepository<Guid, WorkoutPlan>>();
//             _workoutExerciseRepositoryMock = new Mock<IRepository<Guid, WorkoutExercise>>();
//             _planAssignmentRepositoryMock = new Mock<IRepository<Guid, PlanAssignment>>();
//             _clientRepositoryMock = new Mock<IRepository<Guid, Client>>();
//             _contextMock = new Mock<FitnessDBContext>();

//             // Mock the Database.BeginTransactionAsync
//             var mockDbTransaction = new Mock<Microsoft.EntityFrameworkCore.Storage.IDbContextTransaction>();
//             _contextMock.Setup(c => c.Database.BeginTransactionAsync(It.IsAny<CancellationToken>()))
//                         .ReturnsAsync(mockDbTransaction.Object);
//             mockDbTransaction.Setup(t => t.CommitAsync(It.IsAny<CancellationToken>())).Returns(Task.CompletedTask);
//             mockDbTransaction.Setup(t => t.RollbackAsync(It.IsAny<CancellationToken>())).Returns(Task.CompletedTask);


//             _coachService = new CoachService(
//                 _mapperMock.Object,
//                 _encryptionServiceMock.Object,
//                 _userRepositoryMock.Object,
//                 _coachRepositoryMock.Object,
//                 _dietMealRepositoryMock.Object,
//                 _dietPlanRepositoryMock.Object,
//                 _workoutPlanRepositoryMock.Object,
//                 _workoutExerciseRepositoryMock.Object,
//                 _contextMock.Object,
//                 _planAssignmentRepositoryMock.Object,
//                 _clientRepositoryMock.Object
//             );
//         }

//         // Helper method to create a ClaimsPrincipal for testing with a UserId
//         private ClaimsPrincipal GetClaimsPrincipal(Guid userId)
//         private static ClaimsPrincipal GetClaimsPrincipal(Guid userId)
//         {
//             var claims = new List<Claim>
//             {
//                 new("UserId", userId.ToString()),
//                 new(ClaimTypes.NameIdentifier, userId.ToString())
//             };
//             var identity = new ClaimsIdentity(claims, "TestAuthType");
//             return new ClaimsPrincipal(identity);
//         }
//         // --- AddCoach Tests ---
//         [Test]
//         public async Task AddCoach_Success()
//         {
//             // Arrange
//             var coachDto = new CoachAddRequestDTO { Email = "newcoach@example.com", Password = "Password123", Name = "Coach One" };
//             var user = new User { Email = coachDto.Email, Password = "encrypted_password", Role = "Coach" };
//             var user = new User { Email = coachDto.Email, Password = Convert.FromBase64String("AAEC"), Role = "Coach" };
//             var coach = new Coach { Id = Guid.NewGuid(), Email = coachDto.Email, Name = coachDto.Name };
//             var encryptedModel = new EncryptResponseModel { EncryptedData = Convert.FromBase64String("AAEC") };

//             _userRepositoryMock.Setup(r => r.Get(coachDto.Email)).ReturnsAsync((User?)null!); // User does not exist
//             _encryptionServiceMock.Setup(s => s.EncryptData(It.IsAny<EncryptModel>())).ReturnsAsync(encryptedModel);
//             _userRepositoryMock.Setup(r => r.Add(It.IsAny<User>())).ReturnsAsync(user);
//             _mapperMock.Setup(m => m.Map<CoachAddRequestDTO, User>(coachDto)).Returns(user);
//             _mapperMock.Setup(m => m.Map<CoachAddRequestDTO, Coach>(coachDto)).Returns(coach);
//             _coachRepositoryMock.Setup(r => r.Add(It.IsAny<Coach>())).ReturnsAsync(coach);
//             // Act
//             var result = await _coachService.AddCoach(coachDto);

//             // Assert
//             Assert.That(result, Is.Not.Null);
//             Assert.That(result.Email, Is.EqualTo(coachDto.Email));
//             Assert.That(result.Id, Is.EqualTo(coach.Id));
//             _userRepositoryMock.Verify(r => r.Add(It.IsAny<User>()), Times.Once);
//             _coachRepositoryMock.Verify(r => r.Add(It.IsAny<Coach>()), Times.Once);
//             _contextMock.Verify(c => c.Database.BeginTransactionAsync(It.IsAny<CancellationToken>()), Times.Once);
//             _contextMock.Verify(c => c.Database.BeginTransactionAsync(It.IsAny<CancellationToken>()), Times.Once);
//             mockDbTransaction.Verify(t => t.CommitAsync(It.IsAny<CancellationToken>()), Times.Once);
//             mockDbTransaction.Verify(t => t.RollbackAsync(It.IsAny<CancellationToken>()), Times.Never);

//             [Test]
//             public void AddCoach_Throws_WhenUserAlreadyExists()
//             {
//                 // Arrange
//                 var coachDto = new CoachAddRequestDTO { Email = "existing@example.com", Password = "Password123" };
//                 _userRepositoryMock.Setup(r => r.Get(coachDto.Email)).ReturnsAsync(new User()); // User exists

//                 // Act & Assert
//                 var ex = Assert.ThrowsAsync<Exception>(() => _coachService.AddCoach(coachDto));
//                 Assert.That(ex.Message, Is.EqualTo("User Already Exist"));
//                 _userRepositoryMock.Verify(r => r.Add(It.IsAny<User>()), Times.Never); // No add operation should occur
//                 _contextMock.Verify(c => c.Database.BeginTransactionAsync(It.IsAny<CancellationToken>()), Times.Never); // No transaction should begin
//             }

//             [Test]
//             public void AddCoach_RollsBackTransaction_OnError()
//             {
//                 // Arrange
//                 var coachDto = new CoachAddRequestDTO { Email = "newcoach@example.com", Password = "Password123", Name = "Coach One" };
//                 var user = new User { Email = coachDto.Email, Password = "encrypted_password", Role = "Coach" };
//                 var encryptedModel = new EncryptResponseModel { EncryptedData = "encrypted_password" };

//                 _userRepositoryMock.Setup(r => r.Get(coachDto.Email)).ReturnsAsync((User)null);
//                 _userRepositoryMock.Setup(r => r.Get(coachDto.Email)).ReturnsAsync((User?)null!);
//                 _userRepositoryMock.Setup(r => r.Add(It.IsAny<User>())).ReturnsAsync(user);
//                 _mapperMock.Setup(m => m.Map<CoachAddRequestDTO, User>(coachDto)).Returns(user);
//                 _mapperMock.Setup(m => m.Map<CoachAddRequestDTO, Coach>(coachDto)).Returns(new Coach()); // Simulate coach add failure
//                 _coachRepositoryMock.Setup(r => r.Add(It.IsAny<Coach>())).ThrowsAsync(new Exception("DB error"));

//                 // Act & Assert
//                 var ex = Assert.ThrowsAsync<Exception>(() => _coachService.AddCoach(coachDto));
//                 Assert.That(ex.Message, Is.EqualTo("DB error"));
//                 _contextMock.Verify(c => c.Database.BeginTransactionAsync(It.IsAny<CancellationToken>()), Times.Once);
//                 _contextMock.Verify(c => c.Database.BeginTransactionAsync(It.IsAny<CancellationToken>()), Times.Once);
//                 mockDbTransaction.Verify(t => t.RollbackAsync(It.IsAny<CancellationToken>()), Times.Once);
//                 mockDbTransaction.Verify(t => t.CommitAsync(It.IsAny<CancellationToken>()), Times.Never);

//                 // --- AddMeal Tests (from previous solution, adapted for CoachService) ---
//                 [Test]
//                 public void AddMeal_Throws_WhenDuplicateTitle()
//                 {
//                     var coachId = Guid.NewGuid();
//                     var user = GetClaimsPrincipal(coachId);
//                     var dto = new DietPlanCreateRequestDTO
//                     var dto = new DietPlanCreateRequestDTO
//                     {
//                         DietTitle = "Plan1",
//                         Meals = new List<DietMealCreateDTO> { new DietMealCreateDTO { MealType = "Breakfast" } }
//                     };
//                     {
//                         new DietPlan { CoachId = coachId, DietTitle = "Plan1" }
//                     };
//                     _dietPlanRepositoryMock.Setup(r => r.GetAll()).ReturnsAsync(existingPlans);

//                     var ex = Assert.ThrowsAsync<Exception>(() => _coachService.AddMeal(dto, user));
//                     Assert.That(ex.Message, Does.Contain("already exists"));
//                     _contextMock.Verify(t => t.Database.BeginTransactionAsync(It.IsAny<CancellationToken>()), Times.Never);
//                 }

//                 [Test]
//                 public void AddMeal_Throws_WhenInvalidCoachId()
//                 {
//                     var user = new ClaimsPrincipal(new ClaimsIdentity()); // No "UserId" claim
//                     var dto = new DietPlanCreateRequestDTO { DietTitle = "Plan1", Meals = new List<DietMealDTO>() };
//                     var dto = new DietPlanCreateRequestDTO { DietTitle = "Plan1", Meals = new List<DietMealCreateDTO>() };
//                     var ex = Assert.ThrowsAsync<Exception>(() => _coachService.AddMeal(dto, user));
//                     Assert.That(ex.Message, Does.Contain("Invalid Coach ID from token"));
//                 }

//                 [Test]
//                 public async Task AddMeal_Success_DietPlanAndMealsAdded()
//                 {
//                     // Arrange
//                     var coachId = Guid.NewGuid();
//                     var user = GetClaimsPrincipal(coachId);
//                     var dietPlanDto = new DietPlanCreateRequestDTO
//                     var dietPlanDto = new DietPlanCreateRequestDTO
//                     {
//                         DietTitle = "NewDietPlan",
//                         Meals = new List<DietMealCreateDTO>
//                 {
//                     new DietMealCreateDTO { MealType = "Breakfast", Description = "Oats", Calories = 300 }
//                 }
//                     };
//                     var mappedDietMeal = new DietMeal { MealType = "Breakfast" };

//                     _dietPlanRepositoryMock.Setup(r => r.GetAll()).ReturnsAsync(new List<DietPlan>()); // No existing plans
//                     _mapperMock.Setup(m => m.Map<DietPlan>(dietPlanDto)).Returns(mappedDietPlan);
//                     _dietPlanRepositoryMock.Setup(r => r.Add(It.IsAny<DietPlan>()))
//                         .ReturnsAsync((DietPlan dp) => { dp.Id = Guid.NewGuid(); return dp; }); // Simulate DB assigning ID
//                     _mapperMock.Setup(m => m.Map<DietMeal>(It.IsAny<DietMealDTO>())).Returns(mappedDietMeal);
//                     _dietMealRepositoryMock.Setup(r => r.Add(It.IsAny<DietMeal>())).ReturnsAsync(mappedDietMeal);

//                     // Act
//                     var result = await _coachService.AddMeal(dietPlanDto, user);

//                     // Assert
//                     Assert.That(result, Is.Not.Null);
//                     Assert.That(result.DietTitle, Is.EqualTo(dietPlanDto.DietTitle));
//                     Assert.That(result.Meals.Count, Is.EqualTo(1));
//                     Assert.That(result.Meals, Has.Count.EqualTo(1));
//                     _dietMealRepositoryMock.Verify(r => r.Add(It.IsAny<DietMeal>()), Times.Once);
//                     _contextMock.Verify(c => c.Database.BeginTransactionAsync(It.IsAny<CancellationToken>()), Times.Once);
//                     _contextMock.Verify(c => c.Database.GetAwaiter().GetResult().CommitAsync(It.IsAny<CancellationToken>()), Times.Once);
//                     _contextMock.Verify(c => c.Database.GetAwaiter().GetResult().RollbackAsync(It.IsAny<CancellationToken>()), Times.Never);
//                 }

//                 [Test]
//                 public void AddMeal_RollsBack_OnError()
//                 {
//                     // Arrange
//                     var coachId = Guid.NewGuid();
//                     var user = GetClaimsPrincipal(coachId);
//                     var dietPlanDto = new DietPlanCreateRequestDTO { DietTitle = "Plan", Meals = new List<DietMealDTO>() };
//                     var dietPlanDto = new DietPlanCreateRequestDTO { DietTitle = "Plan", Meals = new List<DietMealCreateDTO>() };
//                     _dietPlanRepositoryMock.Setup(r => r.GetAll()).ReturnsAsync(new List<DietPlan>());
//                     _mapperMock.Setup(m => m.Map<DietPlan>(It.IsAny<DietPlanCreateRequestDTO>())).Returns(new DietPlan());
//                     _dietPlanRepositoryMock.Setup(r => r.Add(It.IsAny<DietPlan>())).ThrowsAsync(new Exception("DB error"));

//                     // Act & Assert
//                     var ex = Assert.ThrowsAsync<Exception>(() => _coachService.AddMeal(dietPlanDto, user));
//                     Assert.That(ex.Message, Is.EqualTo("DB error"));
//                     _contextMock.Verify(c => c.Database.BeginTransactionAsync(It.IsAny<CancellationToken>()), Times.Once);
//                     _contextMock.Verify(c => c.Database.GetAwaiter().GetResult().RollbackAsync(It.IsAny<CancellationToken>()), Times.Once);
//                     _contextMock.Verify(c => c.Database.GetAwaiter().GetResult().CommitAsync(It.IsAny<CancellationToken>()), Times.Never);
//                 }

//                 // --- UpdateDietPlanByTitle Tests ---
//                 [Test]
//                 public async Task UpdateDietPlanByTitle_Success()
//                 {
//                     // Arrange
//                     var coachId = Guid.NewGuid();
//                     var user = GetClaimsPrincipal(coachId);
//                     var oldTitle = "Old Plan";
//                     var updatedTitle = "New Plan";
//                     var existingPlan = new DietPlan { Id = Guid.NewGuid(), CoachId = coachId, DietTitle = oldTitle };
//                     var existingMeals = new List<DietMeal> { new DietMeal { Id = Guid.NewGuid(), DietPlanId = existingPlan.Id, MealType = "Old Meal" } };
//                     var newDietPlanDto = new DietPlanCreateRequestDTO
//                     var newDietPlanDto = new DietPlanCreateRequestDTO
//                     {
//                         DietTitle = updatedTitle,
//                         Meals = new List<DietMealCreateDTO> { new DietMealCreateDTO { MealType = "New Meal" } }
//                     };

//                     _dietPlanRepositoryMock.Setup(r => r.GetAll()).ReturnsAsync(new List<DietPlan> { existingPlan });
//                     _dietMealRepositoryMock.Setup(r => r.GetAll()).ReturnsAsync(existingMeals); // For fetching existing meals
//                     _dietMealRepositoryMock.Setup(r => r.Delete(It.IsAny<Guid>())).Returns(Task.CompletedTask);
//                     _dietMealRepositoryMock.Setup(r => r.Delete(It.IsAny<Guid>())).Returns(Task.FromResult<DietMeal?>(null));
//                     _dietMealRepositoryMock.Setup(r => r.Add(It.IsAny<DietMeal>())).ReturnsAsync(newDietMeal);

//                     // Act
//                     var result = await _coachService.UpdateDietPlanByTitle(oldTitle, newDietPlanDto, user);

//                     // Assert
//                     Assert.That(result, Is.Not.Null);
//                     Assert.That(result.DietTitle, Is.EqualTo(updatedTitle));
//                     Assert.That(result.Meals.Count, Is.EqualTo(1));
//                     Assert.That(result.Meals[0].MealType, Is.EqualTo("New Meal"));
//                     Assert.That(result.Meals.First().MealType, Is.EqualTo("New Meal"));
//                     _dietMealRepositoryMock.Verify(r => r.Delete(existingMeals[0].Id), Times.Once); // Verify old meal deleted
//                     _dietMealRepositoryMock.Verify(r => r.Add(It.IsAny<DietMeal>()), Times.Once); // Verify new meal added
//                     _contextMock.Verify(c => c.Database.GetAwaiter().GetResult().CommitAsync(It.IsAny<CancellationToken>()), Times.Once);
//                     _contextMock.Verify(c => c.Database.GetAwaiter().GetResult().RollbackAsync(It.IsAny<CancellationToken>()), Times.Never);
//                 }

//                 [Test]
//                 public void UpdateDietPlanByTitle_Throws_WhenPlanNotFound()
//                 {
//                     // Arrange
//                     var coachId = Guid.NewGuid();
//                     var user = GetClaimsPrincipal(coachId);
//                     _dietPlanRepositoryMock.Setup(r => r.GetAll()).ReturnsAsync(new List<DietPlan>()); // No plans
//                     var dto = new DietPlanCreateRequestDTO { DietTitle = "Any" };

//                     // Act & Assert
//                     var ex = Assert.ThrowsAsync<Exception>(() => _coachService.UpdateDietPlanByTitle("NonExistent", dto, user));
//                     Assert.That(ex.Message, Does.Contain("not found or unauthorized access"));
//                     _contextMock.Verify(c => c.Database.BeginTransactionAsync(It.IsAny<CancellationToken>()), Times.Never);
//                 }

//                 // --- DeleteDietPlanByTitle Tests ---
//                 [Test]
//                 public async Task DeleteDietPlanByTitle_Success()
//                 {
//                     // Arrange
//                     var coachId = Guid.NewGuid();
//                     var user = GetClaimsPrincipal(coachId);
//                     var planToDelete = new DietPlan { Id = Guid.NewGuid(), CoachId = coachId, DietTitle = "Delete Me" };
//                     var mealsToDelete = new List<DietMeal> { new DietMeal { Id = Guid.NewGuid(), DietPlanId = planToDelete.Id, MealType = "Meal1" } };

//                     _dietPlanRepositoryMock.Setup(r => r.GetAll()).ReturnsAsync(new List<DietPlan> { planToDelete });
//                     _dietMealRepositoryMock.Setup(r => r.GetAll()).ReturnsAsync(mealsToDelete);
//                     _dietMealRepositoryMock.Setup(r => r.Delete(It.IsAny<Guid>())).Returns(Task.CompletedTask);
//                     _dietPlanRepositoryMock.Setup(r => r.Delete(It.IsAny<Guid>())).Returns(Task.CompletedTask);
//                     _dietPlanRepositoryMock.Setup(r => r.Delete(It.IsAny<Guid>())).Returns(Task.FromResult<DietPlan?>(null));
//                     // Act
//                     var result = await _coachService.DeleteDietPlanByTitle("Delete Me", user);

//                     // Assert
//                     Assert.That(result, Is.True);
//                     _contextMock.Verify(c => c.Database.BeginTransactionAsync(It.IsAny<CancellationToken>()), Times.Once);
//                     _dietMealRepositoryMock.Verify(r => r.Delete(mealsToDelete[0].Id), Times.Once);
//                     _dietPlanRepositoryMock.Verify(r => r.Delete(planToDelete.Id), Times.Once);
//                     _contextMock.Verify(c => c.Database.GetAwaiter().GetResult().CommitAsync(It.IsAny<CancellationToken>()), Times.Once);
//                     _contextMock.Verify(c => c.Database.GetAwaiter().GetResult().RollbackAsync(It.IsAny<CancellationToken>()), Times.Never);
//                 }

//                 [Test]
//                 public void DeleteDietPlanByTitle_Throws_WhenPlanNotFound()
//                 {
//                     // Arrange
//                     var coachId = Guid.NewGuid();
//                     var user = GetClaimsPrincipal(coachId);
//                     _dietPlanRepositoryMock.Setup(r => r.GetAll()).ReturnsAsync(new List<DietPlan>());

//                     // Act & Assert
//                     var ex = Assert.ThrowsAsync<Exception>(() => _coachService.DeleteDietPlanByTitle("NonExistent", user));
//                     Assert.That(ex.Message, Does.Contain("not found or unauthorized access"));
//                     _contextMock.Verify(c => c.Database.BeginTransactionAsync(It.IsAny<CancellationToken>()), Times.Never);
//                 }

//                 // --- GetAllDietPlansDTO Tests ---
//                 [Test]
//                 public async Task GetAllDietPlansDTO_ReturnsAllPlansForCoach()
//                 {
//                     // Arrange
//                     var coachId = Guid.NewGuid();
//                     var user = GetClaimsPrincipal(coachId);
//                     var dietPlan1 = new DietPlan { Id = Guid.NewGuid(), CoachId = coachId, DietTitle = "Plan1" };
//                     var dietPlan2 = new DietPlan { Id = Guid.NewGuid(), CoachId = coachId, DietTitle = "Plan2" };
//                     var meal1 = new DietMeal { DietPlanId = dietPlan1.Id, MealType = "Breakfast1" };
//                     var meal2 = new DietMeal { DietPlanId = dietPlan2.Id, MealType = "Lunch2" };

//                     _dietPlanRepositoryMock.Setup(r => r.GetAll()).ReturnsAsync(new List<DietPlan> { dietPlan1, dietPlan2 });
//                     _dietMealRepositoryMock.Setup(r => r.GetAll()).ReturnsAsync(new List<DietMeal> { meal1, meal2 });

//                     // Act
//                     var result = await _coachService.GetAllDietPlansDTO(user);

//                     // Assert
//                     Assert.That(result.Count, Is.EqualTo(2));
//                     Assert.That(result.Any(r => r.DietTitle == "Plan1" && r.MealTypes.Any(m => m.MealType == "Breakfast1")), Is.True);
//                     Assert.That(result.Any(r => r.DietTitle == "Plan2" && r.MealTypes.Any(m => m.MealType == "Lunch2")), Is.True);
//                 }

//                 [Test]
//                 public async Task GetAllDietPlansDTO_ReturnsEmptyList_WhenNoPlansForCoach()
//                 {
//                     // Arrange
//                     var coachId = Guid.NewGuid();
//                     var user = GetClaimsPrincipal(coachId);
//                     _dietPlanRepositoryMock.Setup(r => r.GetAll()).ReturnsAsync(new List<DietPlan>()); // No plans
//                     _dietMealRepositoryMock.Setup(r => r.GetAll()).ReturnsAsync(new List<DietMeal>());

//                     // Act
//                     var result = await _coachService.GetAllDietPlansDTO(user);

//                     // Assert
//                     Assert.That(result, Is.Empty);
//                 }

//                 // --- GetDietPlanByTitle Tests (adapting the original test) ---
//                 [Test]
//                 public async Task GetDietPlanByTitle_ReturnsDietPlanResponse_WhenFound()
//                 {
//                     // Arrange
//                     var coachId = Guid.NewGuid();
//                     var user = GetClaimsPrincipal(coachId);
//                     var planId = Guid.NewGuid();
//                     var dietPlans = new List<DietPlan>
//             {
//                 new DietPlan { Id = planId, DietTitle = "Keto", CoachId = coachId }
//             };
//                     var dietMeals = new List<DietMeal>
//             {
//                 new DietMeal { DietPlanId = planId, MealType = "Breakfast", Description = "Eggs", Calories = 300, ProteinGrams = 20, CarbsGrams = 5, FatGrams = 25 }
//             };

//                     _dietPlanRepositoryMock.Setup(r => r.GetAll()).ReturnsAsync(dietPlans);
//                     _dietMealRepositoryMock.Setup(r => r.GetAll()).ReturnsAsync(dietMeals);

//                     // Act
//                     var result = await _coachService.GetDietPlanByTitle("Keto", user);

//                     // Assert
//                     Assert.That(result, Is.Not.Null);
//                     Assert.That(result.DietTitle, Is.EqualTo("Keto"));
//                     Assert.That(result.MealTypes.Count, Is.EqualTo(1));
//                     Assert.That(result.MealTypes[0].MealType, Is.EqualTo("Breakfast"));
//                 }

//                 [Test]
//                 public async Task GetDietPlanByTitle_ReturnsNull_WhenNotFound()
//                 {
//                     // Arrange
//                     var coachId = Guid.NewGuid();
//                     var user = GetClaimsPrincipal(coachId);
//                     _dietPlanRepositoryMock.Setup(r => r.GetAll()).ReturnsAsync(new List<DietPlan>());

//                     // Act
//                     var result = await _coachService.GetDietPlanByTitle("Unknown", user);

//                     // Assert
//                     Assert.That(result, Is.Null); // Corrected assertion for null
//                 }

//                 // --- AddWorkoutPlan Tests ---
//                 [Test]
//                 public async Task AddWorkoutPlan_Success_WorkoutPlanAndExercisesAdded()
//                 {
//                     // Arrange
//                     var coachId = Guid.NewGuid();
//                     var user = GetClaimsPrincipal(coachId);
//                     var workoutPlanDto = new WorkoutPlanCreateRequestDTO
//                     var workoutPlanDto = new WorkoutPlanCreateRequestDTO
//                     {
//                         Title = "Leg Day",
//                         Description = "Heavy leg workout",
//                         DurationInWeeks = 8,
//                         Exercises = new List<WorkoutExerciseCreateDTO>
//                 {
//                     new WorkoutExerciseCreateDTO { Name = "Squats", Sets = 5, Reps = 5 }
//                 }
//                     };
//                     var mappedWorkoutExercise = new WorkoutExercise { Name = "Squats" };

//                     _workoutPlanRepositoryMock.Setup(r => r.GetAll()).ReturnsAsync(new List<WorkoutPlan>()); // No existing plans
//                     _mapperMock.Setup(m => m.Map<WorkoutPlan>(workoutPlanDto)).Returns(mappedWorkoutPlan);
//                     _workoutPlanRepositoryMock.Setup(r => r.Add(It.IsAny<WorkoutPlan>()))
//                         .ReturnsAsync((WorkoutPlan wp) => { wp.Id = Guid.NewGuid(); return wp; }); // Simulate DB assigning ID
//                     _mapperMock.Setup(m => m.Map<WorkoutExercise>(It.IsAny<WorkoutExerciseDTO>())).Returns(mappedWorkoutExercise);
//                     _mapperMock.Setup(m => m.Map<WorkoutExercise>(It.IsAny<WorkoutExerciseCreateDTO>())).Returns(mappedWorkoutExercise);

//                     // Act
//                     var result = await _coachService.AddWorkoutPlan(workoutPlanDto, user);

//                     // Assert
//                     Assert.That(result, Is.Not.Null);
//                     Assert.That(result.Title, Is.EqualTo(workoutPlanDto.Title));
//                     Assert.That(result.Exercises.Count, Is.EqualTo(1));
//                     Assert.That(result.Exercises, Has.Count.EqualTo(1));
//                     _workoutExerciseRepositoryMock.Verify(r => r.Add(It.IsAny<WorkoutExercise>()), Times.Once);
//                     _contextMock.Verify(c => c.Database.BeginTransactionAsync(It.IsAny<CancellationToken>()), Times.Once);
//                     _contextMock.Verify(c => c.Database.GetAwaiter().GetResult().CommitAsync(It.IsAny<CancellationToken>()), Times.Once);
//                     _contextMock.Verify(c => c.Database.GetAwaiter().GetResult().RollbackAsync(It.IsAny<CancellationToken>()), Times.Never);
//                 }

//                 [Test]
//                 public void AddWorkoutPlan_Throws_WhenDuplicateTitle()
//                 {
//                     // Arrange
//                     var coachId = Guid.NewGuid();
//                     var user = GetClaimsPrincipal(coachId);
//                     var dto = new WorkoutPlanCreateRequestDTO { Title = "Existing Workout" };
//                     var existingPlans = new List<WorkoutPlan>
//             {
//                 new WorkoutPlan { CoachId = coachId, Title = "Existing Workout" }
//             };
//                     _workoutPlanRepositoryMock.Setup(r => r.GetAll()).ReturnsAsync(existingPlans);

//                     // Act & Assert
//                     var ex = Assert.ThrowsAsync<Exception>(() => _coachService.AddWorkoutPlan(dto, user));
//                     Assert.That(ex.Message, Does.Contain("already exists"));
//                     _contextMock.Verify(c => c.Database.BeginTransactionAsync(It.IsAny<CancellationToken>()), Times.Never);
//                 }

//                 [Test]
//                 public void AddWorkoutPlan_Throws_WhenInvalidCoachId()
//                 {
//                     var user = new ClaimsPrincipal(new ClaimsIdentity()); // No "UserId" claim
//                     var dto = new WorkoutPlanCreateRequestDTO { Title = "Any" };

//                     var ex = Assert.ThrowsAsync<Exception>(() => _coachService.AddWorkoutPlan(dto, user));
//                     Assert.That(ex.Message, Does.Contain("Invalid Coach ID from token"));
//                 }

//                 [Test]
//                 public void AddWorkoutPlan_RollsBack_OnError()
//                 {
//                     // Arrange
//                     var coachId = Guid.NewGuid();
//                     var user = GetClaimsPrincipal(coachId);
//                     var workoutPlanDto = new WorkoutPlanCreateRequestDTO { Title = "Plan", Exercises = new List<WorkoutExerciseDTO>() };
//                     var workoutPlanDto = new WorkoutPlanCreateRequestDTO { Title = "Plan", Exercises = new List<WorkoutExerciseCreateDTO>() };
//                     _workoutPlanRepositoryMock.Setup(r => r.GetAll()).ReturnsAsync(new List<WorkoutPlan>());
//                     _mapperMock.Setup(m => m.Map<WorkoutPlan>(It.IsAny<WorkoutPlanCreateRequestDTO>())).Returns(new WorkoutPlan());
//                     _workoutPlanRepositoryMock.Setup(r => r.Add(It.IsAny<WorkoutPlan>())).ThrowsAsync(new Exception("DB error"));

//                     // Act & Assert
//                     var ex = Assert.ThrowsAsync<Exception>(() => _coachService.AddWorkoutPlan(workoutPlanDto, user));
//                     Assert.That(ex.Message, Is.EqualTo("DB error"));
//                     _contextMock.Verify(c => c.Database.BeginTransactionAsync(It.IsAny<CancellationToken>()), Times.Once);
//                     _contextMock.Verify(c => c.Database.GetAwaiter().GetResult().RollbackAsync(It.IsAny<CancellationToken>()), Times.Once);
//                     _contextMock.Verify(c => c.Database.GetAwaiter().GetResult().CommitAsync(It.IsAny<CancellationToken>()), Times.Never);
//                 }

//                 // --- UpdateWorkoutPlanByTitle Tests ---
//                 [Test]
//                 public async Task UpdateWorkoutPlanByTitle_Success()
//                 {
//                     // Arrange
//                     var coachId = Guid.NewGuid();
//                     var user = GetClaimsPrincipal(coachId);
//                     var oldTitle = "Old Workout";
//                     var updatedTitle = "New Workout";
//                     var existingWorkoutPlan = new WorkoutPlan { Id = Guid.NewGuid(), CoachId = coachId, Title = oldTitle };
//                     var existingExercises = new List<WorkoutExercise> { new WorkoutExercise { Id = Guid.NewGuid(), WorkoutPlanId = existingWorkoutPlan.Id, Name = "Old Exercise" } };
//                     var newWorkoutPlanDto = new WorkoutPlanCreateRequestDTO
//                     var newWorkoutPlanDto = new WorkoutPlanCreateRequestDTO
//                     {
//                         Title = updatedTitle,
//                         Description = "Updated Desc",
//                         DurationInWeeks = 10,
//                         Exercises = new List<WorkoutExerciseCreateDTO> { new WorkoutExerciseCreateDTO { Name = "New Exercise" } }
//                     };

//                     _workoutPlanRepositoryMock.Setup(r => r.GetAll()).ReturnsAsync(new List<WorkoutPlan> { existingWorkoutPlan });
//                     _workoutExerciseRepositoryMock.Setup(r => r.GetAll()).ReturnsAsync(existingExercises);
//                     _workoutExerciseRepositoryMock.Setup(r => r.Delete(It.IsAny<Guid>())).Returns(Task.CompletedTask);
//                     _workoutExerciseRepositoryMock.Setup(r => r.Delete(It.IsAny<Guid>())).Returns(Task.FromResult<WorkoutExercise?>(null));
//                     _mapperMock.Setup(m => m.Map<WorkoutExercise>(It.IsAny<WorkoutExerciseCreateDTO>())).Returns(newWorkoutExercise);

//                     // Act
//                     var result = await _coachService.UpdateWorkoutPlanByTitle(oldTitle, newWorkoutPlanDto, user);

//                     // Assert
//                     Assert.That(result, Is.Not.Null);
//                     Assert.That(result.Title, Is.EqualTo(updatedTitle));
//                     Assert.That(result.Description, Is.EqualTo("Updated Desc"));
//                     Assert.That(result.DurationInWeeks, Is.EqualTo(10));
//                     Assert.That(result.Exercises.Count, Is.EqualTo(1));
//                     Assert.That(result.Exercises[0].Name, Is.EqualTo("New Exercise"));
//                     Assert.That(result.Exercises.First().Name, Is.EqualTo("New Exercise"));
//                     _workoutExerciseRepositoryMock.Verify(r => r.Delete(existingExercises[0].Id), Times.Once);
//                     _workoutExerciseRepositoryMock.Verify(r => r.Add(It.IsAny<WorkoutExercise>()), Times.Once);
//                     _contextMock.Verify(c => c.Database.GetAwaiter().GetResult().CommitAsync(It.IsAny<CancellationToken>()), Times.Once);
//                     _contextMock.Verify(c => c.Database.GetAwaiter().GetResult().RollbackAsync(It.IsAny<CancellationToken>()), Times.Never);
//                 }

//                 [Test]
//                 public void UpdateWorkoutPlanByTitle_Throws_WhenPlanNotFound()
//                 {
//                     // Arrange
//                     var coachId = Guid.NewGuid();
//                     var user = GetClaimsPrincipal(coachId);
//                     _workoutPlanRepositoryMock.Setup(r => r.GetAll()).ReturnsAsync(new List<WorkoutPlan>());
//                     var dto = new WorkoutPlanCreateRequestDTO { Title = "Any" };

//                     // Act & Assert
//                     var ex = Assert.ThrowsAsync<Exception>(() => _coachService.UpdateWorkoutPlanByTitle("NonExistent", dto, user));
//                     Assert.That(ex.Message, Does.Contain("not found or unauthorized access"));
//                     _contextMock.Verify(c => c.Database.BeginTransactionAsync(It.IsAny<CancellationToken>()), Times.Never);
//                 }

//                 // --- DeleteWorkoutPlanByTitle Tests ---
//                 [Test]
//                 public async Task DeleteWorkoutPlanByTitle_Success()
//                 {
//                     // Arrange
//                     var coachId = Guid.NewGuid();
//                     var user = GetClaimsPrincipal(coachId);
//                     var planToDelete = new WorkoutPlan { Id = Guid.NewGuid(), CoachId = coachId, Title = "Delete Me" };
//                     var exercisesToDelete = new List<WorkoutExercise> { new WorkoutExercise { Id = Guid.NewGuid(), WorkoutPlanId = planToDelete.Id, Name = "Exercise1" } };

//                     _workoutPlanRepositoryMock.Setup(r => r.GetAll()).ReturnsAsync(new List<WorkoutPlan> { planToDelete });
//                     _workoutExerciseRepositoryMock.Setup(r => r.GetAll()).ReturnsAsync(exercisesToDelete);
//                     _workoutExerciseRepositoryMock.Setup(r => r.Delete(It.IsAny<Guid>())).Returns(Task.CompletedTask);
//                     _workoutPlanRepositoryMock.Setup(r => r.Delete(It.IsAny<Guid>())).Returns(Task.CompletedTask);
//                     _workoutPlanRepositoryMock.Setup(r => r.Delete(It.IsAny<Guid>())).Returns(Task.FromResult<WorkoutPlan?>(null));
//                     // Act
//                     var result = await _coachService.DeleteWorkoutPlanByTitle("Delete Me", user);

//                     // Assert
//                     Assert.That(result, Is.True);
//                     _contextMock.Verify(c => c.Database.BeginTransactionAsync(It.IsAny<CancellationToken>()), Times.Once);
//                     _workoutExerciseRepositoryMock.Verify(r => r.Delete(exercisesToDelete[0].Id), Times.Once);
//                     _workoutPlanRepositoryMock.Verify(r => r.Delete(planToDelete.Id), Times.Once);
//                     _contextMock.Verify(c => c.Database.GetAwaiter().GetResult().CommitAsync(It.IsAny<CancellationToken>()), Times.Once);
//                     _contextMock.Verify(c => c.Database.GetAwaiter().GetResult().RollbackAsync(It.IsAny<CancellationToken>()), Times.Never);
//                 }

//                 [Test]
//                 public void DeleteWorkoutPlanByTitle_Throws_WhenPlanNotFound()
//                 {
//                     // Arrange
//                     var coachId = Guid.NewGuid();
//                     var user = GetClaimsPrincipal(coachId);
//                     _workoutPlanRepositoryMock.Setup(r => r.GetAll()).ReturnsAsync(new List<WorkoutPlan>());

//                     // Act & Assert
//                     var ex = Assert.ThrowsAsync<Exception>(() => _coachService.DeleteWorkoutPlanByTitle("NonExistent", user));
//                     Assert.That(ex.Message, Does.Contain("not found or unauthorized access"));
//                     _contextMock.Verify(c => c.Database.BeginTransactionAsync(It.IsAny<CancellationToken>()), Times.Never);
//                 }

//                 // --- GetAllWorkoutPlansDTO Tests ---
//                 [Test]
//                 public async Task GetAllWorkoutPlansDTO_ReturnsAllPlansForCoach()
//                 {
//                     // Arrange
//                     var coachId = Guid.NewGuid();
//                     var user = GetClaimsPrincipal(coachId);
//                     var workoutPlan1 = new WorkoutPlan { Id = Guid.NewGuid(), CoachId = coachId, Title = "Workout1" };
//                     var workoutPlan2 = new WorkoutPlan { Id = Guid.NewGuid(), CoachId = coachId, Title = "Workout2" };
//                     var exercise1 = new WorkoutExercise { WorkoutPlanId = workoutPlan1.Id, Name = "Pushup1" };
//                     var exercise2 = new WorkoutExercise { WorkoutPlanId = workoutPlan2.Id, Name = "Squat2" };

//                     _workoutPlanRepositoryMock.Setup(r => r.GetAll()).ReturnsAsync(new List<WorkoutPlan> { workoutPlan1, workoutPlan2 });
//                     _workoutExerciseRepositoryMock.Setup(r => r.GetAll()).ReturnsAsync(new List<WorkoutExercise> { exercise1, exercise2 });

//                     // Act
//                     var result = await _coachService.GetAllWorkoutPlansDTO(user);

//                     // Assert
//                     Assert.That(result.Count, Is.EqualTo(2));
//                     Assert.That(result.Any(r => r.Title == "Workout1" && r.Exercises.Any(e => e.Name == "Pushup1")), Is.True);
//                     Assert.That(result.Any(r => r.Title == "Workout2" && r.Exercises.Any(e => e.Name == "Squat2")), Is.True);
//                 }

//                 [Test]
//                 public async Task GetAllWorkoutPlansDTO_ReturnsEmptyList_WhenNoPlansForCoach()
//                 {
//                     // Arrange
//                     var coachId = Guid.NewGuid();
//                     var user = GetClaimsPrincipal(coachId);
//                     _workoutPlanRepositoryMock.Setup(r => r.GetAll()).ReturnsAsync(new List<WorkoutPlan>());
//                     _workoutExerciseRepositoryMock.Setup(r => r.GetAll()).ReturnsAsync(new List<WorkoutExercise>());

//                     // Act
//                     var result = await _coachService.GetAllWorkoutPlansDTO(user);

//                     // Assert
//                     Assert.That(result, Is.Empty);
//                 }

//                 // --- GetWorkouttPlanByTitle Tests (adapting the original test) ---
//                 [Test]
//                 public async Task GetWorkouttPlanByTitle_ReturnsWorkoutPlanResponse_WhenFound()
//                 {
//                     // Arrange
//                     var coachId = Guid.NewGuid();
//                     var user = GetClaimsPrincipal(coachId);
//                     var planId = Guid.NewGuid();
//                     var workoutPlans = new List<WorkoutPlan>
//             {
//                 new WorkoutPlan { Id = planId, Title = "Push Day", Description = "Push workout", DurationInWeeks = 4, CoachId = coachId }
//             };
//                     var exercises = new List<WorkoutExercise>
//             {
//                 new WorkoutExercise { Id = Guid.NewGuid(), WorkoutPlanId = planId, Name = "Bench Press", Sets = 4, Reps = 10, RestSeconds = 90, Notes = "Go heavy" }
//             };

//                     _workoutPlanRepositoryMock.Setup(r => r.GetAll()).ReturnsAsync(workoutPlans);
//                     _workoutExerciseRepositoryMock.Setup(r => r.GetAll()).ReturnsAsync(exercises);

//                     // Act
//                     var result = await _coachService.GetWorkouttPlanByTitle("Push Day", user);

//                     // Assert
//                     Assert.That(result, Is.Not.Null);
//                     Assert.That(result.Title, Is.EqualTo("Push Day"));
//                     Assert.That(result.Exercises.Count, Is.EqualTo(1));
//                     Assert.That(result.Exercises[0].Name, Is.EqualTo("Bench Press"));
//                 }

//                 [Test]
//                 public async Task GetWorkouttPlanByTitle_ReturnsNull_WhenNotFound()
//                 {
//                     // Arrange
//                     var coachId = Guid.NewGuid();
//                     var user = GetClaimsPrincipal(coachId);
//                     _workoutPlanRepositoryMock.Setup(r => r.GetAll()).ReturnsAsync(new List<WorkoutPlan>());

//                     // Act
//                     var result = await _coachService.GetWorkouttPlanByTitle("Unknown", user);

//                     // Assert
//                     Assert.That(result, Is.Null); // Corrected assertion for null
//                 }

//                 // --- AssignPlanToClient Tests ---
//                 [Test]
//                 public async Task AssignPlanToClient_Success_WithBothPlans()
//                 {
//                     // Arrange
//                     var coachId = Guid.NewGuid();
//                     var user = GetClaimsPrincipal(coachId);
//                     var clientId = Guid.NewGuid();
//                     var workoutPlanId = Guid.NewGuid();
//                     var dietPlanId = Guid.NewGuid();
//                     var client = new Client { Id = clientId, Email = "client@example.com" };
//                     var workoutPlan = new WorkoutPlan { Id = workoutPlanId, Title = "Full Body", CoachId = coachId };
//                     var dietPlan = new DietPlan { Id = dietPlanId, DietTitle = "Keto Diet", CoachId = coachId };
//                     var assignmentDto = new PlanAssignmentRequestDTO
//                     {
//                         ClientEmail = client.Email,
//                         WorkoutName = workoutPlan.Title,
//                         DietPlanName = dietPlan.DietTitle
//                     };

//                     _clientRepositoryMock.Setup(r => r.GetAll()).ReturnsAsync(new List<Client> { client });
//                     _workoutPlanRepositoryMock.Setup(r => r.GetAll()).ReturnsAsync(new List<WorkoutPlan> { workoutPlan });
//                     _dietPlanRepositoryMock.Setup(r => r.GetAll()).ReturnsAsync(new List<DietPlan> { dietPlan });
//                     _planAssignmentRepositoryMock.Setup(r => r.Add(It.IsAny<PlanAssignment>())).ReturnsAsync((PlanAssignment pa) => pa);

//                     // Act
//                     var result = await _coachService.AssignPlanToClient(assignmentDto, user);

//                     // Assert
//                     Assert.That(result, Is.Not.Null);
//                     Assert.That(result.ClientId, Is.EqualTo(clientId));
//                     Assert.That(result.WorkoutPlanId, Is.EqualTo(workoutPlanId));
//                     Assert.That(result.DietPlanId, Is.EqualTo(dietPlanId));
//                     Assert.That(result.AssignedByCoachId, Is.EqualTo(coachId));
//                     _planAssignmentRepositoryMock.Verify(r => r.Add(It.IsAny<PlanAssignment>()), Times.Once);
//                 }

//                 [Test]
//                 public async Task AssignPlanToClient_Success_WithOnlyWorkoutPlan()
//                 {
//                     // Arrange
//                     var coachId = Guid.NewGuid();
//                     var user = GetClaimsPrincipal(coachId);
//                     var clientId = Guid.NewGuid();
//                     var workoutPlanId = Guid.NewGuid();
//                     var client = new Client { Id = clientId, Email = "client@example.com" };
//                     var workoutPlan = new WorkoutPlan { Id = workoutPlanId, Title = "Full Body", CoachId = coachId };
//                     var assignmentDto = new PlanAssignmentRequestDTO
//                     {
//                         ClientEmail = client.Email,
//                         WorkoutName = workoutPlan.Title,
//                         DietPlanName = null // No diet plan
//                     };

//                     _clientRepositoryMock.Setup(r => r.GetAll()).ReturnsAsync(new List<Client> { client });
//                     _workoutPlanRepositoryMock.Setup(r => r.GetAll()).ReturnsAsync(new List<WorkoutPlan> { workoutPlan });
//                     _dietPlanRepositoryMock.Setup(r => r.GetAll()).ReturnsAsync(new List<DietPlan>()); // No diet plans
//                     _planAssignmentRepositoryMock.Setup(r => r.Add(It.IsAny<PlanAssignment>())).ReturnsAsync((PlanAssignment pa) => pa);

//                     // Act
//                     var result = await _coachService.AssignPlanToClient(assignmentDto, user);

//                     // Assert
//                     Assert.That(result, Is.Not.Null);
//                     Assert.That(result.ClientId, Is.EqualTo(clientId));
//                     Assert.That(result.WorkoutPlanId, Is.EqualTo(workoutPlanId));
//                     Assert.That(result.DietPlanId, Is.Null); // Should be null
//                     _planAssignmentRepositoryMock.Verify(r => r.Add(It.IsAny<PlanAssignment>()), Times.Once);
//                 }

//                 [Test]
//                 public void AssignPlanToClient_Throws_WhenClientNotFound()
//                 {
//                     // Arrange
//                     var coachId = Guid.NewGuid();
//                     var user = GetClaimsPrincipal(coachId);
//                     var assignmentDto = new PlanAssignmentRequestDTO { ClientEmail = "nonexistent@example.com" };

//                     _clientRepositoryMock.Setup(r => r.GetAll()).ReturnsAsync(new List<Client>()); // No clients

//                     // Act & Assert
//                     var ex = Assert.ThrowsAsync<Exception>(() => _coachService.AssignPlanToClient(assignmentDto, user));
//                     Assert.That(ex.Message, Is.EqualTo("Client not found"));
//                     _planAssignmentRepositoryMock.Verify(r => r.Add(It.IsAny<PlanAssignment>()), Times.Never);
//                 }

//                 [Test]
//                 public void AssignPlanToClient_Throws_WhenWorkoutPlanNotFoundOrUnauthorized()
//                 {
//                     // Arrange
//                     var coachId = Guid.NewGuid();
//                     var user = GetClaimsPrincipal(coachId);
//                     var client = new Client { Id = Guid.NewGuid(), Email = "client@example.com" };
//                     var assignmentDto = new PlanAssignmentRequestDTO
//                     {
//                         ClientEmail = client.Email,
//                         WorkoutName = "NonExistent Workout"
//                     };

//                     _clientRepositoryMock.Setup(r => r.GetAll()).ReturnsAsync(new List<Client> { client });
//                     _workoutPlanRepositoryMock.Setup(r => r.GetAll()).ReturnsAsync(new List<WorkoutPlan>()); // No workout plans

//                     // Act & Assert
//                     var ex = Assert.ThrowsAsync<Exception>(() => _coachService.AssignPlanToClient(assignmentDto, user));
//                     Assert.That(ex.Message, Is.EqualTo("Workout plan not found or not owned by this coach"));
//                     _planAssignmentRepositoryMock.Verify(r => r.Add(It.IsAny<PlanAssignment>()), Times.Never);
//                 }

//                 [Test]
//                 public void AssignPlanToClient_Throws_WhenDietPlanNotFoundOrUnauthorized()
//                 {
//                     // Arrange
//                     var coachId = Guid.NewGuid();
//                     var user = GetClaimsPrincipal(coachId);
//                     var client = new Client { Id = Guid.NewGuid(), Email = "client@example.com" };
//                     var workoutPlan = new WorkoutPlan { Id = Guid.NewGuid(), Title = "Full Body", CoachId = coachId };
//                     var assignmentDto = new PlanAssignmentRequestDTO
//                     {
//                         ClientEmail = client.Email,
//                         WorkoutName = workoutPlan.Title,
//                         DietPlanName = "NonExistent Diet"
//                     };

//                     _clientRepositoryMock.Setup(r => r.GetAll()).ReturnsAsync(new List<Client> { client });
//                     _workoutPlanRepositoryMock.Setup(r => r.GetAll()).ReturnsAsync(new List<WorkoutPlan> { workoutPlan });
//                     _dietPlanRepositoryMock.Setup(r => r.GetAll()).ReturnsAsync(new List<DietPlan>()); // No diet plans

//                     // Act & Assert
//                     var ex = Assert.ThrowsAsync<Exception>(() => _coachService.AssignPlanToClient(assignmentDto, user));
//                     Assert.That(ex.Message, Is.EqualTo("Diet plan not found or not owned by this coach"));
//                     _planAssignmentRepositoryMock.Verify(r => r.Add(It.IsAny<PlanAssignment>()), Times.Never);
//                 }

//                 // --- GetAssignedPlans Tests ---
//                 [Test]
//                 public async Task GetAssignedPlans_ReturnsAssignedPlansForClient()
//                 {
//                     // Arrange
//                     var coachId = Guid.NewGuid();
//                     var user = GetClaimsPrincipal(coachId);
//                     var clientId = Guid.NewGuid();
//                     var clientEmail = "testclient@example.com";
//                     var workoutPlanId = Guid.NewGuid();
//                     var dietPlanId = Guid.NewGuid();

//                     var client = new Client { Id = clientId, Email = clientEmail };
//                     var workoutPlan = new WorkoutPlan { Id = workoutPlanId, Title = "Strength Plan" };
//                     var dietPlan = new DietPlan { Id = dietPlanId, DietTitle = "Bulking Diet" };
//                     var assignment = new PlanAssignment
//                     {
//                         Id = Guid.NewGuid(),
//                         ClientId = clientId,
//                         WorkoutPlanId = workoutPlanId,
//                         DietPlanId = dietPlanId,
//                         AssignedByCoachId = coachId
//                     };

//                     _clientRepositoryMock.Setup(r => r.GetAll()).ReturnsAsync(new List<Client> { client });
//                     _planAssignmentRepositoryMock.Setup(r => r.GetAll()).ReturnsAsync(new List<PlanAssignment> { assignment });
//                     _workoutPlanRepositoryMock.Setup(r => r.Get(workoutPlanId)).ReturnsAsync(workoutPlan);
//                     _dietPlanRepositoryMock.Setup(r => r.Get(dietPlanId)).ReturnsAsync(dietPlan);

//                     // Act
//                     var result = await _coachService.GetAssignedPlans(clientEmail, user);

//                     // Assert
//                     Assert.That(result, Is.Not.Null);
//                     Assert.That(result.Count, Is.EqualTo(1));
//                     Assert.That(result[0].WorkoutPlanTitle, Is.EqualTo("Strength Plan"));
//                     Assert.That(result[0].DietPlanTitle, Is.EqualTo("Bulking Diet"));
//                 }

//                 [Test]
//                 public async Task GetAssignedPlans_ReturnsNotAssigned_ForMissingPlans()
//                 {
//                     // Arrange
//                     var coachId = Guid.NewGuid();
//                     var user = GetClaimsPrincipal(coachId);
//                     var clientId = Guid.NewGuid();
//                     var clientEmail = "testclient@example.com";

//                     var client = new Client { Id = clientId, Email = clientEmail };
//                     var assignment = new PlanAssignment
//                     {
//                         Id = Guid.NewGuid(),
//                         ClientId = clientId,
//                         WorkoutPlanId = null, // No workout plan
//                         DietPlanId = null,    // No diet plan
//                         AssignedByCoachId = coachId
//                     };

//                     _clientRepositoryMock.Setup(r => r.GetAll()).ReturnsAsync(new List<Client> { client });
//                     _planAssignmentRepositoryMock.Setup(r => r.GetAll()).ReturnsAsync(new List<PlanAssignment> { assignment });

//                     // Act
//                     var result = await _coachService.GetAssignedPlans(clientEmail, user);

//                     // Assert
//                     Assert.That(result, Is.Not.Null);
//                     Assert.That(result.Count, Is.EqualTo(1));
//                     Assert.That(result[0].WorkoutPlanTitle, Is.EqualTo("Not Assigned"));
//                     Assert.That(result[0].DietPlanTitle, Is.EqualTo("Not Assigned"));
//                 }

//                 [Test]
//                 public void GetAssignedPlans_Throws_WhenClientNotFound()
//                 {
//                     // Arrange
//                     var coachId = Guid.NewGuid();
//                     var user = GetClaimsPrincipal(coachId);
//                     _clientRepositoryMock.Setup(r => r.GetAll()).ReturnsAsync(new List<Client>());

//                     // Act & Assert
//                     var ex = Assert.ThrowsAsync<Exception>(() => _coachService.GetAssignedPlans("nonexistent@example.com", user));
//                     Assert.That(ex.Message, Is.EqualTo("Client not found"));
//                 }

//                 // --- GetClientsWithoutAssignedPlans Tests ---
//                 [Test]
//                 public async Task GetClientsWithoutAssignedPlans_ReturnsClientsWithNoAssignments()
//                 {
//                     // Arrange
//                     var client1 = new Client { Id = Guid.NewGuid(), Name = "Client A", Email = "clienta@example.com" };
//                     var client2 = new Client { Id = Guid.NewGuid(), Name = "Client B", Email = "clientb@example.com" };
//                     var client3 = new Client { Id = Guid.NewGuid(), Name = "Client C", Email = "clientc@example.com" };

//                     var assignedPlan = new PlanAssignment { Id = Guid.NewGuid(), ClientId = client2.Id };

//                     _clientRepositoryMock.Setup(r => r.GetAll()).ReturnsAsync(new List<Client> { client1, client2, client3 });
//                     _planAssignmentRepositoryMock.Setup(r => r.GetAll()).ReturnsAsync(new List<PlanAssignment> { assignedPlan });

//                     // Act
//                     var result = await _coachService.GetClientsWithoutAssignedPlans();

//                     // Assert
//                     Assert.That(result.Count, Is.EqualTo(2));
//                     Assert.That(result.Any(c => c.Email == "clienta@example.com"), Is.True);
//                     Assert.That(result.Any(c => c.Email == "clientc@example.com"), Is.True);
//                     Assert.That(result.Any(c => c.Email == "clientb@example.com"), Is.False);
//                 }

//                 [Test]
//                 public async Task GetClientsWithoutAssignedPlans_ReturnsEmptyList_WhenAllClientsHaveAssignments()
//                 {
//                     // Arrange
//                     var client1 = new Client { Id = Guid.NewGuid(), Name = "Client A", Email = "clienta@example.com" };
//                     var assignedPlan = new PlanAssignment { Id = Guid.NewGuid(), ClientId = client1.Id };

//                     _clientRepositoryMock.Setup(r => r.GetAll()).ReturnsAsync(new List<Client> { client1 });
//                     _planAssignmentRepositoryMock.Setup(r => r.GetAll()).ReturnsAsync(new List<PlanAssignment> { assignedPlan });

//                     // Act
//                     var result = await _coachService.GetClientsWithoutAssignedPlans();

//                     // Assert
//                     Assert.That(result, Is.Empty);
//                 }

//                 [Test]
//                 public async Task GetClientsWithoutAssignedPlans_ReturnsAllClients_WhenNoAssignmentsExist()
//                 {
//                     // Arrange
//                     var client1 = new Client { Id = Guid.NewGuid(), Name = "Client A", Email = "clienta@example.com" };
//                     var client2 = new Client { Id = Guid.NewGuid(), Name = "Client B", Email = "clientb@example.com" };

//                     _clientRepositoryMock.Setup(r => r.GetAll()).ReturnsAsync(new List<Client> { client1, client2 });
//                     _planAssignmentRepositoryMock.Setup(r => r.GetAll()).ReturnsAsync(new List<PlanAssignment>()); // No assignments

//                     // Act
//                     var result = await _coachService.GetClientsWithoutAssignedPlans();

//                     // Assert
//                     Assert.That(result.Count, Is.EqualTo(2));
//                     Assert.That(result.Any(c => c.Email == "clienta@example.com"), Is.True);
//                     Assert.That(result.Any(c => c.Email == "clientb@example.com"), Is.True);
//                 }
//             }
//         }
//     }
// }
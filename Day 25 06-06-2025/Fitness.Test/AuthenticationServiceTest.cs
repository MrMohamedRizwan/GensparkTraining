// using System;
// using System.Threading.Tasks;
// using FitnessTrackerAPI.Interfaces;
// using FitnessTrackerAPI.Models;
// using FitnessTrackerAPI.Models.DTOs;
// using FitnessTrackerAPI.Services;
// using Microsoft.Extensions.Logging;
// using Moq;
// using NUnit.Framework;

// namespace FitnessTrackerAPI.Tests
// {
//     public class AuthenticationServiceTests
//     {
//         private Mock<ITokenService> _tokenServiceMock;
//         private Mock<IEncryptionService> _encryptionServiceMock;
//         private Mock<IRepository<string, User>> _userRepositoryMock;
//         private Mock<ILogger<AuthenticationService>> _loggerMock;
//         private AuthenticationService _service;

//         [SetUp]
//         public void Setup()
//         {
//             _tokenServiceMock = new Mock<ITokenService>();
//             _encryptionServiceMock = new Mock<IEncryptionService>();
//             _userRepositoryMock = new Mock<IRepository<string, User>>();
//             _loggerMock = new Mock<ILogger<AuthenticationService>>();

//             _service = new AuthenticationService(
//                 _tokenServiceMock.Object,
//                 _encryptionServiceMock.Object,
//                 _userRepositoryMock.Object,
//                 _loggerMock.Object
//             );
//         }

//         [Test]
//         public async Task Login_ReturnsUserLoginResponse_WhenCredentialsAreValid()
//         {
//             // Arrange
//             var userRequest = new UserLoginRequest { Username = "test@example.com", Password = "password" };
//             var dbUser = new User { Email = "test@example.com", Password = System.Text.Encoding.UTF8.GetBytes("hashedPassword") };
//             _userRepositoryMock.Setup(r => r.Get(userRequest.Username)).ReturnsAsync(dbUser);
//             _encryptionServiceMock.Setup(e => e.Verify(userRequest.Password, dbUser.Password)).Returns(true);
//             _tokenServiceMock.Setup(t => t.GenerateToken(dbUser)).ReturnsAsync("jwt-token");

//             // Act
//             var result = await _service.Login(userRequest);

//             // Assert
//             Assert.That(result, Is.Not.Null);
//             Assert.That( result.Username, Is.EqualTo("test@example.com"));
//             Assert.That(result.Token, Is.EqualTo("jwt-token"));
//         }

//         [Test]
//         public void Login_ThrowsException_WhenUserNotFound()
//         {
//             // Arrange
//             var userRequest = new UserLoginRequest { Username = "notfound@example.com", Password = "password" };
//             _userRepositoryMock.Setup(r => r.Get(userRequest.Username)).ReturnsAsync((User)null);

//             // Act & Assert
//             var ex = Assert.ThrowsAsync<Exception>(() => _service.Login(userRequest));
//             Assert.That(ex.Message, Is.EqualTo("No such user"));
//         }

//         [Test]
//         public void Login_ThrowsException_WhenPasswordInvalid()
//         {
//             // Arrange
//             var userRequest = new UserLoginRequest { Username = "test@example.com", Password = "wrongpassword" };
//             var dbUser = new User { Email = "test@example.com", Password = System.Text.Encoding.UTF8.GetBytes("hashedPassword") };
//             _userRepositoryMock.Setup(r => r.Get(userRequest.Username)).ReturnsAsync(dbUser);
//             _encryptionServiceMock.Setup(e => e.Verify(userRequest.Password, dbUser.Password)).Returns(false);

//             // Act & Assert
//             var ex = Assert.ThrowsAsync<Exception>(() => _service.Login(userRequest));
//             Assert.That(ex.Message, Is.EqualTo("Invalid password"));
//         }
//     }
// }
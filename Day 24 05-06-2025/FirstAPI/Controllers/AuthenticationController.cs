
using System.Security.Claims;
using FirstAPI.Interfaces;
using FirstAPI.Models.DTOs;
using FirstAPI.Models.DTOs.DoctorSpecialities;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;


namespace FirstAPI.Controllers
{


    [ApiController]
    [Route("/api/[controller]")]
    public class AuthenticationController : ControllerBase
    {
        private readonly Interfaces.IAuthenticationService _authenticationService;
        private readonly ILogger<AuthenticationController> _logger;

        public AuthenticationController(Interfaces.IAuthenticationService authenticationService, ILogger<AuthenticationController> logger)
        {
            _authenticationService = authenticationService;
            _logger = logger;
        }
        [HttpPost]
        [CustomeExceptionFilter]
        public async Task<ActionResult<UserLoginResponse>> UserLogin(UserLoginRequest loginRequest)
        {
            /*try
            {
                var result = await _authenticationService.Login(loginRequest);
                return Ok(result);
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return Unauthorized(e.Message);
            }*/
            var result = await _authenticationService.Login(loginRequest);
            return Ok(result);
        }
        [HttpGet("login")]
        public IActionResult Login()
        {
            var redirectUrl = Url.Action("response", "Authentication");

            var properties = new AuthenticationProperties
            {
                RedirectUri = redirectUrl
            };
            properties.Items["prompt"] = "select_account";

            return Challenge(properties, "Google");
        }

        [HttpGet("response")]
        [CustomeExceptionFilter]
        public async Task<ActionResult<UserLoginResponse>> GoogleResponse()
        {
            var result = await HttpContext.AuthenticateAsync("Cookies");

            if (!result.Succeeded || result.Principal == null)
            {
                return Unauthorized("Google authentication failed.");
            }

            // Extract email from claims
            var email = result.Principal.FindFirst(c => c.Type == ClaimTypes.Email)?.Value;

            if (string.IsNullOrEmpty(email))
            {
                return BadRequest("Email not found in Google response.");
            }
            var accessToken = result.Properties.GetTokenValue("access_token");
            var idToken = result.Properties.GetTokenValue("id_token");

            Console.WriteLine($"Access Token: {accessToken}");
            Console.WriteLine($"ID Token: {idToken}");

            var loginResult = await _authenticationService.Loginbyoauth(email);
            return Ok(loginResult);
        }


    }
}
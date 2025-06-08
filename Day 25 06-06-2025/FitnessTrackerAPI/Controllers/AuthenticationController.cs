using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FitnessTrackerAPI.Interfaces;
using FitnessTrackerAPI.Models.DTOs;
using Microsoft.AspNetCore.Mvc;
using FitnessTrackerAPI.Misc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace FitnessTrackerAPI.Controllers
{
    [ApiController]
    [ApiVersion("1.0")]
    [Route("/api/v{version:apiVersion}/[controller]")]
    [CustomExceptionFilter]
    
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthenticationService _authenticationService;
        public AuthenticationController(IAuthenticationService authenticationService)
        {
            _authenticationService = authenticationService;
        }
        [HttpPost]

        public async Task<ActionResult<UserLoginResponse>> PostClient([FromBody] UserLoginRequest loginRequest)
        {
            var result = await _authenticationService.Login(loginRequest);
            return Ok(result);
        }

    }
}
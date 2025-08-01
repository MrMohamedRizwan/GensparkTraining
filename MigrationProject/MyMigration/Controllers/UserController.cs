using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MyMigration.Interfaces;
using MyMigration.Models.DTOs;

namespace MyMigration.Controllers
{
    [Route("/api/[controller]")]

    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateUser([FromBody] UserAddRequestDTO user)
        {
            if (user == null)
            {
                return BadRequest("User cannot be null");
            }

            try
            {
                var result = await _userService.CreateUser(user);
                if (result)
                {
                    return Ok(new { message = "User created successfully" });
                }
                else
                {
                    return BadRequest("Failed to create user");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpGet("all")]
        public async Task<ActionResult<UserRepsonseDTO>> GetAllUsers()
        {
            try
            {
                var users = await _userService.GetAllUsers();
                return Ok(users);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<UserRepsonseDTO>> GetUserById(Guid id)
        {
            try
            {
                var user = await _userService.GetUserById(id);
                if (user == null)
                {
                    return NotFound("User not found");
                }
                return Ok(user);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpPost("signup")]
        public async Task<ActionResult<SignUpResponseDTO>> SignUp([FromBody] UserAddRequestDTO user)
        {
            if (user == null)
            {
                return BadRequest("User cannot be null");
            }

            try
            {
                var signUpResponse = await _userService.SignUp(user);
                return Ok(signUpResponse);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

    }
}
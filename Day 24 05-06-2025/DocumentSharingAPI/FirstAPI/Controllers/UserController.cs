using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FirstAPI.Interfaces;
using FirstAPI.Models;
using FirstAPI.Models.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace FirstAPI.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class UserController:ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }
        [HttpPost]
        public async Task<ActionResult<User>> Postuser([FromBody] AddUserDTO user)
        {
            try
            {
                System.Console.WriteLine("Postuser");
                var newuser = await _userService.AddUser(user);
                if (newuser != null)
                    return Ok("User Created");
                return BadRequest("Unable to process request at this moment");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
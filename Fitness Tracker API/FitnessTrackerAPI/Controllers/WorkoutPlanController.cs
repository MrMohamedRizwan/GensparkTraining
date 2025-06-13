using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FitnessTrackerAPI.Interfaces;
using FitnessTrackerAPI.Models.DTOs;
using FitnessTrackerAPI.Models.WorkoutModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FitnessTrackerAPI.Controllers
{
    [ApiController]
    [ApiVersion("1.0")]
    [Route("/api/v{version:apiVersion}/[controller]")]
    public class WorkoutPlanController : ControllerBase
    {
        private readonly IWorkoutPlan _workoutplanService;

        public WorkoutPlanController(IWorkoutPlan workoutplanService)
        {
            _workoutplanService = workoutplanService;
        } 

        [Authorize(Roles = "Coach")]
        [HttpPost("AddWorkoutPlans")]
        public async Task<ActionResult<WorkoutPlan>> CreateWorkout([FromBody] WorkoutPlanCreateRequestDTO workout)
        {
            try
            {
                var newWorkout = await _workoutplanService.AddWorkoutPlan(workout, User);
                if (newWorkout != null)
                    return Created("", newWorkout);
                return BadRequest("Unable to process request at this moment");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [Authorize(Roles = "Coach")]
        [HttpPut("EditWorkoutPlan/{title}")]
        public async Task<IActionResult> UpdateWorkoutByTitle(string title, [FromBody] WorkoutPlanCreateRequestDTO dto)
        {
            try
            {
                var updatedPlan = await _workoutplanService.UpdateWorkoutPlanByTitle(title, dto, User);
                return Ok(new
                {
                    Message = "Workout plan updated successfully",
                    PlanId = updatedPlan.Id,
                    Title = updatedPlan.Title,
                    Workouts = updatedPlan.Exercises?.Select(m => new
                    {
                        m.Name,
                        m.Notes,
                        m.Reps,
                        m.RestSeconds,
                        m.Sets,
                    })
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Error = ex.Message });
            }
        }

        [HttpDelete("Delete-Workout/{title}")]
        public async Task<IActionResult> DeleteWorkoutByTitle(string title)
        {
            try
            {
                var success = await _workoutplanService.DeleteWorkoutPlanByTitle(title, User);
                if (success)
                    return Ok(new { Message = $"Workout plan '{title}' deleted successfully" });
                return NotFound(new { Message = "Workout plan not found" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Error = ex.Message });
            }
        }

        [Authorize(Roles = "Coach")]
        [HttpGet("workout/all")]
        public async Task<IActionResult> GetAllWorkoutPlans([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        {
            try
            {
                var plans = await _workoutplanService.GetAllWorkoutPlansDTO(User,pageNumber, pageSize);
                return Ok(plans);
            }
            catch (Exception ex)
            {
                return BadRequest(new { Error = ex.Message });
            }
        }

        [HttpGet("Workoutplan/{title}")]
        [Authorize(Roles = "Coach")]
        public async Task<IActionResult> GetWorkoutPlanByTitle(string title)
        {
            System.Console.WriteLine($"{title}💕");
            var result = await _workoutplanService.GetWorkouttPlanByTitle(title, User);
            if (result == null)
                return NotFound(new { message = "Workout plan not found" });

            return Ok(result);


        }
    }
}
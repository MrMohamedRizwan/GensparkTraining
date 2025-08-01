using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyMigration.Context;
using MyMigration.Interfaces;
using MyMigration.Models;
using MyMigration.Models.DTOs;

namespace MyMigration.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class ColorsController : ControllerBase
    {
        private readonly IColorService _service;

        public ColorsController(IColorService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Color>>> GetColors()
        {
            var colors = await _service.GetColors();
            return Ok(colors);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Color>> GetColor(Guid id)
        {
            var color = await _service.GetColor(id);
            if (color == null)
                return NotFound();
            
            return Ok(color);
        }

        [HttpPost]
        public async Task<ActionResult<Color>> PostColor(ColorAddRequestDTO color)
        {
            var created = await _service.CreateColor(color);
            return Ok(new { message = "Color created successfully." });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutColor(Guid id, ColorAddRequestDTO color)
        {
            var updated = await _service.UpdateColor(id, color);
            if (!updated)
                return NotFound();

            return Ok(new { message = "Color updated successfully." });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteColor(Guid id)
        {
            var deleted = await _service.DeleteColor(id);
            if (!deleted)
                return NotFound();

            return Ok(new { message = "Color deleted successfully." });
        }
    }
}
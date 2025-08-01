using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MyMigration.Context;
using MyMigration.Interfaces;
using MyMigration.Models;
using MyMigration.Models.DTOs;

namespace MyMigration.Services
{
    public class ColorService:IColorService
    {
        
        private readonly IRepository<Guid, Color> _colorRepository;
        public ColorService(IRepository<Guid, Color> colorRepository)
        {
            _colorRepository = colorRepository;
        }

        public async Task<IEnumerable<Color>> GetColors()
        {
            return await _colorRepository.GetAll();
        }

        public async Task<Color?> GetColor(Guid id)
        {
            return await _colorRepository.Get(id);
        }

        public async Task<bool> CreateColor(ColorAddRequestDTO color)
        {
            if (color == null)
            {
                throw new ArgumentNullException(nameof(color), "Color cannot be null");
            }
            var existingColor = (await _colorRepository.GetAll()).FirstOrDefault(c => c.Color1 == color.Name);
            if (existingColor != null)
            {
                throw new Exception("Color Already Exist");
            }
            var newColor = new Color
            {
                ColorId = Guid.NewGuid(),
                Color1 = color.Name,
            };
            try
            {
                await _colorRepository.Add(newColor);
                return true;
            }
            catch (Exception ex)
            {
                return false;
                throw new Exception($"An error occurred while creating the color: {ex.Message}", ex);
            }
        }

        public async Task<bool> UpdateColor(Guid id, ColorAddRequestDTO color)
        {
            if (id == null)
            {
                throw new ArgumentException("Color ID should not be null");
            }
            if (color == null)
            {
                throw new ArgumentNullException(nameof(color), "Color cannot be null");
            }
            var existingColor = await _colorRepository.Get(id);
            if (existingColor == null)
            {
                throw new Exception("Color not found");
            }
            existingColor.Color1 = color.Name;


            try
            {
                await _colorRepository.Update(id, existingColor);

                return true;
            }
            catch (DbUpdateConcurrencyException)
            {
                return false;
            }
        }

        public async Task<bool> DeleteColor(Guid id)
        {
            var color = await _colorRepository.Get(id);
            if (color == null)
                return false;
            try
            {
                await _colorRepository.Delete(id);
                
                return true;
            }
            catch (Exception ex)
            {
                return false;
                throw new Exception($"An error occurred while deleting the color: {ex.Message}", ex);
            }
 
        }

        
    }
}
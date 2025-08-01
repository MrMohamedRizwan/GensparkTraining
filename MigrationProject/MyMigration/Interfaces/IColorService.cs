using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MyMigration.Models;
using MyMigration.Models.DTOs;

namespace MyMigration.Interfaces
{
    public interface IColorService
    {
        Task<IEnumerable<Color>> GetColors();
        Task<Color?> GetColor(Guid id);
        Task<bool> CreateColor(ColorAddRequestDTO color);
        Task<bool> UpdateColor(Guid id, ColorAddRequestDTO color);
        Task<bool> DeleteColor(Guid id);
    }
}
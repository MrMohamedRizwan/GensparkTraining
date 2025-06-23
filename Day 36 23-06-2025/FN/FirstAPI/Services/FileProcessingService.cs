using System.Data;
using FirstAPI.Contexts;
using FirstAPI.Interfaces;
using FirstAPI.Models.DTOs;
using Microsoft.EntityFrameworkCore;

namespace FirstAPI.Services
{
    public class FileProcessingService : IFileProcessingService
    {
        public readonly ClinicContext _context;
        public FileProcessingService(ClinicContext context)
        {
            _context = context;
        }

        public async Task<FileUploadReturnDTO> ProcessData(CsvUploadDto csvUploadDto)
        {
            var connection = _context.Database.GetDbConnection();
            await connection.OpenAsync();

            using var command = connection.CreateCommand();
            command.CommandText = "SELECT * FROM process_csv(:csv_input)";
            command.CommandType = CommandType.Text;

            // 🧹 Clean the CSV content to remove null bytes
            var sanitizedContent = csvUploadDto.CsvContent?.Replace("\0", string.Empty);

            var param = command.CreateParameter();
            param.ParameterName = "csv_input";
            param.Value = sanitizedContent;
            command.Parameters.Add(param);

            using var reader = await command.ExecuteReaderAsync();

            var errorRows = new List<string>();
            while (await reader.ReadAsync())
            {
                errorRows.Add(reader.GetString(0));
            }

            return new FileUploadReturnDTO
            {
                Inserted = "CSV Processed",
                Errors = errorRows.ToArray()
            };
        }

    }
}
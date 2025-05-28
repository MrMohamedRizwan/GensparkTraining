using FirstAPI.Contexts;
using FirstAPI.Interfaces;
using FirstAPI.Models;
using FirstAPI.Repositories;
using FirstAPI.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// ✅ Add Swagger service
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add your other services
builder.Services.AddControllers();
builder.Services.AddTransient<IRepository<int, Doctor>, DoctorRepo>();
builder.Services.AddTransient<IRepository<int, Patient>, PatinetRepo>();
builder.Services.AddTransient<IRepository<int, Specality>, SpecialityRepo>();
builder.Services.AddTransient<IRepository<string, Appointment>, AppointmentRepo>();
builder.Services.AddTransient<IRepository<int, Doctor>, DoctorRepo>();
builder.Services.AddScoped<IDoctorService, DoctorService>();
builder.Services.AddTransient<IRepository<int, DoctorSpecality>, DoctorSpecalityRepo>();




builder.Services.AddDbContext<ClinicContext>(opts =>
{
    opts.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
});
var app = builder.Build();

// ✅ Enable Swagger only in development (optional but recommended)
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();            // Serve the Swagger JSON endpoint
    app.UseSwaggerUI();         // Serve the Swagger UI
}

app.MapControllers();
app.Run();

// Sample record (optional)
record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}

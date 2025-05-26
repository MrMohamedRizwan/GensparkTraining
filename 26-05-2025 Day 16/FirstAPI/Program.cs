var builder = WebApplication.CreateBuilder(args);

// ✅ Add Swagger service
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add your other services
builder.Services.AddControllers();

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

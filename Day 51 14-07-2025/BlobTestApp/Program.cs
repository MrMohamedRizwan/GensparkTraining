using BlobTestApp.Services;
using BlobTestAppBlobTestApp.Misc;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
Log.Logger = new LoggerConfiguration()
    .Enrich.FromLogContext()
    .WriteTo.Console()
    .WriteTo.File("Logs/log.txt", rollingInterval: RollingInterval.Day)
    .CreateLogger();

// Add your custom service
builder.Services.AddSingleton<BlobStorageService>();
builder.Services.AddHttpClient(); // ✅ Register IHttpClientFactory

builder.Host.UseSerilog(); 
var app = builder.Build();

// Enable Swagger middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseMiddleware<LoggingMiddleWare>();


app.UseHttpsRedirection();
app.UseAuthorization();

app.MapControllers(); // <-- 👈 Important to register your [ApiController]

app.Run();

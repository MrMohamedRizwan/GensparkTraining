using Azure.Storage.Blobs;
using Microsoft.EntityFrameworkCore;
using MyWebApi.Context;
using MyWebApi.Interfaces;
using MyWebApi.Models;
using MyWebApi.Repository;
using MyWebApi.Service;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// DB Context
builder.Services.AddDbContext<VideoContext>(opts =>
{
    opts.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
});

// 🟡 Register BlobContainerClient using the SAS URL
builder.Services.AddSingleton(provider =>
{
    var configuration = provider.GetRequiredService<IConfiguration>();
    var sasUrl = configuration["AzureBlob:ContainerSasUrl"];
    return new BlobContainerClient(new Uri(sasUrl));
});

// Register BlobStorageService with injected BlobContainerClient
builder.Services.AddTransient<BlobStorageService>();

// Repositories and Services
builder.Services.AddTransient<IVideoService, VideoService>();
builder.Services.AddTransient<IRepository<Guid, Video>, VideoRepository>();

// CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.UseCors();

app.MapControllers();
app.Run();

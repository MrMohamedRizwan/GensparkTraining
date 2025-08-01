using MyMigration.Context;
using Microsoft.EntityFrameworkCore;
using Npgsql.EntityFrameworkCore.PostgreSQL;
using MyMigration.Interfaces;
using MyMigration.Services;
using MyMigration.Models;
using MyMigration.Repository;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Claims;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddEndpointsApiExplorer(); // Enables minimal APIs to be included
builder.Services.AddSwaggerGen();

builder.Services.AddControllers()
                .AddJsonOptions(opts =>
                {
                    opts.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.Preserve;
                    opts.JsonSerializerOptions.WriteIndented = true;
                });
builder.Services.AddDbContext<MigrationContext>(opts =>
{
    opts.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));

});

#region  Session
builder.Services.AddDistributedMemoryCache();

// Add session service
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(30); // Optional: customize timeout
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
});
#endregion
#region AuthenticationFilter
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateAudience = false,
            ValidateIssuer = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Keys:JwtTokenKey"])),
                RoleClaimType = ClaimTypes.Role
        };

        options.Events = new JwtBearerEvents
        {
            OnChallenge = context =>
            {
                context.HandleResponse();

                context.Response.StatusCode = 401;
                context.Response.ContentType = "application/json";

                var result = System.Text.Json.JsonSerializer.Serialize(new
                {
                    error = "Authentication failed. Missing or invalid JWT token."
                });


                return context.Response.WriteAsync(result);
            },
            OnForbidden = context =>
            {
                 Console.WriteLine("\n\n ⚠️ OnForbidden triggered\n\n"); 
                context.Response.StatusCode = 403;
                context.Response.ContentType = "application/json";

                var result = System.Text.Json.JsonSerializer.Serialize(new
                {
                    error = "You do not have permission to access this resource."
                });

                return context.Response.WriteAsync(result);
            }
        };
    });
    #endregion
#region CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://127.0.0.1:5500","http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

#endregion


builder.Services.AddScoped<IRepository<Guid, Category>, CategoryRepository>();
builder.Services.AddScoped<ICategoryService, CategoryService>();

builder.Services.AddScoped<IRepository<Guid, Color>, ColorRepository>();
builder.Services.AddScoped<IColorService, ColorService>();

builder.Services.AddScoped<IRepository<Guid, News>, NewsRepository>();
builder.Services.AddScoped<INewsService, NewService>();

builder.Services.AddScoped<IEncryptionService, EncryptionService>();
builder.Services.AddScoped<ITokenService, TokenService>();

builder.Services.AddScoped<IRepository<Guid, User>, UserRepository>();
builder.Services.AddScoped<IUserService, UserService>();


builder.Services.AddScoped<IRepository<Guid, Order>, OrderRepository>();
builder.Services.AddScoped<IOrderService, OrderService>();

builder.Services.AddScoped<IRepository<Guid, Product>, ProductRepository>();
builder.Services.AddScoped<IProductService, ProductService>();

builder.Services.AddScoped<IRepository<Guid, Model>, ModelRepository>();
builder.Services.AddScoped<IRepository<Guid, OrderDetail>, OrderDetailRepository>();


builder.Services.AddScoped<ICartService,CartService>();
// builder.Services.AddScoped<IModelService, ModelService>();

// builder.Services.AddScoped<IRepository<Guid, Cart>, >();
// builder.Services.AddScoped<IUserService, UserService>();





var app = builder.Build();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
app.UseSwagger();
app.UseSwaggerUI(); 
}

// app.UseHttpsRedirection();
app.UseSession();

app.UseCors(); ;

app.UseAuthentication(); // If using JWT
app.UseAuthorization();
app.MapControllers();


app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}

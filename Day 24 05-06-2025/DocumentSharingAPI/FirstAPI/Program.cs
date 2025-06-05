using System.Security.Claims;
using System.Text;
using FirstAPI.Contexts;
using FirstAPI.Hubs;
using FirstAPI.Interfaces;
using FirstAPI.Misc;
using FirstAPI.Models;
using FirstAPI.Repositories;
using FirstAPI.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Npgsql.Replication.PgOutput.Messages;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(opt =>
{
    opt.SwaggerDoc("v1", new OpenApiInfo { Title = "Clinic API", Version = "v1" });
    opt.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter token",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        BearerFormat = "JWT",
        Scheme = "bearer"
    });
    opt.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type=ReferenceType.SecurityScheme,
                    Id="Bearer"
                }
            },
            new string[]{}
        }
    });
});
builder.Services.AddControllers()
                .AddJsonOptions(opts =>
                {
                    opts.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.Preserve;
                    opts.JsonSerializerOptions.WriteIndented = true;
                });

builder.Logging.AddLog4Net();

builder.Services.AddDbContext<UserContext>(opts =>
{
    opts.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
});
#region  Repositories
builder.Services.AddTransient<IRepository<string, User>, UserRepository>();
#endregion

#region Services
builder.Services.AddTransient<IEncryptionService, EncryptionService>();
builder.Services.AddTransient<ITokenService, TokenService>();
builder.Services.AddTransient<IAuthenticationService, AuthenticationService>();
builder.Services.AddTransient<IUserService, UserService>();
builder.Services.AddTransient<IFileHandlerService, FileHandlerService>();

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
                context.HandleResponse(); // prevent default 401 body

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

// builder.Services.AddAuthentication(options =>
// {
//     options.DefaultScheme = "Cookies";
//     options.DefaultChallengeScheme = "Google";
// })
// .AddCookie("Cookies")
// .AddGoogle("Google", options =>
// {
//     options.ClientId = builder.Configuration["Authentication:Google:ClientId"];
//     options.ClientSecret = builder.Configuration["Authentication:Google:ClientSecret"];
//     options.SaveTokens = true; 
//     options.Scope.Add("openid"); 
//     options.Scope.Add("profile");
//     options.Scope.Add("email");
// });  

// builder.Services.AddScoped<IAuthorizationHandler,DoctorHandler>();

// builder.Services.AddAuthorization(options =>
// {
//     options.AddPolicy("ExperiencedDoctorOnly", policy =>
//         policy.Requirements.Add(new DoctorRequirement(3)));
// });


#endregion

#region  Misc
builder.Services.AddAutoMapper(typeof(User));

#endregion

#region CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://127.0.0.1:5501")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

#endregion
builder.Services.AddSignalR();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();
app.UseAuthentication();
app.UseAuthorization();
app.MapHub<NotificationHub>("/documentHub");


app.MapControllers();

app.Run();



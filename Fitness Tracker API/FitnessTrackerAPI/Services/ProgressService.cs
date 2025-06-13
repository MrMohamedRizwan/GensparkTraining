using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using FitnessTrackerAPI.Interfaces;
using FitnessTrackerAPI.Models;
using FitnessTrackerAPI.Models.DTOs;

namespace FitnessTrackerAPI.Services
{
    public class ProgressService : IProgressService
    {
        private readonly IRepository<Guid, Progress> _progressRepo;
        private readonly IRepository<Guid, Client> _clientRepo;
        private readonly IRepository<Guid, PlanAssignment> _planAssignmentRepo;
        private readonly IAWSService _awsS3Service;

        public ProgressService(IRepository<Guid, Progress> progressRepo,
                               IRepository<Guid, Client> clientRepo,
                               IRepository<Guid, PlanAssignment> planAssignmentRepo,
                               IAWSService awsS3Service
                               )
        {
            _progressRepo = progressRepo;
            _clientRepo = clientRepo;
            _planAssignmentRepo = planAssignmentRepo;
            _awsS3Service = awsS3Service;
        }
        public async Task<ProgressResponseDTO> AddProgressAsync(ProgressCreateDTO dto, ClaimsPrincipal user)
        {
            var clientIdClaim = user.FindFirst("UserId")?.Value;
            if (string.IsNullOrEmpty(clientIdClaim) || !Guid.TryParse(clientIdClaim, out var clientId))
                throw new UnauthorizedAccessException("Invalid or missing Client ID.");

            var client = await _clientRepo.Get(clientId);
            if (client == null)
                throw new InvalidOperationException("Client not found.");

            // Upload file and get the S3 key
            string objectKey = await _awsS3Service.UploadFileAsync(dto.ImageFile, "progress-images");

            var progress = new Progress
            {
                Id = Guid.NewGuid(),
                ClientId = clientId,
                ImagePath = objectKey, // Store only the S3 object key in DB
                Height = dto.Height,
                Weight = dto.Weight,
                UploadedAt = DateTime.UtcNow
            };

            await _progressRepo.Add(progress);

            // Generate pre-signed URL with expiration for the client to view/download the image
            string preSignedUrl = _awsS3Service.GeneratePreSignedURL(objectKey, expiryMinutes: 60);

            return new ProgressResponseDTO
            {
                Id = progress.Id,
                ClientId = progress.ClientId,
                ImagePath = preSignedUrl,  // Return the temporary access URL
                Height = progress.Height,
                Weight = progress.Weight,
                UploadedAt = progress.UploadedAt
            };
        }


        public async Task<IEnumerable<ProgressResponseDTO>> GetProgressByClientIdAsync(Guid clientId, ClaimsPrincipal user)
        {
            var role = user.FindFirst(ClaimTypes.Role)?.Value;
            var userIdClaim = user.FindFirst("UserId")?.Value;

            if (string.IsNullOrEmpty(userIdClaim) || !Guid.TryParse(userIdClaim, out var userId))
                throw new UnauthorizedAccessException("Invalid User ID");

            if (role == "Coach")
            {
                // Verify coach is assigned to this client
                var assignments = await _planAssignmentRepo.GetAll();
                var assignedToCoach = assignments.Any(a => a.ClientId == clientId && a.AssignedByCoachId == userId);

                if (!assignedToCoach)
                    throw new UnauthorizedAccessException("Coach not assigned to this client.");
            }
            else if (role == "Client")
            {
                // Clients can only view their own progress
                if (clientId != userId)
                    throw new UnauthorizedAccessException("Clients can only access their own progress.");
            }
            else
            {
                throw new UnauthorizedAccessException("Invalid role.");
            }

            var allProgress = await _progressRepo.GetAll();
            return allProgress
                .Where(p => p.ClientId == clientId)
                .Select(p => new ProgressResponseDTO
                {
                    Id = p.Id,
                    ClientId = p.ClientId,
                    ImagePath = p.ImagePath,
                    Height = p.Height,
                    Weight = p.Weight,
                    UploadedAt = p.UploadedAt
                });
        }

        public async Task<IEnumerable<ProgressResponseDTO>> GetMyProgressAsync(ClaimsPrincipal user)
        {
            var clientIdClaim = user.FindFirst("UserId")?.Value;
            if (string.IsNullOrEmpty(clientIdClaim) || !Guid.TryParse(clientIdClaim, out var clientId))
                throw new UnauthorizedAccessException("Invalid or missing Client ID.");

            var allProgress = await _progressRepo.GetAll();
            return allProgress
                .Where(p => p.ClientId == clientId)
                .Select(p => new ProgressResponseDTO
                {
                    Id = p.Id,
                    ClientId = p.ClientId,
                    ImagePath = p.ImagePath,
                    Height = p.Height,
                    Weight = p.Weight,
                    UploadedAt = p.UploadedAt
                });
        }
    }


}
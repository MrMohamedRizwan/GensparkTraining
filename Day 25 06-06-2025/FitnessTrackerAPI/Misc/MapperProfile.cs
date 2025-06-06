using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using FitnessTrackerAPI.Models;
using FitnessTrackerAPI.Models.DTOs;

namespace FitnessTrackerAPI.Misc
{
    public class MapperProfile: Profile
    {
        public MapperProfile()
        {
            CreateMap<CoachAddRequestDTO, User>()
            .ForMember(dest => dest.Email, act => act.MapFrom(src => src.Email))
            .ForMember(dest => dest.Password, opt => opt.Ignore());

            CreateMap<User, CoachAddRequestDTO>()
            .ForMember(dest => dest.Email, act => act.MapFrom(src => src.Email));
            CreateMap<CoachAddRequestDTO, Coach>()
            .ForMember(dest => dest.Email, act => act.MapFrom(src => src.Email));

            CreateMap<ClientAddRequestDTO, User>()
            .ForMember(dest => dest.Email, act => act.MapFrom(src => src.Email))
            .ForMember(dest => dest.Password, opt => opt.Ignore());

            CreateMap<User, ClientAddRequestDTO>()
            .ForMember(dest => dest.Email, act => act.MapFrom(src => src.Email));
            CreateMap<ClientAddRequestDTO, Client>()
            .ForMember(dest => dest.Email, act => act.MapFrom(src => src.Email));
            // CreateMap<PatientaddRequestDTO, User>()
            // .ForMember(dest => dest.Username, act => act.MapFrom(src => src.Email))
            // .ForMember(dest => dest.Password, opt => opt.Ignore());

            // CreateMap<User, PatientaddRequestDTO>()
            // .ForMember(dest => dest.Email, act => act.MapFrom(src => src.Username));

            // CreateMap<PatientaddRequestDTO, Patient>();
        }
    }
}
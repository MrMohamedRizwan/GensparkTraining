using AutoMapper;
using FirstAPI.Models;
using FirstAPI.Models.DTOs;
using FirstAPI.Models.DTOs.DoctorSpecialities;

namespace FirstAPI.Misc
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<AddUserDTO, User>()
                .ForMember(dest => dest.email, act => act.MapFrom(src => src.email))
                .ForMember(dest => dest.Username, act => act.MapFrom(src => src.Name))
                .ForMember(dest => dest.Role, act => act.MapFrom(src => src.Role))
                .ForMember(dest => dest.Password, opt => opt.Ignore()) // because you'll encrypt it later
                .ForMember(dest => dest.HashKey, opt => opt.Ignore());  // if it's also handled separately
        }
    }
}
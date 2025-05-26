using AutoMapper;
using CotacaoAPI.Application.DTOs;
using CotacaoAPI.Domain.Entities;

namespace CotacaoAPI.Application.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Company Mappings
            CreateMap<Company, CompanyDto>();
            CreateMap<CreateCompanyDto, Company>();
            CreateMap<UpdateCompanyDto, Company>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.CNPJ, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedAt, opt => opt.Ignore());

            // Employee Mappings
            CreateMap<Employee, EmployeeDto>()
                .ForMember(dest => dest.CompanyName, opt => opt.MapFrom(src => src.Company.Name));
            CreateMap<CreateEmployeeDto, Employee>();
            CreateMap<UpdateEmployeeDto, Employee>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedAt, opt => opt.Ignore())
                .ForMember(dest => dest.CompanyId, opt => opt.Ignore());

            // PurchaseAnnouncement Mappings
            CreateMap<PurchaseAnnouncement, PurchaseAnnouncementDto>()
                .ForMember(dest => dest.CompanyName, opt => opt.MapFrom(src => src.Company.Name))
                .ForMember(dest => dest.EmployeeName, opt => opt.MapFrom(src => src.Employee.Name))
                .ForMember(dest => dest.ProposalCount, opt => opt.MapFrom(src => src.Proposals.Count));

            CreateMap<CreatePurchaseAnnouncementDto, PurchaseAnnouncement>();
            CreateMap<UpdatePurchaseAnnouncementDto, PurchaseAnnouncement>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedAt, opt => opt.Ignore())
                .ForMember(dest => dest.CompanyId, opt => opt.Ignore())
                .ForMember(dest => dest.EmployeeId, opt => opt.Ignore())
                .ForMember(dest => dest.Status, opt => opt.Ignore());

            // Proposal Mappings
            CreateMap<Proposal, ProposalDto>()
                .ForMember(dest => dest.CompanyName, opt => opt.MapFrom(src => src.Company.Name))
                .ForMember(dest => dest.CompanyEmail, opt => opt.MapFrom(src => src.Company.Email))
                .ForMember(dest => dest.CompanyPhone, opt => opt.MapFrom(src => src.Company.Phone ?? ""));

            CreateMap<CreateProposalDto, Proposal>();
        }
    }
}
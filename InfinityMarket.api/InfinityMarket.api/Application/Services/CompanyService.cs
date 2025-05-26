using AutoMapper;
using CotacaoAPI.Application.DTOs;
using CotacaoAPI.Domain.Entities;
using CotacaoAPI.Domain.Interfaces;

namespace CotacaoAPI.Application.Services
{
    public class CompanyService : ICompanyService
    {
        private readonly ICompanyRepository _companyRepository;
        private readonly IMapper _mapper;

        public CompanyService(ICompanyRepository companyRepository, IMapper mapper)
        {
            _companyRepository = companyRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<CompanyDto>> GetAllAsync()
        {
            var companies = await _companyRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<CompanyDto>>(companies);
        }

        public async Task<CompanyDto?> GetByIdAsync(int id)
        {
            var company = await _companyRepository.GetByIdAsync(id);
            return company == null ? null : _mapper.Map<CompanyDto>(company);
        }

        public async Task<CompanyDto> CreateAsync(CreateCompanyDto createDto)
        {
            // Verificar se CNPJ já existe
            if (await _companyRepository.CNPJExistsAsync(createDto.CNPJ))
            {
                throw new InvalidOperationException("CNPJ já cadastrado no sistema.");
            }

            var company = _mapper.Map<Company>(createDto);
            var createdCompany = await _companyRepository.CreateAsync(company);
            return _mapper.Map<CompanyDto>(createdCompany);
        }

        public async Task<CompanyDto> UpdateAsync(int id, UpdateCompanyDto updateDto)
        {
            var existingCompany = await _companyRepository.GetByIdAsync(id);
            if (existingCompany == null)
            {
                throw new KeyNotFoundException("Empresa não encontrada.");
            }

            _mapper.Map(updateDto, existingCompany);
            existingCompany.UpdatedAt = DateTime.UtcNow;

            var updatedCompany = await _companyRepository.UpdateAsync(existingCompany);
            return _mapper.Map<CompanyDto>(updatedCompany);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            if (!await _companyRepository.ExistsAsync(id))
            {
                throw new KeyNotFoundException("Empresa não encontrada.");
            }

            return await _companyRepository.DeleteAsync(id);
        }
    }
}
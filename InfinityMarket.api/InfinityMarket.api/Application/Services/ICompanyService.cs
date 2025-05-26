using CotacaoAPI.Application.DTOs;

namespace CotacaoAPI.Application.Services
{
    public interface ICompanyService
    {
        Task<IEnumerable<CompanyDto>> GetAllAsync();
        Task<CompanyDto?> GetByIdAsync(int id);
        Task<CompanyDto> CreateAsync(CreateCompanyDto createDto);
        Task<CompanyDto> UpdateAsync(int id, UpdateCompanyDto updateDto);
        Task<bool> DeleteAsync(int id);
    }
}
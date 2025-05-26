using CotacaoAPI.Application.DTOs;

namespace CotacaoAPI.Application.Services
{
    public interface IEmployeeService
    {
        Task<IEnumerable<EmployeeDto>> GetAllAsync();
        Task<IEnumerable<EmployeeDto>> GetByCompanyAsync(int companyId);
        Task<EmployeeDto?> GetByIdAsync(int id);
        Task<EmployeeDto> CreateAsync(CreateEmployeeDto createDto);
        Task<EmployeeDto> UpdateAsync(int id, UpdateEmployeeDto updateDto);
        Task<bool> DeleteAsync(int id);
    }
}
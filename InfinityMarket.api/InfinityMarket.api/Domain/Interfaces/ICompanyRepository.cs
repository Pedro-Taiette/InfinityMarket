using CotacaoAPI.Domain.Entities;

namespace CotacaoAPI.Domain.Interfaces
{
    public interface ICompanyRepository
    {
        Task<IEnumerable<Company>> GetAllAsync();
        Task<Company?> GetByIdAsync(int id);
        Task<Company?> GetByCNPJAsync(string cnpj);
        Task<Company> CreateAsync(Company company);
        Task<Company> UpdateAsync(Company company);
        Task<bool> DeleteAsync(int id);
        Task<bool> ExistsAsync(int id);
        Task<bool> CNPJExistsAsync(string cnpj, int? excludeId = null);
    }
}
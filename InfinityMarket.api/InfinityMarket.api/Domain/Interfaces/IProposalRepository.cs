using CotacaoAPI.Domain.Entities;

namespace CotacaoAPI.Domain.Interfaces
{
    public interface IProposalRepository
    {
        Task<IEnumerable<Proposal>> GetAllAsync();
        Task<IEnumerable<Proposal>> GetByAnnouncementAsync(int announcementId);
        Task<IEnumerable<Proposal>> GetByCompanyAsync(int companyId);
        Task<Proposal?> GetByIdAsync(int id);
        Task<Proposal> CreateAsync(Proposal proposal);
        Task<Proposal> UpdateAsync(Proposal proposal);
        Task<bool> DeleteAsync(int id);
        Task<bool> ExistsAsync(int id);
        Task<bool> CompanyHasProposalForAnnouncementAsync(int companyId, int announcementId);
    }
}
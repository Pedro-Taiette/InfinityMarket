using CotacaoAPI.Application.DTOs;

namespace CotacaoAPI.Application.Services
{
    public interface IProposalService
    {
        Task<IEnumerable<ProposalDto>> GetAllAsync();
        Task<IEnumerable<ProposalDto>> GetByAnnouncementAsync(int announcementId);
        Task<IEnumerable<ProposalDto>> GetByCompanyAsync(int companyId);
        Task<ProposalDto?> GetByIdAsync(int id);
        Task<ProposalDto> CreateAsync(CreateProposalDto createDto);
        Task<ProposalDto> UpdateAsync(int id, CreateProposalDto updateDto);
        Task<bool> DeleteAsync(int id);
    }
}
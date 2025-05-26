using CotacaoAPI.Domain.Entities;
using CotacaoAPI.Domain.Enums;

namespace CotacaoAPI.Domain.Interfaces
{
    public interface IPurchaseAnnouncementRepository
    {
        Task<IEnumerable<PurchaseAnnouncement>> GetAllAsync();
        Task<IEnumerable<PurchaseAnnouncement>> GetByStatusAsync(AnnouncementStatus status);
        Task<IEnumerable<PurchaseAnnouncement>> GetByCompanyAsync(int companyId);
        Task<PurchaseAnnouncement?> GetByIdAsync(int id);
        Task<PurchaseAnnouncement> CreateAsync(PurchaseAnnouncement announcement);
        Task<PurchaseAnnouncement> UpdateAsync(PurchaseAnnouncement announcement);
        Task<bool> DeleteAsync(int id);
        Task<bool> ExistsAsync(int id);
    }
}
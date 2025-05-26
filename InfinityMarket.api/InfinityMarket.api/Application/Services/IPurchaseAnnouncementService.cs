using CotacaoAPI.Application.DTOs;
using CotacaoAPI.Domain.Enums;

namespace CotacaoAPI.Application.Services
{
    public interface IPurchaseAnnouncementService
    {
        Task<IEnumerable<PurchaseAnnouncementDto>> GetAllAsync();
        Task<IEnumerable<PurchaseAnnouncementDto>> GetByStatusAsync(AnnouncementStatus status);
        Task<IEnumerable<PurchaseAnnouncementDto>> GetByCompanyAsync(int companyId);
        Task<PurchaseAnnouncementDto?> GetByIdAsync(int id);
        Task<PurchaseAnnouncementDto> CreateAsync(CreatePurchaseAnnouncementDto createDto);
        Task<PurchaseAnnouncementDto> UpdateAsync(int id, UpdatePurchaseAnnouncementDto updateDto);
        Task<bool> DeleteAsync(int id);
        Task<PurchaseAnnouncementDto> CloseAnnouncementAsync(int id);
    }
}
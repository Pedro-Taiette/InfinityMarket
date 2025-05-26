using CotacaoAPI.Application.DTOs;

namespace CotacaoAPI.Application.Services
{
    public interface ICertificateService
    {
        Task<string> GenerateCertificateAsync(int purchaseAnnouncementId);
        Task<string?> GetCertificateAsync(int purchaseAnnouncementId);
    }
}
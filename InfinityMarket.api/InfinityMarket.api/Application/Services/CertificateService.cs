using System.Text;
using CotacaoAPI.Domain.Entities;
using CotacaoAPI.Domain.Interfaces;

namespace CotacaoAPI.Application.Services
{
    public class CertificateService : ICertificateService
    {
        private readonly IPurchaseAnnouncementRepository _announcementRepository;
        private readonly IProposalRepository _proposalRepository;

        public CertificateService(
            IPurchaseAnnouncementRepository announcementRepository,
            IProposalRepository proposalRepository)
        {
            _announcementRepository = announcementRepository;
            _proposalRepository = proposalRepository;
        }

        public async Task<string> GenerateCertificateAsync(int purchaseAnnouncementId)
        {
            var announcement = await _announcementRepository.GetByIdAsync(purchaseAnnouncementId);
            if (announcement == null)
            {
                throw new KeyNotFoundException("Anúncio não encontrado.");
            }

            var proposals = await _proposalRepository.GetByAnnouncementAsync(purchaseAnnouncementId);
            var sortedProposals = proposals.OrderBy(p => p.TotalPrice).ToList();

            var certificate = GenerateCertificateContent(announcement, sortedProposals);

            // Salvar certificado no banco
            if (announcement.Certificate == null)
            {
                announcement.Certificate = new Certificate
                {
                    CertificateNumber = GenerateCertificateNumber(),
                    Content = certificate,
                    GeneratedAt = DateTime.UtcNow,
                    PurchaseAnnouncementId = purchaseAnnouncementId
                };

                await _announcementRepository.UpdateAsync(announcement);
            }

            return certificate;
        }

        public async Task<string?> GetCertificateAsync(int purchaseAnnouncementId)
        {
            var announcement = await _announcementRepository.GetByIdAsync(purchaseAnnouncementId);
            return announcement?.Certificate?.Content;
        }

        private string GenerateCertificateContent(PurchaseAnnouncement announcement, List<Proposal> proposals)
        {
            var sb = new StringBuilder();

            sb.AppendLine("=== CERTIFICADO DE COTAÇÃO ===");
            sb.AppendLine();
            sb.AppendLine($"Número do Certificado: {GenerateCertificateNumber()}");
            sb.AppendLine($"Data de Geração: {DateTime.Now:dd/MM/yyyy HH:mm}");
            sb.AppendLine();
            sb.AppendLine("=== DADOS DO ANÚNCIO ===");
            sb.AppendLine($"Título: {announcement.Title}");
            sb.AppendLine($"Descrição: {announcement.Description}");
            sb.AppendLine($"Quantidade: {announcement.Quantity} {announcement.Unit}");
            sb.AppendLine($"Empresa Solicitante: {announcement.Company.Name}");
            sb.AppendLine($"Responsável: {announcement.Employee.Name}");
            sb.AppendLine($"Email: {announcement.Employee.Email}");
            sb.AppendLine();
            sb.AppendLine("=== PROPOSTAS RECEBIDAS (Ordenadas por Preço) ===");
            sb.AppendLine();

            for (int i = 0; i < proposals.Count; i++)
            {
                var proposal = proposals[i];
                sb.AppendLine($"{i + 1}ª POSIÇÃO");
                sb.AppendLine($"Empresa: {proposal.Company.Name}");
                sb.AppendLine($"CNPJ: {proposal.Company.CNPJ}");
                sb.AppendLine($"Email: {proposal.Company.Email}");
                sb.AppendLine($"Telefone: {proposal.Company.Phone ?? "Não informado"}");
                sb.AppendLine($"Preço Unitário: R$ {proposal.UnitPrice:N2}");
                sb.AppendLine($"Preço Total: R$ {proposal.TotalPrice:N2}");
                sb.AppendLine($"Prazo de Entrega: {proposal.DeliveryDays} dias");
                sb.AppendLine($"Condições de Pagamento: {proposal.PaymentConditions ?? "Não informado"}");
                sb.AppendLine($"Informações Adicionais: {proposal.AdditionalInfo ?? "Nenhuma"}");
                sb.AppendLine($"Data da Proposta: {proposal.CreatedAt:dd/MM/yyyy HH:mm}");
                sb.AppendLine();
                sb.AppendLine("---");
                sb.AppendLine();
            }

            sb.AppendLine("=== OBSERVAÇÕES ===");
            sb.AppendLine("Este certificado contém as informações das empresas que enviaram propostas.");
            sb.AppendLine("Entre em contato diretamente com as empresas para negociação e fechamento.");
            sb.AppendLine("Este sistema não processa pagamentos ou transações financeiras.");

            return sb.ToString();
        }

        private string GenerateCertificateNumber()
        {
            return $"CERT-{DateTime.Now:yyyyMMdd}-{Guid.NewGuid().ToString("N")[..8].ToUpper()}";
        }
    }
}
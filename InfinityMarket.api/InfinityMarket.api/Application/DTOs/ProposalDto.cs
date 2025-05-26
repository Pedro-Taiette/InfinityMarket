using System.ComponentModel.DataAnnotations;

namespace CotacaoAPI.Application.DTOs
{
    public class ProposalDto
    {
        public int Id { get; set; }
        public string Description { get; set; } = string.Empty;
        public decimal UnitPrice { get; set; }
        public decimal TotalPrice { get; set; }
        public int DeliveryDays { get; set; }
        public string? PaymentConditions { get; set; }
        public string? AdditionalInfo { get; set; }
        public DateTime CreatedAt { get; set; }
        public string CompanyName { get; set; } = string.Empty;
        public string CompanyEmail { get; set; } = string.Empty;
        public string CompanyPhone { get; set; } = string.Empty;
    }

    public class CreateProposalDto
    {
        [Required]
        public string Description { get; set; } = string.Empty;

        [Required]
        [Range(0.01, double.MaxValue)]
        public decimal UnitPrice { get; set; }

        [Required]
        [Range(0.01, double.MaxValue)]
        public decimal TotalPrice { get; set; }

        [Required]
        [Range(1, int.MaxValue)]
        public int DeliveryDays { get; set; }

        [StringLength(500)]
        public string? PaymentConditions { get; set; }

        [StringLength(500)]
        public string? AdditionalInfo { get; set; }

        [Required]
        public int PurchaseAnnouncementId { get; set; }

        [Required]
        public int CompanyId { get; set; }
    }
}
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using CotacaoAPI.Domain.Enums;

namespace CotacaoAPI.Domain.Entities
{
    public class Proposal
    {
        public int Id { get; set; }

        [Required]
        public string Description { get; set; } = string.Empty;

        [Column(TypeName = "decimal(18,2)")]
        public decimal UnitPrice { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalPrice { get; set; }

        public int DeliveryDays { get; set; }

        [StringLength(500)]
        public string? PaymentConditions { get; set; }

        [StringLength(500)]
        public string? AdditionalInfo { get; set; }

        public ProposalStatus Status { get; set; } = ProposalStatus.Submitted;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? UpdatedAt { get; set; }

        // Foreign Keys
        public int PurchaseAnnouncementId { get; set; }
        public int CompanyId { get; set; }

        // Navigation Properties
        public virtual PurchaseAnnouncement PurchaseAnnouncement { get; set; } = null!;
        public virtual Company Company { get; set; } = null!;
    }
}
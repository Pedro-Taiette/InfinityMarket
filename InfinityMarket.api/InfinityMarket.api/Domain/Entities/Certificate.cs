using System.ComponentModel.DataAnnotations;

namespace CotacaoAPI.Domain.Entities
{
    public class Certificate
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string CertificateNumber { get; set; } = string.Empty;

        public string Content { get; set; } = string.Empty;

        public DateTime GeneratedAt { get; set; } = DateTime.UtcNow;

        // Foreign Key
        public int PurchaseAnnouncementId { get; set; }

        // Navigation Property
        public virtual PurchaseAnnouncement PurchaseAnnouncement { get; set; } = null!;
    }
}
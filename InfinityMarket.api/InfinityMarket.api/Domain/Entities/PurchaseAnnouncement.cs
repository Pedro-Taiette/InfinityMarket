using System.ComponentModel.DataAnnotations;
using CotacaoAPI.Domain.Enums;

namespace CotacaoAPI.Domain.Entities
{
    public class PurchaseAnnouncement
    {
        public int Id { get; set; }

        [Required]
        [StringLength(300)]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Description { get; set; } = string.Empty;

        public int Quantity { get; set; }

        [StringLength(50)]
        public string? Unit { get; set; }

        public DateTime DeadlineDate { get; set; }

        public AnnouncementStatus Status { get; set; } = AnnouncementStatus.Open;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? ClosedAt { get; set; }

        // Foreign Keys
        public int CompanyId { get; set; }
        public int EmployeeId { get; set; }

        // Navigation Properties
        public virtual Company Company { get; set; } = null!;
        public virtual Employee Employee { get; set; } = null!;
        public virtual ICollection<Proposal> Proposals { get; set; } = new List<Proposal>();
        public virtual Certificate? Certificate { get; set; }
    }
}
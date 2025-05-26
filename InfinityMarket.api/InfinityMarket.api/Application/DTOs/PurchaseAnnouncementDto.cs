using System.ComponentModel.DataAnnotations;
using CotacaoAPI.Domain.Enums;

namespace CotacaoAPI.Application.DTOs
{
    public class PurchaseAnnouncementDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int Quantity { get; set; }
        public string? Unit { get; set; }
        public DateTime DeadlineDate { get; set; }
        public AnnouncementStatus Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public string CompanyName { get; set; } = string.Empty;
        public string EmployeeName { get; set; } = string.Empty;
        public int ProposalCount { get; set; }
    }

    public class CreatePurchaseAnnouncementDto
    {
        [Required]
        [StringLength(300)]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Description { get; set; } = string.Empty;

        [Range(1, int.MaxValue)]
        public int Quantity { get; set; }

        [StringLength(50)]
        public string? Unit { get; set; }

        [Required]
        public DateTime DeadlineDate { get; set; }

        [Required]
        public int EmployeeId { get; set; }
    }

    public class UpdatePurchaseAnnouncementDto
    {
        [Required]
        [StringLength(300)]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Description { get; set; } = string.Empty;

        [Range(1, int.MaxValue)]
        public int Quantity { get; set; }

        [StringLength(50)]
        public string? Unit { get; set; }

        [Required]
        public DateTime DeadlineDate { get; set; }
    }
}
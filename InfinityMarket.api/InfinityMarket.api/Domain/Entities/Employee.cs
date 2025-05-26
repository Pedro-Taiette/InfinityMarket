using System.ComponentModel.DataAnnotations;

namespace CotacaoAPI.Domain.Entities
{
    public class Employee
    {
        public int Id { get; set; }

        [Required]
        [StringLength(200)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [StringLength(200)]
        public string Email { get; set; } = string.Empty;

        [StringLength(20)]
        public string? Phone { get; set; }

        [StringLength(100)]
        public string? Position { get; set; }

        public bool IsActive { get; set; } = true;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Foreign Key
        public int CompanyId { get; set; }

        // Navigation Properties
        public virtual Company Company { get; set; } = null!;
        public virtual ICollection<PurchaseAnnouncement> PurchaseAnnouncements { get; set; } = new List<PurchaseAnnouncement>();
    }
}
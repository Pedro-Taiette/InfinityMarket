using System.ComponentModel.DataAnnotations;

namespace CotacaoAPI.Domain.Entities
{
    public class Company
    {
        public int Id { get; set; }

        [Required]
        [StringLength(200)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [StringLength(18)]
        public string CNPJ { get; set; } = string.Empty;

        [StringLength(500)]
        public string? Description { get; set; }

        [Required]
        [StringLength(200)]
        public string Email { get; set; } = string.Empty;

        [StringLength(20)]
        public string? Phone { get; set; }

        [StringLength(300)]
        public string? Address { get; set; }

        public bool IsActive { get; set; } = true;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? UpdatedAt { get; set; }

        // Navigation Properties
        public virtual ICollection<Employee> Employees { get; set; } = new List<Employee>();
        public virtual ICollection<PurchaseAnnouncement> PurchaseAnnouncements { get; set; } = new List<PurchaseAnnouncement>();
        public virtual ICollection<Proposal> Proposals { get; set; } = new List<Proposal>();
    }
}
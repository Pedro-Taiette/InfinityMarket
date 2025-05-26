using Microsoft.EntityFrameworkCore;
using CotacaoAPI.Domain.Entities;
using CotacaoAPI.Domain.Interfaces;
using CotacaoAPI.Domain.Enums;
using CotacaoAPI.Infrastructure.Data;

namespace CotacaoAPI.Infrastructure.Repositories
{
    public class PurchaseAnnouncementRepository : IPurchaseAnnouncementRepository
    {
        private readonly ApplicationDbContext _context;

        public PurchaseAnnouncementRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<PurchaseAnnouncement>> GetAllAsync()
        {
            return await _context.PurchaseAnnouncements
                .Include(pa => pa.Company)
                .Include(pa => pa.Employee)
                .Include(pa => pa.Proposals)
                .OrderByDescending(pa => pa.CreatedAt)
                .ToListAsync();
        }

        public async Task<IEnumerable<PurchaseAnnouncement>> GetByStatusAsync(AnnouncementStatus status)
        {
            return await _context.PurchaseAnnouncements
                .Include(pa => pa.Company)
                .Include(pa => pa.Employee)
                .Include(pa => pa.Proposals)
                .Where(pa => pa.Status == status)
                .OrderByDescending(pa => pa.CreatedAt)
                .ToListAsync();
        }

        public async Task<IEnumerable<PurchaseAnnouncement>> GetByCompanyAsync(int companyId)
        {
            return await _context.PurchaseAnnouncements
                .Include(pa => pa.Company)
                .Include(pa => pa.Employee)
                .Include(pa => pa.Proposals)
                .Where(pa => pa.CompanyId == companyId)
                .OrderByDescending(pa => pa.CreatedAt)
                .ToListAsync();
        }

        public async Task<PurchaseAnnouncement?> GetByIdAsync(int id)
        {
            return await _context.PurchaseAnnouncements
                .Include(pa => pa.Company)
                .Include(pa => pa.Employee)
                .Include(pa => pa.Proposals)
                    .ThenInclude(p => p.Company)
                .Include(pa => pa.Certificate)
                .FirstOrDefaultAsync(pa => pa.Id == id);
        }

        public async Task<PurchaseAnnouncement> CreateAsync(PurchaseAnnouncement announcement)
        {
            _context.PurchaseAnnouncements.Add(announcement);
            await _context.SaveChangesAsync();
            return announcement;
        }

        public async Task<PurchaseAnnouncement> UpdateAsync(PurchaseAnnouncement announcement)
        {
            _context.PurchaseAnnouncements.Update(announcement);
            await _context.SaveChangesAsync();
            return announcement;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var announcement = await _context.PurchaseAnnouncements.FindAsync(id);
            if (announcement == null) return false;

            _context.PurchaseAnnouncements.Remove(announcement);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> ExistsAsync(int id)
        {
            return await _context.PurchaseAnnouncements.AnyAsync(pa => pa.Id == id);
        }
    }
}
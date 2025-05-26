using Microsoft.EntityFrameworkCore;
using CotacaoAPI.Domain.Entities;
using CotacaoAPI.Domain.Interfaces;
using CotacaoAPI.Infrastructure.Data;

namespace CotacaoAPI.Infrastructure.Repositories
{
    public class ProposalRepository : IProposalRepository
    {
        private readonly ApplicationDbContext _context;

        public ProposalRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Proposal>> GetAllAsync()
        {
            return await _context.Proposals
                .Include(p => p.Company)
                .Include(p => p.PurchaseAnnouncement)
                    .ThenInclude(pa => pa.Company)
                .OrderByDescending(p => p.CreatedAt)
                .ToListAsync();
        }

        public async Task<IEnumerable<Proposal>> GetByAnnouncementAsync(int announcementId)
        {
            return await _context.Proposals
                .Include(p => p.Company)
                .Include(p => p.PurchaseAnnouncement)
                .Where(p => p.PurchaseAnnouncementId == announcementId)
                .OrderBy(p => p.TotalPrice)
                .ToListAsync();
        }

        public async Task<IEnumerable<Proposal>> GetByCompanyAsync(int companyId)
        {
            return await _context.Proposals
                .Include(p => p.Company)
                .Include(p => p.PurchaseAnnouncement)
                    .ThenInclude(pa => pa.Company)
                .Where(p => p.CompanyId == companyId)
                .OrderByDescending(p => p.CreatedAt)
                .ToListAsync();
        }

        public async Task<Proposal?> GetByIdAsync(int id)
        {
            return await _context.Proposals
                .Include(p => p.Company)
                .Include(p => p.PurchaseAnnouncement)
                    .ThenInclude(pa => pa.Company)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<Proposal> CreateAsync(Proposal proposal)
        {
            _context.Proposals.Add(proposal);
            await _context.SaveChangesAsync();
            return proposal;
        }

        public async Task<Proposal> UpdateAsync(Proposal proposal)
        {
            _context.Proposals.Update(proposal);
            await _context.SaveChangesAsync();
            return proposal;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var proposal = await _context.Proposals.FindAsync(id);
            if (proposal == null) return false;

            _context.Proposals.Remove(proposal);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> ExistsAsync(int id)
        {
            return await _context.Proposals.AnyAsync(p => p.Id == id);
        }

        public async Task<bool> CompanyHasProposalForAnnouncementAsync(int companyId, int announcementId)
        {
            return await _context.Proposals
                .AnyAsync(p => p.CompanyId == companyId && p.PurchaseAnnouncementId == announcementId);
        }
    }
}
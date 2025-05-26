using Microsoft.EntityFrameworkCore;
using CotacaoAPI.Domain.Entities;
using CotacaoAPI.Domain.Interfaces;
using CotacaoAPI.Infrastructure.Data;

namespace CotacaoAPI.Infrastructure.Repositories
{
    public class CompanyRepository : ICompanyRepository
    {
        private readonly ApplicationDbContext _context;

        public CompanyRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Company>> GetAllAsync()
        {
            return await _context.Companies
                .Include(c => c.Employees)
                .OrderBy(c => c.Name)
                .ToListAsync();
        }

        public async Task<Company?> GetByIdAsync(int id)
        {
            return await _context.Companies
                .Include(c => c.Employees)
                .FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<Company?> GetByCNPJAsync(string cnpj)
        {
            return await _context.Companies
                .FirstOrDefaultAsync(c => c.CNPJ == cnpj);
        }

        public async Task<Company> CreateAsync(Company company)
        {
            _context.Companies.Add(company);
            await _context.SaveChangesAsync();
            return company;
        }

        public async Task<Company> UpdateAsync(Company company)
        {
            _context.Companies.Update(company);
            await _context.SaveChangesAsync();
            return company;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var company = await _context.Companies.FindAsync(id);
            if (company == null) return false;

            _context.Companies.Remove(company);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> ExistsAsync(int id)
        {
            return await _context.Companies.AnyAsync(c => c.Id == id);
        }

        public async Task<bool> CNPJExistsAsync(string cnpj, int? excludeId = null)
        {
            var query = _context.Companies.Where(c => c.CNPJ == cnpj);

            if (excludeId.HasValue)
            {
                query = query.Where(c => c.Id != excludeId.Value);
            }

            return await query.AnyAsync();
        }
    }
}
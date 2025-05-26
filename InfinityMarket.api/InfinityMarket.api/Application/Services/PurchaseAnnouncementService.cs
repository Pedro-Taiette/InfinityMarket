using AutoMapper;
using CotacaoAPI.Application.DTOs;
using CotacaoAPI.Domain.Entities;
using CotacaoAPI.Domain.Interfaces;
using CotacaoAPI.Domain.Enums;

namespace CotacaoAPI.Application.Services
{
    public class PurchaseAnnouncementService : IPurchaseAnnouncementService
    {
        private readonly IPurchaseAnnouncementRepository _announcementRepository;
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IMapper _mapper;

        public PurchaseAnnouncementService(
            IPurchaseAnnouncementRepository announcementRepository,
            IEmployeeRepository employeeRepository,
            IMapper mapper)
        {
            _announcementRepository = announcementRepository;
            _employeeRepository = employeeRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<PurchaseAnnouncementDto>> GetAllAsync()
        {
            var announcements = await _announcementRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<PurchaseAnnouncementDto>>(announcements);
        }

        public async Task<IEnumerable<PurchaseAnnouncementDto>> GetByStatusAsync(AnnouncementStatus status)
        {
            var announcements = await _announcementRepository.GetByStatusAsync(status);
            return _mapper.Map<IEnumerable<PurchaseAnnouncementDto>>(announcements);
        }

        public async Task<IEnumerable<PurchaseAnnouncementDto>> GetByCompanyAsync(int companyId)
        {
            var announcements = await _announcementRepository.GetByCompanyAsync(companyId);
            return _mapper.Map<IEnumerable<PurchaseAnnouncementDto>>(announcements);
        }

        public async Task<PurchaseAnnouncementDto?> GetByIdAsync(int id)
        {
            var announcement = await _announcementRepository.GetByIdAsync(id);
            return announcement == null ? null : _mapper.Map<PurchaseAnnouncementDto>(announcement);
        }

        public async Task<PurchaseAnnouncementDto> CreateAsync(CreatePurchaseAnnouncementDto createDto)
        {
            // Verificar se funcionário existe
            var employee = await _employeeRepository.GetByIdAsync(createDto.EmployeeId);
            if (employee == null)
            {
                throw new KeyNotFoundException("Funcionário não encontrado.");
            }

            // Verificar se a data limite é futura
            if (createDto.DeadlineDate <= DateTime.UtcNow)
            {
                throw new InvalidOperationException("A data limite deve ser futura.");
            }

            var announcement = _mapper.Map<PurchaseAnnouncement>(createDto);
            announcement.CompanyId = employee.CompanyId;

            var createdAnnouncement = await _announcementRepository.CreateAsync(announcement);
            return _mapper.Map<PurchaseAnnouncementDto>(createdAnnouncement);
        }

        public async Task<PurchaseAnnouncementDto> UpdateAsync(int id, UpdatePurchaseAnnouncementDto updateDto)
        {
            var existingAnnouncement = await _announcementRepository.GetByIdAsync(id);
            if (existingAnnouncement == null)
            {
                throw new KeyNotFoundException("Anúncio não encontrado.");
            }

            if (existingAnnouncement.Status != AnnouncementStatus.Open)
            {
                throw new InvalidOperationException("Apenas anúncios abertos podem ser editados.");
            }

            // Verificar se a data limite é futura
            if (updateDto.DeadlineDate <= DateTime.UtcNow)
            {
                throw new InvalidOperationException("A data limite deve ser futura.");
            }

            _mapper.Map(updateDto, existingAnnouncement);
            var updatedAnnouncement = await _announcementRepository.UpdateAsync(existingAnnouncement);
            return _mapper.Map<PurchaseAnnouncementDto>(updatedAnnouncement);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var announcement = await _announcementRepository.GetByIdAsync(id);
            if (announcement == null)
            {
                throw new KeyNotFoundException("Anúncio não encontrado.");
            }

            if (announcement.Proposals.Any())
            {
                throw new InvalidOperationException("Não é possível excluir anúncios que já possuem propostas.");
            }

            return await _announcementRepository.DeleteAsync(id);
        }

        public async Task<PurchaseAnnouncementDto> CloseAnnouncementAsync(int id)
        {
            var announcement = await _announcementRepository.GetByIdAsync(id);
            if (announcement == null)
            {
                throw new KeyNotFoundException("Anúncio não encontrado.");
            }

            if (announcement.Status != AnnouncementStatus.Open)
            {
                throw new InvalidOperationException("Apenas anúncios abertos podem ser fechados.");
            }

            announcement.Status = AnnouncementStatus.Closed;
            announcement.ClosedAt = DateTime.UtcNow;

            var updatedAnnouncement = await _announcementRepository.UpdateAsync(announcement);
            return _mapper.Map<PurchaseAnnouncementDto>(updatedAnnouncement);
        }
    }
}
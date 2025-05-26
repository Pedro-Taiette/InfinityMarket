using AutoMapper;
using CotacaoAPI.Application.DTOs;
using CotacaoAPI.Domain.Entities;
using CotacaoAPI.Domain.Interfaces;
using CotacaoAPI.Domain.Enums;

namespace CotacaoAPI.Application.Services
{
    public class ProposalService : IProposalService
    {
        private readonly IProposalRepository _proposalRepository;
        private readonly IPurchaseAnnouncementRepository _announcementRepository;
        private readonly ICompanyRepository _companyRepository;
        private readonly IMapper _mapper;

        public ProposalService(
            IProposalRepository proposalRepository,
            IPurchaseAnnouncementRepository announcementRepository,
            ICompanyRepository companyRepository,
            IMapper mapper)
        {
            _proposalRepository = proposalRepository;
            _announcementRepository = announcementRepository;
            _companyRepository = companyRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ProposalDto>> GetAllAsync()
        {
            var proposals = await _proposalRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<ProposalDto>>(proposals);
        }

        public async Task<IEnumerable<ProposalDto>> GetByAnnouncementAsync(int announcementId)
        {
            var proposals = await _proposalRepository.GetByAnnouncementAsync(announcementId);
            return _mapper.Map<IEnumerable<ProposalDto>>(proposals);
        }

        public async Task<IEnumerable<ProposalDto>> GetByCompanyAsync(int companyId)
        {
            var proposals = await _proposalRepository.GetByCompanyAsync(companyId);
            return _mapper.Map<IEnumerable<ProposalDto>>(proposals);
        }

        public async Task<ProposalDto?> GetByIdAsync(int id)
        {
            var proposal = await _proposalRepository.GetByIdAsync(id);
            return proposal == null ? null : _mapper.Map<ProposalDto>(proposal);
        }

        public async Task<ProposalDto> CreateAsync(CreateProposalDto createDto)
        {
            // Verificar se anúncio existe e está aberto
            var announcement = await _announcementRepository.GetByIdAsync(createDto.PurchaseAnnouncementId);
            if (announcement == null)
            {
                throw new KeyNotFoundException("Anúncio não encontrado.");
            }

            if (announcement.Status != AnnouncementStatus.Open)
            {
                throw new InvalidOperationException("Não é possível enviar propostas para anúncios fechados.");
            }

            if (announcement.DeadlineDate <= DateTime.UtcNow)
            {
                throw new InvalidOperationException("Prazo para envio de propostas expirado.");
            }

            // Verificar se empresa existe
            if (!await _companyRepository.ExistsAsync(createDto.CompanyId))
            {
                throw new KeyNotFoundException("Empresa não encontrada.");
            }

            // Verificar se empresa não é a mesma do anúncio
            if (announcement.CompanyId == createDto.CompanyId)
            {
                throw new InvalidOperationException("Uma empresa não pode enviar proposta para seu próprio anúncio.");
            }

            // Verificar se empresa já enviou proposta
            if (await _proposalRepository.CompanyHasProposalForAnnouncementAsync(createDto.CompanyId, createDto.PurchaseAnnouncementId))
            {
                throw new InvalidOperationException("Esta empresa já enviou uma proposta para este anúncio.");
            }

            var proposal = _mapper.Map<Proposal>(createDto);
            var createdProposal = await _proposalRepository.CreateAsync(proposal);
            return _mapper.Map<ProposalDto>(createdProposal);
        }

        public async Task<ProposalDto> UpdateAsync(int id, CreateProposalDto updateDto)
        {
            var existingProposal = await _proposalRepository.GetByIdAsync(id);
            if (existingProposal == null)
            {
                throw new KeyNotFoundException("Proposta não encontrada.");
            }

            // Verificar se anúncio ainda está aberto
            if (existingProposal.PurchaseAnnouncement.Status != AnnouncementStatus.Open)
            {
                throw new InvalidOperationException("Não é possível editar propostas de anúncios fechados.");
            }

            if (existingProposal.PurchaseAnnouncement.DeadlineDate <= DateTime.UtcNow)
            {
                throw new InvalidOperationException("Prazo para edição de propostas expirado.");
            }

            _mapper.Map(updateDto, existingProposal);
            existingProposal.UpdatedAt = DateTime.UtcNow;

            var updatedProposal = await _proposalRepository.UpdateAsync(existingProposal);
            return _mapper.Map<ProposalDto>(updatedProposal);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var proposal = await _proposalRepository.GetByIdAsync(id);
            if (proposal == null)
            {
                throw new KeyNotFoundException("Proposta não encontrada.");
            }

            // Verificar se anúncio ainda está aberto
            if (proposal.PurchaseAnnouncement.Status != AnnouncementStatus.Open)
            {
                throw new InvalidOperationException("Não é possível excluir propostas de anúncios fechados.");
            }

            return await _proposalRepository.DeleteAsync(id);
        }
    }
}
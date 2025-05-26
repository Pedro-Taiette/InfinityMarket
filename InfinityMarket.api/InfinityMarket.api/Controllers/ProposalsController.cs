using Microsoft.AspNetCore.Mvc;
using CotacaoAPI.Application.DTOs;
using CotacaoAPI.Application.Services;

namespace CotacaoAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class ProposalsController : ControllerBase
    {
        private readonly IProposalService _proposalService;

        public ProposalsController(IProposalService proposalService)
        {
            _proposalService = proposalService;
        }

        /// <summary>
        /// Obtém todas as propostas
        /// </summary>
        /// <returns>Lista de propostas</returns>
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<ProposalDto>), 200)]
        public async Task<ActionResult<IEnumerable<ProposalDto>>> GetAll()
        {
            var proposals = await _proposalService.GetAllAsync();
            return Ok(proposals);
        }

        /// <summary>
        /// Obtém propostas de um anúncio específico
        /// </summary>
        /// <param name="announcementId">ID do anúncio</param>
        /// <returns>Lista de propostas do anúncio</returns>
        [HttpGet("announcement/{announcementId}")]
        [ProducesResponseType(typeof(IEnumerable<ProposalDto>), 200)]
        public async Task<ActionResult<IEnumerable<ProposalDto>>> GetByAnnouncement(int announcementId)
        {
            var proposals = await _proposalService.GetByAnnouncementAsync(announcementId);
            return Ok(proposals);
        }

        /// <summary>
        /// Obtém propostas de uma empresa específica
        /// </summary>
        /// <param name="companyId">ID da empresa</param>
        /// <returns>Lista de propostas da empresa</returns>
        [HttpGet("company/{companyId}")]
        [ProducesResponseType(typeof(IEnumerable<ProposalDto>), 200)]
        public async Task<ActionResult<IEnumerable<ProposalDto>>> GetByCompany(int companyId)
        {
            var proposals = await _proposalService.GetByCompanyAsync(companyId);
            return Ok(proposals);
        }

        /// <summary>
        /// Obtém uma proposta específica por ID
        /// </summary>
        /// <param name="id">ID da proposta</param>
        /// <returns>Dados da proposta</returns>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(ProposalDto), 200)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<ProposalDto>> GetById(int id)
        {
            var proposal = await _proposalService.GetByIdAsync(id);

            if (proposal == null)
                return NotFound("Proposta não encontrada.");

            return Ok(proposal);
        }

        /// <summary>
        /// Cria uma nova proposta
        /// </summary>
        /// <param name="createDto">Dados da proposta a ser criada</param>
        /// <returns>Proposta criada</returns>
        [HttpPost]
        [ProducesResponseType(typeof(ProposalDto), 201)]
        [ProducesResponseType(400)]
        public async Task<ActionResult<ProposalDto>> Create([FromBody] CreateProposalDto createDto)
        {
            try
            {
                var proposal = await _proposalService.CreateAsync(createDto);
                return CreatedAtAction(nameof(GetById), new { id = proposal.Id }, proposal);
            }
            catch (KeyNotFoundException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Atualiza uma proposta existente
        /// </summary>
        /// <param name="id">ID da proposta</param>
        /// <param name="updateDto">Dados atualizados da proposta</param>
        /// <returns>Proposta atualizada</returns>
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(ProposalDto), 200)]
        [ProducesResponseType(404)]
        [ProducesResponseType(400)]
        public async Task<ActionResult<ProposalDto>> Update(int id, [FromBody] CreateProposalDto updateDto)
        {
            try
            {
                var proposal = await _proposalService.UpdateAsync(id, updateDto);
                return Ok(proposal);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Remove uma proposta
        /// </summary>
        /// <param name="id">ID da proposta</param>
        /// <returns>Resultado da operação</returns>
        [HttpDelete("{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _proposalService.DeleteAsync(id);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
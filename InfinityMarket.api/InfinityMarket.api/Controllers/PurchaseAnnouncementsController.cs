using Microsoft.AspNetCore.Mvc;
using CotacaoAPI.Application.DTOs;
using CotacaoAPI.Application.Services;
using CotacaoAPI.Domain.Enums;

namespace CotacaoAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class PurchaseAnnouncementsController : ControllerBase
    {
        private readonly IPurchaseAnnouncementService _announcementService;

        public PurchaseAnnouncementsController(IPurchaseAnnouncementService announcementService)
        {
            _announcementService = announcementService;
        }

        /// <summary>
        /// Obtém todos os anúncios de compra
        /// </summary>
        /// <returns>Lista de anúncios</returns>
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<PurchaseAnnouncementDto>), 200)]
        public async Task<ActionResult<IEnumerable<PurchaseAnnouncementDto>>> GetAll()
        {
            var announcements = await _announcementService.GetAllAsync();
            return Ok(announcements);
        }

        /// <summary>
        /// Obtém anúncios por status
        /// </summary>
        /// <param name="status">Status do anúncio (1=Open, 2=Closed, 3=Cancelled)</param>
        /// <returns>Lista de anúncios filtrados por status</returns>
        [HttpGet("status/{status}")]
        [ProducesResponseType(typeof(IEnumerable<PurchaseAnnouncementDto>), 200)]
        public async Task<ActionResult<IEnumerable<PurchaseAnnouncementDto>>> GetByStatus(AnnouncementStatus status)
        {
            var announcements = await _announcementService.GetByStatusAsync(status);
            return Ok(announcements);
        }

        /// <summary>
        /// Obtém anúncios de uma empresa específica
        /// </summary>
        /// <param name="companyId">ID da empresa</param>
        /// <returns>Lista de anúncios da empresa</returns>
        [HttpGet("company/{companyId}")]
        [ProducesResponseType(typeof(IEnumerable<PurchaseAnnouncementDto>), 200)]
        public async Task<ActionResult<IEnumerable<PurchaseAnnouncementDto>>> GetByCompany(int companyId)
        {
            var announcements = await _announcementService.GetByCompanyAsync(companyId);
            return Ok(announcements);
        }

        /// <summary>
        /// Obtém um anúncio específico por ID
        /// </summary>
        /// <param name="id">ID do anúncio</param>
        /// <returns>Dados do anúncio</returns>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(PurchaseAnnouncementDto), 200)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<PurchaseAnnouncementDto>> GetById(int id)
        {
            var announcement = await _announcementService.GetByIdAsync(id);

            if (announcement == null)
                return NotFound("Anúncio não encontrado.");

            return Ok(announcement);
        }

        /// <summary>
        /// Cria um novo anúncio de compra
        /// </summary>
        /// <param name="createDto">Dados do anúncio a ser criado</param>
        /// <returns>Anúncio criado</returns>
        [HttpPost]
        [ProducesResponseType(typeof(PurchaseAnnouncementDto), 201)]
        [ProducesResponseType(400)]
        public async Task<ActionResult<PurchaseAnnouncementDto>> Create([FromBody] CreatePurchaseAnnouncementDto createDto)
        {
            try
            {
                var announcement = await _announcementService.CreateAsync(createDto);
                return CreatedAtAction(nameof(GetById), new { id = announcement.Id }, announcement);
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
        /// Atualiza um anúncio existente
        /// </summary>
        /// <param name="id">ID do anúncio</param>
        /// <param name="updateDto">Dados atualizados do anúncio</param>
        /// <returns>Anúncio atualizado</returns>
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(PurchaseAnnouncementDto), 200)]
        [ProducesResponseType(404)]
        [ProducesResponseType(400)]
        public async Task<ActionResult<PurchaseAnnouncementDto>> Update(int id, [FromBody] UpdatePurchaseAnnouncementDto updateDto)
        {
            try
            {
                var announcement = await _announcementService.UpdateAsync(id, updateDto);
                return Ok(announcement);
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
        /// Fecha um anúncio de compra
        /// </summary>
        /// <param name="id">ID do anúncio</param>
        /// <returns>Anúncio fechado</returns>
        [HttpPatch("{id}/close")]
        [ProducesResponseType(typeof(PurchaseAnnouncementDto), 200)]
        [ProducesResponseType(404)]
        [ProducesResponseType(400)]
        public async Task<ActionResult<PurchaseAnnouncementDto>> Close(int id)
        {
            try
            {
                var announcement = await _announcementService.CloseAnnouncementAsync(id);
                return Ok(announcement);
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
        /// Remove um anúncio
        /// </summary>
        /// <param name="id">ID do anúncio</param>
        /// <returns>Resultado da operação</returns>
        [HttpDelete("{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _announcementService.DeleteAsync(id);
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
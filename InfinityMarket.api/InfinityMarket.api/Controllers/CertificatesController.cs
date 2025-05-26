using Microsoft.AspNetCore.Mvc;
using CotacaoAPI.Application.Services;

namespace CotacaoAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class CertificatesController : ControllerBase
    {
        private readonly ICertificateService _certificateService;

        public CertificatesController(ICertificateService certificateService)
        {
            _certificateService = certificateService;
        }

        /// <summary>
        /// Gera um certificado de cotação para um anúncio
        /// </summary>
        /// <param name="announcementId">ID do anúncio</param>
        /// <returns>Conteúdo do certificado gerado</returns>
        [HttpPost("generate/{announcementId}")]
        [ProducesResponseType(typeof(string), 200)]
        [ProducesResponseType(404)]
        [ProducesResponseType(400)]
        public async Task<ActionResult<string>> GenerateCertificate(int announcementId)
        {
            try
            {
                var certificate = await _certificateService.GenerateCertificateAsync(announcementId);
                return Ok(certificate);
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
        /// Obtém o certificado de um anúncio (se já foi gerado)
        /// </summary>
        /// <param name="announcementId">ID do anúncio</param>
        /// <returns>Conteúdo do certificado</returns>
        [HttpGet("announcement/{announcementId}")]
        [ProducesResponseType(typeof(string), 200)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<string>> GetCertificate(int announcementId)
        {
            var certificate = await _certificateService.GetCertificateAsync(announcementId);

            if (certificate == null)
                return NotFound("Certificado não encontrado para este anúncio.");

            return Ok(certificate);
        }
    }
}
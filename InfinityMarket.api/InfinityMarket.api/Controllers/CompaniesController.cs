using Microsoft.AspNetCore.Mvc;
using CotacaoAPI.Application.DTOs;
using CotacaoAPI.Application.Services;

namespace CotacaoAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class CompaniesController : ControllerBase
    {
        private readonly ICompanyService _companyService;

        public CompaniesController(ICompanyService companyService)
        {
            _companyService = companyService;
        }

        /// <summary>
        /// Obtém todas as empresas cadastradas
        /// </summary>
        /// <returns>Lista de empresas</returns>
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<CompanyDto>), 200)]
        public async Task<ActionResult<IEnumerable<CompanyDto>>> GetAll()
        {
            var companies = await _companyService.GetAllAsync();
            return Ok(companies);
        }

        /// <summary>
        /// Obtém uma empresa específica por ID
        /// </summary>
        /// <param name="id">ID da empresa</param>
        /// <returns>Dados da empresa</returns>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(CompanyDto), 200)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<CompanyDto>> GetById(int id)
        {
            var company = await _companyService.GetByIdAsync(id);

            if (company == null)
                return NotFound("Empresa não encontrada.");

            return Ok(company);
        }

        /// <summary>
        /// Cria uma nova empresa
        /// </summary>
        /// <param name="createDto">Dados da empresa a ser criada</param>
        /// <returns>Empresa criada</returns>
        [HttpPost]
        [ProducesResponseType(typeof(CompanyDto), 201)]
        [ProducesResponseType(400)]
        public async Task<ActionResult<CompanyDto>> Create([FromBody] CreateCompanyDto createDto)
        {
            try
            {
                var company = await _companyService.CreateAsync(createDto);
                return CreatedAtAction(nameof(GetById), new { id = company.Id }, company);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Atualiza uma empresa existente
        /// </summary>
        /// <param name="id">ID da empresa</param>
        /// <param name="updateDto">Dados atualizados da empresa</param>
        /// <returns>Empresa atualizada</returns>
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(CompanyDto), 200)]
        [ProducesResponseType(404)]
        [ProducesResponseType(400)]
        public async Task<ActionResult<CompanyDto>> Update(int id, [FromBody] UpdateCompanyDto updateDto)
        {
            try
            {
                var company = await _companyService.UpdateAsync(id, updateDto);
                return Ok(company);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        /// <summary>
        /// Remove uma empresa
        /// </summary>
        /// <param name="id">ID da empresa</param>
        /// <returns>Resultado da operação</returns>
        [HttpDelete("{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _companyService.DeleteAsync(id);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}
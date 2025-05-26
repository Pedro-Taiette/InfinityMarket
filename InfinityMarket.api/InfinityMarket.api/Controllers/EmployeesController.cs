using Microsoft.AspNetCore.Mvc;
using CotacaoAPI.Application.DTOs;
using CotacaoAPI.Application.Services;

namespace CotacaoAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;

        public EmployeesController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        /// <summary>
        /// Obtém todos os funcionários cadastrados
        /// </summary>
        /// <returns>Lista de funcionários</returns>
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<EmployeeDto>), 200)]
        public async Task<ActionResult<IEnumerable<EmployeeDto>>> GetAll()
        {
            var employees = await _employeeService.GetAllAsync();
            return Ok(employees);
        }

        /// <summary>
        /// Obtém funcionários de uma empresa específica
        /// </summary>
        /// <param name="companyId">ID da empresa</param>
        /// <returns>Lista de funcionários da empresa</returns>
        [HttpGet("company/{companyId}")]
        [ProducesResponseType(typeof(IEnumerable<EmployeeDto>), 200)]
        public async Task<ActionResult<IEnumerable<EmployeeDto>>> GetByCompany(int companyId)
        {
            var employees = await _employeeService.GetByCompanyAsync(companyId);
            return Ok(employees);
        }

        /// <summary>
        /// Obtém um funcionário específico por ID
        /// </summary>
        /// <param name="id">ID do funcionário</param>
        /// <returns>Dados do funcionário</returns>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(EmployeeDto), 200)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<EmployeeDto>> GetById(int id)
        {
            var employee = await _employeeService.GetByIdAsync(id);

            if (employee == null)
                return NotFound("Funcionário não encontrado.");

            return Ok(employee);
        }

        /// <summary>
        /// Cria um novo funcionário
        /// </summary>
        /// <param name="createDto">Dados do funcionário a ser criado</param>
        /// <returns>Funcionário criado</returns>
        [HttpPost]
        [ProducesResponseType(typeof(EmployeeDto), 201)]
        [ProducesResponseType(400)]
        public async Task<ActionResult<EmployeeDto>> Create([FromBody] CreateEmployeeDto createDto)
        {
            try
            {
                var employee = await _employeeService.CreateAsync(createDto);
                return CreatedAtAction(nameof(GetById), new { id = employee.Id }, employee);
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
        /// Atualiza um funcionário existente
        /// </summary>
        /// <param name="id">ID do funcionário</param>
        /// <param name="updateDto">Dados atualizados do funcionário</param>
        /// <returns>Funcionário atualizado</returns>
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(EmployeeDto), 200)]
        [ProducesResponseType(404)]
        [ProducesResponseType(400)]
        public async Task<ActionResult<EmployeeDto>> Update(int id, [FromBody] UpdateEmployeeDto updateDto)
        {
            try
            {
                var employee = await _employeeService.UpdateAsync(id, updateDto);
                return Ok(employee);
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
        /// Remove um funcionário
        /// </summary>
        /// <param name="id">ID do funcionário</param>
        /// <returns>Resultado da operação</returns>
        [HttpDelete("{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _employeeService.DeleteAsync(id);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}
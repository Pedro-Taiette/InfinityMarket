using AutoMapper;
using CotacaoAPI.Application.DTOs;
using CotacaoAPI.Domain.Entities;
using CotacaoAPI.Domain.Interfaces;

namespace CotacaoAPI.Application.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepository _employeeRepository;
        private readonly ICompanyRepository _companyRepository;
        private readonly IMapper _mapper;

        public EmployeeService(
            IEmployeeRepository employeeRepository,
            ICompanyRepository companyRepository,
            IMapper mapper)
        {
            _employeeRepository = employeeRepository;
            _companyRepository = companyRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<EmployeeDto>> GetAllAsync()
        {
            var employees = await _employeeRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<EmployeeDto>>(employees);
        }

        public async Task<IEnumerable<EmployeeDto>> GetByCompanyAsync(int companyId)
        {
            var employees = await _employeeRepository.GetByCompanyAsync(companyId);
            return _mapper.Map<IEnumerable<EmployeeDto>>(employees);
        }

        public async Task<EmployeeDto?> GetByIdAsync(int id)
        {
            var employee = await _employeeRepository.GetByIdAsync(id);
            return employee == null ? null : _mapper.Map<EmployeeDto>(employee);
        }

        public async Task<EmployeeDto> CreateAsync(CreateEmployeeDto createDto)
        {
            // Verificar se a empresa existe
            if (!await _companyRepository.ExistsAsync(createDto.CompanyId))
            {
                throw new KeyNotFoundException("Empresa não encontrada.");
            }

            // Verificar se email já existe
            if (await _employeeRepository.EmailExistsAsync(createDto.Email))
            {
                throw new InvalidOperationException("Email já cadastrado no sistema.");
            }

            var employee = _mapper.Map<Employee>(createDto);
            var createdEmployee = await _employeeRepository.CreateAsync(employee);
            return _mapper.Map<EmployeeDto>(createdEmployee);
        }

        public async Task<EmployeeDto> UpdateAsync(int id, UpdateEmployeeDto updateDto)
        {
            var existingEmployee = await _employeeRepository.GetByIdAsync(id);
            if (existingEmployee == null)
            {
                throw new KeyNotFoundException("Funcionário não encontrado.");
            }

            // Verificar se email já existe (excluindo o próprio funcionário)
            if (await _employeeRepository.EmailExistsAsync(updateDto.Email, id))
            {
                throw new InvalidOperationException("Email já cadastrado no sistema.");
            }

            _mapper.Map(updateDto, existingEmployee);
            var updatedEmployee = await _employeeRepository.UpdateAsync(existingEmployee);
            return _mapper.Map<EmployeeDto>(updatedEmployee);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            if (!await _employeeRepository.ExistsAsync(id))
            {
                throw new KeyNotFoundException("Funcionário não encontrado.");
            }

            return await _employeeRepository.DeleteAsync(id);
        }
    }
}
// Enhanced Main JavaScript file for Infinity Market System

// Import Bootstrap
const bootstrap = window.bootstrap

// API Configuration
const API_BASE_URL = "https://localhost:8080" // Adjust this to your API URL

// Global variables
let alertTimeout

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  // Set up global event listeners
  setupGlobalEventListeners()

  // Initialize tooltips
  initializeTooltips()

  // Initialize popovers
  initializePopovers()
})

function setupGlobalEventListeners() {
  // Handle modal cleanup
  document.addEventListener("hidden.bs.modal", (event) => {
    const modal = event.target
    const form = modal.querySelector("form")
    if (form) {
      form.reset()
      clearValidation()
    }

    // Re-enable form fields and show save button (in case it was a view modal)
    const inputs = modal.querySelectorAll("input, textarea, select")
    inputs.forEach((input) => (input.disabled = false))

    const saveButton = modal.querySelector(".btn-primary")
    if (saveButton) {
      saveButton.style.display = "inline-block"
    }
  })

  // Handle escape key to close modals
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      const openModal = document.querySelector(".modal.show")
      if (openModal) {
        const modalInstance = bootstrap.Modal.getInstance(openModal)
        if (modalInstance) {
          modalInstance.hide()
        }
      }
    }
  })
}

function initializeTooltips() {
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  tooltipTriggerList.map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl))
}

function initializePopovers() {
  const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
  popoverTriggerList.map((popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl))
}

// Enhanced API Request function with better error handling
async function apiRequest(endpoint, method = "GET", data = null, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`
  const defaultOptions = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  }

  if (data && (method === "POST" || method === "PUT" || method === "PATCH")) {
    defaultOptions.body = JSON.stringify(data)
  }

  try {
    const response = await fetch(url, defaultOptions)

    // Handle different response types
    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`
      try {
        const errorData = await response.json()
        if (errorData.title || errorData.detail) {
          errorMessage = errorData.title || errorData.detail
        } else if (errorData.message) {
          errorMessage = errorData.message
        }
      } catch (e) {
        // If we can't parse the error response, use the default message
        if (response.status === 404) {
          errorMessage = "Recurso não encontrado"
        } else if (response.status === 400) {
          errorMessage = "Dados inválidos"
        } else if (response.status === 500) {
          errorMessage = "Erro interno do servidor"
        }
      }
      throw new Error(errorMessage)
    }

    // Handle different response types
    const contentType = response.headers.get("content-type")
    if (contentType && contentType.includes("application/json")) {
      return await response.json()
    } else if (method === "DELETE" && response.status === 204) {
      return null // No content for successful delete
    } else {
      return await response.text()
    }
  } catch (error) {
    console.error("API Request failed:", error)
    throw error
  }
}

// Enhanced Alert functions with better UX
function showAlert(message, type = "info", duration = 5000, actions = null) {
  // Clear existing timeout
  if (alertTimeout) {
    clearTimeout(alertTimeout)
  }

  // Remove existing alerts
  const existingAlerts = document.querySelectorAll(".alert-floating")
  existingAlerts.forEach((alert) => alert.remove())

  // Create new alert
  const alertDiv = document.createElement("div")
  alertDiv.className = `alert alert-${type} alert-dismissible fade show alert-floating`

  let alertContent = `
    <div class="d-flex align-items-center">
      <i class="bi bi-${getAlertIcon(type)} me-2"></i>
      <span>${message}</span>
    </div>
  `

  if (actions) {
    alertContent += `
      <div class="mt-2">
        ${actions
          .map(
            (action) => `
          <button type="button" class="btn btn-sm btn-outline-${type} me-2" onclick="${action.onclick}">
            ${action.text}
          </button>
        `,
          )
          .join("")}
      </div>
    `
  }

  alertContent += `<button type="button" class="btn-close" data-bs-dismiss="alert"></button>`

  alertDiv.innerHTML = alertContent

  document.body.appendChild(alertDiv)

  // Auto-dismiss after duration
  if (duration > 0) {
    alertTimeout = setTimeout(() => {
      if (alertDiv && alertDiv.parentNode) {
        alertDiv.remove()
      }
    }, duration)
  }

  return alertDiv
}

function getAlertIcon(type) {
  const icons = {
    success: "check-circle-fill",
    danger: "exclamation-triangle-fill",
    warning: "exclamation-triangle-fill",
    info: "info-circle-fill",
    primary: "info-circle-fill",
  }
  return icons[type] || "info-circle-fill"
}

function hideAlert() {
  const alerts = document.querySelectorAll(".alert-floating")
  alerts.forEach((alert) => alert.remove())
  if (alertTimeout) {
    clearTimeout(alertTimeout)
  }
}

// Enhanced Loading functions
function showLoading(message = "Carregando...") {
  // Remove existing loading
  hideLoading()

  const loadingDiv = document.createElement("div")
  loadingDiv.id = "globalLoading"
  loadingDiv.className = "position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
  loadingDiv.style.cssText = "background: rgba(0,0,0,0.5); z-index: 9999;"

  loadingDiv.innerHTML = `
    <div class="bg-white rounded-3 p-4 text-center shadow-lg">
      <div class="spinner-border text-primary mb-3" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mb-0 text-muted">${message}</p>
    </div>
  `

  document.body.appendChild(loadingDiv)
}

function hideLoading() {
  const loading = document.getElementById("globalLoading")
  if (loading) {
    loading.remove()
  }
}

// Enhanced Form Validation
function validateForm(form) {
  let isValid = true
  const requiredFields = form.querySelectorAll("[required]")

  // Clear previous validation
  clearValidation()

  requiredFields.forEach((field) => {
    if (!field.value.trim()) {
      showFieldError(field, "Este campo é obrigatório")
      isValid = false
    } else {
      // Specific validations
      if (field.type === "email" && !isValidEmail(field.value)) {
        showFieldError(field, "Email inválido")
        isValid = false
      } else if (field.id === "cnpj" && !isValidCNPJ(field.value)) {
        showFieldError(field, "CNPJ inválido")
        isValid = false
      } else if (field.type === "number" && Number.parseFloat(field.value) <= 0) {
        showFieldError(field, "Valor deve ser maior que zero")
        isValid = false
      } else if (field.type === "datetime-local" && new Date(field.value) <= new Date()) {
        showFieldError(field, "Data deve ser futura")
        isValid = false
      } else {
        showFieldSuccess(field)
      }
    }
  })

  // Additional custom validations
  const emailFields = form.querySelectorAll('input[type="email"]:not([required])')
  emailFields.forEach((field) => {
    if (field.value && !isValidEmail(field.value)) {
      showFieldError(field, "Email inválido")
      isValid = false
    }
  })

  return isValid
}

function showFieldError(field, message) {
  field.classList.add("is-invalid")
  field.classList.remove("is-valid")

  let feedback = field.parentNode.querySelector(".invalid-feedback")
  if (!feedback) {
    feedback = document.createElement("div")
    feedback.className = "invalid-feedback"
    field.parentNode.appendChild(feedback)
  }
  feedback.textContent = message
}

function showFieldSuccess(field) {
  field.classList.add("is-valid")
  field.classList.remove("is-invalid")

  const feedback = field.parentNode.querySelector(".invalid-feedback")
  if (feedback) {
    feedback.remove()
  }
}

function clearValidation() {
  const invalidFields = document.querySelectorAll(".is-invalid, .is-valid")
  invalidFields.forEach((field) => {
    field.classList.remove("is-invalid", "is-valid")
  })

  const feedbacks = document.querySelectorAll(".invalid-feedback")
  feedbacks.forEach((feedback) => feedback.remove())
}

// Validation helper functions
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function isValidCNPJ(cnpj) {
  cnpj = cnpj.replace(/\D/g, "")

  if (cnpj.length !== 14) return false

  // Check for known invalid CNPJs
  if (/^(\d)\1+$/.test(cnpj)) return false

  // Validate check digits
  let sum = 0
  let weight = 2
  for (let i = 11; i >= 0; i--) {
    sum += Number.parseInt(cnpj.charAt(i)) * weight
    weight = weight === 9 ? 2 : weight + 1
  }

  let checkDigit = sum % 11 < 2 ? 0 : 11 - (sum % 11)
  if (Number.parseInt(cnpj.charAt(12)) !== checkDigit) return false

  sum = 0
  weight = 2
  for (let i = 12; i >= 0; i--) {
    sum += Number.parseInt(cnpj.charAt(i)) * weight
    weight = weight === 9 ? 2 : weight + 1
  }

  checkDigit = sum % 11 < 2 ? 0 : 11 - (sum % 11)
  return Number.parseInt(cnpj.charAt(13)) === checkDigit
}

// Enhanced Date formatting functions
function formatDate(dateString) {
  if (!dateString) return "-"

  const date = new Date(dateString)
  if (isNaN(date.getTime())) return "-"

  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
}

function formatDateTime(dateString) {
  if (!dateString) return "-"

  const date = new Date(dateString)
  if (isNaN(date.getTime())) return "-"

  return date.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

function formatTimeAgo(dateString) {
  if (!dateString) return "-"

  const date = new Date(dateString)
  if (isNaN(date.getTime())) return "-"

  const now = new Date()
  const diffInSeconds = Math.floor((now - date) / 1000)

  if (diffInSeconds < 60) return "agora mesmo"
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}min atrás`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h atrás`
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d atrás`

  return formatDate(dateString)
}

// Enhanced Currency formatting
function formatCurrency(value) {
  if (value === null || value === undefined || isNaN(value)) return "R$ 0,00"

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value)
}

function parseCurrency(value) {
  if (typeof value === "string") {
    return Number.parseFloat(value.replace(/[^\d,-]/g, "").replace(",", ".")) || 0
  }
  return Number.parseFloat(value) || 0
}

// Status helper functions
function getStatusText(status) {
  const statusMap = {
    1: "Aberto",
    2: "Fechado",
    3: "Cancelado",
  }
  return statusMap[status] || "Desconhecido"
}

function getStatusColor(status) {
  const colorMap = {
    1: "success",
    2: "primary",
    3: "secondary",
  }
  return colorMap[status] || "secondary"
}

// Enhanced Debounce function
function debounce(func, wait, immediate = false) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      timeout = null
      if (!immediate) func(...args)
    }
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func(...args)
  }
}

// Enhanced Local Storage functions
function saveToLocalStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data))
    return true
  } catch (error) {
    console.error("Error saving to localStorage:", error)
    return false
  }
}

function loadFromLocalStorage(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (error) {
    console.error("Error loading from localStorage:", error)
    return defaultValue
  }
}

function removeFromLocalStorage(key) {
  try {
    localStorage.removeItem(key)
    return true
  } catch (error) {
    console.error("Error removing from localStorage:", error)
    return false
  }
}

// Enhanced URL parameter functions
function getUrlParameter(name) {
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get(name)
}

function setUrlParameter(name, value) {
  const url = new URL(window.location)
  if (value) {
    url.searchParams.set(name, value)
  } else {
    url.searchParams.delete(name)
  }
  window.history.replaceState({}, "", url)
}

// Enhanced Copy to clipboard function
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text)
    showAlert("Copiado para a área de transferência!", "success", 2000)
    return true
  } catch (error) {
    console.error("Error copying to clipboard:", error)
    showAlert("Erro ao copiar para a área de transferência", "danger")
    return false
  }
}

// Enhanced Download function
function downloadFile(data, filename, type = "text/plain") {
  const blob = new Blob([data], { type })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  window.URL.revokeObjectURL(url)
  document.body.removeChild(a)
}

// Enhanced Print function
function printElement(elementId) {
  const element = document.getElementById(elementId)
  if (!element) {
    showAlert("Elemento não encontrado para impressão", "danger")
    return
  }

  const printWindow = window.open("", "_blank")
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Impressão</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        @media print { body { margin: 0; } }
      </style>
    </head>
    <body>
      ${element.innerHTML}
    </body>
    </html>
  `)
  printWindow.document.close()
  printWindow.focus()
  printWindow.print()
  printWindow.close()
}

// Enhanced Table sorting function
function sortTable(table, column, direction = "asc") {
  const tbody = table.querySelector("tbody")
  const rows = Array.from(tbody.querySelectorAll("tr"))

  rows.sort((a, b) => {
    const aValue = a.cells[column].textContent.trim()
    const bValue = b.cells[column].textContent.trim()

    // Try to parse as numbers first
    const aNum = Number.parseFloat(aValue.replace(/[^\d.-]/g, ""))
    const bNum = Number.parseFloat(bValue.replace(/[^\d.-]/g, ""))

    if (!isNaN(aNum) && !isNaN(bNum)) {
      return direction === "asc" ? aNum - bNum : bNum - aNum
    }

    // Try to parse as dates
    const aDate = new Date(aValue)
    const bDate = new Date(bValue)

    if (!isNaN(aDate.getTime()) && !isNaN(bDate.getTime())) {
      return direction === "asc" ? aDate - bDate : bDate - aDate
    }

    // Default to string comparison
    return direction === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
  })

  // Clear tbody and append sorted rows
  tbody.innerHTML = ""
  rows.forEach((row) => tbody.appendChild(row))
}

// Enhanced Modal functions
function openModal(modalId, data = null) {
  const modal = document.getElementById(modalId)
  if (!modal) {
    console.error(`Modal with id '${modalId}' not found`)
    return null
  }

  const modalInstance = new bootstrap.Modal(modal)
  modalInstance.show()

  return modalInstance
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId)
  if (modal) {
    const modalInstance = bootstrap.Modal.getInstance(modal)
    if (modalInstance) {
      modalInstance.hide()
    }
  }
}

// Enhanced Confirmation dialog
function confirmAction(message, onConfirm, onCancel = null) {
  const confirmed = confirm(message)
  if (confirmed && onConfirm) {
    onConfirm()
  } else if (!confirmed && onCancel) {
    onCancel()
  }
  return confirmed
}

// Enhanced Error handling
function handleError(error, context = "") {
  console.error(`Error in ${context}:`, error)

  let message = "Ocorreu um erro inesperado"
  if (error.message) {
    message = error.message
  } else if (typeof error === "string") {
    message = error
  }

  showAlert(message, "danger")
}

// Enhanced Network status detection
function checkNetworkStatus() {
  if (!navigator.onLine) {
    showAlert("Você está offline. Algumas funcionalidades podem não estar disponíveis.", "warning", 0)
    return false
  }
  return true
}

// Listen for network status changes
window.addEventListener("online", () => {
  hideAlert()
  showAlert("Conexão restaurada!", "success", 3000)
})

window.addEventListener("offline", () => {
  showAlert("Você está offline. Algumas funcionalidades podem não estar disponíveis.", "warning", 0)
})

// Enhanced Performance monitoring
function measurePerformance(name, fn) {
  const start = performance.now()
  const result = fn()
  const end = performance.now()
  console.log(`${name} took ${end - start} milliseconds`)
  return result
}

// Enhanced Browser compatibility checks
function checkBrowserCompatibility() {
  const features = {
    fetch: typeof fetch !== "undefined",
    localStorage: typeof Storage !== "undefined",
    promises: typeof Promise !== "undefined",
    arrow: (() => {
      try {
        eval("() => {}")
        return true
      } catch (e) {
        return false
      }
    })(),
  }

  const unsupported = Object.entries(features)
    .filter(([, supported]) => !supported)
    .map(([feature]) => feature)

  if (unsupported.length > 0) {
    showAlert(
      `Seu navegador não suporta algumas funcionalidades: ${unsupported.join(", ")}. Por favor, atualize seu navegador.`,
      "warning",
      0,
    )
    return false
  }

  return true
}

// Initialize browser compatibility check
document.addEventListener("DOMContentLoaded", checkBrowserCompatibility)

// Enhanced Export functions
function exportToCSV(data, filename = "export.csv") {
  if (!Array.isArray(data) || data.length === 0) {
    showAlert("Nenhum dado para exportar", "warning")
    return
  }

  const headers = Object.keys(data[0])
  const csvContent = [
    headers.join(","),
    ...data.map((row) => headers.map((header) => `"${row[header] || ""}"`).join(",")),
  ].join("\n")

  downloadFile(csvContent, filename, "text/csv")
}

function exportToJSON(data, filename = "export.json") {
  if (!data) {
    showAlert("Nenhum dado para exportar", "warning")
    return
  }

  const jsonContent = JSON.stringify(data, null, 2)
  downloadFile(jsonContent, filename, "application/json")
}

// Enhanced Search and filter functions
function highlightSearchTerm(text, searchTerm) {
  if (!searchTerm) return text

  const regex = new RegExp(`(${searchTerm})`, "gi")
  return text.replace(regex, "<mark>$1</mark>")
}

function fuzzySearch(items, searchTerm, keys) {
  if (!searchTerm) return items

  const searchLower = searchTerm.toLowerCase()

  return items.filter((item) => {
    return keys.some((key) => {
      const value = getNestedValue(item, key)
      return value && value.toString().toLowerCase().includes(searchLower)
    })
  })
}

function getNestedValue(obj, path) {
  return path.split(".").reduce((current, key) => current && current[key], obj)
}

// Enhanced Animation functions
function fadeIn(element, duration = 300) {
  element.style.opacity = "0"
  element.style.display = "block"

  const start = performance.now()

  function animate(currentTime) {
    const elapsed = currentTime - start
    const progress = Math.min(elapsed / duration, 1)

    element.style.opacity = progress.toString()

    if (progress < 1) {
      requestAnimationFrame(animate)
    }
  }

  requestAnimationFrame(animate)
}

function fadeOut(element, duration = 300) {
  const start = performance.now()
  const startOpacity = Number.parseFloat(element.style.opacity) || 1

  function animate(currentTime) {
    const elapsed = currentTime - start
    const progress = Math.min(elapsed / duration, 1)

    element.style.opacity = (startOpacity * (1 - progress)).toString()

    if (progress < 1) {
      requestAnimationFrame(animate)
    } else {
      element.style.display = "none"
    }
  }

  requestAnimationFrame(animate)
}

// Enhanced Accessibility functions
function announceToScreenReader(message) {
  const announcement = document.createElement("div")
  announcement.setAttribute("aria-live", "polite")
  announcement.setAttribute("aria-atomic", "true")
  announcement.className = "sr-only"
  announcement.textContent = message

  document.body.appendChild(announcement)

  setTimeout(() => {
    document.body.removeChild(announcement)
  }, 1000)
}

function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
  )

  const firstElement = focusableElements[0]
  const lastElement = focusableElements[focusableElements.length - 1]

  element.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus()
          e.preventDefault()
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus()
          e.preventDefault()
        }
      }
    }
  })

  firstElement.focus()
}

// Enhanced Theme functions
function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme)
  saveToLocalStorage("theme", theme)
}

function getTheme() {
  return loadFromLocalStorage("theme", "light")
}

function toggleTheme() {
  const currentTheme = getTheme()
  const newTheme = currentTheme === "light" ? "dark" : "light"
  setTheme(newTheme)
  return newTheme
}

// Initialize theme
document.addEventListener("DOMContentLoaded", () => {
  setTheme(getTheme())
})

// Global error handler
window.addEventListener("error", (event) => {
  console.error("Global error:", event.error)
  handleError(event.error, "Global")
})

window.addEventListener("unhandledrejection", (event) => {
  console.error("Unhandled promise rejection:", event.reason)
  handleError(event.reason, "Promise")
})

// Export functions for use in other files
window.InfinityMarket = {
  apiRequest,
  showAlert,
  hideAlert,
  showLoading,
  hideLoading,
  validateForm,
  clearValidation,
  formatDate,
  formatDateTime,
  formatTimeAgo,
  formatCurrency,
  parseCurrency,
  getStatusText,
  getStatusColor,
  debounce,
  saveToLocalStorage,
  loadFromLocalStorage,
  removeFromLocalStorage,
  getUrlParameter,
  setUrlParameter,
  copyToClipboard,
  downloadFile,
  printElement,
  sortTable,
  openModal,
  closeModal,
  confirmAction,
  handleError,
  checkNetworkStatus,
  measurePerformance,
  exportToCSV,
  exportToJSON,
  highlightSearchTerm,
  fuzzySearch,
  fadeIn,
  fadeOut,
  announceToScreenReader,
  trapFocus,
  setTheme,
  getTheme,
  toggleTheme,
}

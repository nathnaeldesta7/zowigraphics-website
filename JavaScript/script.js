// Function to check and initialize mobile elements based on screen size
function initializeMobileElements() {
  const hamburgerMenu = document.querySelector(".hamburger")
  const logo = document.querySelector(".logo")
  const header = document.querySelector("header")
  const desktopMenu = document.querySelector(".desktop-menu")

  // Force a reflow to ensure elements are rendered
  if (header) {
    header.offsetHeight
  }

  if (window.innerWidth <= 768) {
    // Mobile view - ensure elements are visible with explicit styles
    if (hamburgerMenu) {
      hamburgerMenu.style.cssText = `
        display: flex !important;
        visibility: visible !important;
        opacity: 1 !important;
        flex-direction: column;
        gap: 6px;
        cursor: pointer;
        z-index: 102;
      `
    }

    if (logo) {
      logo.style.cssText = `
        display: flex !important;
        visibility: visible !important;
        opacity: 1 !important;
        align-items: center;
        gap: 10px;
      `
    }

    if (header) {
      header.style.cssText = `
        display: flex !important;
        visibility: visible !important;
        opacity: 1 !important;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: var(--header-height);
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        z-index: 100;
        background-color: rgba(32, 29, 25, 0.8);
        backdrop-filter: blur(10px);
        transition: var(--transition);
      `

      // Apply light mode styles if needed
      if (document.body.classList.contains("light-mode")) {
        header.style.backgroundColor = "rgba(245, 245, 245, 0.8)"
      }
    }

    if (desktopMenu) {
      desktopMenu.style.display = "none"
    }
  } else {
    // Desktop view
    if (hamburgerMenu) {
      hamburgerMenu.style.display = "none"
    }

    if (logo) {
      logo.style.cssText = `
        display: flex !important;
        visibility: visible !important;
        opacity: 1 !important;
        align-items: center;
        gap: 10px;
      `
    }

    if (header) {
      header.style.cssText = `
        display: flex !important;
        visibility: visible !important;
        opacity: 1 !important;
        position: fixed;
        top: 0;
        left: var(--sidebar-width);
        right: var(--sidebar-width);
        height: var(--header-height);
        justify-content: space-between;
        align-items: center;
        padding: 0 40px;
        z-index: 100;
        background-color: rgba(32, 29, 25, 0.8);
        backdrop-filter: blur(10px);
        transition: var(--transition);
      `

      // Apply light mode styles if needed
      if (document.body.classList.contains("light-mode")) {
        header.style.backgroundColor = "rgba(245, 245, 245, 0.8)"
      }
    }

    if (desktopMenu) {
      desktopMenu.style.display = "flex"
    }
  }
}

// Enhanced Scroll Animation System
class ScrollAnimationManager {
  constructor() {
    this.animatedElements = new Set()
    this.observerOptions = {
      root: null,
      rootMargin: "-10% 0px -10% 0px",
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5],
    }
    this.init()
  }

  init() {
    this.createObserver()
    this.observeElements()
    this.addScrollListener()
  }

  createObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
          this.animateElement(entry.target)
          this.animatedElements.add(entry.target)
        }
      })
    }, this.observerOptions)
  }

  observeElements() {
    const elementsToAnimate = document.querySelectorAll(".scroll-animate")
    elementsToAnimate.forEach((element) => {
      // Set initial state
      this.setInitialState(element)
      this.observer.observe(element)
    })
  }

  setInitialState(element) {
    const animation = element.dataset.animation || "fadeInUp"

    switch (animation) {
      case "fadeInUp":
        element.style.opacity = "0"
        element.style.transform = "translateY(50px)"
        break
      case "fadeInDown":
        element.style.opacity = "0"
        element.style.transform = "translateY(-50px)"
        break
      case "slideLeft":
        element.style.opacity = "0"
        element.style.transform = "translateX(-50px)"
        break
      case "slideRight":
        element.style.opacity = "0"
        element.style.transform = "translateX(50px)"
        break
      case "slideDown":
        element.style.opacity = "0"
        element.style.transform = "translateY(-30px)"
        break
      case "zoomIn":
        element.style.opacity = "0"
        element.style.transform = "scale(0.8)"
        break
      case "zoomOut":
        element.style.opacity = "0"
        element.style.transform = "scale(1.2)"
        break
      case "rotateIn":
        element.style.opacity = "0"
        element.style.transform = "rotate(-10deg) scale(0.9)"
        break
      case "flipInX":
        element.style.opacity = "0"
        element.style.transform = "perspective(400px) rotateX(-90deg)"
        break
      case "flipInY":
        element.style.opacity = "0"
        element.style.transform = "perspective(400px) rotateY(-90deg)"
        break
      default:
        element.style.opacity = "0"
        element.style.transform = "translateY(30px)"
    }

    element.style.transition = "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
  }

  animateElement(element) {
    const delay = Number.parseFloat(element.dataset.delay) || 0

    setTimeout(() => {
      element.style.opacity = "1"
      element.style.transform = "translateY(0) translateX(0) scale(1) rotate(0) rotateX(0) rotateY(0)"

      // Add a class for additional CSS animations if needed
      element.classList.add("animated")

      // Trigger any custom animations
      this.triggerCustomAnimation(element)
    }, delay * 1000)
  }

  triggerCustomAnimation(element) {
    const animation = element.dataset.animation

    // Add specific animation classes for complex animations
    if (animation === "zoomIn") {
      element.style.transform = "scale(1.05)"
      setTimeout(() => {
        element.style.transform = "scale(1)"
      }, 200)
    }

    // Stagger children animations for containers
    if (
      element.classList.contains("services-grid") ||
      element.classList.contains("design-gallery") ||
      element.classList.contains("projects-grid")
    ) {
      this.staggerChildrenAnimation(element)
    }
  }

  staggerChildrenAnimation(container) {
    const children = container.children
    Array.from(children).forEach((child, index) => {
      if (!child.classList.contains("scroll-animate")) {
        setTimeout(() => {
          child.style.opacity = "1"
          child.style.transform = "translateY(0)"
        }, index * 100)
      }
    })
  }

  addScrollListener() {
    let ticking = false

    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.handleScroll()
          ticking = false
        })
        ticking = true
      }
    })
  }

  handleScroll() {
    const scrolled = window.pageYOffset
    const rate = scrolled * -0.5

    // Parallax effect for background lines
    const bgLines = document.querySelector(".bg-lines")
    if (bgLines) {
      bgLines.style.transform = `translateY(${rate}px)`
    }

    // Header background opacity based on scroll
    const header = document.querySelector("header")
    if (header) {
      const opacity = Math.min(scrolled / 100, 0.95)
      header.style.backgroundColor = `rgba(32, 29, 25, ${opacity})`

      if (document.body.classList.contains("light-mode")) {
        header.style.backgroundColor = `rgba(245, 245, 245, ${opacity})`
      }
    }
  }
}

// Initialize scroll animation manager and mobile elements
document.addEventListener("DOMContentLoaded", () => {
  new ScrollAnimationManager()
  document.body.classList.add("loaded")

  // Initialize mobile elements immediately
  initializeMobileElements()

  // Add multiple delayed calls to ensure proper initialization
  setTimeout(initializeMobileElements, 50)
  setTimeout(initializeMobileElements, 100)
  setTimeout(initializeMobileElements, 200)
})

// Enhanced window load event for additional safety
window.addEventListener("load", () => {
  const bgLines = document.querySelector(".bg-lines")

  if (bgLines) {
    function updateBgLinesHeight() {
      const pageHeight = document.documentElement.scrollHeight
      bgLines.style.height = pageHeight + "px"
    }

    updateBgLinesHeight()
    window.addEventListener("resize", updateBgLinesHeight)

    // Optional: update again after a slight delay for any dynamic content
    setTimeout(updateBgLinesHeight, 1000)
  }

  // Final initialization call after everything is loaded
  setTimeout(initializeMobileElements, 100)
})

// Enhanced resize event listener
window.addEventListener("resize", () => {
  // Debounce resize events
  clearTimeout(window.resizeTimeout)
  window.resizeTimeout = setTimeout(() => {
    initializeMobileElements()
    // Additional call with delay for safety
    setTimeout(initializeMobileElements, 50)
  }, 100)
})

// Orientation change event for mobile devices
window.addEventListener("orientationchange", () => {
  setTimeout(() => {
    initializeMobileElements()
    setTimeout(initializeMobileElements, 100)
  }, 200)
})

// Mobile Menu Toggle
const hamburger = document.querySelector(".hamburger")
const mobileMenu = document.querySelector(".mobile-menu")
const mobileMenuLinks = document.querySelectorAll(".mobile-menu a")
const themeToggle = document.querySelector(".theme-toggle")
const scrollTopBtn = document.getElementById("scroll-top")
const navLinks = document.querySelectorAll(".desktop-menu a")
const leftSidebar = document.querySelector(".left-sidebar")
const rightSidebar = document.querySelector(".right-sidebar")
const sections = document.querySelectorAll("section")

if (hamburger) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active")
    mobileMenu.classList.toggle("active")
    document.body.classList.toggle("no-scroll")
  })
}

// Close mobile menu when clicking a link
mobileMenuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (hamburger) hamburger.classList.remove("active")
    if (mobileMenu) mobileMenu.classList.remove("active")
    document.body.classList.remove("no-scroll")
  })
})

// Theme Toggle
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode")

    // Save theme preference to localStorage
    if (document.body.classList.contains("light-mode")) {
      localStorage.setItem("theme", "light")
    } else {
      localStorage.setItem("theme", "dark")
    }

    // Re-initialize mobile elements to apply theme changes
    setTimeout(initializeMobileElements, 50)
  })
}

// Check for saved theme preference
const savedTheme = localStorage.getItem("theme")
if (savedTheme === "light") {
  document.body.classList.add("light-mode")
}

// Scroll to Top Button
if (scrollTopBtn) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      scrollTopBtn.classList.add("active")
    } else {
      scrollTopBtn.classList.remove("active")
    }
  })

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })
}

// Active Navigation Link on Scroll
function setActiveNavLink() {
  const scrollPosition = window.scrollY

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100
    const sectionHeight = section.offsetHeight
    const sectionId = section.getAttribute("id")

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active")
        }
      })
    }
  })
}

window.addEventListener("scroll", setActiveNavLink)

// FIXED: Enhanced Show/Hide Sidebars on Mobile with complete hiding
let lastScrollTop = 0
let scrollTimeout = null

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY

  // Only apply sidebar hiding on mobile
  if (window.innerWidth <= 768) {
    // Clear any existing timeout
    if (scrollTimeout) {
      clearTimeout(scrollTimeout)
    }

    // Add a small delay to prevent flickering during fast scrolling
    scrollTimeout = setTimeout(() => {
      if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down - hide sidebars completely
        if (leftSidebar) {
          leftSidebar.classList.remove("active")
          leftSidebar.style.cssText = `
            width: 0 !important;
            opacity: 0 !important;
            visibility: hidden !important;
            transform: translateX(-100%) !important;
            pointer-events: none !important;
            transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1) !important;
          `
        }
        if (rightSidebar) {
          rightSidebar.classList.remove("active")
          rightSidebar.style.cssText = `
            width: 0 !important;
            opacity: 0 !important;
            visibility: hidden !important;
            transform: translateX(100%) !important;
            pointer-events: none !important;
            transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1) !important;
          `
        }
      } else if (scrollTop < lastScrollTop) {
        // Scrolling up - show sidebars
        if (leftSidebar) {
          leftSidebar.classList.add("active")
          leftSidebar.style.cssText = `
            width: 60px !important;
            opacity: 1 !important;
            visibility: visible !important;
            transform: translateX(0) !important;
            pointer-events: auto !important;
            transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1) !important;
          `
        }
        if (rightSidebar) {
          rightSidebar.classList.add("active")
          rightSidebar.style.cssText = `
            width: 60px !important;
            opacity: 1 !important;
            visibility: visible !important;
            transform: translateX(0) !important;
            pointer-events: auto !important;
            transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1) !important;
          `
        }
      }
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop // For Mobile or negative scrolling
    }, 100) // Increased from 50ms to 100ms for smoother detection
  }
})

// Enhanced Form Submission Handler
const contactForm = document.querySelector(".contact-form")
if (contactForm) {
  // Create status message element
  const statusMessage = document.createElement("div")
  statusMessage.className = "form-status-message"
  statusMessage.style.cssText = `
    margin-top: 15px;
    padding: 12px 20px;
    border-radius: 8px;
    font-weight: 500;
    text-align: center;
    display: none;
    transition: all 0.3s ease;
  `
  contactForm.appendChild(statusMessage)

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    const submitBtn = contactForm.querySelector(".primary-btn")
    const originalText = submitBtn.textContent
    const formData = new FormData(contactForm)

    // Show loading state
    submitBtn.textContent = "Sending..."
    submitBtn.disabled = true
    submitBtn.style.opacity = "0.7"
    hideStatusMessage()

    try {
      // First attempt: JSON submission
      const response = await fetch("https://formsubmit.co/hello@zowigraphics.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          subject: formData.get("subject"),
          message: formData.get("message"),
          _captcha: "false",
          _template: "table",
        }),
      })

      if (response.ok) {
        showStatusMessage("Thank you! Your message has been sent successfully. We'll get back to you soon.", "success")
        contactForm.reset()
      } else {
        throw new Error("Network response was not ok")
      }
    } catch (error) {
      console.log("JSON submission failed, trying form submission...")

      try {
        // Fallback: Traditional form submission
        const tempForm = document.createElement("form")
        tempForm.action = "https://formsubmit.co/hello@zowigraphics.com"
        tempForm.method = "POST"
        tempForm.style.display = "none"

        // Add all form fields
        const fields = ["name", "email", "subject", "message"]
        fields.forEach((field) => {
          const input = document.createElement("input")
          input.type = "hidden"
          input.name = field
          input.value = formData.get(field) || ""
          tempForm.appendChild(input)
        })

        // Add FormSubmit configuration
        const hiddenFields = {
          _captcha: "false",
          _template: "table",
          _next: window.location.href + "?success=true",
          _subject: "New Contact Form Submission from Zowi Graphics",
        }

        Object.entries(hiddenFields).forEach(([name, value]) => {
          const input = document.createElement("input")
          input.type = "hidden"
          input.name = name
          input.value = value
          tempForm.appendChild(input)
        })

        document.body.appendChild(tempForm)
        tempForm.submit()
      } catch (fallbackError) {
        console.error("Both submission methods failed:", fallbackError)
        showStatusMessage(
          "Sorry, there was an error sending your message. Please try again or contact us directly at hello@zowigraphics.com",
          "error",
        )
      }
    } finally {
      // Reset button state
      setTimeout(() => {
        submitBtn.textContent = originalText
        submitBtn.disabled = false
        submitBtn.style.opacity = "1"
      }, 1000)
    }
  })

  function showStatusMessage(message, type) {
    statusMessage.textContent = message
    statusMessage.style.display = "block"

    if (type === "success") {
      statusMessage.style.backgroundColor = "#d4edda"
      statusMessage.style.color = "#155724"
      statusMessage.style.border = "1px solid #c3e6cb"
    } else {
      statusMessage.style.backgroundColor = "#f8d7da"
      statusMessage.style.color = "#721c24"
      statusMessage.style.border = "1px solid #f5c6cb"
    }

    // Auto hide after 8 seconds
    setTimeout(() => {
      hideStatusMessage()
    }, 8000)
  }

  function hideStatusMessage() {
    statusMessage.style.display = "none"
  }
}

// Check for success parameter in URL (for fallback form submission)
window.addEventListener("load", () => {
  const urlParams = new URLSearchParams(window.location.search)
  if (urlParams.get("success") === "true") {
    const statusMessage = document.querySelector(".form-status-message")
    if (statusMessage) {
      setTimeout(() => {
        statusMessage.textContent = "Thank you! Your message has been sent successfully. We'll get back to you soon."
        statusMessage.style.display = "block"
        statusMessage.style.backgroundColor = "#d4edda"
        statusMessage.style.color = "#155724"
        statusMessage.style.border = "1px solid #c3e6cb"
      }, 500)
    }

    // Clean up URL
    window.history.replaceState({}, document.title, window.location.pathname)
  }
})

// Additional design items data for "View All Designs" functionality
const additionalDesigns = {
  design7: {
    title: "Mayoha Trading",
    description:
      "Mayoha Trading PLC is a reputable Ethiopian company Specializing in the import and distribution of ISO-standard goods, Mayoha Trading sources products from the Middle East, Asia, and the European Union.",
    images: ["design/mayoha-thumbnail.webp", "design/mayoha-brand.webp"],
  },
  design8: {
    title: "Aesthetic Interior",
    description:
      "Aesthetic Interiors is a detail-oriented design firm based in Addis Ababa, Ethiopia, specializing in product design, event management, and interior design.",
    images: ["design/aesthetic-thumbnail.webp", "design/aesthetic-brand.webp"],
  },
  design9: {
    title: "Altitude Construction",
    description:
      "Altitude Construction PLC is a dynamic and forward-thinking Grade 5 general contractor based in Addis Ababa, Ethiopia. The company specializes in a wide range of construction and finishing services.",
    images: ["design/altitude-thumbnail.webp", "design/altitude-brand.webp"],
  },
}

// Design Gallery Modal Functionality
const designItems = document.querySelectorAll(".design-item")
const designModal = document.getElementById("design-modal")
const designModalClose = designModal ? designModal.querySelector(".modal-close") : null
const galleryMainImage = document.getElementById("gallery-main-image")
const galleryThumbnails = document.querySelector(".gallery-thumbnails")
const galleryTitle = document.querySelector(".gallery-title")
const galleryText = document.querySelector(".gallery-text")

// Design gallery data
const designGalleryData = {
  design1: {
    title: "Enda General Trading",
    description:
      "Enda General Trading is a growing and trusted construction company based in Ethiopia, committed to delivering high-quality infrastructure that supports national development.",
    images: [
      "design/enda-thumbnail.webp",
      "design/enda-brand.webp",
      "design/enda1.webp",
      "design/enda2.webp",
      "design/enda3.webp",
    ],
  },
  design2: {
    title: "Biruk SuperMarket",
    description:
      "Biruk Supermarket is a locally owned retail business based in Bahir Dar, Ethiopia. It offers a wide selection of everyday essentials, including groceries, fresh produce, household items, and personal care products.",
    images: [
      "design/biruk-thumbnail.webp",
      "design/biruk-brand.webp",
      "design/biruk1.webp",
      "design/biruk2.webp",
      "design/biruk3.webp",
    ],
  },
  design3: {
    title: "Semida Auto Refinish",
    description:
      "Semida Auto Refinish is a family-driven automotive refinishing service in Ethiopia, committed to delivering top-tier results with precision and care. Founded on strong values and a passion for automotive excellence.",
    images: [
      "design/semida-thumbnail.webp",
      "design/semida-brand.webp",
      "design/semida1.webp",
      "design/semida2.webp",
      "design/semida3.webp",
    ],
  },
  design4: {
    title: "Vision Craft Engineering",
    description:
      "Vision Craft Engineering P.L.C is a dynamic and innovative construction company, established to redefine the landscape of the construction industry With a forward-thinking approach",
    images: [
      "design/vision-thumbnail.webp",
      "design/vision-brand.webp",
      "design/vision1.webp",
      "design/vision2.webp",
      "design/vision3.webp",
    ],
  },
  design5: {
    title: "Space Properties",
    description:
      "Space Properties is an innovative real estate company in Ethiopia that empowers individuals and teams to create and share personalized living and working spaces.",
    images: [
      "design/space-thumbnail.webp",
      "design/space-brand.webp",
      "design/space1.webp",
      "design/space2.webp",
      "design/space3.webp",
    ],
  },
  design6: {
    title: "Kaleb Medium Clinic",
    description:
      "Kaleb Medium Clinic is a community-focused healthcare facility in Ethiopia, providing accessible and compassionate medical services. Committed to patient-centered care.",
    images: [
      "design/kmc-thumbnail.webp",
      "design/kmc-brand.webp",
      "design/kmc1.webp",
      "design/kmc2.webp",
      "design/kmc3.webp",
    ],
  },
  // Add the additional designs to the main data object
  ...additionalDesigns,
}

// Modern gallery functionality
designItems.forEach((item) => {
  item.addEventListener("click", () => {
    const designId = item.getAttribute("data-id")
    const designData = designGalleryData[designId]

    if (designData && designModal) {
      // Set title and description
      if (galleryTitle) galleryTitle.textContent = designData.title
      if (galleryText) galleryText.textContent = designData.description

      // Clear existing thumbnails
      if (galleryThumbnails) galleryThumbnails.innerHTML = ""

      // Update total images counter
      const totalImagesEl = document.getElementById("total-images")
      const currentImageEl = document.getElementById("current-image")
      if (totalImagesEl) totalImagesEl.textContent = designData.images.length
      if (currentImageEl) currentImageEl.textContent = "1"

      // Add thumbnails with improved styling
      if (galleryThumbnails) {
        designData.images.forEach((image, index) => {
          const thumbnail = document.createElement("div")
          thumbnail.classList.add("gallery-thumbnail")
          if (index === 0) thumbnail.classList.add("active")

          const thumbnailImg = document.createElement("img")
          thumbnailImg.src = image
          thumbnailImg.alt = `${designData.title} - Image ${index + 1}`

          thumbnail.appendChild(thumbnailImg)
          galleryThumbnails.appendChild(thumbnail)
        })
      }

      // Open modal with fade-in effect
      designModal.classList.add("active")
      document.body.classList.add("no-scroll")

      // Setup navigation buttons
      setupGalleryNavigation(designData)
    }
  })
})

// Function to change gallery image
function changeGalleryImage(image, index, title) {
  // Get the gallery scroll container
  const galleryScroll = document.querySelector(".gallery-scroll-container")

  if (galleryScroll) {
    // Scroll to the corresponding image
    const scrollAmount = index * (galleryScroll.clientHeight / document.querySelectorAll(".gallery-thumbnail").length)
    galleryScroll.scrollTo({
      top: scrollAmount,
      behavior: "smooth",
    })

    // Update counter
    const currentImageEl = document.getElementById("current-image")
    if (currentImageEl) currentImageEl.textContent = index + 1

    // Update active thumbnail
    document.querySelectorAll(".gallery-thumbnail").forEach((thumb) => {
      thumb.classList.remove("active")
    })
    const thumbnails = document.querySelectorAll(".gallery-thumbnail")
    if (thumbnails[index]) thumbnails[index].classList.add("active")
  } else {
    // Fallback to original behavior if scroll container doesn't exist
    if (galleryMainImage) {
      galleryMainImage.style.opacity = "0.5"
      galleryMainImage.style.transform = "scale(0.95)"

      setTimeout(() => {
        galleryMainImage.src = image
        galleryMainImage.alt = `${title} - Image ${index + 1}`

        // Update counter
        const currentImageEl = document.getElementById("current-image")
        if (currentImageEl) currentImageEl.textContent = index + 1

        // Fade back in with zoom-in effect
        galleryMainImage.style.opacity = "1"
        galleryMainImage.style.transform = "scale(1)"

        // Update active thumbnail
        document.querySelectorAll(".gallery-thumbnail").forEach((thumb) => {
          thumb.classList.remove("active")
        })
        const thumbnails = document.querySelectorAll(".gallery-thumbnail")
        if (thumbnails[index]) thumbnails[index].classList.add("active")
      }, 200)
    }
  }
}

// In the setupGalleryNavigation function, modify it to add PDF-like scrolling behavior
function setupGalleryNavigation(designData) {
  const prevBtn = document.querySelector(".gallery-nav.prev")
  const nextBtn = document.querySelector(".gallery-nav.next")
  let currentIndex = 0

  // Convert gallery container to PDF-like scrolling mode
  const galleryContainer = document.querySelector(".gallery-container")
  if (galleryContainer) galleryContainer.classList.add("pdf-scroll-mode")

  // Create a continuous scroll container for all images
  const galleryScroll = document.createElement("div")
  galleryScroll.classList.add("gallery-scroll-container")

  // Add all images to the scroll container
  designData.images.forEach((image, index) => {
    const imageDiv = document.createElement("div")
    imageDiv.classList.add("gallery-scroll-image")

    const img = document.createElement("img")
    img.src = image
    img.alt = `${designData.title} - Image ${index + 1}`

    imageDiv.appendChild(img)
    galleryScroll.appendChild(imageDiv)
  })

  // Replace the main image with the scroll container
  const galleryMain = document.querySelector(".gallery-main")
  if (galleryMain) {
    galleryMain.innerHTML = ""
    galleryMain.appendChild(galleryScroll)
  }

  // Update total images counter
  const totalImagesEl = document.getElementById("total-images")
  if (totalImagesEl) totalImagesEl.textContent = designData.images.length

  // Previous button click - scroll up
  if (prevBtn) {
    prevBtn.onclick = () => {
      const scrollAmount = galleryScroll.clientHeight / designData.images.length
      galleryScroll.scrollBy({
        top: -scrollAmount,
        behavior: "smooth",
      })

      // Update current image index based on scroll position
      setTimeout(() => {
        const scrollPosition = galleryScroll.scrollTop
        const imageHeight = galleryScroll.clientHeight / designData.images.length
        currentIndex = Math.round(scrollPosition / imageHeight)
        if (currentIndex < 0) currentIndex = 0

        // Update counter
        const currentImageEl = document.getElementById("current-image")
        if (currentImageEl) currentImageEl.textContent = currentIndex + 1

        // Update active thumbnail
        document.querySelectorAll(".gallery-thumbnail").forEach((thumb, idx) => {
          thumb.classList.toggle("active", idx === currentIndex)
        })
      }, 300)
    }
  }

  // Next button click - scroll down
  if (nextBtn) {
    nextBtn.onclick = () => {
      const scrollAmount = galleryScroll.clientHeight / designData.images.length
      galleryScroll.scrollBy({
        top: scrollAmount,
        behavior: "smooth",
      })

      // Update current image index based on scroll position
      setTimeout(() => {
        const scrollPosition = galleryScroll.scrollTop
        const imageHeight = galleryScroll.clientHeight / designData.images.length
        currentIndex = Math.round(scrollPosition / imageHeight)
        if (currentIndex >= designData.images.length) currentIndex = designData.images.length - 1

        // Update counter
        const currentImageEl = document.getElementById("current-image")
        if (currentImageEl) currentImageEl.textContent = currentIndex + 1

        // Update active thumbnail
        document.querySelectorAll(".gallery-thumbnail").forEach((thumb, idx) => {
          thumb.classList.toggle("active", idx === currentIndex)
        })
      }, 300)
    }
  }

  // Scroll event to update current image index
  galleryScroll.addEventListener("scroll", () => {
    const scrollPosition = galleryScroll.scrollTop
    const imageHeight = galleryScroll.clientHeight / designData.images.length
    currentIndex = Math.round(scrollPosition / imageHeight)
    if (currentIndex < 0) currentIndex = 0
    if (currentIndex >= designData.images.length) currentIndex = designData.images.length - 1

    // Update counter
    const currentImageEl = document.getElementById("current-image")
    if (currentImageEl) currentImageEl.textContent = currentIndex + 1

    // Update active thumbnail
    document.querySelectorAll(".gallery-thumbnail").forEach((thumb, idx) => {
      thumb.classList.toggle("active", idx === currentIndex)
    })
  })

  // Thumbnail click event
  document.querySelectorAll(".gallery-thumbnail").forEach((thumb, index) => {
    thumb.addEventListener("click", () => {
      // Scroll to the corresponding image
      const scrollAmount = index * (galleryScroll.clientHeight / designData.images.length)
      galleryScroll.scrollTo({
        top: scrollAmount,
        behavior: "smooth",
      })

      // Update current index
      currentIndex = index

      // Update counter
      const currentImageEl = document.getElementById("current-image")
      if (currentImageEl) currentImageEl.textContent = currentIndex + 1

      // Update active thumbnail
      document.querySelectorAll(".gallery-thumbnail").forEach((t) => {
        t.classList.remove("active")
      })
      thumb.classList.add("active")
    })
  })

  // Keyboard navigation
  document.addEventListener("keydown", function galleryKeyNav(e) {
    if (!designModal || !designModal.classList.contains("active")) {
      document.removeEventListener("keydown", galleryKeyNav)
      return
    }

    if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      if (prevBtn) prevBtn.click()
    } else if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      if (nextBtn) nextBtn.click()
    }
  })

  // Mouse wheel navigation
  galleryScroll.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault()
      if (e.deltaY > 0) {
        // Scroll down
        if (nextBtn) nextBtn.click()
      } else {
        // Scroll up
        if (prevBtn) prevBtn.click()
      }
    },
    { passive: false },
  )
}

// Project Case Study Modal Functionality
const projectLinks = document.querySelectorAll(".project-link")
const projectModal = document.getElementById("project-modal")
const projectModalClose = projectModal ? projectModal.querySelector(".modal-close") : null
const caseStudyTitle = document.querySelector(".case-study-title")
const caseStudySubtitle = document.querySelector(".case-study-subtitle")
const caseStudyGallery = document.querySelector(".case-study-gallery")
const caseStudyChallenge = document.querySelector(".case-study-challenge")
const caseStudySolution = document.querySelector(".case-study-solution")
const caseStudyResults = document.querySelector(".case-study-results")

// Project case study data
const projectCaseStudyData = {
  project1: {
    title: "Logo and Branding",
    subtitle: "Simple | Eyecatch | Modern",
    challenge:
      "Many startups and small businesses struggle with building a strong visual identity. They often have unclear branding, inconsistent visuals, and logos that don't reflect their values or connect with their target audience. This lack of brand clarity makes it difficult to stand out in competitive markets.",
    solution:
      "At Zowi Creative Solution, we start with strategy. We dive deep into each client's mission, audience, and industry to craft logos and branding systems that are simple, memorable, and modern. Our process includes logo design, typography, color selection, and brand guidelines to ensure visual consistency across all platforms.",
    results:
      "Clients walk away with a bold, professional identity that builds trust and leaves a lasting impression. Our branding solutions have helped businesses increase engagement, improve recognition, and attract their ideal audience setting them up for long-term success.",
    images: [
      "design/aesthetic-thumbnail.webp",
      "design/enda-thumbnail.webp",
      "design/space-thumbnail.webp",
      "design/semida-thumbnail.webp",
    ],
  },
  project3: {
    title: "Web Development",
    subtitle: "Responsive | Modern | Clean",
    challenge:
      "Many businesses have slow, non-responsive, or outdated websites that create a poor first impression. This leads to low engagement and missed opportunities to connect with users.",
    solution:
      "Zowi Creative Solution develops front-end solutions using the latest technologies like HTML, CSS, JavaScript, and modern frameworks. We focus on clean code, responsive layouts, and seamless performance to ensure a great user experience across all screen sizes.",
    results:
      "Our websites load faster, look better, and perform smoothly. Clients experience increased user retention, better SEO performance, and stronger online presence  helping them reach their business goals effectively.",
    images: ["assets/web1.jpg", "assets/web2.jpg", "assets/web3.jpg", "assets/web4.jpg"],
  },
}

// Open project case study modal
projectLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault()
    const projectId = link.getAttribute("data-project")
    const projectData = projectCaseStudyData[projectId]

    if (projectData && projectModal) {
      // Set title and subtitle
      if (caseStudyTitle) caseStudyTitle.textContent = projectData.title
      if (caseStudySubtitle) caseStudySubtitle.textContent = projectData.subtitle

      // Clear existing gallery
      if (caseStudyGallery) caseStudyGallery.innerHTML = ""

      // Add gallery images
      if (caseStudyGallery) {
        projectData.images.forEach((image, index) => {
          const imageDiv = document.createElement("div")
          imageDiv.classList.add("case-study-image")

          const img = document.createElement("img")
          img.src = image
          img.alt = `${projectData.title} - Image ${index + 1}`

          imageDiv.appendChild(img)
          caseStudyGallery.appendChild(imageDiv)
        })
      }

      // Set case study content
      if (caseStudyChallenge) caseStudyChallenge.textContent = projectData.challenge
      if (caseStudySolution) caseStudySolution.textContent = projectData.solution
      if (caseStudyResults) caseStudyResults.textContent = projectData.results

      // Open modal
      projectModal.classList.add("active")
      document.body.classList.add("no-scroll")
    }
  })
})

// Close project case study modal
if (projectModalClose) {
  projectModalClose.addEventListener("click", () => {
    if (projectModal) {
      projectModal.classList.remove("active")
      document.body.classList.remove("no-scroll")
    }
  })
}

// Close design gallery modal
if (designModalClose) {
  designModalClose.addEventListener("click", () => {
    if (designModal) {
      designModal.classList.remove("active")
      document.body.classList.remove("no-scroll")
    }
  })
}

// Close modals when clicking outside
window.addEventListener("click", (e) => {
  if (designModal && e.target === designModal) {
    designModal.classList.remove("active")
    document.body.classList.remove("no-scroll")
  }
  if (projectModal && e.target === projectModal) {
    projectModal.classList.remove("active")
    document.body.classList.remove("no-scroll")
  }
})

// Close modals with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (designModal) designModal.classList.remove("active")
    if (projectModal) projectModal.classList.remove("active")
    document.body.classList.remove("no-scroll")
  }
})

// View All Designs functionality
document.addEventListener("DOMContentLoaded", () => {
  const viewAllBtn = document.querySelector(".center-button .primary-btn")
  const designItems = document.querySelectorAll(".design-gallery .design-item")

  if (viewAllBtn && designItems.length > 6) {
    // Initially hide all items beyond the first 6
    designItems.forEach((item, index) => {
      if (index >= 6) {
        item.style.display = "none"
      }
    })

    // Change the button text to "View All Designs"
    viewAllBtn.textContent = "View All Designs"

    // Track if additional designs are shown
    let additionalDesignsShown = false

    viewAllBtn.addEventListener("click", () => {
      if (!additionalDesignsShown) {
        // Show all design items
        designItems.forEach((item, index) => {
          if (index >= 6) {
            item.style.display = "block"
            // Add animation class after a small delay
            setTimeout(
              () => {
                item.classList.add("animate")
              },
              50 * (index - 5),
            ) // Staggered animation
          }
        })

        // Change button text
        viewAllBtn.textContent = "Show Less"
        additionalDesignsShown = true
      } else {
        // Hide items beyond the first 6
        designItems.forEach((item, index) => {
          if (index >= 6) {
            item.style.display = "none"
            item.classList.remove("animate")
          }
        })

        // Change button text back
        viewAllBtn.textContent = "View All Designs"
        additionalDesignsShown = false
      }
    })
  } else if (viewAllBtn) {
    // If there are 6 or fewer items, hide the button
    viewAllBtn.style.display = "none"
  }
})

// Helper function to open design modal
function openDesignModal(designId) {
  const designData = designGalleryData[designId]

  if (designData && designModal) {
    // Set title and description
    if (galleryTitle) galleryTitle.textContent = designData.title
    if (galleryText) galleryText.textContent = designData.description

    // Clear existing thumbnails
    if (galleryThumbnails) galleryThumbnails.innerHTML = ""

    // Update total images counter
    const totalImagesEl = document.getElementById("total-images")
    const currentImageEl = document.getElementById("current-image")
    if (totalImagesEl) totalImagesEl.textContent = designData.images.length
    if (currentImageEl) currentImageEl.textContent = "1"

    // Add thumbnails with improved styling
    if (galleryThumbnails) {
      designData.images.forEach((image, index) => {
        const thumbnail = document.createElement("div")
        thumbnail.classList.add("gallery-thumbnail")
        if (index === 0) thumbnail.classList.add("active")

        const thumbnailImg = document.createElement("img")
        thumbnailImg.src = image
        thumbnailImg.alt = `${designData.title} - Image ${index + 1}`

        thumbnail.appendChild(thumbnailImg)
        galleryThumbnails.appendChild(thumbnail)
      })
    }

    // Open modal with fade-in effect
    designModal.classList.add("active")
    document.body.classList.add("no-scroll")

    // Setup navigation buttons
    setupGalleryNavigation(designData)
  }
}

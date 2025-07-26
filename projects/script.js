document.addEventListener("DOMContentLoaded", () => {
  // Theme switching
  const colorButtons = document.querySelectorAll(".color-btn")
  const themeToggle = document.getElementById("themeToggle")
  const colorPicker = document.getElementById("colorPicker")
  const body = document.body

  // Load saved theme or default
  const savedTheme = localStorage.getItem("portfolio-theme") || "default"
  body.setAttribute("data-theme", savedTheme)

  // Set active button
  colorButtons.forEach((btn) => {
    if (btn.dataset.theme === savedTheme) {
      btn.classList.add("active")
    }

    btn.addEventListener("click", () => {
      const theme = btn.dataset.theme

      // Remove active class from all buttons
      colorButtons.forEach((b) => b.classList.remove("active"))

      // Add active class to clicked button
      btn.classList.add("active")

      // Apply theme
      body.setAttribute("data-theme", theme)

      // Save theme preference
      localStorage.setItem("portfolio-theme", theme)

      // Close color picker
      colorPicker.classList.remove("active")
    })
  })

  // Toggle color picker
  themeToggle.addEventListener("click", (e) => {
    e.stopPropagation()
    colorPicker.classList.toggle("active")
  })

  // Close color picker when clicking outside
  document.addEventListener("click", (e) => {
    if (!colorPicker.contains(e.target) && !themeToggle.contains(e.target)) {
      colorPicker.classList.remove("active")
    }
  })

  // Mobile Navigation
  const burger = document.querySelector(".burger")
  const nav = document.querySelector(".nav-links")
  const navLinks = document.querySelectorAll(".nav-links li")

  burger.addEventListener("click", () => {
    // Toggle Nav
    nav.classList.toggle("nav-active")

    // Animate Links
    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = ""
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`
      }
    })

    // Burger Animation
    burger.classList.toggle("toggle")
  })

  // Close mobile menu when clicking on a link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (nav.classList.contains("nav-active")) {
        nav.classList.remove("nav-active")
        burger.classList.remove("toggle")

        navLinks.forEach((link) => {
          link.style.animation = ""
        })
      }
    })
  })

  // Scroll Animations
  const faders = document.querySelectorAll(".fade-in")
  const sliders = document.querySelectorAll(".reveal")

  // Initial animations for elements in view
  animateOnScroll()

  // Scroll event for animations
  window.addEventListener("scroll", animateOnScroll)

  function animateOnScroll() {
    const triggerBottom = window.innerHeight * 0.8

    faders.forEach((fader) => {
      const elementTop = fader.getBoundingClientRect().top

      if (elementTop < triggerBottom) {
        fader.style.opacity = "1"
      }
    })

    sliders.forEach((slider) => {
      const elementTop = slider.getBoundingClientRect().top

      if (elementTop < triggerBottom) {
        slider.classList.add("active")
      }
    })
  }

  // Skill bar animation
  const skillLevels = document.querySelectorAll(".skill-level")

  const observeSkills = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const skillLevel = entry.target
          const width = skillLevel.getAttribute("data-width")

          setTimeout(() => {
            skillLevel.style.width = width + "%"
          }, 200)

          observeSkills.unobserve(skillLevel)
        }
      })
    },
    { threshold: 0.5 },
  )

  skillLevels.forEach((skillLevel) => {
    observeSkills.observe(skillLevel)
  })

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        })
      }
    })
  })

  // Parallax effect for hero section
  const hero = document.querySelector(".hero")

  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY

    if (scrollPosition < window.innerHeight) {
      hero.style.backgroundPosition = `center ${scrollPosition * 0.5}px`
    }
  })

  // Project hover effects
  const projectCards = document.querySelectorAll(".project-card")

  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px)"
      card.style.boxShadow = "0 15px 30px rgba(0, 0, 0, 0.2)"
    })

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)"
      card.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.1)"
    })
  })

  // Typing effect for hero title
  const heroTitle = document.querySelector(".hero h1")
  const originalText = heroTitle.innerHTML
  const highlight = document.querySelector(".highlight")
  const originalHighlightText = highlight.textContent

  // Only run the typing effect if the page is loaded for the first time
  if (sessionStorage.getItem("visited") !== "true") {
    // Set the flag in session storage
    sessionStorage.setItem("visited", "true")

    // Clear the text content
    heroTitle.innerHTML = ""
    let charIndex = 0

    // Start typing effect after a short delay
    setTimeout(() => {
      const typingInterval = setInterval(() => {
        if (charIndex < originalText.length) {
          // Check if we're at the point where the highlight span starts
          if (originalText.substring(charIndex).startsWith('<span class="highlight">')) {
            // Add the opening span tag
            heroTitle.innerHTML += '<span class="highlight">'
            charIndex += '<span class="highlight">'.length

            // Add the content of the highlight span
            let highlightIndex = 0
            const highlightTypingInterval = setInterval(() => {
              if (highlightIndex < originalHighlightText.length) {
                highlight.textContent += originalHighlightText[highlightIndex]
                highlightIndex++
              } else {
                clearInterval(highlightTypingInterval)

                // Add the closing span tag
                heroTitle.innerHTML += "</span>"
                charIndex += originalHighlightText.length + "</span>".length

                // Continue with the rest of the text
                continueTyping()
              }
            }, 100)

            clearInterval(typingInterval)
          } else {
            heroTitle.innerHTML += originalText[charIndex]
            charIndex++
          }
        } else {
          clearInterval(typingInterval)
        }
      }, 50)
    }, 500)

    function continueTyping() {
      const remainingText = originalText.substring(charIndex)
      let remainingIndex = 0

      const remainingTypingInterval = setInterval(() => {
        if (remainingIndex < remainingText.length) {
          heroTitle.innerHTML += remainingText[remainingIndex]
          remainingIndex++
        } else {
          clearInterval(remainingTypingInterval)
        }
      }, 50)
    }
  }

  // Scroll indicator click handler
  const scrollIndicator = document.querySelector(".scroll-indicator")
  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", () => {
      document.getElementById("about").scrollIntoView({
        behavior: "smooth",
      })
    })
  }

  // Hide scroll indicator when scrolling past hero
  window.addEventListener("scroll", () => {
    const scrollIndicator = document.querySelector(".scroll-indicator")
    if (scrollIndicator) {
      const heroHeight = document.querySelector(".hero").offsetHeight
      if (window.scrollY > heroHeight * 0.3) {
        scrollIndicator.style.opacity = "0"
      } else {
        scrollIndicator.style.opacity = "1"
      }
    }
  })
})

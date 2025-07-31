document.addEventListener("DOMContentLoaded", () => {
  const colorButtons = document.querySelectorAll(".color-btn")
  const themeToggle = document.getElementById("themeToggle")
  const colorPicker = document.getElementById("colorPicker")
  const body = document.body

  const savedTheme = localStorage.getItem("portfolio-theme") || "default"
  body.setAttribute("data-theme", savedTheme)

  colorButtons.forEach((btn) => {
    if (btn.dataset.theme === savedTheme) {
      btn.classList.add("active")
    }

    btn.addEventListener("click", () => {
      const theme = btn.dataset.theme
      colorButtons.forEach((b) => b.classList.remove("active"))
      btn.classList.add("active")
      body.setAttribute("data-theme", theme)
      localStorage.setItem("portfolio-theme", theme)
      colorPicker.classList.remove("active")
    })
  })

  themeToggle.addEventListener("click", (e) => {
    e.stopPropagation()
    colorPicker.classList.toggle("active")
  })

  document.addEventListener("click", (e) => {
    if (!colorPicker.contains(e.target) && !themeToggle.contains(e.target)) {
      colorPicker.classList.remove("active")
    }
  })

  const burger = document.querySelector(".burger")
  const nav = document.querySelector(".nav-links")
  const navLinks = document.querySelectorAll(".nav-links li")

  burger.addEventListener("click", () => {
    nav.classList.toggle("nav-active")
    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = ""
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`
      }
    })
    burger.classList.toggle("toggle")
  })

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

  const faders = document.querySelectorAll(".fade-in")
  const sliders = document.querySelectorAll(".reveal")
  animateOnScroll()
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

  const hero = document.querySelector(".hero")
  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY
    if (scrollPosition < window.innerHeight) {
      hero.style.backgroundPosition = `center ${scrollPosition * 0.5}px`
    }
  })

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

  const heroTitle = document.querySelector(".hero h1")
  if (heroTitle) {
    const nameSpan = heroTitle.querySelector(".highlight")
    const name = nameSpan ? nameSpan.textContent : "David"
    const beforeText = "Hello, I'm "
    heroTitle.innerHTML = '<span class="typing-text"></span><span class="highlight"></span>'
    const typingTextSpan = heroTitle.querySelector(".typing-text")
    const highlightSpan = heroTitle.querySelector(".highlight")
    setTimeout(() => {
      let phase = 1
      let charIndex = 0
      const typingInterval = setInterval(() => {
        if (phase === 1) {
          if (charIndex < beforeText.length) {
            typingTextSpan.textContent = beforeText.substring(0, charIndex + 1)
            charIndex++
          } else {
            phase = 2
            charIndex = 0
          }
        } else if (phase === 2) {
          if (charIndex < name.length) {
            highlightSpan.textContent = name.substring(0, charIndex + 1)
            charIndex++
          } else {
            clearInterval(typingInterval)
            highlightSpan.style.borderRight = "2px solid var(--primary-color)"
            highlightSpan.style.animation = "blink 1s infinite"
            setTimeout(() => {
              highlightSpan.style.borderRight = "none"
              highlightSpan.style.animation = "none"
            }, 2000)
          }
        }
      }, 100)
    }, 1000)
  }

  const scrollIndicator = document.querySelector(".scroll-indicator")
  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", () => {
      document.getElementById("about").scrollIntoView({
        behavior: "smooth",
      })
    })
  }

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

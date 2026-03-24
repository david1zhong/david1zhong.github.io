let currentPosition = 0
const cardWidth = 360
const gap = 16

function updateArrows() {
  const track = document.getElementById("carouselTrack")
  const cards = track.children
  const maxPosition = -(cards.length - 1) * (cardWidth + gap)

  const leftArrow = document.querySelector('.carousel-arrow:first-child')
  const rightArrow = document.querySelector('.carousel-arrow:last-child')

  if (currentPosition >= 0) {
    leftArrow.classList.add('disabled')
  } else {
    leftArrow.classList.remove('disabled')
  }

  if (currentPosition <= maxPosition) {
    rightArrow.innerHTML = '⭮'
    rightArrow.classList.add('loop')
  } else {
    rightArrow.innerHTML = '▶'
    rightArrow.classList.remove('loop')
  }
}

function scrollCarousel(direction) {
  const track = document.getElementById("carouselTrack")
  const cards = track.children
  const maxPosition = -(cards.length - 1) * (cardWidth + gap)

  if (direction === 1 && currentPosition >= 0) {
    return
  }

  currentPosition += direction * (cardWidth + gap)

  if (direction === 1 && currentPosition > 0) {
    currentPosition = 0
  } else if (direction === -1 && currentPosition < maxPosition) {
    currentPosition = 0
  }

  track.style.transform = `translateX(${currentPosition}px)`
  updateArrows()
}

function removeBet(button) {
  const betLeg = button.closest(".bet-leg")
  betLeg.remove()
  updateBetCount()
  calculatePayout()
}

function updateBetCount() {
  const betLegs = document.querySelectorAll(".bet-leg")
  const badge = document.querySelector(".betslip-badge")
  const parlayTitle = document.querySelector(".parlay-title")

  badge.textContent = betLegs.length
  parlayTitle.textContent = `${betLegs.length} leg Parlay`

  if (betLegs.length === 0) {
    document.querySelector(".parlay-info").style.display = "none"
  }
}

function initWagerInput() {
  const input = document.getElementById("wagerInput")
  if (!input) return

  input.addEventListener("keydown", (e) => {
    const allowedKeys = ["ArrowLeft", "ArrowRight", "Tab", "Enter"]
    const isDigit = e.key >= "0" && e.key <= "9"

    if (e.key === "Backspace" || e.key === "Delete") {
      const digits = input.value.replace("$", "")
      if (digits.length === 0) {
        e.preventDefault()
        return
      }
    }

    if (!isDigit && !allowedKeys.includes(e.key) &&
        e.key !== "Backspace" && e.key !== "Delete") {
      e.preventDefault()
    }
  })

  input.addEventListener("input", () => {
    let digits = input.value.replace(/\D/g, "")
    if (digits === "") {
      input.value = "$"
      calculatePayout()
      return
    }
    let num = parseInt(digits, 10)
    if (num > 10000) num = 10000
    input.value = "$" + num
    calculatePayout()
  })

  input.addEventListener("click", () => {
    const len = input.value.length
    if (input.selectionStart < 1) {
      input.setSelectionRange(len, len)
    }
  })
}

function calculatePayout() {
  const betLegs = document.querySelectorAll(".bet-leg")
  const wagerInput = document.getElementById("wagerInput").value.replace("$", "")
  const wager = parseFloat(wagerInput) || 0

  let totalOdds = 1
  betLegs.forEach((leg) => {
    const odds = parseFloat(leg.getAttribute("data-odds"))
    if (odds < 0) {
      totalOdds *= 1 + 100 / Math.abs(odds)
    } else {
      totalOdds *= 1 + odds / 100
    }
  })

  const payout = wager * totalOdds
  const profit = payout - wager

  document.getElementById("toWin").textContent = "$" + profit.toFixed(2)

  const americanOdds = totalOdds >= 2
    ? "+" + Math.round((totalOdds - 1) * 100)
    : Math.round(-100 / (totalOdds - 1))
  document.querySelector(".parlay-odds").textContent = americanOdds
}

function scrollToProject(id) {
  const content = document.getElementById('mainContent')
  const target = document.getElementById(id)
  if (!content || !target) return
  setTimeout(() => {
    content.scrollTo({ top: target.offsetTop - content.offsetTop - 16, behavior: 'smooth' })
  }, 10)
}

function navHome(e) {
  e.preventDefault()
  const content = document.getElementById('mainContent')
  if (content) content.scrollTo({ top: 0, behavior: 'smooth' })
}

function navProjects(e) {
  e.preventDefault()
  scrollToProject('personal-projects')
}

function navExperiences(e) {
  e.preventDefault()
  const betslip = document.getElementById('experiences')
  if (betslip) betslip.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

initWagerInput()
calculatePayout()
updateArrows()
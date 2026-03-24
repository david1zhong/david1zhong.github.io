let currentIndex = 0

function initSidebarDrawer() {
  if (window.innerWidth > 1024) return

  if (!document.querySelector('.sidebar-backdrop')) {
    const backdrop = document.createElement('div')
    backdrop.className = 'sidebar-backdrop'
    backdrop.addEventListener('click', closeDrawer)
    document.body.appendChild(backdrop)
  }

  if (!document.querySelector('.sidebar-toggle')) {
    const btn = document.createElement('button')
    btn.className = 'sidebar-toggle'
    btn.setAttribute('aria-label', 'Toggle skills panel')
    btn.innerHTML = `<svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect y="0" width="18" height="2" rx="1" fill="#d1d5db"/>
      <rect y="6" width="18" height="2" rx="1" fill="#d1d5db"/>
      <rect y="12" width="18" height="2" rx="1" fill="#d1d5db"/>
    </svg>`
    btn.addEventListener('click', toggleDrawer)
    const header = document.querySelector('.header')
    if (header) header.insertBefore(btn, header.firstChild)
  }
}

function toggleDrawer() {
  const sidebar = document.querySelector('.sidebar')
  if (!sidebar) return
  sidebar.classList.contains('drawer-open') ? closeDrawer() : openDrawer()
}

function openDrawer() {
  const sidebar  = document.querySelector('.sidebar')
  const backdrop = document.querySelector('.sidebar-backdrop')
  if (!sidebar) return
  sidebar.classList.add('drawer-open')
  if (backdrop) backdrop.classList.add('visible')
  document.body.style.overflow = 'hidden'
}

function closeDrawer() {
  const sidebar  = document.querySelector('.sidebar')
  const backdrop = document.querySelector('.sidebar-backdrop')
  if (!sidebar) return
  sidebar.classList.remove('drawer-open')
  if (backdrop) backdrop.classList.remove('visible')
  document.body.style.overflow = ''
}

window.addEventListener('resize', () => {
  if (window.innerWidth > 1024) {
    closeDrawer()
    const btn = document.querySelector('.sidebar-toggle')
    if (btn) btn.remove()
    const backdrop = document.querySelector('.sidebar-backdrop')
    if (backdrop) backdrop.remove()
  } else {
    initSidebarDrawer()
  }
  currentIndex = 0
  setTimeout(() => snapToIndex(0), 100)
})

function getVisibleCount() {
  const w = window.innerWidth
  if (w >= 1400) return 3
  if (w >= 900)  return 2
  return 1
}

function getCardCount() {
  const track = document.getElementById('carouselTrack')
  return track ? track.children.length : 0
}

function getMaxIndex() {
  return Math.max(0, getCardCount() - getVisibleCount())
}

function snapToIndex(index) {
  const max = getMaxIndex()
  if (index < 0) index = 0
  if (index > max) index = max
  currentIndex = index

  const track = document.getElementById('carouselTrack')
  const container = document.querySelector('.carousel-container')
  if (!track || !container) return

  // Get the width of a single card (including gap)
  const card = track.children[0]
  if (!card) return
  const gap = 16 // 1rem gap in pixels
  const cardWidth = card.getBoundingClientRect().width + gap

  track.style.transform = `translateX(-${currentIndex * cardWidth}px)`
  updateArrows()
}

function updateArrows() {
  const arrowsEl  = document.querySelector('.carousel-arrows')
  const leftArrow  = document.querySelector('.carousel-arrow:first-child')
  const rightArrow = document.querySelector('.carousel-arrow:last-child')
  if (!leftArrow || !rightArrow) return

  const max = getMaxIndex()

  // Hide arrows entirely if all cards fit
  if (max === 0) {
    if (arrowsEl) arrowsEl.style.visibility = 'hidden'
    return
  }
  if (arrowsEl) arrowsEl.style.visibility = 'visible'

  leftArrow.classList.toggle('disabled', currentIndex <= 0)

  if (currentIndex >= max) {
    rightArrow.innerHTML = '⭮'
    rightArrow.classList.add('loop')
  } else {
    rightArrow.innerHTML = '▶'
    rightArrow.classList.remove('loop')
  }
}

function scrollCarousel(direction) {
  const max = getMaxIndex()
  let newIndex = currentIndex - direction
  if (newIndex < 0) return
  if (newIndex > max) newIndex = 0
  snapToIndex(newIndex)
}

function initWagerInput() {
  const input = document.getElementById('wagerInput')
  if (!input) return

  input.addEventListener('keydown', (e) => {
    const allowedKeys = ['ArrowLeft', 'ArrowRight', 'Tab', 'Enter']
    const isDigit = e.key >= '0' && e.key <= '9'
    if (e.key === 'Backspace' || e.key === 'Delete') {
      if (input.value.replace('$', '').length === 0) { e.preventDefault(); return }
    }
    if (!isDigit && !allowedKeys.includes(e.key) && e.key !== 'Backspace' && e.key !== 'Delete') {
      e.preventDefault()
    }
  })

  input.addEventListener('input', () => {
    let digits = input.value.replace(/\D/g, '')
    if (digits === '') { input.value = '$'; calculatePayout(); return }
    let num = parseInt(digits, 10)
    if (num > 10000) num = 10000
    input.value = '$' + num
    calculatePayout()
  })

  input.addEventListener('click', () => {
    const len = input.value.length
    if (input.selectionStart < 1) input.setSelectionRange(len, len)
  })
}

function calculatePayout() {
  const betLegs = document.querySelectorAll('.bet-leg')
  const wager = parseFloat(document.getElementById('wagerInput').value.replace('$', '')) || 0
  let totalOdds = 1
  betLegs.forEach((leg) => {
    const odds = parseFloat(leg.getAttribute('data-odds'))
    totalOdds *= odds < 0 ? 1 + 100 / Math.abs(odds) : 1 + odds / 100
  })
  const profit = wager * totalOdds - wager
  document.getElementById('toWin').textContent = '$' + profit.toFixed(2)
  const americanOdds = totalOdds >= 2
    ? '+' + Math.round((totalOdds - 1) * 100)
    : Math.round(-100 / (totalOdds - 1))
  document.querySelector('.parlay-odds').textContent = americanOdds
}

function updateBetCount() {
  const betLegs = document.querySelectorAll('.bet-leg')
  document.querySelector('.betslip-badge').textContent = betLegs.length
  document.querySelector('.parlay-title').textContent = `${betLegs.length} leg Parlay`
  if (betLegs.length === 0) document.querySelector('.parlay-info').style.display = 'none'
}

function scrollToProject(id) {
  const target = document.getElementById(id)
  if (!target) return
  if (window.innerWidth <= 1024) {
    const rect = target.getBoundingClientRect()
    window.scrollTo({ top: window.scrollY + rect.top - 80, behavior: 'smooth' })
    return
  }
  const content = document.getElementById('mainContent')
  if (content) setTimeout(() => {
    content.scrollTo({ top: target.offsetTop - content.offsetTop - 16, behavior: 'smooth' })
  }, 10)
}

function navHome(e) {
  e.preventDefault()
  if (window.innerWidth <= 1024) { window.scrollTo({ top: 0, behavior: 'smooth' }); return }
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
  if (!betslip) return
  if (window.innerWidth <= 1024) {
    const rect = betslip.getBoundingClientRect()
    window.scrollTo({ top: window.scrollY + rect.top - 80, behavior: 'smooth' })
    return
  }
  betslip.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

document.addEventListener('DOMContentLoaded', () => {
  initSidebarDrawer()
})

initWagerInput()
calculatePayout()
snapToIndex(0)
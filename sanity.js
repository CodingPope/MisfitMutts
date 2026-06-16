const PROJECT_ID = 'n19hhkh5'
const DATASET = 'production'
const API_VERSION = '2024-01-01'

function sanityUrl(query) {
  return `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${encodeURIComponent(query)}`
}

function imageUrl(ref) {
  const [, id, dimensions, ext] = ref.split('-')
  return `https://cdn.sanity.io/images/${PROJECT_ID}/${DATASET}/${id}-${dimensions}.${ext}`
}

async function loadGallery() {
  const query = `*[_type == "galleryImage"] | order(order asc) { _id, caption, image }`
  const res = await fetch(sanityUrl(query))
  const { result } = await res.json()
  if (!result || result.length === 0) return

  const grid = document.getElementById('gallery-grid')
  grid.innerHTML = result.map(item => {
    const src = imageUrl(item.image.asset._ref)
    const alt = item.caption || 'Misfit Mutts grooming photo'
    return `<div class="gallery-item">
      <img src="${src}" alt="${alt}" loading="lazy" />
      ${item.caption ? `<p class="gallery-caption">${item.caption}</p>` : ''}
    </div>`
  }).join('')
}

async function loadSpecials() {
  const today = new Date().toISOString().split('T')[0]
  const query = `*[_type == "special" && active == true && (endDate == null || endDate >= "${today}")] | order(_createdAt desc) { _id, title, description, price, image }`
  const res = await fetch(sanityUrl(query))
  const { result } = await res.json()

  const container = document.getElementById('specials-container')
  if (!result || result.length === 0) {
    container.innerHTML = `<div class="specials-empty">
      <p class="specials-empty-title">No Active Specials</p>
      <p>There are no seasonal specials running at this time. Check back soon — new offerings are added throughout the year.</p>
    </div>`
    return
  }

  container.innerHTML = `<div class="specials-grid">${result.map(s => {
    const img = s.image ? `<img src="${imageUrl(s.image.asset._ref)}" alt="${s.title}" class="special-img" />` : ''
    const price = s.price ? `<span class="special-price">${s.price}</span>` : ''
    const desc = s.description ? `<p class="special-desc">${s.description}</p>` : ''
    return `<div class="special-card">
      ${img}
      <div class="special-body">
        <h3 class="special-title">${s.title}</h3>
        ${price}
        ${desc}
      </div>
    </div>`
  }).join('')}</div>`
}

loadGallery()
loadSpecials()

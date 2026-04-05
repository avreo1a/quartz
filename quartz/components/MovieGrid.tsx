import { JSX } from "preact"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { QuartzPluginData } from "../plugins/vfile"
import style from "./styles/movieGrid.scss"
import { classNames } from "../util/lang"

interface Options {
  /** Folder path to filter movies from (without leading/trailing slashes) */
  folder: string
  /** Maximum number of movies to display (0 = unlimited) */
  limit: number
  /** Sort order: "rating" | "year" | "title" | "date" */
  sortBy: "rating" | "year" | "title" | "date"
  /** Sort direction */
  sortOrder: "asc" | "desc"
}

const defaultOptions: Options = {
  folder: "movies",
  limit: 0,
  sortBy: "date",
  sortOrder: "desc",
}

// Helper to render star rating
function renderStars(rating: number): JSX.Element {
  const fullStars = Math.floor(rating)
  const halfStar = rating % 1 >= 0.5
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0)
  return (
    <>
      {"★".repeat(fullStars)}
      {halfStar && <span class="half-star">★</span>}
      {"☆".repeat(emptyStars)}
    </>
  )
}

export default ((userOpts?: Partial<Options>) => {
  const opts = { ...defaultOptions, ...userOpts }

  const MovieGrid: QuartzComponent = ({
    allFiles,
    displayClass,
    cfg,
  }: QuartzComponentProps) => {
    const baseUrl = new URL(`https://${cfg.baseUrl ?? "example.com"}`)
    const baseDir = baseUrl.pathname.replace(/\/$/, "")
    // Filter movies from the specified folder
    const movies = allFiles.filter((file) => {
      const slug = file.slug ?? ""
      // Match files in the movies folder, exclude index and template files
      return (
        slug.startsWith(`${opts.folder}/`) &&
        !slug.endsWith("/index") &&
        !slug.includes("_template")
      )
    })

    // Sort movies
    const sortedMovies = movies.sort((a, b) => {
      const aFm = (a.frontmatter ?? {}) as Record<string, unknown>
      const bFm = (b.frontmatter ?? {}) as Record<string, unknown>
      let comparison = 0

      switch (opts.sortBy) {
        case "rating":
          comparison = (Number(bFm["rating"]) || 0) - (Number(aFm["rating"]) || 0)
          break
        case "year":
          comparison = (Number(bFm["year"]) || 0) - (Number(aFm["year"]) || 0)
          break
        case "title":
          comparison = String(aFm["title"] || "").localeCompare(String(bFm["title"] || ""))
          break
        case "date":
        default:
          const aDate = a.dates?.modified ?? a.dates?.created ?? new Date(0)
          const bDate = b.dates?.modified ?? b.dates?.created ?? new Date(0)
          comparison = bDate.getTime() - aDate.getTime()
          break
      }

      return opts.sortOrder === "asc" ? -comparison : comparison
    })

    // Apply limit
    const displayMovies = opts.limit > 0 ? sortedMovies.slice(0, opts.limit) : sortedMovies

    if (displayMovies.length === 0) {
      return (
        <div class={classNames(displayClass, "movie-grid-container")}>
          <p class="movie-grid-empty">No movies found. Add some movie notes to get started!</p>
        </div>
      )
    }

    return (
      <div class={classNames(displayClass, "movie-grid-container")}>
        <div class="movie-grid">
          {displayMovies.map((movie: QuartzPluginData) => {
            const fm = (movie.frontmatter ?? {}) as Record<string, unknown>
            const title = String(fm["title"] ?? "Untitled")
            const year = fm["year"] ? String(fm["year"]) : ""
            const rating = Number(fm["rating"]) || 0
            const poster = fm["poster"] ? String(fm["poster"]) : ""
            const thoughts = movie.description ?? ""
            const movieSlug = movie.slug!

            return (
              <div
                class="movie-card"
                data-movie-slug={movieSlug}
                data-movie-title={title}
                data-movie-year={year}
                data-movie-rating={rating}
                data-movie-poster={poster}
                data-movie-thoughts={thoughts}
              >
                <a
                  href={`${baseDir}/${movieSlug}`}
                  class="movie-card-link internal"
                >
                  <div class="movie-poster-wrapper">
                    {poster ? (
                      <img src={poster} alt={`${title} poster`} class="movie-poster" loading="lazy" />
                    ) : (
                      <div class="movie-poster-placeholder">
                        <span>{title.charAt(0)}</span>
                      </div>
                    )}
                    <div class="movie-overlay">
                      <div class="movie-overlay-content">
                        <span class="movie-title">{title}</span>
                        {year && <span class="movie-year">{year}</span>}
                        {rating > 0 && (
                          <span class="movie-rating" title={`${rating} out of 5`}>
                            {renderStars(rating)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            )
          })}
        </div>

        {/* Modal for movie details */}
        <div class="movie-modal" id="movie-modal">
          <div class="movie-modal-backdrop"></div>
          <div class="movie-modal-content">
            <button class="movie-modal-close" aria-label="Close modal">&times;</button>
            <div class="movie-modal-body">
              <div class="movie-modal-poster">
                <img src="" alt="" id="modal-poster" />
              </div>
              <div class="movie-modal-info">
                <h2 id="modal-title"></h2>
                <div class="movie-modal-meta">
                  <span id="modal-year"></span>
                  <span id="modal-rating"></span>
                </div>
                <div class="movie-modal-thoughts" id="modal-thoughts"></div>
                <a href="#" class="movie-modal-link" id="modal-link">
                  Read full note →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  MovieGrid.css = style
  MovieGrid.afterDOMLoaded = `
    // Handle broken poster images
    document.querySelectorAll('.movie-poster').forEach(img => {
      img.addEventListener('error', function() {
        const wrapper = this.closest('.movie-poster-wrapper')
        if (wrapper) {
          const title = this.alt.replace(' poster', '') || 'M'
          const placeholder = document.createElement('div')
          placeholder.className = 'movie-poster-placeholder'
          placeholder.innerHTML = '<span>' + title.charAt(0) + '</span>'
          this.style.display = 'none'
          wrapper.insertBefore(placeholder, wrapper.firstChild)
        }
      })
    })

    // Movie grid modal functionality
    const movieGrid = document.querySelector('.movie-grid-container')
    if (movieGrid) {
      const modal = document.getElementById('movie-modal')
      const modalPoster = document.getElementById('modal-poster')
      const modalTitle = document.getElementById('modal-title')
      const modalYear = document.getElementById('modal-year')
      const modalRating = document.getElementById('modal-rating')
      const modalThoughts = document.getElementById('modal-thoughts')
      const modalLink = document.getElementById('modal-link')
      const modalClose = modal?.querySelector('.movie-modal-close')
      const modalBackdrop = modal?.querySelector('.movie-modal-backdrop')

      function renderStars(rating) {
        const fullStars = Math.floor(rating)
        const halfStar = rating % 1 >= 0.5
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0)
        const halfHtml = halfStar ? '<span class="half-star">★</span>' : ''
        return '★'.repeat(fullStars) + halfHtml + '☆'.repeat(emptyStars)
      }

      function openModal(card) {
        const slug = card.dataset.movieSlug
        const title = card.dataset.movieTitle
        const year = card.dataset.movieYear
        const rating = parseFloat(card.dataset.movieRating) || 0
        const poster = card.dataset.moviePoster
        const thoughts = card.dataset.movieThoughts

        if (modalPoster) {
          modalPoster.src = poster
          modalPoster.alt = title + ' poster'
        }
        if (modalTitle) modalTitle.textContent = title
        if (modalYear) modalYear.textContent = year
        if (modalRating) modalRating.textContent = rating > 0 ? renderStars(rating) : ''
        if (modalThoughts) modalThoughts.textContent = thoughts || 'No thoughts recorded.'
        if (modalLink) {
          const link = card.querySelector('.movie-card-link')
          modalLink.href = link ? link.getAttribute('href') : '#'
        }

        modal?.classList.add('active')
        document.body.style.overflow = 'hidden'
      }

      function closeModal() {
        modal?.classList.remove('active')
        document.body.style.overflow = ''
      }

      // Event listeners for opening modal on right-click or long-press
      document.querySelectorAll('.movie-card').forEach(card => {
        // Right-click to open modal
        card.addEventListener('contextmenu', (e) => {
          e.preventDefault()
          openModal(card)
        })

        // Long press for mobile
        let pressTimer
        card.addEventListener('touchstart', (e) => {
          pressTimer = setTimeout(() => {
            e.preventDefault()
            openModal(card)
          }, 500)
        })
        card.addEventListener('touchend', () => clearTimeout(pressTimer))
        card.addEventListener('touchmove', () => clearTimeout(pressTimer))
      })

      // Close modal
      modalClose?.addEventListener('click', closeModal)
      modalBackdrop?.addEventListener('click', closeModal)
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal()
      })
    }
  `

  return MovieGrid
}) satisfies QuartzComponentConstructor

import { useState } from 'react'

export default function Carousel({ items, perPage = 3 }) {
  const [page, setPage] = useState(0)
  const pages = Math.max(1, Math.ceil(items.length / perPage))
  const visible = items.slice(page * perPage, page * perPage + perPage)

  return (
    <>
      <div className="card-grid">{visible}</div>
      {pages > 1 && (
        <div className="dots">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Page ${i + 1}`}
              className={i === page ? 'dot active' : 'dot'}
              onClick={() => setPage(i)}
            />
          ))}
        </div>
      )}
    </>
  )
}
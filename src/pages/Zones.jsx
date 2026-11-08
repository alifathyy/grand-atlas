import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/client'
import { ENDPOINTS } from '../api/endpoints'
import Hero from '../components/Hero'

export default function Zones() {
  const [zones, setZones] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    api.get(ENDPOINTS.zones)
      .then((res) => setZones(res.data))
      .catch(() => setError('Could not load zones. Please try again.'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <Hero
        height={640}
        image="/images/zones-hero.jpg"
        title="Destinations Defined by Distinction"
        text="From the quiet pulse of the shoreline to the vibrant energy of the metropolitan center, explore our guide to the neighborhoods that mirror your ambition and your aesthetic."
      />

      <div className="container section">
        {loading && <p className="state-msg">Loading...</p>}
        {error && <p className="state-msg">{error}</p>}

        <div className="zone-grid">
          {zones.map((z) => (
            <Link to={`/zones/${z.id}`} className="zone-tile" key={z.id}>
              <img src={z.images?.[0]} alt={z.name_en} />
              <span>{z.name_en}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
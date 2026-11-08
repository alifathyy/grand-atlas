import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { FaRegBuilding, FaRegMap } from 'react-icons/fa'
import { FiUser } from 'react-icons/fi'
import api from '../api/client'
import { ENDPOINTS } from '../api/endpoints'
import SectionTitle from '../components/SectionTitle'

export default function ZoneProjects() {
  const { id } = useParams()
  const [zone, setZone] = useState(null)
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    Promise.all([api.get(ENDPOINTS.zones), api.get(ENDPOINTS.projects)])
      .then(([z, p]) => {
        setZone(z.data.find((x) => x.id === id) || null)
        setProjects(p.data.filter((x) => x.zoneId === id))
      })
      .catch(() => setError('Could not load this zone. Please try again.'))
      .finally(() => setLoading(false))
  }, [id])

  return (
    <div className="container section">
      <SectionTitle>{zone ? `${zone.name_en} Projects` : 'Zone Projects'}</SectionTitle>

      {loading && <p className="state-msg">Loading...</p>}
      {error && <p className="state-msg">{error}</p>}

      {zone?.images?.[0] && <img className="zone-banner" src={zone.images[0]} alt={zone.name_en} />}

      {!loading && !error && projects.length === 0 && (
        <p className="state-msg">No projects in this zone yet.</p>
      )}

      <div className="card-grid">
        {projects.map((p) => (
          <div className="dev-card" key={p.id}>
            <img className="dev-cover" src={p.images?.[0]} alt={p.name_en} />
            <div className="stats-row">
              <span><FaRegBuilding /> {p.units?.length || 0} Units</span>
              <span><FiUser /> {p.developer?.name_en}</span>
              <span><FaRegMap /> {p.zone?.name_en}</span>
            </div>
            <div className="project-body">
              <h3 className="red-title">{p.name_en}</h3>
              <p>{p.description_en}</p>
            </div>
            <Link to={`/units?project=${p.id}`} className="outline-btn as-link">View Details</Link>
          </div>
        ))}
      </div>
    </div>
  )
}
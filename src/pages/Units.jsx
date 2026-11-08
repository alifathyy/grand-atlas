import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FaBed, FaBath, FaRulerCombined } from 'react-icons/fa'
import api from '../api/client'
import { ENDPOINTS } from '../api/endpoints'
import Hero from '../components/Hero'

const priceRanges = [
  { label: 'Up to 2M EGP', min: 0, max: 2000000 },
  { label: '2M - 6M EGP', min: 2000000, max: 6000000 },
  { label: '6M - 12M EGP', min: 6000000, max: 12000000 },
  { label: 'Above 12M EGP', min: 12000000, max: Infinity },
]

const emptyFilters = {
  search: '', bedrooms: '', developer: '', zone: '', project: '', status: '', price: '',
}

const unique = (list) => [...new Set(list.filter(Boolean))]
const label = (s) => (s ? s.charAt(0) + s.slice(1).toLowerCase() : '')

export default function Units() {
  const [searchParams] = useSearchParams()
  const startProject = searchParams.get('project') || ''

  const [units, setUnits] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [draft, setDraft] = useState({ ...emptyFilters, project: startProject })
  const [applied, setApplied] = useState({ ...emptyFilters, project: startProject })

  useEffect(() => {
    api.get(ENDPOINTS.units)
      .then((res) => setUnits(res.data))
      .catch(() => setError('Could not load units. Please try again.'))
      .finally(() => setLoading(false))
  }, [])

  const options = useMemo(() => {
    const projects = new Map()
    units.forEach((u) => projects.set(u.projectId, u.projectName_en))
    return {
      bedrooms: unique(units.map((u) => u.bedrooms)).sort((a, b) => a - b),
      developers: unique(units.map((u) => u.developerName_en)),
      zones: unique(units.map((u) => u.zoneName_en)),
      projects: [...projects.entries()].map(([id, name]) => ({ id, name })),
      statuses: unique(units.map((u) => u.status)),
    }
  }, [units])

  const filtered = units.filter((u) => {
    const q = applied.search.trim().toLowerCase()
    if (q && !`${u.title_en} ${u.description_en} ${u.projectName_en}`.toLowerCase().includes(q)) return false
    if (applied.bedrooms && u.bedrooms !== Number(applied.bedrooms)) return false
    if (applied.developer && u.developerName_en !== applied.developer) return false
    if (applied.zone && u.zoneName_en !== applied.zone) return false
    if (applied.project && u.projectId !== applied.project) return false
    if (applied.status && u.status !== applied.status) return false
    if (applied.price !== '') {
      const r = priceRanges[Number(applied.price)]
      if (u.price < r.min || u.price > r.max) return false
    }
    return true
  })

  const set = (key) => (e) => setDraft({ ...draft, [key]: e.target.value })

  const onSearch = (e) => {
    e.preventDefault()
    setApplied(draft)
  }

  const onReset = () => {
    setDraft(emptyFilters)
    setApplied(emptyFilters)
  }

  return (
    <>
      <Hero
        height={520}
        image="/images/units-hero.jpg"
        title="Where Visionary Design Meets Daily Life"
        text="Experience a collection of residences designed as personal sanctuaries. Each unit balances expansive city views with artisanal textures and quiet, light-filled interiors to create the ultimate retreat from the world"
      />

      <div className="container section">
        <form className="search-form" onSubmit={onSearch}>
          <div className="search-bar">
            <input
              className="search-input"
              placeholder="Search Property"
              value={draft.search}
              onChange={set('search')}
            />
            <select value={draft.bedrooms} onChange={set('bedrooms')}>
              <option value="">Bedrooms</option>
              {options.bedrooms.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
            <select value={draft.developer} onChange={set('developer')}>
              <option value="">Developer</option>
              {options.developers.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
            <select value={draft.zone} onChange={set('zone')}>
              <option value="">Zone</option>
              {options.zones.map((z) => <option key={z} value={z}>{z}</option>)}
            </select>
            <select value={draft.project} onChange={set('project')}>
              <option value="">Projects</option>
              {options.projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
            <select value={draft.status} onChange={set('status')}>
              <option value="">Status</option>
              {options.statuses.map((s) => <option key={s} value={s}>{label(s)}</option>)}
            </select>
            <select value={draft.price} onChange={set('price')}>
              <option value="">Price Range</option>
              {priceRanges.map((r, i) => <option key={r.label} value={i}>{r.label}</option>)}
            </select>
          </div>
          <div className="search-actions">
            <button className="search-btn" type="submit">Search</button>
            <button className="reset-btn" type="button" onClick={onReset}>Reset</button>
          </div>
        </form>

        {loading && <p className="state-msg">Loading...</p>}
        {error && <p className="state-msg">{error}</p>}
        {!loading && !error && filtered.length === 0 && (
          <p className="state-msg">No units found. Try changing your filters.</p>
        )}

        <div className="card-grid units-grid">
          {filtered.map((u) => (
            <div className="dev-card" key={u.id}>
              <div className="unit-img-wrap">
                <img className="dev-cover" src={u.images?.[0]} alt={u.title_en} />
                <span className={`badge ${u.status === 'AVAILABLE' ? 'ok' : 'off'}`}>
                  {label(u.status)}
                </span>
              </div>
              <div className="stats-row">
                <span><FaBed /> {u.bedrooms} Bedrooms</span>
                <span><FaBath /> {u.bathrooms} Bathrooms</span>
                <span><FaRulerCombined /> {u.size}m</span>
              </div>
              <div className="unit-head">
                <h3 className="red-title">{u.title_en}</h3>
                <b className="price">{Number(u.price).toLocaleString()} EGP</b>
              </div>
              <p className="unit-desc">{u.description_en}</p>
              <button className="outline-btn" type="button">View Details</button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
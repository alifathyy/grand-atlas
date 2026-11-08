import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaRegBuilding, FaHandHoldingUsd, FaRegSmile, FaCertificate } from 'react-icons/fa'
import api from '../api/client'
import { ENDPOINTS } from '../api/endpoints'
import Hero from '../components/Hero'
import SectionTitle from '../components/SectionTitle'
import Carousel from '../components/Carousel'

const stats = [
  { icon: <FaRegBuilding />, value: '48', label: 'Properties Managed' },
  { icon: <FaHandHoldingUsd />, value: '90M', label: 'Total Managed Investments' },
  { icon: <FaRegSmile />, value: '500', label: 'Happy Clients' },
  { icon: <FaCertificate />, value: '99%', label: 'Client Satisfaction' },
]

export default function Home() {
  const [units, setUnits] = useState([])
  const [projects, setProjects] = useState([])

  useEffect(() => {
    api.get(ENDPOINTS.units).then((r) => setUnits(r.data)).catch(() => setUnits([]))
    api.get(ENDPOINTS.projects).then((r) => setProjects(r.data)).catch(() => setProjects([]))
  }, [])

  const masterpieces = units.map((u, i) => (
    <Link to="/units" className="master-card" key={u.id}>
      <img src={u.images?.[0]} alt={u.title_en} />
      <h3>{String(i + 1).padStart(2, '0')}. {u.title_en}</h3>
    </Link>
  ))

  const landmarks = projects.map((p) => (
    <div className="dev-card" key={p.id}>
      <div className="unit-img-wrap">
        <img className="dev-cover" src={p.images?.[0]} alt={p.name_en} />
        {p.zone?.name_en && <span className="zone-badge">{p.zone.name_en}</span>}
      </div>
      <div className="dev-info">
        {p.developer?.images?.[0] && <img className="dev-logo" src={p.developer.images[0]} alt="" />}
        <div>
          <h3>{p.name_en}</h3>
          <small>{p.developer?.name_en}</small>
        </div>
      </div>
      <Link to={`/units?project=${p.id}`} className="outline-btn as-link">View Details</Link>
    </div>
  ))

  return (
    <>
      <Hero
        height={600}
        image="/images/home-hero.jpg"
        title="Redefining the Horizon of Modern Luxury Living"
        text="We believe a home should be a sanctuary of innovation and an extension of your personal brand. By combining cutting-edge market data with a keen eye for world-class design, we help you navigate the complexities of the luxury market to find a space that inspires your best work and your deepest rest"
      >
        <Link to="/units" className="primary-btn">Explore</Link>
      </Hero>

      <div className="container section">
        <SectionTitle>Benchmarks of Success</SectionTitle>
        <div className="stats-grid">
          {stats.map((s) => (
            <div className="stat-card" key={s.label}>
              <span className="stat-icon">{s.icon}</span>
              <b>{s.value}</b>
              <small>{s.label}</small>
            </div>
          ))}
        </div>
      </div>

      <div className="container section">
        <SectionTitle>About Grand Atlas</SectionTitle>
        <div className="about-grid">
          <img className="about-img" src="/images/about.jpg" alt="About Grand Atlas" />
          <div>
            <p className="about-text">
              We began with a singular, uncompromising vision: to bridge the gap between world-class
              architecture and the individuals who define our global culture. We recognized that for
              the discerning client, a home is rarely just a physical structure; it is a curated
              environment, a private gallery, and the ultimate expression of a life well-lived. Our
              journey started not in the pursuit of transactions, but in the pursuit of excellence.
              We set out to dismantle the traditional, high-volume real estate model in favor of a
              bespoke, 'private office' approach—one where quality always supersedes quantity, and
              where every client is treated as the sole focus of our firm.
              <br />
              We don't just find you a home; we secure your peace of mind through a veil of absolute
              professional confidentiality.
            </p>
            <Link to="/contact" className="primary-btn small">Know More →</Link>
          </div>
        </div>
      </div>

      <div className="container section">
        <SectionTitle>Hand-Selected Masterpieces</SectionTitle>
        <Carousel items={masterpieces} />
      </div>

      <div className="container section">
        <SectionTitle>Strategic Locations</SectionTitle>
        <img className="map-img" src="/images/map.jpg" alt="Strategic locations map" />
      </div>

      <div className="container section">
        <SectionTitle>Future Landmarks</SectionTitle>
        <Carousel items={landmarks} />
      </div>
    </>
  )
}
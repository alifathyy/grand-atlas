import { useEffect, useState } from 'react'
import api from '../api/client'
import Hero from '../components/Hero'

export default function Developers() {
  const [developers, setDevelopers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    api.get('/developer')
      .then((res) => setDevelopers(res.data))
      .catch(() => setError('Could not load developers. Please try again.'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <Hero
        image="/images/developers-hero.jpg"
        title="Defining the Future Skyline."
        text="Great developments require more than just capital; they require a narrative. We provide the elite marketing and specialized brokerage services needed to position your landmark projects in front of the world's most discerning buyers."
      />

      <div className="container section">
        {loading && <p className="state-msg">Loading...</p>}
        {error && <p className="state-msg">{error}</p>}

        <div className="card-grid">
          {developers.map((dev) => {
            const cover = dev.projects?.[0]?.images?.[0] || dev.images?.[0]
            return (
              <div className="dev-card" key={dev.id}>
                <img className="dev-cover" src={cover} alt={dev.name_en} />
                <div className="dev-info">
                  {dev.images?.[0] && <img className="dev-logo" src={dev.images[0]} alt="" />}
                  <div>
                    <h3>{dev.name_en}</h3>
                    <small>{dev.projects?.length || 0} projects</small>
                  </div>
                </div>
                <button className="outline-btn">View Projects</button>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
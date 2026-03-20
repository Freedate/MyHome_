import { useParams, useNavigate } from 'react-router-dom'
import { ALL_PROJECTS } from './Portfolio'

export default function ProjectDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const project = ALL_PROJECTS.find(p => p.id === id)

  if (!project) {
    return (
      <section className="page">
        <p style={{ color: 'var(--text-muted)' }}>프로젝트를 찾을 수 없습니다.</p>
        <button className="detail-back" onClick={() => navigate('/portfolio')}>← Portfolio로 돌아가기</button>
      </section>
    )
  }

  const categoryLabel = {
    desktop: 'Windows Desktop',
    web: 'Web',
    api: 'API',
    game: 'Game',
  }

  return (
    <section className="page detail-page">

      <button className="detail-back" onClick={() => navigate('/portfolio')}>
        ← Portfolio로 돌아가기
      </button>

      <div className="detail-hero">
        <div>
          <span className="detail-category">// {categoryLabel[project.category]}</span>
          <h1 className="detail-title">{project.title}</h1>
          <p className="detail-company">{project.company}</p>
        </div>
        <span className="detail-badge">{categoryLabel[project.category]}</span>
      </div>

      <div className="detail-body">
        <div className="detail-main">

          <div className="detail-section">
            <h2 className="detail-section-label">Overview</h2>
            <p className="detail-text">{project.overview}</p>
          </div>

          <div className="detail-section">
            <h2 className="detail-section-label">담당 역할</h2>
            {project.roles.map((role, i) => (
              <div key={i} className="detail-list-item">
                <span className="detail-dot">·</span>
                <span>{role}</span>
              </div>
            ))}
          </div>

          <div className="detail-section">
            <h2 className="detail-section-label">특징</h2>
            {project.features.map((feature, i) => (
              <div key={i} className="detail-list-item">
                <span className="detail-dot">·</span>
                <span>{feature}</span>
              </div>
            ))}
          </div>

        </div>

        <div className="detail-side">

          <div className="detail-section">
            <h2 className="detail-section-label">기여도</h2>
            <div className="detail-contrib">
              <div className="detail-contrib-percent">{project.contribution.percent}%</div>
              <div className="detail-contrib-text">{project.contribution.text}</div>
            </div>
          </div>

          <div className="detail-section">
            <h2 className="detail-section-label">기간</h2>
            <div className="detail-period-value">{project.period}</div>
            <div className="detail-period-duration">{project.duration}</div>
          </div>

          <div className="detail-section">
            <h2 className="detail-section-label">Tech Stack</h2>
            <div className="detail-tags">
              {project.tech.map(t => <span key={t} className="detail-tag">{t}</span>)}
            </div>
          </div>

          <div className="detail-section">
            <h2 className="detail-section-label">이미지</h2>
            <div className="detail-img-placeholder">
              // 스크린샷 추후 추가
            </div>
          </div>

        </div>
      </div>

    </section>
  )
}
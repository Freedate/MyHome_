import { useParams, useNavigate } from 'react-router-dom'
import { AI_PROJECTS } from '../data/aiProjects'

export default function AiDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const project = AI_PROJECTS.find(p => p.id === id)

  if (!project) return (
    <section className="page">
      <p style={{ color: 'var(--text-muted)' }}>프로젝트를 찾을 수 없습니다.</p>
      <button className="detail-back" onClick={() => navigate('/portfolio')}>← Portfolio로</button>
    </section>
  )

  return (
    <section className="page ai-detail-page">
      <button className="detail-back" onClick={() => navigate('/portfolio')}>
        ← Portfolio로 돌아가기
      </button>

      <div className="detail-hero">
        <div>
          <span className="detail-category">// AI Made</span>
          <h1 className="detail-title">{project.title}</h1>
        </div>
        <span className="detail-badge">AI</span>
      </div>

      <div className="ai-demo-wrap">
        <iframe
          src={project.demoUrl}
          title={project.title}
          className="ai-demo-iframe"
          sandbox="allow-scripts allow-same-origin allow-forms allow-pointer-lock"
        />
      </div>

      <div className="detail-body">
        <div className="detail-main">
          <div className="detail-section">
            <h2 className="detail-section-label">Overview</h2>
            <p className="detail-text">{project.desc}</p>
          </div>
          {project.review && (
            <div className="detail-section">
              <h2 className="detail-section-label">후기</h2>
              <p className="detail-text">{project.review}</p>
            </div>
          )}
        </div>
        <div className="detail-side">
          <div className="detail-section">
            <h2 className="detail-section-label">Tech Stack</h2>
            <div className="detail-tags">
              {project.tech.map(t => <span key={t} className="detail-tag">{t}</span>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
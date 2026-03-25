import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import { createPortal } from 'react-dom'
import { ALL_PROJECTS } from './Portfolio'

export default function ProjectDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const project = ALL_PROJECTS.find(p => p.id === id)

  const [activeTab, setActiveTab] = useState('overview');
  const [mainImage, setMainImage] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    if (project?.images?.length > 0) {
      setMainImage(project.images[0]);
    }
  }, [project]);

  useEffect(() => {
  const handleKey = (e) => {
    if (!lightboxOpen) return

    if (e.key === 'Escape') {
      setLightboxOpen(false)
    } else if (e.key === 'ArrowRight') {
      const currentIndex = project.images.indexOf(mainImage)
      const nextIndex = (currentIndex + 1) % project.images.length
      setMainImage(project.images[nextIndex])
    } else if (e.key === 'ArrowLeft') {
      const currentIndex = project.images.indexOf(mainImage)
      const prevIndex = (currentIndex - 1 + project.images.length) % project.images.length
      setMainImage(project.images[prevIndex])
    }
  }

  window.addEventListener('keydown', handleKey)
  return () => window.removeEventListener('keydown', handleKey)
}, [lightboxOpen, mainImage, project])

  if (!project) {
    return (
      <section className="page">
        <p style={{ color: 'var(--text-muted)' }}>프로젝트를 찾을 수 없습니다.</p>
        <button className="detail-back" onClick={() => navigate('/portfolio')}>← Portfolio로 돌아가기</button>
      </section>
    )
  }

  const hasImages = project.images && project.images.length > 0;
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

       {/* ── 이미지 갤러리 ── */}
      {hasImages && (
        <div className="gallery">
          {/* 메인 이미지 */}
          <div
            className="gallery-main"
            onClick={() => setLightboxOpen(true)}
            title="클릭하면 크게 볼 수 있어요"
          >
            <img src={mainImage} alt="메인 스크린샷" />
            <div className="gallery-zoom-hint">🔍</div>
          </div>

          {/* 썸네일 스트립 */}
          {project.images.length > 1 && (
            <div className="gallery-thumbs">
              {project.images.map((img, i) => (
                <button
                  key={i}
                  className={`thumb ${img === mainImage ? 'active' : ''}`}
                  onClick={() => setMainImage(img)}
                >
                  <img src={img} alt={`스크린샷 ${i + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="detail-body">
        <div className="detail-main">

          <div className="detail-section">
            <h2 className="detail-section-label">요약</h2>
            <p className="detail-text">{project.overview}</p>
          </div>

          <div className="detail-section">
            <h2 className="detail-section-label">개요</h2>
            {project.desc.map((desc, i) => (
              <div key={i} className="detail-list-item">
                <span className="detail-dot">·</span>
                <span>{desc}</span>
              </div>
            ))}
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

          <div className="detail-section">
            <h2 className="detail-section-label">회고</h2>
            {project.review.map((review, i) => (
              <div key={i} className="detail-list-item">
                <span className="detail-dot">·</span>
                <span>{review}</span>
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

        </div>
      </div>
{/* ── 라이트박스 ── */}
      {lightboxOpen && createPortal(
  <div className="lightbox" onClick={() => setLightboxOpen(false)}>
    <button className="lightbox-close" onClick={() => setLightboxOpen(false)}>✕</button>
    <img
      src={mainImage}
      alt="확대 이미지"
      onClick={e => e.stopPropagation()}
    />
    {project.images.length > 1 && (
      <div className="lightbox-nav" onClick={e => e.stopPropagation()}>
        {project.images.map((img, i) => (
          <button
            key={i}
            className={`thumb ${img === mainImage ? 'active' : ''}`}
            onClick={() => setMainImage(img)}
          >
            <img src={img} alt={`썸네일 ${i + 1}`} />
          </button>
        ))}
      </div>
    )}
    {project.images.length > 1 && (
  <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
    ← → 키로 이동 · ESC 닫기
  </p>
)}
  </div>,
  document.body  // ← 핵심: body에 직접 붙임
)}
    </section>
  )
}
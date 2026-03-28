import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { supabase } from '../supabase'

export default function Daily() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchArticles() {
      const { data, error } = await supabase
        .from('ai_articles')
        .select('id, title, summary, topic, created_at')
        .order('created_at', { ascending: false })

      if (!error) setArticles(data)
      setLoading(false)
    }
    fetchArticles()
  }, [])

  if (loading) return <section className="page"><p className="blog-status">불러오는 중...</p></section>

  return (
    <>
      <Helmet>
        <title>Daily — Horidong</title>
        <meta name="description" content="AI가 매일 선별한 이슈 아티클" />
      </Helmet>
      <section className="page daily-page">
        <header className="blog-header">
          <span className="about-label">// daily</span>
          <h1>Daily</h1>
          <p className="about-role">AI가 데일리 이슈를 자동으로 아티클로 작성합니다. 해당 내용은 제 주관적인 의견이 반영되어 있지 않습니다.</p>
        </header>

        {articles.length === 0 ? (
          <div className="blog-empty">
            <span className="blog-empty-icon">📡</span>
            <p className="blog-empty-title">아직 생성된 아티클이 없습니다.</p>
            <p className="blog-empty-sub">곧 첫 번째 아티클이 올라올 예정이에요.</p>
          </div>
        ) : (
          <div className="blog-list">
            {articles.map(article => (
              <div
                key={article.id}
                className="blog-card"
                onClick={() => navigate(`/daily/${article.id}`)}
              >
                <div className="blog-card-top">
                  <div className="blog-card-date">
                    {new Date(article.created_at).toLocaleDateString('ko-KR', {
                      year: 'numeric', month: 'long', day: 'numeric'
                    })}
                  </div>
                  {article.topic && (
                    <div className="blog-card-views">{article.topic}</div>
                  )}
                </div>
                <h2 className="blog-card-title">{article.title}</h2>
                <p className="blog-card-excerpt">{article.summary}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  )
}
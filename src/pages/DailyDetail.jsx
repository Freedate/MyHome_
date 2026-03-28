import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { supabase } from '../supabase'

export default function DailyDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchArticle() {
      const { data, error } = await supabase
        .from('ai_articles')
        .select('*')
        .eq('id', id)
        .single()

      if (!error) setArticle(data)
      setLoading(false)
    }
    fetchArticle()
  }, [id])

  if (loading) return <section className="page"><p className="blog-status">불러오는 중...</p></section>
  if (!article) return <section className="page"><p className="blog-status">아티클을 찾을 수 없습니다.</p></section>

  return (
    <>
      <Helmet>
        <title>{article.title} — Daily</title>
        <meta name="description" content={article.summary} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.summary} />
        <meta property="og:type" content="article" />
      </Helmet>
      <section className="page blog-detail-page">
        <button className="detail-back" onClick={() => navigate('/daily')}>
          ← Daily로 돌아가기
        </button>

        <header className="blog-detail-header">
          <div className="blog-detail-meta">
            <span className="blog-card-date">
              {new Date(article.created_at).toLocaleDateString('ko-KR', {
                year: 'numeric', month: 'long', day: 'numeric'
              })}
            </span>
            {article.topic && (
              <span className="blog-card-views">{article.topic}</span>
            )}
          </div>
          <h1 className="blog-detail-title">{article.title}</h1>
          {article.source_url && (
            
              <a href={article.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="daily-source-link"
              >
              원문 보기 →
            </a>
          )}
        </header>

        <div
          className="blog-detail-content"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </section>
    </>
  )
}
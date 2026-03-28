import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'
import { Helmet } from 'react-helmet-async'

export default function BlogDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [post, setPost]     = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]   = useState(null)

  useEffect(() => {
    async function fetchPost() {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single()

      if (error) { setError(error.message); setLoading(false); return }

      setPost(data)
      setLoading(false)

      // 조회수 +1
      await supabase
        .from('posts')
        .update({ views: (data.views || 0) + 1 })
        .eq('id', id)
    }
    fetchPost()
  }, [id])

  if (loading) return <section className="page"><p className="blog-status">불러오는 중...</p></section>
  if (error || !post) return <section className="page"><p className="blog-status">글을 찾을 수 없습니다.</p></section>

  return (
    <>
    <Helmet>
      <title>{post.title} — Horidong's Blog</title>
      <meta name="description" content={post.content?.replace(/<[^>]*>/g, '').slice(0, 120)} />
      <meta property="og:title" content={post.title} />
      <meta property="og:description" content={post.content?.replace(/<[^>]*>/g, '').slice(0, 120)} />
      <meta property="og:type" content="article" />
    </Helmet>
    <section className="page blog-detail-page">
      <button className="detail-back" onClick={() => navigate('/blog')}>
        ← Blog로 돌아가기
      </button>

      <header className="blog-detail-header">
        <div className="blog-detail-meta">
          <span className="blog-card-date">
            {new Date(post.created_at).toLocaleDateString('ko-KR', {
              year: 'numeric', month: 'long', day: 'numeric'
            })}
          </span>
          <span className="blog-card-views">조회 {post.views || 0}</span>
        </div>
        <h1 className="blog-detail-title">{post.title}</h1>
        {post.category && (
            <span className="blog-card-category">{post.category}</span>
        )}
      </header>

      <div
        className="blog-detail-content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </section>
    </>
  )
}
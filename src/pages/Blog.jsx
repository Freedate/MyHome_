import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'

export default function Blog() {
  const [posts, setPosts]           = useState([])
  const [categories, setCategories] = useState([])
  const [activeCategory, setActiveCategory] = useState('전체')
  const [loading, setLoading]       = useState(true)
  const [error, setError]           = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchData() {
      const [postsRes, categoriesRes] = await Promise.all([
        supabase
          .from('posts')
          .select('id, title, content, created_at, views, category')
          .order('created_at', { ascending: false }),
        supabase
          .from('categories')
          .select('*')
          .order('name', { ascending: true }),
      ])
      if (postsRes.error) setError(postsRes.error.message)
      else setPosts(postsRes.data)
      setCategories(categoriesRes.data || [])
      setLoading(false)
    }
    fetchData()
  }, [])

  const filtered = activeCategory === '전체'
    ? posts
    : posts.filter(p => p.category === activeCategory)

  if (loading) return <section className="page"><p className="blog-status">불러오는 중...</p></section>
  if (error)   return <section className="page"><p className="blog-status">오류: {error}</p></section>

  return (
    <section className="page blog-page">
      <header className="blog-header">
        <span className="about-label">// blog</span>
        <h1>Blog</h1>
        <p className="about-role">개발 경험과 생각을 기록합니다.</p>
      </header>

      {/* 카테고리 필터 */}
      <div className="blog-filter">
        <button
          className={`blog-filter-btn${activeCategory === '전체' ? ' active' : ''}`}
          onClick={() => setActiveCategory('전체')}
        >
          전체 <span className="blog-filter-count">{posts.length}</span>
        </button>
        {categories.map(c => (
          <button
            key={c.id}
            className={`blog-filter-btn${activeCategory === c.name ? ' active' : ''}`}
            onClick={() => setActiveCategory(c.name)}
          >
            {c.name}
            <span className="blog-filter-count">
              {posts.filter(p => p.category === c.name).length}
            </span>
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="blog-empty">
          <p>아직 작성된 글이 없습니다.</p>
        </div>
      ) : (
        <div className="blog-list">
          {filtered.map(post => (
            <div
              key={post.id}
              className="blog-card"
              onClick={() => navigate(`/blog/${post.id}`)}
            >
              <div className="blog-card-top">
                <div className="blog-card-date">
                  {new Date(post.created_at).toLocaleDateString('ko-KR', {
                    year: 'numeric', month: 'long', day: 'numeric'
                  })}
                </div>
                <div className="blog-card-views">조회 {post.views || 0}</div>
              </div>
              <h2 className="blog-card-title">{post.title}</h2>
              {post.category && (
                <span className="blog-card-category">{post.category}</span>
              )}
              <p className="blog-card-excerpt">
                {post.content?.replace(/<[^>]*>/g, '').slice(0, 120)}...
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
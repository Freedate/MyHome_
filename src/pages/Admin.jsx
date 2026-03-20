import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'

export default function Admin() {
  const [session, setSession]   = useState(null)
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState(null)
  const [loginLoading, setLoginLoading] = useState(false)
  const [posts, setPosts]       = useState([])
  const [loading, setLoading]   = useState(true)
  const [categories, setCategories]     = useState([])
  const [newCategory, setNewCategory]   = useState('')
  const navigate = useNavigate()

  // 세션 확인
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
    return () => subscription.unsubscribe()
  }, [])

  // 글 목록 불러오기
  useEffect(() => {
    if (!session) return
    async function fetchPosts() {
      const { data } = await supabase
        .from('posts')
        .select('id, title, created_at, views')
        .order('created_at', { ascending: false })
      setPosts(data || [])
    }
    fetchPosts()
  }, [session])

  useEffect(() => {
    if (!session) return
    async function fetchData() {
      const [postsRes, categoriesRes] = await Promise.all([
        supabase
          .from('posts')
          .select('id, title, created_at, views')
          .order('created_at', { ascending: false }),
        supabase
          .from('categories')
          .select('*')
          .order('name', { ascending: true }),
      ])
      setPosts(postsRes.data || [])
      setCategories(categoriesRes.data || [])
    }
    fetchData()
  }, [session])

  async function handleLogin(e) {
    e.preventDefault()
    setLoginLoading(true)
    setLoginError(null)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setLoginError('이메일 또는 비밀번호가 올바르지 않습니다.')
      setLoginLoading(false)
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut()
  }

  async function handleDelete(id) {
    if (!confirm('정말 삭제할까요?')) return
    await supabase.from('posts').delete().eq('id', id)
    setPosts(posts.filter(p => p.id !== id))
  }

  async function handleAddCategory() {
  if (!newCategory.trim()) return
  const { data, error } = await supabase
    .from('categories')
    .insert({ name: newCategory.trim() })
    .select()
    .single()
  if (!error) {
    setCategories([...categories, data])
    setNewCategory('')
  }
}

async function handleDeleteCategory(id) {
  if (!confirm('이 카테고리를 삭제할까요?')) return
  await supabase.from('categories').delete().eq('id', id)
  setCategories(categories.filter(c => c.id !== id))
}

  const totalViews = posts.reduce((sum, p) => sum + (p.views || 0), 0)

  if (loading) return <section className="page"><p className="blog-status">로딩 중...</p></section>

  // 로그인 폼
  if (!session) return (
    <section className="page admin-page">
      <div className="admin-box">
        <span className="about-label">// admin</span>
        <h1 className="admin-title">로그인</h1>
        <form className="admin-form" onSubmit={handleLogin}>
          <div className="admin-field">
            <label className="admin-label">Email</label>
            <input
              className="admin-input"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
            />
          </div>
          <div className="admin-field">
            <label className="admin-label">Password</label>
            <input
              className="admin-input"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          {loginError && <p className="admin-error">{loginError}</p>}
          <button className="admin-btn" type="submit" disabled={loginLoading}>
            {loginLoading ? '로그인 중...' : '로그인'}
          </button>
        </form>
      </div>
    </section>
  )

  // 대시보드
  return (
    <section className="page dashboard-page">
      <div className="dashboard-header">
        <div>
          <span className="about-label">// admin dashboard</span>
          <h1 className="dashboard-title">대시보드</h1>
        </div>
        <div className="dashboard-header-right">
          <button className="write-btn-logout" onClick={handleLogout}>로그아웃</button>
          <button className="write-btn-save" onClick={() => navigate('/admin/write')}>
            + 새 글 작성
          </button>
        </div>
      </div>
      

      {/* 통계 카드 */}
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-label">전체 글</div>
          <div className="stat-value">{posts.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">총 조회수</div>
          <div className="stat-value">{totalViews.toLocaleString()}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">평균 조회수</div>
          <div className="stat-value">
            {posts.length ? Math.round(totalViews / posts.length).toLocaleString() : 0}
          </div>
        </div>
      </div>

      {/* 카테고리 관리 */}
<div className="dashboard-section" style={{ marginTop: '40px' }}>
  <h2 className="dashboard-section-label">// categories</h2>
  <div className="dashboard-category-wrap">
    <div className="dashboard-category-list">
      {categories.map(c => (
        <div key={c.id} className="dashboard-category-item">
          <span>{c.name}</span>
          <button
            className="dashboard-btn-delete"
            onClick={() => handleDeleteCategory(c.id)}
          >
            삭제
          </button>
        </div>
      ))}
    </div>
    <div className="dashboard-category-add">
      <input
        className="admin-input"
        type="text"
        placeholder="새 카테고리 (예: 리뷰 / 드라마)"
        value={newCategory}
        onChange={e => setNewCategory(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && handleAddCategory()}
      />
      <button className="write-btn-save" onClick={handleAddCategory}>
        추가
      </button>
    </div>
  </div>
</div>

      {/* 글 목록 */}
      <div className="dashboard-section">
        <h2 className="dashboard-section-label">// posts</h2>
        {posts.length === 0 ? (
          <p className="blog-status">아직 작성된 글이 없습니다.</p>
        ) : (
          <div className="dashboard-table">
            <div className="dashboard-table-head">
              <span>제목</span>
              <span>작성일</span>
              <span>조회수</span>
              <span></span>
            </div>
            {posts.map(post => (
              <div key={post.id} className="dashboard-table-row">
                <span className="dashboard-post-title">{post.title}</span>
                <span className="dashboard-post-meta">
                  {new Date(post.created_at).toLocaleDateString('ko-KR', {
                    year: 'numeric', month: 'short', day: 'numeric'
                  })}
                </span>
                <span className="dashboard-post-views">{(post.views || 0).toLocaleString()}</span>
                <div className="dashboard-post-actions">
                  <button
                    className="dashboard-btn-edit"
                    onClick={() => navigate(`/admin/edit/${post.id}`)}
                  >
                    수정
                  </button>
                  <button
                    className="dashboard-btn-delete"
                    onClick={() => handleDelete(post.id)}
                  >
                    삭제
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
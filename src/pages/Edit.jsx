import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import { supabase } from '../supabase'

export default function Edit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [title, setTitle]           = useState('')
  const [category, setCategory]     = useState('')
  const [categories, setCategories] = useState([])
  const [loading, setLoading]       = useState(false)
  const [fetching, setFetching]     = useState(true)
  const [error, setError]           = useState(null)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: '내용을 입력하세요...' }),
    ],
    editorProps: {
      attributes: { class: 'write-editor-content' },
    },
  })

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) { navigate('/admin'); return }
    })

    async function fetchCategories() {
      const { data } = await supabase
        .from('categories')
        .select('*')
        .order('name', { ascending: true })
      setCategories(data || [])
    }

    async function fetchPost() {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single()

      if (error || !data) { navigate('/admin'); return }

      setTitle(data.title)
      setCategory(data.category || '')
      editor?.commands.setContent(data.content)
      setFetching(false)
    }

    fetchCategories()
    if (editor) fetchPost()
  }, [editor])

  async function handleSave() {
    if (!title.trim())             return setError('제목을 입력해주세요.')
    if (!category)                 return setError('카테고리를 선택해주세요.')
    if (!editor?.getText().trim()) return setError('내용을 입력해주세요.')

    setLoading(true)
    setError(null)

    const { error } = await supabase
      .from('posts')
      .update({
        title:      title.trim(),
        content:    editor.getHTML(),
        category,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)

    if (error) {
      setError('저장 중 오류가 발생했습니다.')
      setLoading(false)
    } else {
      navigate('/admin')
    }
  }

  if (fetching) return <section className="page"><p className="blog-status">불러오는 중...</p></section>

  return (
    <section className="page write-page">
      <div className="write-topbar">
        <button className="detail-back" onClick={() => navigate('/admin')}>
          ← 대시보드로 돌아가기
        </button>
        <div className="write-topbar-right">
          {error && <span className="write-error">{error}</span>}
          <button className="write-btn-save" onClick={handleSave} disabled={loading}>
            {loading ? '저장 중...' : '수정 완료'}
          </button>
        </div>
      </div>

      <input
        className="write-title-input"
        type="text"
        placeholder="제목을 입력하세요"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <div className="write-meta-row">
        <select
          className="write-category-select"
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          <option value="">카테고리 선택</option>
          {categories.map(c => (
            <option key={c.id} value={c.name}>{c.name}</option>
          ))}
        </select>
      </div>

      <div className="write-toolbar">
        <button className={`write-tool${editor?.isActive('bold') ? ' active' : ''}`}
          onClick={() => editor?.chain().focus().toggleBold().run()}>B</button>
        <button className={`write-tool${editor?.isActive('italic') ? ' active' : ''}`}
          onClick={() => editor?.chain().focus().toggleItalic().run()}><em>I</em></button>
        <button className={`write-tool${editor?.isActive('strike') ? ' active' : ''}`}
          onClick={() => editor?.chain().focus().toggleStrike().run()}>S</button>
        <span className="write-tool-sep" />
        <button className={`write-tool${editor?.isActive('heading', { level: 1 }) ? ' active' : ''}`}
          onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}>H1</button>
        <button className={`write-tool${editor?.isActive('heading', { level: 2 }) ? ' active' : ''}`}
          onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}>H2</button>
        <button className={`write-tool${editor?.isActive('heading', { level: 3 }) ? ' active' : ''}`}
          onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}>H3</button>
        <span className="write-tool-sep" />
        <button className={`write-tool${editor?.isActive('bulletList') ? ' active' : ''}`}
          onClick={() => editor?.chain().focus().toggleBulletList().run()}>• 목록</button>
        <button className={`write-tool${editor?.isActive('orderedList') ? ' active' : ''}`}
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}>1. 목록</button>
        <span className="write-tool-sep" />
        <button className={`write-tool${editor?.isActive('blockquote') ? ' active' : ''}`}
          onClick={() => editor?.chain().focus().toggleBlockquote().run()}>" 인용</button>
        <button className={`write-tool${editor?.isActive('codeBlock') ? ' active' : ''}`}
          onClick={() => editor?.chain().focus().toggleCodeBlock().run()}>{'</>'}</button>
      </div>

      <div className="write-editor">
        <EditorContent editor={editor} />
      </div>
    </section>
  )
}
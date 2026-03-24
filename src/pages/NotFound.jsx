import { useNavigate } from 'react-router-dom'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <section className="page notfound-page">
      <div className="notfound-wrap">
        <span className="notfound-code">404</span>
        <p className="notfound-title">페이지를 찾을 수 없습니다.</p>
        <p className="notfound-sub">주소가 잘못됐거나 삭제된 페이지예요.</p>
        <div className="notfound-btns">
          <button className="notfound-btn-primary" onClick={() => navigate('/')}>
            홈으로
          </button>
          <button className="notfound-btn-secondary" onClick={() => navigate(-1)}>
            이전 페이지
          </button>
        </div>
      </div>
    </section>
  )
}
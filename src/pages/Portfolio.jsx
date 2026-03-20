import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const ALL_PROJECTS = [
  {
    id: 'industrial-control',
    icon: '🖥️',
    category: 'desktop',
    title: '산업용 제어 소프트웨어',
    company: '(주) 현재회사',
    period: '2021.03 – 2023.08',
    duration: '약 2년 6개월',
    tech: ['C++17', 'Qt 6', 'Modbus TCP', 'SQLite', 'CMake'],
    overview: 'CNC 장비 실시간 모니터링 및 제어 소프트웨어. 기존 단일 스레드 구조를 멀티스레드 아키텍처로 리팩토링하여 처리 성능을 40% 향상시켰으며, Modbus TCP 기반 통신 레이어를 새롭게 설계했습니다.',
    roles: [
      '실시간 데이터 수집 모듈 설계 및 구현',
      'Modbus TCP 통신 레이어 개발',
      '멀티스레드 아키텍처 리팩토링',
      'SQLite 기반 로컬 데이터 저장 설계',
    ],
    features: [
      '기존 폴링 방식을 이벤트 드리븐으로 전환, CPU 사용률 30% 절감',
      '장비 이상 감지 시 자동 알림 및 로그 기록 시스템 구현',
      'Qt 커스텀 위젯으로 실시간 그래프 시각화',
    ],
    contribution: { percent: 70, text: '팀 4인 중 통신 모듈 및 UI 단독 담당' },
  },
  {
    id: 'remote-diagnosis',
    icon: '🔧',
    category: 'desktop',
    title: '설비 원격 진단 모듈',
    company: '(주) 현재회사',
    period: '2020.05 – 2021.02',
    duration: '약 10개월',
    tech: ['C++', 'Qt', 'TCP/IP', 'JSON'],
    overview: '네트워크 기반 원격 진단 기능 추가 프로젝트. 현장 방문 없이 원격으로 설비 상태를 진단할 수 있는 모듈을 설계했습니다.',
    roles: [
      'TCP/IP 소켓 통신 기반 원격 연결 모듈 구현',
      '진단 데이터 JSON 직렬화/역직렬화 처리',
      '원격 진단 UI 컴포넌트 개발',
    ],
    features: [
      '암호화 통신으로 보안 강화',
      '연결 끊김 시 자동 재연결 로직 구현',
    ],
    contribution: { percent: 60, text: '팀 3인 중 통신 레이어 및 UI 담당' },
  },
  {
    id: 'erp-client',
    icon: '📊',
    category: 'desktop',
    title: 'ERP 클라이언트 모듈',
    company: '(주) 이전회사',
    period: '2018.03 – 2020.04',
    duration: '약 2년 1개월',
    tech: ['C++', 'MFC', 'MS-SQL', 'ADO'],
    overview: 'Windows MFC 기반 ERP 시스템의 생산관리 모듈 개발 및 레거시 코드 리팩토링. 노후화된 코드베이스를 현대화하고 단위 테스트 체계를 도입했습니다.',
    roles: [
      '생산관리 모듈 신규 기능 개발',
      '레거시 MFC 코드 리팩토링',
      'MS-SQL 쿼리 최적화',
      '단위 테스트 도입 및 작성',
    ],
    features: [
      '쿼리 최적화로 조회 속도 50% 개선',
      '코드 커버리지 0%에서 40%로 향상',
    ],
    contribution: { percent: 50, text: '팀 5인 중 생산관리 모듈 담당' },
  },
  {
    id: 'facility-diagnosis',
    icon: '🔍',
    category: 'desktop',
    title: '설비 진단 유틸리티',
    company: '(주) 이전회사',
    period: '2016.06 – 2017.12',
    duration: '약 1년 6개월',
    tech: ['C++', 'Win32 API', 'GDI+', 'Serial Communication'],
    overview: '공장 설비의 이상 진단 및 로그 분석 도구. RS-232/485 시리얼 통신을 구현하여 설비 데이터를 수집하고 시각화합니다.',
    roles: [
      'RS-232/485 시리얼 통신 구현',
      'GDI+를 활용한 데이터 시각화',
      '로그 파일 파싱 및 분석 기능 개발',
    ],
    features: [
      '다양한 설비 프로토콜 지원을 위한 플러그인 구조 설계',
      '실시간 파형 그래프 렌더링 구현',
    ],
    contribution: { percent: 80, text: '2인 팀, 통신 및 시각화 모듈 주도 개발' },
  },
  {
    id: 'sentiment-api',
    icon: '🧠',
    category: 'web',
    title: '한국어 감정분석 API 데모',
    company: '개인 프로젝트',
    period: '2025.01',
    duration: '약 1개월',
    tech: ['React', 'FastAPI', 'Python', 'Claude API'],
    overview: '텍스트의 감정(긍정/부정/중립)을 분석하는 API 서비스 데모. FastAPI 백엔드와 Claude API를 연동하여 API Key 인증, 사용량 추적 기능을 구현했습니다.',
    roles: [
      'FastAPI 기반 REST API 서버 구현',
      'Claude API 연동 및 프롬프트 설계',
      'API Key 인증 미들웨어 개발',
      'React 데모 페이지 제작',
    ],
    features: [
      'API Key 기반 인증 및 사용량 추적',
      'Swagger UI 자동 생성 문서화',
      'Railway를 통한 무중단 배포',
    ],
    contribution: { percent: 100, text: '1인 단독 개발' },
    url: null,
  },
  {
    id: 'portfolio-site',
    icon: '🌐',
    category: 'web',
    title: '이 포트폴리오 사이트',
    company: '개인 프로젝트',
    period: '2025',
    duration: '진행 중',
    tech: ['React', 'Vite', 'Supabase', 'Vercel', 'React Router'],
    overview: 'React + Vite로 개발한 개인 포트폴리오 겸 브랜딩 사이트. Supabase 기반 블로그, Tiptap 리치에디터, Vercel 자동 배포를 포함합니다.',
    roles: [
      'React + Vite 프로젝트 설계 및 구현',
      'Supabase 연동 블로그 시스템 개발',
      'Tiptap 리치에디터 커스터마이징',
      'CSS 디자인 시스템 구축',
    ],
    features: [
      '네이비 다크 테마 + 애니메이션 메인 페이지',
      '회사별 포트폴리오 그룹핑',
      '웹 프로젝트 인앱 iframe 실행',
    ],
    contribution: { percent: 100, text: '1인 단독 개발' },
    url: null,
  },
]

const COMPANIES = [
  { name: '(주) 현재회사',  period: '2020 – 현재' },
  { name: '(주) 이전회사',  period: '2015 – 2020' },
]

const TABS = [
  { id: 'desktop', label: 'Windows Desktop' },
  { id: 'web',     label: 'Web' },
  { id: 'api',     label: 'API',  soon: true },
  { id: 'game',    label: 'Game', soon: true },
]

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState('desktop')
  const [openProject, setOpenProject] = useState(null)
  const navigate = useNavigate()

  const desktopByCompany = COMPANIES.map(c => ({
    ...c,
    projects: ALL_PROJECTS.filter(p => p.category === 'desktop' && p.company === c.name),
  }))

  const webProjects = ALL_PROJECTS.filter(p => p.category === 'web')

  return (
    <section className="page portfolio-page">
      <header className="portfolio-header">
        <span className="about-label">// portfolio</span>
        <h1>Portfolio</h1>
        <p className="about-role">지금까지 작업한 프로젝트들입니다.</p>
      </header>

      <div className="pf-tabs">
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`pf-tab${activeTab === tab.id ? ' active' : ''}${tab.soon ? ' soon' : ''}`}
            onClick={() => !tab.soon && setActiveTab(tab.id)}
          >
            {tab.label}
            {tab.soon && <span className="pf-tab-badge soon">soon</span>}
          </button>
        ))}
      </div>

      {activeTab === 'desktop' && (
        <div className="pf-companies">
          {desktopByCompany.map((company, i) => (
            <div key={i} className="pf-company">
              <div className="pf-company-header">
                <span className="pf-company-name">{company.name}</span>
                <span className="pf-company-period">{company.period}</span>
                <div className="pf-company-line" />
              </div>
              <div className="pf-grid">
                {company.projects.map(project => (
                  <div
                    key={project.id}
                    className="pf-card"
                    onClick={() => navigate(`/portfolio/${project.id}`)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="pf-card-top">
                      <span className="pf-card-icon">{project.icon}</span>
                      <span className="pf-card-badge badge-desktop">Windows</span>
                    </div>
                    <h3 className="pf-card-title">{project.title}</h3>
                    <p className="pf-card-desc">{project.overview.slice(0, 60)}...</p>
                    <div className="pf-card-tags">
                      {project.tech.map(t => <span key={t} className="pf-card-tag">{t}</span>)}
                    </div>
                    <div className="pf-card-footer">
                      <span className="pf-card-hint">→ 자세히 보기</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'web' && (
        <div className="pf-grid">
          {webProjects.map(project => (
            <div
              key={project.id}
              className="pf-card"
              onClick={() => navigate(`/portfolio/${project.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <div className="pf-card-top">
                <span className="pf-card-icon">{project.icon}</span>
                <span className="pf-card-badge badge-web">Web</span>
              </div>
              <h3 className="pf-card-title">{project.title}</h3>
              <span className="pf-card-period">{project.period}</span>
              <p className="pf-card-desc">{project.overview.slice(0, 60)}...</p>
              <div className="pf-card-tags">
                {project.tech.map(t => <span key={t} className="pf-card-tag">{t}</span>)}
              </div>
              <div className="pf-card-footer">
                <span className="pf-card-hint">→ 자세히 보기</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {openProject && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setOpenProject(null)}>
          <div className="modal-window">
            <div className="modal-titlebar">
              <div className="modal-dots">
                <span className="modal-dot dot-red" onClick={() => setOpenProject(null)} />
                <span className="modal-dot dot-yellow" />
                <span className="modal-dot dot-green" />
              </div>
              <span className="modal-title">{openProject.title}</span>
              <button className="modal-close" onClick={() => setOpenProject(null)}>✕</button>
            </div>
            <iframe className="modal-iframe" src={openProject.url} title={openProject.title} />
          </div>
        </div>
      )}
    </section>
  )
}
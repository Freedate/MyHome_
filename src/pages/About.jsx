const DATA = {
  name: '홍길동',
  role: 'Software Engineer · C++ & Windows Application Developer',
  bio: `10년 이상 Windows 데스크탑 애플리케이션 개발을 중심으로 경력을 쌓아왔습니다.
최근에는 웹 기술에 관심을 갖고 React와 Python을 학습하며 포트폴리오를 확장 중입니다.
사용자 경험을 중시하고, 복잡한 문제를 단순하게 만드는 것을 즐깁니다.`,

  career: [
    {
      period: '2020 – 현재',
      role: 'Senior Software Engineer',
      company: '(주) 회사명',
      desc: 'C++/Qt 기반 산업용 제어 소프트웨어 개발 및 설계. 멀티스레드 아키텍처 리팩토링으로 처리 성능 40% 향상.',
    },
    {
      period: '2015 – 2020',
      role: 'Software Engineer',
      company: '(주) 이전회사',
      desc: 'Windows MFC 기반 ERP 클라이언트 개발. 레거시 코드베이스 현대화 및 단위 테스트 체계 도입.',
    },
    {
      period: '2013 – 2015',
      role: 'Junior Developer',
      company: '(주) 첫회사',
      desc: 'Windows 유틸리티 소프트웨어 개발 및 QA. C/C++ 기초 역량 구축.',
    },
  ],

  skills: [
    { group: 'Primary',  tags: ['C++', 'C', 'Windows API', 'MFC', 'Qt'], primary: true },
    { group: 'Learning', tags: ['React', 'Python', 'FastAPI'], primary: false },
    { group: 'Tools',    tags: ['Visual Studio', 'Git', 'CMake'], primary: false },
  ],

  email: 'your@email.com',
}

export default function About() {
  return (
    <section className="page about-page">

      <header className="about-header">
        <span className="about-label">// about me</span>
        <h1 className="about-name">{DATA.name}</h1>
        <p className="about-role">{DATA.role}</p>
      </header>

      <div className="about-section">
        <h2 className="section-title">Introduction</h2>
        <p className="about-bio" style={{ whiteSpace: 'pre-line' }}>{DATA.bio}</p>
      </div>

      <div className="about-section">
        <h2 className="section-title">Career</h2>
        <div className="timeline">
          {DATA.career.map((item, i) => (
            <div key={i} className="timeline-item">
              <span className="timeline-period">{item.period}</span>
              <div className="timeline-content">
                <h3>{item.role}</h3>
                <p className="timeline-company">{item.company}</p>
                <p className="timeline-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="about-section">
        <h2 className="section-title">Skills</h2>
        <div className="skill-groups">
          {DATA.skills.map((group, i) => (
            <div key={i} className="skill-group">
              <span className="skill-group-label">{group.group}</span>
              <div className="tags">
                {group.tags.map(tag => (
                  <span key={tag} className={`tag${group.primary ? ' primary' : ''}`}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="about-section">
        <h2 className="section-title">Contact</h2>
        <div className="contact-box">
          <p>새로운 기회나 협업이라면 언제든지 환영합니다.</p>
          <a className="btn-contact" href={`mailto:${DATA.email}`}>
            ✉ 이메일 보내기
          </a>
        </div>
      </div>

    </section>
  )
}
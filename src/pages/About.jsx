const DATA = {
  name: '이동호',
  role: 'Software Engineer · C++ & Windows Application Developer',
  bio: `C++과 Qt 기반의 Winodws 데스크탑 애플리케이션 기반의 경력을 쌓았습니다.
  영상 재생과 분석, 제어 소프트웨어 개발 경험과, UNity3D 기반의 게임 출시 경험이 있습니다.
  AI기술의 중요성을 느끼고 AI 부트캠프를 통해 AI 기술의 기초 학습과 더불어 다양한 프로젝트를 진행했습니다.
  개발자로서의 역량을 확장하기 위해 React와 TypeScript를 활용한 웹 개발에도 도전하고 있습니다.
  이 홈페이지를 통해 여러 웹 기술을 실험하고 적용하고 학습하고자 하며, 이 페이지는 그 첫 시작을 준비하는 페이지입니다.
  다양한 경험과 기술을 바탕으로 재미있고 의미 있는 프로젝트에 기여하고 성장해 나가고자 합니다.`,

  career: [
    {
      period: '2025.12 – 2026.01',
      duration: '2개월',
      role: 'Native Application Developer (팀원)',
      company: 'ONJ',
      desc: '실시간 카메라 스트리밍 및 영상처리 AI기반 용접교육 소프트웨어 개발',
      projects: ["Ubuntu 기반 실시간 카메라 프레임분석 및 스트리밍 서버 개발 (2025.12 ~ 2026.01)",
        "Windows 기반 다분할 실시간 스트리밍 뷰어 앱 개발 (2025.12 ~ 2026.01)"
      ],
    },
    {
      period: '2019.01 – 2023.03',
      duration: '4년 3개월',
      role: '영상 소프트웨어 연구/개발 Specialist (대리)',
      company: 'CJ 4DPLEX',
      desc: '영상 분석 및 모션 솔루션 소프트웨어 연구/개발',
      projects: [
        "동영상 분석 및 자동 4DX 모션코드 추출 통합 프로그램 '4DX PRO' (2021.04 ~ 2023.03)",
        "모션 인식 아동 교육용 게임 솔루션 'PLAX' (2020.05 ~ 2021.03)",
        "다면 영상 편집 및 상영 솔루션 'PROST' (2019.04 ~ 2020.03)",
      ]
    },
  ],

  experience:[
    {
      period: '2024.07 – 2025.02',
      duration: '8개월',
      title: '패스트캠퍼스 Upstage AI Lab 4기',
      desc: '부트캠프 자체 프로젝트 및 경진대회 다수 진행, 기업 연계 프로젝트 1종 진행 및 최우수 수료생 선정',
      contents: [
        "LLM with RAG 챗봇 개발 진행",
        "RecSys 영화 추천 서비스 개발 리드",
        "기업 연계 AI 번역 서비스 개발 리드 (오픈소스 Transformers 모델 도메인 특화 파인튜닝)",
        "수료 이후 수강생들과 함께 AI 토이 프로젝트 진행"
      ]
    },
    {
      period: '2023.04 – 2024.02',
      duration: '11개월',
      title: '워킹홀리데이 in 아일랜드',
      desc: '어학 목적의 워킹홀리데이, 현지에서 어학원 수강 및 캐주얼 잡 경험하며 영어 실력 향상',
      contents: [
      ]
    },
    {
      period: '2016.12 – 2017.09',
      duration: '10개월',
      title: '스톤스프 스튜디오 창립',
      desc: '게임 개발 스타트업 창업, 게임 프로그래머로 활동',
      contents: [
        ' 모바일게임 "잭의 추리: 호텔의 미스터리" 개발 및 출시 (2017.05 ~ 2017.09)'
      ]
    }
  ],

  skills: [
    { group: 'Primary', tags: ['C++', 'C#', 'Qt', 'Python'], primary: true },
    { group: 'Tools', tags: ['Visual Studio', 'Qt Creator', 'Unity3D','Git', 'CMake'], primary: false },
    { group: 'Libraries', tags: ['FFMpeg', 'OpenCV','MS Azure Kinect'], primary: false },
    { group: 'Learning', tags: ['React', 'TypeScript', 'JavaScript'], primary: false },
  ],

  email: 'kod9326@gmail.com',
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
              <div className="timeline-period">
                <span>{item.period}</span>
                {item.duration && <span className="timeline-duration">{item.duration}</span>}
              </div>
              <div className="timeline-content">
                <h3>{item.company}</h3>
                <p className="timeline-role">{item.role}</p>
                <p className="timeline-desc">{item.desc}</p>
                {item.projects && (
                  <ul className="timeline-projects">
                    {item.projects.map((project, j) => (
                      <li key={j}>
                        <span className="timeline-project-dot">·</span>
                        {project}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="about-section">
        <h2 className="section-title">Experience</h2>
        <div className="timeline">
          {DATA.experience.map((item, i) => (
            <div key={i} className="timeline-item">
              <div className="timeline-period">
                <span>{item.period}</span>
                {item.duration && <span className="timeline-duration">{item.duration}</span>}
              </div>
              <div className="timeline-content">
                <h3>{item.title}</h3>
                <p className="timeline-desc">{item.desc}</p>
                {item.contents && (
                  <ul className="timeline-projects">
                    {item.contents.map((content, j) => (
                      <li key={j}>
                        <span className="timeline-project-dot">·</span>
                        {content}
                      </li>
                    ))}
                  </ul>
                )}
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
          <p>채용제안 또는 프로젝트 제안, 업무 제안 등은 언제나 환영합니다.</p>
          <a className="btn-contact" href={`mailto:${DATA.email}`}>
            ✉ 이메일 보내기  
          </a>
        </div>
      </div>

    </section>
  )
}
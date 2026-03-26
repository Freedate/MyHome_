import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const ALL_PROJECTS = [
  {
    id: 'wts',
    icon: '🖥️',
    category: 'desktop',
    platforms: ['Windows', 'Linux'],
    title: 'WTS',
    company: 'ONJ',
    period: '2025.12 – 2026.01',
    duration: '약 2년 6개월',
    tech: ['C++', 'Qt', 'Linux(Ubuntu)', 'FFMpeg', 'GStreamer', 'RTSP', 'REST API', 'TCP/IP'],
    overview: '실시간 카메라 및 AI 기반 용접 교육 솔루션',
    desc: [
      '소규모 스타트업에서 진행한 프로젝트였기 때문에 최소한의 개발인력으로 개발 진행',
      '용접 헬멧에 부착한 카메라를 통해 실시간으로 입력되는 영상을 통해 강사가 실시간으로 교육 피드백을 남길 수 있는 프로젝트',
      '실제 교육현장에서는 부스별로 교육생이 용접을 실습하는 환경이기 때문에 Windows App을 통해 강사가 실시간으로 다수의 학생의 실습 상황을 확인',
      '강사는 Windows App을 통해 실습 중 실시간으로 영상 Timestamp마다 피드백을 저장할 수 있음'
    ],
    roles: [
      'Linux App에서 C++로 프로그램 작성, 실시간 카메라 RTSP를 통해 입력되는 실시간 동영상 프레임을 분기',
      '분기1에서는 Linux App에서 관리하는 동영상 Frame Index를 다시 RTSP 패킷에 metadata로 작성해 RTP송신',
      '분기2에서는 받은 프레임을 분석해 해당 시점에 강습생이 용접 중 여부를 판단, 용접 중이라면 자동으로 프레임을 녹화해 파일로 저장',
      '복수의 LinuxPC에서 보낸 RTP 동영상을 1개의 제어용 Windows App에서 실시간으로 재생,녹화상태 UI개발',
      'Windows App은 C++과 Qt를 사용해 개발, Linux App과 TCP를 통해 실시간 상태 확인 및 제어가 가능'
    ],
    features: [
      '영상 분석 모델은 MobileNet을 사용',
      '메인 서버와 API 호출을 통해 각 Edge Device가 서로의 상태를 실시간으로 확인 가능',
      '별도로 동작하는 로컬 메인서버의 API를 통해 녹화된 비디오 파일 업로드 및 상태제어 기능 제공',
      'Windows를 이용하는 강사가 실시간으로 영상을 보며 영상 녹화 및 피드백을 제공',
      '교육생은 모바일 Web을 통해 저장된 영상과 입력된 피드백을 확인하며 학습 가능'

    ],
    review: [
      '실무에서 처음으로 AIAgent인 Copilot을 사용해 개발 진행',
      '입사 후 기획단계 없이 바로 개발에 투입되었으며, 동시에 두개의 앱을 개발해야 했기에 시행착오를 많이 거침',
      '개발과정에서 기획이 변경되는 경우가 많았지만 AI Agent를 통해 많은 도움을 받을 수 있어 성공적으로 프로젝트를 마침',
      '해외 클라이언트 데모를 진행한 결과 반응이 좋았음',
      '다만, 이후 프로젝트에서 직무가 변경되어야 했으나 희망하지 않았기에 해당 프로젝트를 끝으로 퇴사'

    ],
    contribution: { percent: 50, text: '데스크탑용 메인 애플리케이션 및 Ubuntu 카메라 서버 개발' },
    images: [

    ],
  },
  {
    id: 'mci',
    icon: '📊',
    category: 'desktop',
    platforms: ['Windows'],
    title: 'MCI',
    company: 'CJ 4DPLEX',
    period: '2021.04 – 2023.03',
    duration: '약 2년',
    tech: ['C++', 'Qt', 'FFMpeg', 'Opencv', 'C#'],
    overview: '영상 분석 및 자동 4DX 모션코드 생성 프로그램',
    desc: [
      '4DX용 모션코드 제작 효율화를 위해 통합 소프트웨어과 자동제작 프로그램인 MCI 두 파트로 나누어 개발을 시작',
      'MCI의 단독 애플리케이션이 완성된 후 통합 소프트웨어 프레임에 모듈 형태로 통합하여 사용할 수 있도록 모듈화 개발',
      'MCI 단독 애플리케이션의 UI 및 데이터전처리 기능 개발, 이후 C# 라이브러리화 개발 진행'
    ],
    roles: [
      'C++을 기반으로 Qt5 Qml을 이용해 단독 애플리케이션 UI를 개발',
      '프로그램 전체 UX 및 UI 기획',
      '프로그램 내 미니 동영상 플레이어 기능 개발',
      '기존 사용하던 모션코드 제작 프로그램과 연결 가능한 TCP 통신 기능 개발',
      'FFMpeg 라이브러리를 이용한 동영상 데이터 전처리 기능 개발',
      '프레임 단위로 대표 픽셀들의 벡터 정보를 취합하여 메인 벡터를 추출 기능',
      '메인 벡터의 흐름을 값으로 변환하고 6축 움직임 중 대응되는 값으로 6축 변화량 데이터로 변환 후 그래프 출력 기능 개발',
      '축 별 그래프마다 적용 가능한 선형 필터 개발',
      'AI 개발을 맡은 동료들이 직접 이용할 수 있도록 각 필터마다 버튼 UI 및 히스토리, 실행취소 기능 등을 개발',
      '해당 애플리케이션 기능들을 C# 소스코드로 변환 및 라이브러리화 빌드',
      '통합 소프트웨어 적용 시 나타날 UX/UI 구성 기획 및 개발'
    ],
    features: [
      '학습모델을 수정해가며 사용할 수 있도록 모델 Import 기능을 포함해 개발'
    ],
    review: [
      '이전 PROST 프로젝트때 공부했던 FFMpeg와 동영상 컨테이너와 코덱에 대해서 조금 더 공부할 수 있었으며, 해당 내용을 토대로 벡터를 추출하고 유의미한 데이터를 추출해낼 수 있었음',
      '그래프 처리와 선형 필터를 개발하는 단계에서 수학적인 계산이 많이 들어갔기 때문에 학부시절 배웠던 선형대수 과목을 다시 복습하는 계기가 되었음',
      '해당 프로젝트를 계기로 AI 엔지니어에 관심을 가지게 되었으며, 특히 컴퓨터 비전 분야 AI 엔지니어로 성장하기를 희망해 프로젝트 기초 기능 개발 마무리 단계 이후 퇴사'
    ],
    contribution: { percent: 100, text: 'Windows용 애플리케이션 개발 및 라이브러리 빌드' },
    images: [
      'https://res.cloudinary.com/dk7xtyi1r/image/upload/v1774441321/image_port3_01_yq59cg.png'
    ],
  },
  {
    id: 'plax',
    icon: '🔍',
    category: 'desktop',
    platforms: ['Windows'],
    title: 'PLAX',
    company: 'CJ 4DPLEX',
    period: '2020.05 – 2021.03',
    duration: '약 11개월',
    tech: ['Unity3D', 'C#', 'Azure Kinect SDK'],
    overview: '모션 인식 아동 교육용 게임 솔루션',
    desc: [
      'Covid-19 판데믹사태로 인해 회사 신사업 발굴 중 추진된 프로젝트',
      '영어 교육서비스 기업 ‘청담러닝’의 신규 캐릭터 IP를 활용하여 키즈카페 또는 백화점 등의 유휴공간에 입점을 목표로 개발',
      'Microsoft Azure Kinect를 이용해 RGB카메라와 Depth센서, Motion Tracking 등의 SDK를 활용한 영어 교육용 게임 플랫폼과 8종의 미니게임 콘텐츠를 개발'
    ],
    roles: [
      'Unity3D 환경에서 개발',
      '주어진 요구 학습내용에 맞게 게임 콘텐츠 총 12종 기획에 참여',
      'Azure Kinect SDK를 이용해 동작 인식 및 스크린 터치 캘리브레이션, 터치 인식 모듈 개발',
      '해당 모듈을 통해 개발한 콘텐츠를 실행할 수 있는 플랫폼 및 전용 프레임워크 개발',
      '기획된 12종 중 4개의 게임 콘텐츠 개발',
      '개발 과정에서 필요한 3D 쉐이더 코드 일부 작성'
    ],
    features: [
      '4~6세 아동을 위한 게임 콘텐츠',
      '유니티 툴을 사용해 본 경험이 본인밖에 없었기 때문에 강의 형태의 세미나와 병행하면서 프로젝트 진행',
      '최종적으로 해당 IP를 이용한 영화 콘텐츠가 실패하며 프로젝트 drop'
    ],
    review: [
      '학부시절 스타트업으로 게임을 만들었던 경험을 계기로 Unity 툴을 오랜만에 접해보는 계기가 되었으며, 당시와 비교했을때 해당 프로젝트를 개발하면서 이전 프로젝트 당시 설계 구조 등에서 아쉬웠던 점들이 떠올랐고, 나 자신이 성장했다는 자부심을 가질 수 있었음',
      '신사업으로 시도했던 내용이기 때문에 회사 내에 비슷한 프로젝트를 경험해 본 동료가 없었고, 때문에 기획과 리소스 확보 등에서 아이디어가 많이 반영될 수 있었으며, 덕분에 처음으로 Kinect 센서 SDK를 접해볼 수 있었음',
      'Kinect SDK를 이용해 개발하는 과정에서 많은 연구와 시행착오가 필요했고, 한글 자료가 많지 않았기 때문에 영어공부의 필요성을 깨닫는 계기가 되었음'
    ],
    contribution: { percent: 45, text: '메인 플랫폼과 프레임워크 개발, 콘텐츠개발' },
    images: [
      'https://res.cloudinary.com/dk7xtyi1r/image/upload/v1774441160/image_port2_01_cdhkol.png'
    ],
  },
  {
    id: 'prost',
    icon: '🎞️',
    category: 'desktop',
    platforms: ['Windows'],
    title: 'PROST',
    company: 'CJ 4DPLEX',
    period: '2019.04 - 2020.03',
    duration: '약 1년',
    tech: ['C++', 'Qt', 'OpenCV', 'FFmpeg'],
    overview: '멀티 스크린 영상 편집 및 상영 솔루션',
    desc: [
      'ScreenX 상영 기술 내재화 프로젝트로 시작, 범용 상영 SW로 변경하여 개발 진행',
      '미디어 아트 전시, 공연장, CGV ScreenX 상영관 등 대형 공간에 여러대의 프로젝터를 이용해 다양한 형태의 평면 또는 다면에 한개 이상의 영상을 동시 재생하는 솔루션',
      '영상 편집 및 상영 제어 툴 "Player", 다면 스크린 캘리브레이션 툴 "Calibrator" 툴의 두 가지 파트로 나누어 개발 하였으며, 이 중 "Player의 설계, 개발, QA 등 전 과정을 진행"',
      'Player는 영상을 재생하는 "Decoder"와 영상 제어 UI인 "Player", 원격으로 영상을 제어하는 "Commander"의 세 개의 파트로 나누어 개발'
    ],
    roles: [
      '**Player**',
      'Qt5 Quick, Qml 을 이용해 Visual Studio 환경에서 개발, OpenCV 라이브러리 일부 기능 사용',
      '프로젝터 개수 및 해상도 설정',
      '다수의 영상 입력 후 영상 출력 형태, 위치 및 해상도 설정 : 영상을 축소, 확대 혹은 스크린의 특정 위치에만 출력',
      'Commander를 이용해 Decoder를 원격 실행 및 제어하고, 영상 재생 중 Decoder 종료상태를 파악해 재실행 후 영상 싱크 조절',
      '영상 플레이 리스트 작성 및 저장, 영상 제어 TCP를 통해 메시지 큐 사전 스케쥴링 기능',
      '**Decoder**',
      'C++과 FFMpeg 라이브러리를 사용해 개발',
      'Commander를 통한 미디어 입력, 재생, 일시정지, 정지, 볼륨제어 등 영상 재생 기능을 TCP 통신을 통해 입력받아 실행',
      '0.5초마다 현재 미디어 Timestamp를 Commander로 전달해 여러 Decoder 간 싱크 조절',
      '사전에 Player를 통해 정의된 형태대로 동영상파일을 재생'
    ],
    features: [
      '최대 8개의 프로젝터를 통한 영상 재생을 제어',
      '영상 소스는 1개에서 최대 4개까지 동시 제어',
      '제어 PC에 플레이어만 실행하고 로컬 IP를 통해 원격 PC의 Commander를 실행하여 영상 재생을 제어',
      '메시지 큐를 통해 영상제어 뿐 아니라 TCP 통신을 지원하는 모든 미디어 장비의 제어 스케쥴링 기능 제공'
    ],
    review: [
      '동영상 포맷에 대한 이해가 전무했었으나, 해당 프로젝트를 통해 FFMpeg 라이브러리와 동영상 압축 형식, 포맷과 코덱에 대해 공부할 수 있었음',
      '입사 후 첫 프로젝트였음에도 불구하고 기획부터 모든 단계를 혼자 진행했기 때문에 개발 프로세스를 전부 경험할 수 있었음',
      '해당 프로젝트를 성공적으로 마무리한 것을 계기로 신입으로써 잘 할수 있을까에 대한 불안감이 뭐든 할수 있다는 자신감을 가지고 이후 업무에 임할 수 있었음'
    ],
    contribution: { percent: 100, text: 'Player 파트 기획, 설계 및 개발' },
    images: [
      'https://res.cloudinary.com/dk7xtyi1r/image/upload/v1774437787/Image_port1_01_ctlqln.png'
    ],
  },
  {
    id: 'portfolio-site',
    icon: '🌐',
    category: 'web',
    platforms: ['Web'],
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
    images: [
      //'https://res.cloudinary.com/YOUR_CLOUD/image/upload/v.../img1.png',
      //'https://res.cloudinary.com/YOUR_CLOUD/image/upload/v.../img2.png',
      //'https://res.cloudinary.com/YOUR_CLOUD/image/upload/v.../img3.png',
    ],
    url: null,
  },
]

const COMPANIES = [
  { name: 'ONJ', period: '2025.12 – 2026.01' },
  { name: 'CJ 4DPLEX', period: '2019.01 – 2023.03' },
]

const TABS = [
  { id: 'desktop', label: 'Windows / Linux App' },
  { id: 'web', label: 'Web' },
  { id: 'api', label: 'API', soon: true },
  { id: 'game', label: 'Game', soon: true },
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
  <div style={{ display: 'flex', gap: '6px', marginLeft: 'auto' }}>
    {project.platforms?.map(platform => (
      <span
        key={platform}
        className={`pf-card-badge badge-${platform.toLowerCase()}`}
      >
        {platform}
      </span>
    ))}
  </div>
</div>
                    <h3 className="pf-card-title">{project.title}</h3>
                    <p className="pf-card-desc">{project.overview.slice(0, 60)}</p>
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
  <div style={{ display: 'flex', gap: '6px', marginLeft: 'auto' }}>
    {project.platforms?.map(platform => (
      <span
        key={platform}
        className={`pf-card-badge badge-${platform.toLowerCase()}`}
      >
        {platform}
      </span>
    ))}
  </div>
</div>
              <h3 className="pf-card-title">{project.title}</h3>
              <span className="pf-card-period">{project.period}</span>
              <p className="pf-card-desc">{project.overview.slice(0, 60)}</p>
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
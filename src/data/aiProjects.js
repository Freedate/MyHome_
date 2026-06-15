export const AI_PROJECTS = [
  {
  id: 'ai_game_snake',
  icon: '🐍',
  title: 'VIPER MAZE',
  desc: '어두운 3D 미로 속에서 1인칭 시점으로 뱀을 조종하는 스네이크 게임. 마우스로 방향을 조종하며 먹이를 먹을수록 몸이 길어지고, 벽이나 자기 몸에 부딪히면 게임 오버. 연속으로 먹이를 먹으면 콤보 배율이 올라가며 점수를 극대화할 수 있고, 황금사과·버섯·고스트 오브 등 특수 아이템이 전략적 변수를 더한다.',
  tech: ['HTML', 'JavaScript', 'Three.js', 'WebGL', 'Canvas API', 'Web Audio API'],
  demoUrl: '/demos/game1/index.html',
  review: 'Claude Code를 이용해 처음으로 제작해본 3D 웹게임. 단순한 스네이크 게임에 1인칭 시점과 미로, 콤보 시스템, 미니맵, 나침반 등의 요소를 더해 생각보다 완성도 높은 결과물이 나왔다. AI Agent와의 협업으로 Three.js 렌더링, 미로 자동생성 알고리즘, Web Audio API를 활용한 효과음까지 단일 HTML 파일 안에 구현했다.',
},
{
  id: 'ai_game_knight',
  icon: '♞',
  title: '나이트 던전',
  desc: '체스의 나이트가 되어 저주받은 체스판 던전을 탐험하는 탑뷰 퍼즐 어드벤처. 나이트는 체스 규칙 그대로 L자(2+1칸)로만 이동할 수 있으며, 적들도 각자 체스 말의 이동 규칙으로 움직인다. 전투방, 퍼즐방, 아이템방, 함정방, 보스방으로 구성된 던전을 탐험하며 여왕을 처치하면 클리어. 발판을 순서대로 밟아야 문이 열리는 퍼즐, 황금 열쇠로 잠긴 문 열기 등 다양한 기믹이 담겨있다.',
  tech: ['HTML', 'JavaScript', 'CSS'],
  demoUrl: '/demos/game2/knight-dungeon.html',
  review: '어제 만든 VIPER MAZE에 이어 Claude Code와 함께 만든 두 번째 작품. 젤다의 전설 던전 구조에 체스 나이트의 이동 규칙을 결합한다는 아이디어로 시작했다. 체스 말의 이동 규칙을 적 AI에도 그대로 적용하니 단순한 아이디어만으로 전략적인 게임성이 자연스럽게 생겨났다.',
},
{
  id: 'ai_theremin',
  icon: '🎵',
  title: 'Theremin Visualizer',
  desc: '마우스 움직임이 소리와 빛이 되는 인터랙티브 뮤직 비주얼라이저. 마우스의 Y축 위치가 음높이를 결정하고(위=고음, 아래=저음), 이동 속도가 음량을 조절한다. 화면 위쪽에서는 보라/파랑 계열, 아래쪽에서는 초록/노랑 계열의 네온 파형이 실시간으로 그려지며 잔상처럼 겹겹이 쌓인다. 클릭하면 타악기 효과음과 함께 파티클이 폭발하고, 더블클릭으로 화면을 초기화할 수 있다.',
  tech: ['HTML', 'JavaScript', 'Canvas API', 'Web Audio API'],
  demoUrl: '/demos/interactive1/theremin-visualizer.html',
  review: 'Claude Code로 만든 세 번째 작품. 게임이 아닌 인터랙티브 아트를 처음 시도해봤다. 마우스 움직임 하나로 소리와 시각이 동시에 반응하는 걸 보니 단순한 HTML 파일인데도 꽤 몰입감이 있었다. 테레민이라는 악기 컨셉을 잡은 게 주효했던 것 같다.',
},
]
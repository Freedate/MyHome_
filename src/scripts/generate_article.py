import os
import json
import random
from tracemalloc import start
import anthropic
from supabase import create_client
from datetime import datetime

ANTHROPIC_API_KEY = os.environ["ANTHROPIC_API_KEY"]
SUPABASE_URL = os.environ["SUPABASE_URL"]
SUPABASE_SERVICE_KEY = os.environ["SUPABASE_SERVICE_KEY"]

TOPICS = [
    { "topic": "시사", "prompt": "오늘 날짜 기준 주요 국제 시사 이슈 중 하나를 검색해서" },
    { "topic": "사회", "prompt": "오늘 날짜 기준 한국 사회에서 화제가 되고 있는 사회 현상이나 트렌드 중 하나를 검색해서" },
    { "topic": "경제", "prompt": "오늘 날짜 기준 글로벌 또는 한국 경제에서 주목할 만한 이슈 중 하나를 검색해서" },
    { "topic": "테크", "prompt": "오늘 날짜 기준 AI, 빅테크, 스타트업 분야에서 주목할 만한 최신 소식 중 하나를 검색해서" },
    { "topic": "엔터", "prompt": "오늘 날짜 기준 K-pop, 영화, OTT, 게임 등 엔터테인먼트 분야에서 화제가 된 최신 소식 중 하나를 검색해서" },
    { "topic": "문화", "prompt": "오늘 날짜 기준 라이프스타일, 음식, 여행, 환경 등 문화 트렌드 중 하나를 검색해서" },
    { "topic": "스포츠", "prompt": "오늘 날짜 기준 국내외 스포츠에서 주목할 만한 최신 소식이나 이슈 중 하나를 검색해서" },
]

def generate_article():
    selected = random.choice(TOPICS)
    topic = selected["topic"]
    topic_prompt = selected["prompt"]

    client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)

    message = client.messages.create(
        model="claude-opus-4-6",
        max_tokens=3000,
        tools=[
            {
                "type": "web_search_20250305",
                "name": "web_search"
            }
        ],
        messages=[{
            "role": "user",
            "content": f"""
{topic_prompt} 최신 뉴스를 바탕으로 한국어 아티클을 작성해줘.

조건:
- 반드시 웹 검색을 먼저 해서 오늘 날짜 기준 최신 정보를 사용할 것
- 제목은 흥미롭고 클릭하고 싶게 만들어줘
- 요약은 2~3문장으로 핵심만
- 본문은 HTML 형식으로 작성 (<h2>, <p>, <ul>, <li> 태그 사용)
- 본문 길이는 800~1200자 정도
- 객관적이고 균형 잡힌 시각으로 작성

반드시 아래 JSON 형식으로만 응답해줘. 마크다운 코드블록 없이 순수 JSON만:
{{
  "title": "제목",
  "summary": "요약 2~3문장",
  "content": "<h2>소제목</h2><p>본문...</p>",
  "topic": "{topic}",
  "source_url": "참고한 뉴스 URL (없으면 null)"
}}
"""
        }]
    )

    # 최종 텍스트 응답만 추출
    raw = ""
    for block in message.content:
        if hasattr(block, "text") and block.text is not None:
            raw += block.text

    raw = raw.strip()

    # 코드블록 제거
    if raw.startswith("```"):
        raw = raw.split("```")[1]
        if raw.startswith("json"):
            raw = raw[4:]
        raw = raw.strip()

    print("=== AI 응답 ===")
    print(raw)
    print("===============")

    start = raw.find('{')
    end = raw.rfind('}') + 1
    article = json.loads(raw[start:end])
    return article

def save_to_supabase(article):
    client = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)
    result = client.table("ai_articles").insert({
        "title": article["title"],
        "summary": article["summary"],
        "content": article["content"],
        "topic": article["topic"],
        "source_url": article.get("source_url"),
        "created_at": datetime.utcnow().isoformat(),
    }).execute()
    print(f"✅ 저장 완료: {article['title']}")
    return result

if __name__ == "__main__":
    article = generate_article()
    save_to_supabase(article)
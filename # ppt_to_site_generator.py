from pptx import Presentation
from pathlib import Path

# 디렉토리 경로 설정
ROOT_DIR = Path("output_site")
SRC_DIR = ROOT_DIR / "src"
RESOURCES = ROOT_DIR / "resources"
TEMPLATES_DIR = Path("templates")

SRC_DIRS = {
    "html": SRC_DIR / "html",
    "typescripts": SRC_DIR / "typescripts",
    "styles": SRC_DIR / "styles"
}

RES_MEDIA_DIRS = {
    "html": RESOURCES / "html",
    "styles": RESOURCES / "styles",
    "images": RESOURCES / "images",
    "audio": RESOURCES / "audio",
    "videos": RESOURCES / "videos",
    "fonts": RESOURCES / "fonts",
    "icons": RESOURCES / "icons"
}

def read_template(name: str) -> str:
    """템플릿 파일을 읽어 문자열로 반환"""
    path = TEMPLATES_DIR / name
    return path.read_text(encoding="utf-8")

# pptx 파일 파싱
def parse_pptx(filepath: str) -> str:
    prs = Presentation(filepath)
    slides_html = ""
    for idx, slide in enumerate(prs.slides):
        slide_content = f'<div class="slide" id="slide-{idx}">\n'
        for shape in slide.shapes:
            if hasattr(shape, "text") and shape.text.strip():
                slide_content += f'  <p>{shape.text}</p>\n'
        slide_content += '</div>\n'
        slides_html += slide_content
    return slides_html

# 파일 생성
def generate_files(slides_html: str):
    # 디렉토리 생성
    for d in [*SRC_DIRS.values(), *RES_MEDIA_DIRS.values()]:
        d.mkdir(parents=True, exist_ok=True)

    # 템플릿 로드
    html_template = read_template("templates.html")
    css_template = read_template("templates.css")
    ts_template = read_template("templates.ts")

    # HTML
    html_path = SRC_DIRS["html"] / "index.html"
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(html_template.format(slides=slides_html))

    # CSS
    css_path = RES_MEDIA_DIRS["styles"] / "style.css"
    with open(css_path, "w", encoding="utf-8") as f:
        f.write(css_template)

    # TypeScript
    ts_path = SRC_DIRS["typescripts"] / "main.ts"
    with open(ts_path, "w", encoding="utf-8") as f:
        f.write(ts_template)

# 메인 함수
def main(pptx_path: str):
    slides_html = parse_pptx(pptx_path)
    generate_files(slides_html)
    print(f"✅ 사이트 파일이 생성되었습니다: {ROOT_DIR.resolve()}")

# 실행
if __name__ == "__main__":
    pptx_file = "F:/project.earth.power/earth-power-n1/resources/pptx/presentation.pptx"
    main(pptx_file)

# React가 처음일때! Vibe Coding 기반 React Static Web Application 개발

## 1. 프로젝트 개요

**earth-power-n3**는 AI 기반 코드 생성 도구를 활용하는 **Vibe Coding(바이브 코딩)** 방식으로 React Static Web Application(정적 웹 애플리케이션)을 개발하고, 생성된 코드를 개발자가 검토·수정·검증하는 프로젝트입니다.

AI를 활용하여 화면 구성과 컴포넌트 구현, 리팩터링 및 테스트 초안을 빠르게 작성하되, 최종 설계와 코드 품질·보안·배포 책임은 개발자가 담당합니다.

## 2. 개발 주제 및 목표

- 자연어 요구사항을 React 컴포넌트와 UI 동작으로 구현합니다.
- AI가 생성한 코드를 검토하여 컴포넌트 분리, 상태 관리, 재사용성을 개선합니다.
- TypeScript 타입 검사, ESLint 및 빌드 검증을 통해 생성 코드의 품질을 확인합니다.
- 프론트엔드 애플리케이션 소스와 서버 인프라를 별도 저장소로 관리합니다.
- 개발 환경에서 화면 표시와 API 연동을 검증하고, 배포 시 환경별 설정을 구분합니다.

## 3. 주요 기술

| 영역 | 기술 |
| --- | --- |
| UI | React, TypeScript |
| 개발 및 빌드 | Vite |
| 정적 분석 | ESLint, TypeScript |
| 개발 방식 | Vibe Coding, AI-assisted Development, Code Review |
| 서버 인프라 | Nginx, Vite Development Server, Apache Tomcat, Docker Compose |

> 실제 애플리케이션의 의존성 및 버전은 `package.json`을 기준으로 확인합니다.

## 4. Static Web Application의 범위

Static Web Application은 웹 서버가 미리 빌드된 HTML, CSS, JavaScript, 이미지, 폰트 등의 **정적 리소스(Static Resources)** 를 제공하고, 브라우저가 JavaScript를 실행하여 화면과 상태를 관리하는 애플리케이션입니다. React 기반 Single-Page Application(SPA)도 이 범위에 포함될 수 있습니다.

| 구분 | 포함 여부 | 담당 영역 |
| --- | --- | --- |
| HTML·CSS·JavaScript 제공 | 포함 | Nginx에서 정적 빌드 결과물 제공 |
| 이미지·폰트 등 정적 리소스 제공 | 포함 | Nginx |
| React SPA 렌더링 및 화면 상태 변경 | 포함 | 브라우저의 JavaScript |
| REST API 호출 및 응답 표시 | 포함 | 브라우저에서 호출, Nginx가 API 프록시 |
| API 기반 인증·데이터 조회·수정 | 포함 | 브라우저와 Backend API 간 통신 |
| 서버 측 HTML 렌더링(SSR) | 정적 배포 범위 밖 | 별도 서버 런타임 필요 |
| 서버 측 요청 처리 | 프론트엔드 범위 밖 | Tomcat이 HTTP 요청을 수신·전달하고 서버 애플리케이션을 실행 |

**API를 호출하거나 API 응답으로 화면을 동적으로 변경해도 정적 웹 애플리케이션으로 분류할 수 있습니다.** 정적이라는 표현은 화면 내용이 고정된다는 의미가 아니라, 서버가 제공하는 프론트엔드 파일이 빌드된 정적 리소스라는 의미입니다.

## 5. 서버 구성 및 재사용

서버 구성은 별도로 구현하지 않고 기존 **[nginx-vite-tomcat-env](https://github.com/withlionbuddha/nginx-vite-tomcat-env)** 저장소를 활용합니다.

이 저장소에는 Nginx, 개발용 Vite 서버, Tomcat을 Docker Compose로 구동하기 위한 환경이 마련되어 있습니다. React 소스와 서버 인프라는 분리하여 관리합니다.

### 아키텍처 및 실제 요청 흐름

다음은 **정적 빌드 결과물을 Nginx에서 직접 제공하는 배포 목표 구조**입니다. 현재 개발 환경에서는 정적 파일 제공 부분을 Vite Development Server가 대신합니다.

```text
Browser (React SPA)
       |
       | HTTPS 요청
       v
   Nginx :443
       |
       +-- GET / ----------> Static Resources
       |                     HTML / CSS / JS / Images
       |
       +-- GET /api/users --> Tomcat :8080
                                  |
                                  v
                              Backend API
```

1. 브라우저가 HTTPS로 Nginx에 접속하여 HTML, CSS, JavaScript 등 정적 리소스를 요청합니다.
2. 브라우저가 받은 JavaScript를 실행하여 React SPA를 렌더링합니다.
3. React 코드가 `fetch` 등의 API로 `/api/users`를 호출합니다. **API 요청의 실제 발신자는 브라우저**입니다.
4. Nginx가 `/api/*` 요청을 Tomcat으로 프록시합니다. Tomcat은 요청을 수신하고 배포된 서버 애플리케이션에 전달하여 응답을 처리합니다.
5. API 응답은 Tomcat → Nginx → 브라우저로 돌아오며, React가 응답에 따라 화면을 갱신합니다.

개발 환경에서는 아래와 같이 정적 파일 대신 Vite 개발 서버를 사용합니다.

```text
Browser -- HTTPS --> Nginx :443
                        |-- /      --> Vite Dev Server :83 --> React 개발 리소스
                        +-- /api/* --> Tomcat :8080 --> Backend API
```

**[nginx-vite-tomcat-env](https://github.com/withlionbuddha/nginx-vite-tomcat-env)** 저장소의 `docker-compose.dev.yml` 및 `.env.example` 기준으로 Nginx HTTP 80은 HTTPS 443으로 리디렉션되며, Tomcat의 호스트 및 컨테이너 기본 포트는 모두 8080입니다. **운영 환경에서 Nginx가 실제 `dist/` 파일을 직접 제공하는지는 별도 배포 설정과 검증이 필요합니다.**

### 저장소 구성 예시

```text
workspace/
├── earth-power-n3/         # React 애플리케이션 소스
└── nginx-vite-tomcat-env/  # Nginx / Vite / Tomcat / Docker Compose
```

**[nginx-vite-tomcat-env](https://github.com/withlionbuddha/nginx-vite-tomcat-env)** 저장소의 `.env`에서 개발용 React 소스 경로를 연결합니다.

```dotenv
WEB_UI_SOURCE_PATH=../earth-power-n3
```

이 설정은 두 저장소가 위 예시처럼 나란히 있는 경우에 해당합니다.

### 개발 서버 실행

```powershell
cd nginx-vite-tomcat-env
Copy-Item .env.example .env
# .env 파일의 WEB_UI_SOURCE_PATH를 실제 earth-power-n3 경로로 설정
docker compose -f docker-compose.dev.yml config
docker compose -f docker-compose.dev.yml up --build -d
docker compose -f docker-compose.dev.yml ps
```

개발 환경의 기본 접속 주소는 `https://localhost`(Nginx 443), `http://localhost:83`(Vite), `http://localhost:8080`(Tomcat 직접 확인)입니다.  
Nginx HTTP 80은 HTTPS로 리디렉션됩니다. 실제 접속 가능 여부는 컨테이너 기동 및 환경 설정에 따라 달라집니다.

Nginx TLS 인증서와 개인키는 **[nginx-vite-tomcat-env](https://github.com/withlionbuddha/nginx-vite-tomcat-env)** 저장소의 `SSL_SOURCE_DIR_PATH`를 통해 읽기 전용 마운트합니다.  
생성 방법은 [로컬 HTTPS PEM 인증서 가이드](docs/LOCAL_HTTPS_PEM.md)를 참고합니다.

API 경로는 Nginx의 `/api/*` 프록시를 기준으로 연동합니다. 기존 프론트엔드 환경 설정 및 별도 API 대상 서버를 사용하는 경우, 프록시 대상과 HTTPS 인증서 신뢰 설정의 일치 여부를 검증해야 합니다.

## 재사용 UI 컴포넌트

`src/components/ui/`에는 기존 `App.css`의 테마 변수(`--theme-primary`, `--theme-ink`, `--theme-soft` 등)를 재사용하는 공통 UI 컴포넌트를 배치합니다. 기존 화면은 변경하지 않았으며 필요한 페이지에서 점진적으로 적용합니다.

```text
src/components/ui/
├── Button.tsx   # Primary/Secondary/Outline/Danger/Ghost 버튼
├── Input.tsx    # 레이블·도움말·오류 표시를 제공하는 입력칸
├── Table.tsx    # 제네릭 데이터 및 열 렌더러를 사용하는 테이블
├── ui.css       # 테마 연동·반응형 UI 스타일
└── index.ts     # 공통 export
```

```tsx
import { Button, Input, Table, type TableColumn } from './components/ui'

type Item = { id: number; title: string }
const columns: TableColumn<Item>[] = [
  { key: 'title', header: '제목', render: item => item.title },
]

// 컴포넌트 내부 사용 예:
// <Button variant="primary">저장</Button>
// <Input label="제목" placeholder="제목 입력" />
// <Table caption="항목 목록" columns={columns} rows={items} getRowKey={item => item.id} />
```

Button은 disabled/loading, Input은 접근성 레이블·검증 오류, Table은 빈 목록 및 가로 스크롤을 지원합니다. CSS는 상위 `data-theme`에서 정의되는 테마 변수를 상속합니다. 화면 연결과 실제 빌드 검증은 별도로 수행해야 합니다.

## 6. 로컬 개발 및 검증

React 프로젝트 디렉터리에서 다음 명령으로 개발하거나 검증할 수 있습니다.

```powershell
npm install
npm run dev
npm run lint
npm run build
```

의존성 설치 시 기존 lockfile 및 선택한 패키지 매니저의 일관성을 유지합니다.  
Docker Compose 기반 개발 서버를 사용할 때에는 인프라 저장소에서 Vite를 실행하므로 로컬 Vite 서버를 중복 실행할 필요가 없습니다.

## 7. Vibe Coding 작업 원칙

1. **요구사항 정의**: UI 구조, 기능, 입력·출력 및 완료 기준을 명시합니다.
2. **AI 코드 생성**: 화면 또는 기능 단위로 작은 변경을 생성합니다.
3. **개발자 검토**: 컴포넌트 책임, 타입 안정성, 접근성, 오류 처리 및 보안을 확인합니다.
4. **품질 검증**: lint·build 결과와 실제 브라우저 동작을 확인합니다.
5. **개선 및 기록**: 변경 목적, 검증 결과 및 미해결 사항을 기록합니다.

AI 생성 결과를 그대로 완성품으로 간주하지 않으며, 기능 완성 여부는 실제 코드와 테스트 결과를 기준으로 판단합니다.

## 8. 관련 저장소

- **React 개발 프로젝트**: [withlionbuddha/earth-power-n3](https://github.com/withlionbuddha/earth-power-n3)
- **서버 구성 재사용**: [withlionbuddha/nginx-vite-tomcat-env](https://github.com/withlionbuddha/nginx-vite-tomcat-env)

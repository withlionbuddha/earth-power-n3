# Vibe Coding 기반 React 웹 애플리케이션 개발

## 1. 프로젝트 개요

**earth-power-n3**는 AI 기반 코드 생성 도구를 활용하는 **Vibe Coding(바이브 코딩)** 방식으로 React 웹 애플리케이션을 개발하고, 생성된 코드를 개발자가 검토·수정·검증하는 프로젝트입니다.

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

## 4. 서버 구성 및 재사용

서버 구성은 별도로 구현하지 않고 기존 **[nginx-vite-tomcat-env](https://github.com/withlionbuddha/nginx-vite-tomcat-env)** 저장소를 활용합니다.

이 저장소에는 Nginx, 개발용 Vite 서버, Tomcat을 Docker Compose로 구동하기 위한 환경이 마련되어 있습니다. React 소스와 서버 인프라는 분리하여 관리합니다.

### 개발 환경 요청 흐름

```text
Browser
   |
   v
Nginx (:8080)
   |-- /       --> Dev Vite (:8183) --> React UI
   |
   +-- /api/*  --> Tomcat (:8080) --> Backend Services

```

위 포트 및 라우팅은 서버 인프라 저장소 README에 제시된 **기본 개발 환경 구성**입니다. 운영 환경에서는 Vite 개발 서버 대신 빌드된 정적 파일을 제공하도록 별도 설정 및 검증이 필요합니다.

### 저장소 구성 예시

```text
workspace/
├── earth-power-n3/         # React 애플리케이션 소스
└── nginx-vite-tomcat-env/  # Nginx / Vite / Tomcat / Docker Compose
```

인프라 저장소의 `.env`에서 개발용 React 소스 경로를 연결합니다.

```dotenv
WEB_UI_SOURCE_PATH=../earth-power-n3
```

이 설정은 두 저장소가 위 예시처럼 나란히 있는 경우에 해당합니다.

### 개발 서버 실행

```powershell
cd nginx-vite-tomcat-env
Copy-Item .env.example .env
# .env 파일의 WEB_UI_SOURCE_PATH를 실제 earth-power-n3 경로로 설정
docker compose -f docker-compose.dev.no-reference.yml config
docker compose -f docker-compose.dev.no-reference.yml up --build -d
docker compose -f docker-compose.dev.no-reference.yml ps
```

개발 환경의 기본 접속 주소는 `http://localhost:8080`(Nginx), `http://localhost:8183`(Dev Vite), `http://localhost:18080`(Tomcat 상태 확인)입니다. 실제 접속 가능 여부는 컨테이너 기동 및 환경 설정에 따라 달라집니다.

API 경로는 Nginx의 `/api/*` 프록시를 기준으로 연동합니다. 기존 프론트엔드 환경 설정 및 별도 API 대상 서버를 사용하는 경우, 프록시 대상과 HTTPS 인증서 신뢰 설정의 일치 여부를 검증해야 합니다.

## 5. 로컬 개발 및 검증

React 프로젝트 디렉터리에서 다음 명령으로 개발하거나 검증할 수 있습니다.

```powershell
npm install
npm run dev
npm run lint
npm run build
```

의존성 설치 시 기존 lockfile 및 선택한 패키지 매니저의 일관성을 유지합니다. Docker Compose 기반 개발 서버를 사용할 때에는 인프라 저장소에서 Vite를 실행하므로 로컬 Vite 서버를 중복 실행할 필요가 없습니다.

## 6. Vibe Coding 작업 원칙

1. **요구사항 정의**: UI 구조, 기능, 입력·출력 및 완료 기준을 명시합니다.
2. **AI 코드 생성**: 화면 또는 기능 단위로 작은 변경을 생성합니다.
3. **개발자 검토**: 컴포넌트 책임, 타입 안정성, 접근성, 오류 처리 및 보안을 확인합니다.
4. **품질 검증**: lint·build 결과와 실제 브라우저 동작을 확인합니다.
5. **개선 및 기록**: 변경 목적, 검증 결과 및 미해결 사항을 기록합니다.

AI 생성 결과를 그대로 완성품으로 간주하지 않으며, 기능 완성 여부는 실제 코드와 테스트 결과를 기준으로 판단합니다.

## 7. 관련 저장소

- **React 개발 프로젝트**: [withlionbuddha/earth-power-n3](https://github.com/withlionbuddha/earth-power-n3)
- **서버 구성 재사용**: [withlionbuddha/nginx-vite-tomcat-env](https://github.com/withlionbuddha/nginx-vite-tomcat-env)

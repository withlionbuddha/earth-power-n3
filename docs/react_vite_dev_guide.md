# React + Vite + TypeScript 

## 1. 개요

React는 UI 라이브러리, Vite는 프런트엔드 개발 서버 및 빌드 도구, TypeScript는 JavaScript에 정적 타입 검사를 추가하는 언어입니다. 
Nginx는 이들과 별개로 웹 서버 및 리버스 프록시 역할을 수행합니다.

아래 구조는 React + Vite + TypeScript 프로젝트의 일반적인 예시입니다. 
실제 사용 프레임워크와 패키지 버전은 `package.json`을 확인해야 확정할 수 있습니다.

```text
react-vite/
├── public/                 # 변환 없이 제공하는 정적 파일
├── src/                    # React 애플리케이션 소스
├── .gitignore              # Git 추적 제외 규칙
├── eslint.config.js        # ESLint 정적 검사 규칙
├── index.html              # HTML 진입점
├── package.json            # 패키지 의존성 및 실행 명령
├── package-lock.json       # npm 의존성 잠금 파일
├── tsconfig.app.json       # 브라우저 애플리케이션 타입 검사 설정
├── tsconfig.json           # TypeScript 프로젝트 참조 구성
├── tsconfig.node.json      # Vite 설정 등 Node.js 측 코드 타입 검사
└── vite.config.ts          # Vite 서버·플러그인·빌드 설정
```

## 2. 디렉터리

### `public/` — 정적 리소스

파일을 Vite의 일반적인 모듈 변환·해시 처리 없이 그대로 제공합니다. 예: `favicon.ico`, `robots.txt`, 이미지, 폰트.

```text
public/
├── favicon.ico
└── images/
    └── logo.png
```

```tsx
export default function Logo() {
  return <img src="/images/logo.png" alt="Logo" />;
}
```

`public/images/logo.png`는 개발 중 `/images/logo.png`로 접근하며, 기본 빌드에서는 `dist/`로 복사됩니다. `src/assets/`에서 `import`한 파일은 Vite의 자산 처리 및 빌드 시 파일명 해시 대상이 될 수 있습니다.

### `src/` — 애플리케이션 소스

```text
src/
├── assets/           # import하는 이미지 등
├── components/       # 재사용 UI
├── pages/            # 화면 단위 컴포넌트(선택)
├── hooks/            # 커스텀 React Hooks(선택)
├── services/         # 백엔드 API 호출(선택)
├── types/            # 공통 타입(선택)
├── App.tsx           # 최상위 UI 컴포넌트
├── main.tsx          # React 초기화
└── index.css         # 전역 스타일(선택)
```

`components/`, `pages/`, `hooks/`, `services/`, `types/`는 권장 분류 예시이며 Vite 필수 디렉터리는 아닙니다.

```tsx
// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode><App /></React.StrictMode>
);
```

## 3. 루트 파일

### `.gitignore` — 버전 관리 제외

```gitignore
node_modules/
dist/
.env.local
*.log
```

이미 Git에서 추적 중인 파일은 `.gitignore`만 추가해도 자동으로 추적 해제되지 않습니다.

### `eslint.config.js` — 코드 정적 검사

ESLint는 코드 품질과 잠재적 오류를 검사합니다. 예를 들어 사용하지 않는 변수나 React Hooks 규칙 위반 등을 검사하도록 구성할 수 있습니다. 컴파일러 또는 Vite 자체를 대체하지 않습니다.

```js
// 설명용 최소 예시: 실제 React/TypeScript 프로젝트는 플러그인 구성이 추가될 수 있음
export default [
  { rules: { 'no-console': 'warn' } }
];
```

`npm run lint`는 `package.json`에 `lint` 스크립트가 있을 때 실행됩니다.

### `index.html` — 브라우저 진입점

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React Application</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

브라우저는 `index.html`을 받고, Vite가 처리한 `main.tsx` 모듈을 실행하며, React가 `#root`에 `App`을 렌더링합니다.

### `package.json` — 의존성 및 실행 명령

Java/Maven의 `pom.xml`과 프로젝트 메타데이터·의존성 선언 측면에서 유사하지만, npm과 Maven의 빌드 체계는 다릅니다.

```json
{
  "name": "react-vite-app",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "lint": "eslint ."
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "vite": "^7.0.0",
    "typescript": "~5.8.0",
    "eslint": "^9.0.0"
  }
}
```

버전과 스크립트는 설명용 예시이며 실제 프로젝트 구성과 다를 수 있습니다. `dependencies`는 애플리케이션 실행에 필요한 패키지, `devDependencies`는 주로 개발·검사·빌드 도구를 기록합니다.

| 명령 | 역할 |
|---|---|
| `npm install` | 의존성 설치 또는 갱신 |
| `npm ci` | 잠금 파일 기준으로 재현 가능한 설치; 불일치 시 실패 |
| `npm run dev` | Vite 개발 서버 실행 |
| `npm run build` | 예시 스크립트 기준 TypeScript 검사 후 프로덕션 빌드 |
| `npm run preview` | 빌드 결과 로컬 미리보기(운영 서버 대체용 아님) |
| `npm run lint` | ESLint 실행(스크립트 정의 시) |

### `package-lock.json` — npm 설치 버전 고정

`package.json`이 허용 버전 범위를 정의할 수 있는 반면, `package-lock.json`은 실제 선택된 의존성 버전과 무결성 정보 등을 기록합니다. npm 사용 프로젝트에서는 일반적으로 Git에 포함합니다. `yarn.lock`이 함께 존재한다면 실제 사용하는 패키지 관리자에 맞춰 잠금 파일을 정리하되, 팀·CI 설정 확인 후 삭제합니다.

### `tsconfig.json` — TypeScript 프로젝트 구성

Vite 템플릿에서 프로젝트 참조를 연결하는 형태의 예시입니다.

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}
```

### `tsconfig.app.json` — 브라우저 측 타입 검사

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "noEmit": true
  },
  "include": ["src"]
}
```

- `lib`: 브라우저 DOM 등을 포함한 타입 정의
- `jsx`: React JSX 변환 방식
- `strict`: 엄격한 타입 검사
- `noEmit`: TypeScript가 출력 파일을 직접 만들지 않음; 번들은 Vite가 생성

### `tsconfig.node.json` — 개발 도구 측 타입 검사

```json
{
  "compilerOptions": {
    "target": "ES2023",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "noEmit": true
  },
  "include": ["vite.config.ts"]
}
```

브라우저에서 실행되는 `src/`와 Node.js 환경에서 실행되는 Vite 설정 코드는 사용하는 API와 타입 환경이 달라 분리할 수 있습니다. 위 코드는 개념 설명용이며 실제 템플릿에서는 `composite`, `tsBuildInfoFile` 등의 옵션이 추가될 수 있습니다.

### `vite.config.ts` — 개발 서버 및 빌드 설정

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true
  },
  build: { outDir: 'dist' }
});
```

`@vitejs/plugin-react` 설치가 필요합니다. `host: '0.0.0.0'`은 컨테이너 내부에서 다른 컨테이너의 접근을 받을 때 유용하며, 외부 공개 여부는 Docker 네트워크·포트 게시 설정에 따라 달라집니다.

| 설정 | 역할 |
|---|---|
| `plugins` | React 등 플러그인 등록 |
| `server.host` | 개발 서버 수신 인터페이스 |
| `server.port` | 개발 서버 포트 |
| `server.strictPort` | 지정 포트 사용 불가 시 실패 |
| `server.proxy` | 개발 API 요청 프록시 |
| `server.hmr` | HMR 연결 설정 |
| `base` | 애플리케이션 기본 URL 경로 |
| `build.outDir` | 빌드 출력 경로 |

## 4. Nginx + Dev Vite 구성

개발 환경에서 Nginx를 단일 진입점으로 사용하고, Vite 서버를 별도 컨테이너로 실행할 수 있습니다.

```text
브라우저
   │
   ▼
Nginx (리버스 프록시)
   ├── /            → Dev Vite :5173
   └── /api/        → Spring Boot/Tomcat :8080
```

위 경로는 **설계 예시**입니다.  HMR을 유지하려면 WebSocket 업그레이드 전달 및 필요시 `server.hmr` 설정도 맞춰야 합니다.

일반적으로 외부 공개는 Nginx에 집중하고 Vite는 내부 네트워크에서 통신하도록 구성합니다.

### 개발 시 요청 흐름

1. 브라우저가 Nginx에 HTTP 요청을 보냅니다.
2. Nginx가 경로에 따라 Dev 또는 Reference Vite로 요청을 전달합니다.
3. Vite가 `index.html`과 변환된 모듈을 제공합니다.
4. `src/main.tsx`가 실행되고 React가 화면을 렌더링합니다.
5. 코드 변경 시 Vite HMR이 가능한 변경을 브라우저에 반영합니다.

### 운영 빌드와의 차이

개발 중에는 Vite 개발 서버가 모듈을 제공하지만, 운영에서는 일반적으로 `npm run build`로 생성한 `dist/` 정적 파일을 Nginx에서 직접 제공합니다. 운영 환경에 Vite 개발 서버를 그대로 배포할 필요는 없습니다.

## 5. Maven/Spring Boot와 역할 비교

| Java/Spring Boot | React + Vite | 비교 기준 |
|---|---|---|
| `pom.xml` | `package.json` | 프로젝트 정보 및 의존성 선언 |
| Maven 의존성 해석 | `package-lock.json` | 설치 버전 재현성(구현 방식은 다름) |
| `src/main/java` | `src/` | 애플리케이션 소스 |
| `src/main/resources/static` | `public/` | 정적 리소스 |
| Maven 컴파일·빌드 설정 | TypeScript 설정 + Vite | 타입 검사 및 번들 빌드 |
| Checkstyle/PMD | ESLint | 정적 코드 검사 |
| `target/` | `dist/` | 빌드 결과 |
| `.m2/repository` | `node_modules/` | 의존성 저장(구조와 동작은 다름) |

## 6. 삭제·유지 판단

| 파일·디렉터리 | 권장 판단 |
|---|---|
| `node_modules/` | 재설치 가능, Git 제외; 개발 중에는 필요 |
| `public/` | 정적 파일을 사용하지 않으면 삭제 가능 |
| `src/` | 유지 |
| `.gitignore` | 유지 |
| `eslint.config.js` | ESLint 미사용 시 설정·스크립트 확인 후 제거 가능 |
| `index.html` | 기본 Vite 앱에서는 유지 |
| `package.json` | 유지 |
| `package-lock.json` | npm 사용 시 유지 |
| `tsconfig*.json` | 현재 TypeScript 빌드 구성에 따라 유지 |
| `vite.config.ts` | 설정이 필요한 프로젝트에서는 유지 권장 |
| `README.md` | 문서화 용도로 유지 권장 |
| `yarn.lock` | npm만 사용한다면 팀·CI 확인 후 제거 가능 |

## 7. 핵심 정리

- **`package.json`**: 프로젝트·패키지·실행 스크립트 정의
- **`vite.config.ts`**: Vite 개발 서버, 프록시, HMR, 빌드 설정
- **`tsconfig*.json`**: TypeScript 프로젝트 구성과 타입 검사
- **`index.html`**: 브라우저 진입점
- **`src/`**: React 애플리케이션 구현
- **`public/`**: 변환 없이 제공할 정적 파일
- **Nginx**: Vite와 별개인 웹 서버/리버스 프록시


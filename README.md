# earth-power-n3

## 프로젝트 개요

**earth-power-n3**는 Nginx 웹 서버를 기반으로 React + Vite + TypeScript FrontEnd 개발 환경을 구성한 프로젝트입니다.

Nginx를 리버스 프록시(Reverse Proxy)로 사용하여 Vite 개발 서버로 HTTP 요청을 전달하고, Vite의 Hot Module Replacement(HMR)를 통해 소스코드 변경 사항을 브라우저에 반영하는 것을 목표로 합니다.

## 기술 스택

| 기술             | 역할                  |
| -------------- | ------------------- |
| Nginx          | 웹 서버 및 리버스 프록시      |
| React          | 사용자 인터페이스 개발        |
| Vite           | 프런트엔드 개발 서버 및 빌드 도구 |
| TypeScript     | 정적 타입 기반 애플리케이션 개발  |
| Node.js        | 프런트엔드 개발 도구 실행 환경   |
| npm            | 패키지 및 의존성 관리        |
| Docker         | 개발 환경 컨테이너화         |
| Docker Compose | 컨테이너 서비스 구성 및 실행    |

## 개발 환경 아키텍처

```text
Browser
   │
   ▼
Nginx
   │
   ├── Dev Vite
   │      └── React + TypeScript
   │
   └── Reference Vite
          └── React + TypeScript
```

Nginx는 클라이언트 요청을 각 Vite 개발 서버로 전달합니다.

Vite는 React 애플리케이션의 개발 서버를 제공하며, HMR을 통해 변경된 모듈을 브라우저에 반영합니다.

## 주요 구성

- Nginx 기반 리버스 프록시
- React + Vite + TypeScript 개발 환경
- Dev Vite와 Reference Vite 개발 서버 분리
- Vite HMR 지원
- Docker 기반 개발 환경 구성




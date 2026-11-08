# Earth Power N3 → N4 로그인 연동

N4 ground의 AuthController를 기준으로 작성했습니다.

- `POST /api/auth/login`: JSON `{"username":"...","password":"..."}`, AccessResponse(`accessToken`, `accessExpiresIn`).
- `POST /api/auth/refresh`: 요청 body 없음, 서버 HttpOnly Refresh 쿠키 필요.
- `POST /api/auth/logout`: 요청 body 없음, HTTP 204.
- 보호 API: `Authorization: Bearer <accessToken>`.

## 토큰 보관과 요청 처리
Access JWT는 서비스 모듈의 JavaScript 변수에만 보관합니다. Refresh JWT는 서버에서 발급하는 `__Host-refresh_token` HttpOnly, Secure, SameSite=Strict 쿠키이며 JavaScript에서 조회하거나 수동 생성하지 않습니다. 새로고침 시 Access가 사라지면 Refresh로 갱신하고, 동시에 발생하는 갱신 요청은 하나로 합칩니다. 보호 API의 401 응답은 한 번만 갱신·재시도합니다.

## 개발 접속
`.env.example`을 `.env.local`로 복사하고 N4 HTTPS 접속 주소를 `N4_API_TARGET`에 설정합니다. Vite 프록시가 브라우저의 `/api` 요청을 N4로 전달합니다. 브라우저는 Vite가 노출한 **HTTPS 주소**로 접속해야 합니다. 서버에서 `AUTH_ALLOWED_ORIGIN`은 해당 브라우저 Origin(프로토콜 + 호스트 + 포트)과 일치해야 합니다. N4가 쿠키를 발급하므로 반드시 HTTPS 브라우저 Origin으로 접속합니다.

리버스 프록시 Nginx를 사용하는 경우 브라우저는 같은 출처의 `/api`로만 요청하고, Nginx가 N4 HTTPS Tomcat(8181)으로 전달하도록 설정합니다. 개발·운영 모두 브라우저에서는 동일한 URL 경로를 사용합니다. Nginx가 HTTP Origin과 Set-Cookie를 변경하지 않도록 구성해야 합니다.

N4 JWT 시크릿, 계정 비밀번호, Redis 비밀번호, 키스토어 암호는 N3의 VITE_ 환경변수에 저장하지 않습니다. 개발용 내부 CA 인증서를 Node 프로세스에 신뢰시키려면 `NODE_EXTRA_CA_CERTS`를 사용합니다. `secure: false` 같은 인증서 검증 비활성화 설정은 사용하지 않습니다.

## 현재 UI 연결 범위
하단 로그인 UI는 현재 Login ID 입력칸 하나만 존재합니다. N4 로그인에는 username과 password 두 값이 필수이므로, 비밀번호 입력 UI 및 사용자 요청 흐름이 준비되어야 실제 로그인 호출이 가능합니다. 서비스를 임의의 기본 계정이나 암호로 호출하지 않습니다.

`src/services/authService.ts`의 `login({username,password})`, `refreshAccess()`, `logout()`을 화면 또는 hook에서 호출합니다. `src/services/http.ts`의 `apiRequest<T>()`는 보호 API에서 사용합니다.

### 주의
N4의 `AuthController.requireAllowedOrigin()`은 로그인·갱신·로그아웃 요청에 Origin이 없거나 일치하지 않으면 거부합니다. 실제 통합 환경에서 403이 발생하면 브라우저 Origin과 N4 `AUTH_ALLOWED_ORIGIN`을 먼저 점검하십시오.

실제 Tomcat·Redis 연결 및 브라우저 통합 검증은 별도 수행해야 합니다.

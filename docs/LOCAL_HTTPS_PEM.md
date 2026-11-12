# 로컬 HTTPS PEM 인증서 생성 및 Nginx 연결

## 확인된 서버 구성

서버 구성은 [nginx-vite-tomcat-env](https://github.com/withlionbuddha/nginx-vite-tomcat-env)를 재사용합니다. 현재 `docker-compose.dev.yml`과 `.env.example` 기준으로 Nginx HTTP는 호스트 80, HTTPS는 443, Vite는 83, Tomcat은 호스트 8080/컨테이너 8080입니다. HTTP 요청은 HTTPS로 리디렉션됩니다. Reference Vite는 이 프로젝트의 사용 대상에서 제외합니다.

## 1. OpenSSL로 PEM 인증서 생성

OpenSSL이 설치된 PowerShell에서 인프라 저장소 루트로 이동한 후 실행합니다.

```powershell
openssl version
New-Item -ItemType Directory -Force .offline | Out-Null
openssl req -x509 -newkey rsa:3072 -sha256 -nodes `
  -keyout .offline/server.key `
  -out .offline/fullchain.crt `
  -days 30 `
  -subj "/CN=localhost" `
  -addext "subjectAltName=DNS:localhost,IP:127.0.0.1"
```

`fullchain.crt`는 PEM 형식의 자체 서명 인증서이며 `server.key`는 PEM 형식의 개인키입니다. 파일 확장자가 `.pem`이 아니어도 PEM 형식을 사용할 수 있습니다. 이 예시의 `fullchain.crt`는 중간 인증서가 포함되지 않은 단일 인증서입니다. `-nodes`로 생성한 개인키는 암호화되지 않으므로 접근을 제한하고 Git에 올리지 마십시오.

```powershell
openssl x509 -in .offline/fullchain.crt -noout -subject -dates -ext subjectAltName
openssl pkey -in .offline/server.key -check -noout
```

자체 서명 인증서는 브라우저에서 기본적으로 신뢰되지 않습니다. 로컬 개발에서는 신뢰할 수 있는 개발용 CA를 사용하는 mkcert 방식도 고려할 수 있습니다. 인증서 경고를 우회하거나 TLS 검증을 끄는 방식은 권장하지 않습니다.

## 2. Docker Compose 연결

인프라 저장소의 `.env`에서 실제 로컬 경로를 지정합니다.

```dotenv
SSL_SOURCE_DIR_PATH=F:/project.earth.power/nginx-vite-tomcat-env/.offline
SSL_TARGET_DIR_PATH=/etc/nginx/ssl
NGINX_HOST_PORT=80
NGINX_HOST_SSL_PORT=443
FRONTWAS_HOST_PORT=8080
WEB_UI_SOURCE_PATH=F:/project.earth.power/workspace-n3/earth-power-n3
```

경로는 예시입니다. 실제 설치 위치로 변경하십시오. 현재 인프라 저장소의 Nginx 템플릿 `nginx/default.env.dev.conf`는 `SSL_CERT_PATH`, `SSL_KEY_PATH`, `SERVER_NAME` 값을 참조합니다. `nginx/nginx.env`에서 이 값이 설정되어 있는지 확인하고, 생성한 파일을 사용할 경우 아래와 일치시킵니다.

```dotenv
SSL_CERT_PATH=/etc/nginx/ssl/fullchain.crt
SSL_KEY_PATH=/etc/nginx/ssl/server.key
SERVER_NAME=localhost
```

인프라 저장소의 `docker-compose.dev.yml`은 인증서 디렉터리를 Nginx 컨테이너에 읽기 전용으로 마운트합니다. 파일이 실제로 존재해야 Nginx가 인증서를 읽을 수 있습니다.

## 3. 서버 기동 및 검증

```powershell
docker compose -f docker-compose.dev.yml config
docker compose -f docker-compose.dev.yml up --build -d
docker compose -f docker-compose.dev.yml ps
docker compose -f docker-compose.dev.yml logs --tail=100 nginx-staticweb
```

브라우저에서 `https://localhost`에 접속합니다. `http://localhost`는 HTTPS로 리디렉션되어야 합니다. Tomcat 직접 접속 주소는 `http://localhost:8080`이며, `18080`은 현재 기본값이 아닙니다. 실제 기동 여부는 실행 환경에서 검증해야 합니다.

## 4. 보안 주의사항

- `.offline/` 및 개인키 파일을 Git에서 제외하고, `.gitignore` 규칙을 확인합니다.
- 로컬 자체 서명 인증서는 공인 운영 인증서의 대체품이 아닙니다.
- TLS는 Nginx에서 종료됩니다. Nginx에서 Tomcat/Vite로의 내부 프록시는 별도 HTTPS 설정이 없는 한 HTTP입니다.
- 실제 인증서 경로 및 환경 변수는 인프라 저장소 설정과 일치해야 합니다.

참고: [OpenSSL req](https://docs.openssl.org/master/man1/openssl-req/), [Nginx HTTPS](https://nginx.org/en/docs/http/configuring_https_servers.html)
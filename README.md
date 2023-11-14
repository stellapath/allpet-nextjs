## 초기 설정

### 필요

- VSCode
- Docker, Docker Compose

### 설정 방법

1. VSCode에서 해당 프로젝트 폴더를 엽니다.
2. VSCode에서 `Dev Containers` 확장을 설치합니다.
3. `Shift+Ctrl+P` 또는 `F1`키를 눌러 명령 팔레트를 열고 `Dev Containers: Reopen in Container`를 선택합니다.

### DB 설정

`npx prisma db push` 명령을 실행하면 `schema.prisma`에 선언된 스키마가 DB에 반영됩니다.

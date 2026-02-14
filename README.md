# Valentine Next.js Site

핵심 파일:
- `/Users/sionjeon/wybmv/app/page.tsx`

## 반영된 기능
1. 시작 화면
- Valentine countdown 표시
- 이름 입력 + `Create Valentine Link` 버튼
- 상단 네비게이션(`Main Page`, `Create Link`, `GitHub`)

2. 링크 생성 화면
- 공유용 Valentine 링크 생성: `/?from=이름&id=랜덤ID`
- `Copy` 버튼
- `Preview Link` 버튼

3. 받은 사람 화면 (`?from=...` 접속)
- 상단 문구: `Hey there! {name} has a question for you...`
- `No` 4단계 Tenor GIF
- `Yes` 성공 Tenor GIF
- `No` 클릭할수록 `Yes` 커짐, `No` 작아짐
- 마지막 단계에서 `No` 버튼 도망
- `Yes` 이후 `Restart` 버튼으로 다시하기

## 실행
```bash
cd /Users/sionjeon/wybmv
npm install
npm run dev
```
브라우저: `http://localhost:3000`

## 참고
- Tenor 임베드 스크립트를 사용하므로 인터넷 연결이 필요합니다.
- GitHub 버튼 주소는 `/Users/sionjeon/wybmv/app/page.tsx`의 `githubUrl` 값을 수정하면 됩니다.

# 📝 Memo Web Application
https://dugout.kro.kr/memo
<div>
  <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" />
  <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white" />
  <img src="https://img.shields.io/badge/Zustand-000000?style=for-the-badge&logo=react" />
</div>

## 소개

메모를 작성, 수정, 삭제할 수 있는 웹 애플리케이션입니다.</br>
사용자는 페이지 이동 없이 하나의 화면에서 간편하게 메모를 관리할 수 있습니다.</br>
반응형 디자인을 지원하여 모바일, 태블릿, 데스크탑 환경에서 최적화된 UI를 제공합니다.

## 기능

- **메모 추가**: 제목과 내용을 입력하여 새로운 메모를 추가할 수 있습니다.
- **메모 수정**: 기존에 작성한 메모를 수정할 수 있습니다.
- **메모 삭제**: 메모를 삭제할 수 있습니다.
- **메모 목록**: 작성된 메모들을 리스트로 보여줍니다.
- **메모 상세 보기**: 각 메모의 세부 정보를 확인할 수 있습니다.

## 개발 기간

2025년 3월 19일 ~ 3월 25일

## 기술 스택

- **React**: 프론트엔드 라이브러리로 사용하였습니다.
- **TypeScript**: 타입을 지정함으로써 오류를 사전에 방지하고, 자동 완성 및 타입 검사 기능을 활용하기 위해 사용하였습니다.
- **Vite**: 빠른 빌드와 개발 환경을 제공하는 번들러입니다. 개인 서버에서 테스트 해보기 위해 사용하였습니다.
- **Material-UI**: 이미 디자인된 다양한 컴포넌트를 이용하여 UI를 빠르게 구성하고, 디자인의 일관성을 유지하기 위해 사용하였습니다.
- **Zustand**: 보일러 플레이트가 적어 코드가 간결하고, 다른 상태 관리 라이브러리에 비해 성능이 우수하여 사용하였습니다.

## 프로젝트 구조

```
📦src
 ┣ 📂assets
 ┃ ┣ 📂fonts
 ┃ ┃ ┣ 📜Pretendard-Bold.woff2
 ┃ ┃ ┣ 📜Pretendard-ExtraBold.woff2
 ┃ ┃ ┣ 📜Pretendard-Medium.woff2
 ┃ ┃ ┗ 📜Pretendard-Regular.woff2
 ┃ ┗ 📂images
 ┃ ┃ ┗ 📜favicon.png
 ┣ 📂components
 ┃ ┣ 📂memo
 ┃ ┃ ┣ 📜MemoContent.tsx
 ┃ ┃ ┣ 📜MemoDate.tsx
 ┃ ┃ ┣ 📜MemoItem.tsx
 ┃ ┃ ┗ 📜MemoTitle.tsx
 ┃ ┗ 📂modal
 ┃ ┃ ┣ 📜DialogModal.tsx
 ┃ ┃ ┗ 📜MemoModal.tsx
 ┣ 📂context
 ┃ ┣ 📜ModalContext.tsx
 ┃ ┗ 📜ModalProvider.tsx
 ┣ 📂hooks
 ┃ ┗ 📜useModal.ts
 ┣ 📂layouts
 ┃ ┣ 📜Header.tsx
 ┃ ┗ 📜Layout.tsx
 ┣ 📂pages
 ┃ ┗ 📜List.tsx
 ┣ 📂routes
 ┃ ┗ 📜Router.tsx
 ┣ 📂stores
 ┃ ┗ 📜memo.ts
 ┣ 📂styles
 ┃ ┣ 📜global.css
 ┃ ┗ 📜theme.ts
 ┣ 📜App.tsx
 ┣ 📜main.tsx
 ┗ 📜vite-env.d.ts
```

## 상태 관리

메모 상태와 공통 모달 상태를 각각 다른 방식으로 관리하였습니다.</br>
각 상태의 특성과 목적에 맞게 Zustand와 Context API를 활용하여 효율적으로 관리하였습니다.

> ### 상태 관리를 분리한 이유


> #### 메모는 
> - 애플리케이션 전반에서 공유되며, 비교적 장기간 유지되는 상태입니다.</br>
> - 메모 목록은 페이지 간 이동이 있더라도 유지되어야 합니다.</br>
> - 상태가 변경될 때 최적화된 렌더링 성능이 필요합니다.
> #### 따라서 불필요한 리렌더링 없이 전역 상태를 관리할 수 있는 Zustand를 사용하였습니다.

> #### 모달은
> - 일시적이며 UI적인 상태이므로, 전역 상태 관리 라이브러리를 사용할 필요가 없습니다.</br>
> - 모달은 특정 이벤트(버튼 클릭 등)에서 단기적으로 열리고 닫히는 상태입니다.</br>
> - 메모와 다르게 페이지가 바뀌거나 리프레시될 때 유지할 필요가 없습니다.</br>
> #### 따라서 모달처럼 UI 중심의 상태를 관리하기에 적절한 Context API를 사용하였습니다.


**1. 메모**
- 필요한 컴포넌트만 업데이트 될 수 있도록 Zustand를 사용하였습니다.
- 로컬 스토리지를 사용하여 브라우저를 종료하더라도 유지할 수 있도록 하였습니다.

**2. 모달**
- Context API와 Custom Hook을 사용하였습니다.
- 모달을 중앙에서 한 번만 정의하고, 필요한 곳에서 모달을 제어하는 함수를 호출하여 사용할 수 있도록 선언형 방식으로 관리하였습니다.

## 설치 방법

1. **저장소 클론 후 프로젝트 폴더로 이동**

   ```bash
   git clone https://github.com/bonyoungkoo/memo.git
   
   cd memo
   
2. **패키지 설치**
   ```bash
   npm i

3. **로컬 서버 실행**
   ```bash
   npm run dev
4. **로컬 호스트 기본 포트로 접속**
   </br>
   <http://localhost:5173>

import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route
} from "@react-router/dev/routes";

const routes: RouteConfig = [
  // I. 홈
  index("common/pages/home-page.tsx"),

  // II. 계산기
  ...prefix("/calculator", [
    route("/balance", "features/calculator/pages/balance-page.tsx"), // 잔금 계산기
    route("/earnings", "features/calculator/pages/earnings-page.tsx") // 수익률 계산기
  ]),

  // III. 분양
  ...prefix("/sale", [
    route("/kic", "features/sale/pages/kic-page.tsx"), // 지식산업센터
    route("/office", "features/sale/pages/office-page.tsx"), // 오피스빌딩
    route("/plaza", "features/sale/pages/plaza-page.tsx"), // 프라자상가
    route("/officetel", "features/sale/pages/officetel-page.tsx"), // 오피스텔
    route("/living", "features/sale/pages/living-page.tsx"), // 생활형숙박
    route("/hotel", "features/sale/pages/hotel-page.tsx") // 콘도/호텔
  ]),

  // IV. 매매/전매
  ...prefix("/resale", [
    route("/sell", "features/resale/pages/sell-page.tsx"), // 팔아요
    route("/buy", "features/resale/pages/buy-page.tsx") // 찾아요
  ]),

  // V. 임차 확정
  ...prefix("/confirmation", [
    route("/here", "features/confirmation/pages/here-page.tsx"), // 있어요
    route("/look", "features/confirmation/pages/look-page.tsx") // 구해요
  ]),

  // VI. 구인/구직
  ...prefix("/recruit", [
    route("/people", "features/recruit/pages/people-page.tsx"), // 분양인 오세요
    route("/site", "features/recruit/pages/site-page.tsx") // 분양현장 찾아요
  ]),

  // VII. 회원가입/로그인/프로필
  ...prefix("/auth", [
    layout("features/auth/layouts/auth-layout.tsx", [
      index("features/auth/pages/auth-page.tsx"),
      route("/login", "features/auth/pages/login-page.tsx"),
      route("/join", "features/auth/pages/join-page.tsx"),
      ...prefix("/otp", [
        route("/start", "features/auth/pages/otp-start-page.tsx"),
        route("/complete", "features/auth/pages/otp-complete-page.tsx")
      ]),
      ...prefix("/social/:provider", [
        route("/start", "features/auth/pages/social-start-page.tsx"),
        route("/complete", "features/auth/pages/social-complete-page.tsx")
      ])
    ]),
    route("/logout", "features/auth/pages/logout-page.tsx")
  ]),
  ...prefix("/my", [
    route("/dash", "features/users/pages/dashboard-page.tsx"),
    route("/notification", "features/users/pages/notifications-page.tsx"),
    route("/setting", "features/users/pages/settings-page.tsx"),
    route("/profile", "features/users/pages/profile-page.tsx")
    // ...기타 프로필 관련
  ]),

  // VIII. 서비스 (예시)
  ...prefix("/service", [
    route("/1", "features/service/pages/service1-page.tsx"),
    route("/2", "features/service/pages/service2-page.tsx")
  ]),

  // IX. 고객 지원
  ...prefix("/support", [
    route("/faq", "features/community/pages/faq-page.tsx"), // FAQ
    route("/contact", "features/community/pages/contact-page.tsx") // 문의하기
  ])
];

export default routes;

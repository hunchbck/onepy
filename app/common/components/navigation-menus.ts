export interface NavigationMenuItem {
  name: string;
  to: string;
  description?: string;
}

export interface NavigationMenu {
  name: string;
  to: string;
  items?: NavigationMenuItem[];
}

export const navigationMenus: NavigationMenu[] = [
  {
    name: "대시보드",
    to: "/dashboard",
  },
  {
    name: "조직 관리",
    to: "/orgs",
    items: [
      {
        name: "조직도",
        description: "조직도 시각화 및 관리",
        to: "/orgs/structure",
      },
      {
        name: "멤버 초대",
        description: "조직 멤버 초대 및 권한 설정",
        to: "/orgs/invite",
      },
    ],
  },
  {
    name: "분양 관리",
    to: "/projects",
    items: [
      {
        name: "분양 단지 목록",
        description: "분양 단지 리스트",
        to: "/projects/list",
      },
      {
        name: "계약 관리",
        description: "계약 현황 및 관리",
        to: "/projects/contracts",
      },
    ],
  },
  {
    name: "마이페이지",
    to: "/mypage",
  },
];

import { Link } from "react-router";
import { Separator } from "~/common/components/ui/separator";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { cn } from "~/lib/utils";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  BarChart3Icon,
  BellIcon,
  LogOutIcon,
  MessageCircleIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";

const menus = [
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
      {
        name: "분양 현황판",
        description: "호실별 분양 현황 및 공유",
        to: "/projects/status",
      },
    ],
  },
  {
    name: "상품 등록",
    to: "/products",
    items: [
      {
        name: "현장 등록",
        description: "분양/전매/매매/임대 현장 등록",
        to: "/products/submit",
      },
      {
        name: "내 상품 목록",
        description: "내가 등록한 현장/상품 목록",
        to: "/products/my",
      },
      {
        name: "공유 상품",
        description: "다른 회원과 공유된 상품",
        to: "/products/shared",
      },
    ],
  },
  {
    name: "구인구직",
    to: "/jobs",
    items: [
      {
        name: "구인 공고",
        description: "현장별 구인 공고",
        to: "/jobs/list",
      },
      {
        name: "구직 신청",
        description: "구직자 등록 및 신청",
        to: "/jobs/apply",
      },
    ],
  },
  {
    name: "고객 관리",
    to: "/customers",
    items: [
      {
        name: "고객 목록",
        description: "상담/계약 고객 관리",
        to: "/customers/list",
      },
      {
        name: "상담 이력",
        description: "고객 상담 이력 및 메모",
        to: "/customers/consults",
      },
    ],
  },
  {
    name: "마이페이지",
    to: "/mypage",
    items: [
      {
        name: "내 정보",
        description: "개인 정보 및 명함 관리",
        to: "/mypage/profile",
      },
      {
        name: "알림 설정",
        description: "알림 및 활동 내역",
        to: "/mypage/notifications",
      },
      {
        name: "팔로우/팔로잉",
        description: "팔로우/팔로잉 관리",
        to: "/mypage/follow",
      },
      {
        name: "DM(쪽지)",
        description: "1:1 쪽지함",
        to: "/mypage/dm",
      },
      {
        name: "출석체크",
        description: "GPS 출석체크",
        to: "/mypage/attendance",
      },
      {
        name: "자기소개",
        description: "자기소개 페이지",
        to: "/mypage/about",
      },
    ],
  },
];

export default function Navigation({
  isLoggedIn,
  hasNotifications,
  hasMessages,
}: {
  isLoggedIn: boolean;
  hasNotifications: boolean;
  hasMessages: boolean;
}) {
  return (
    <nav className="flex px-20 h-16 items-center justify-between backdrop-blur fixed top-0 left-0 right-0 z-50 bg-background/50">
      <div className="flex items-center">
        <Link to="/" className="font-bold tracking-tighter text-lg">
          wemake
        </Link>
        <Separator orientation="vertical" className="h-6 mx-4" />
        <NavigationMenu>
          <NavigationMenuList>
            {menus.map((menu) => (
              <NavigationMenuItem key={menu.name}>
                {menu.items ? (
                  <>
                    <Link to={menu.to}>
                      <NavigationMenuTrigger>{menu.name}</NavigationMenuTrigger>
                    </Link>
                    <NavigationMenuContent>
                      <ul className="grid w-[600px] font-light gap-3 p-4 grid-cols-2">
                        {menu.items?.map((item) => (
                          <NavigationMenuItem
                            key={item.to}
                            className={cn([
                              "select-none rounded-md transition-colors focus:bg-accent  hover:bg-accent",
                              (item.to === "/products/promote" ||
                                item.to === "/jobs/submit") &&
                                "col-span-2 bg-primary/10 hover:bg-primary/20 focus:bg-primary/20",
                            ])}
                          >
                            <NavigationMenuLink>
                              <Link
                                className="p-3 space-y-1 block leading-none no-underline outline-none"
                                to={item.to}
                              >
                                <span className="text-sm font-medium leading-none">
                                  {item.name}
                                </span>
                                <p className="text-sm leading-snug text-muted-foreground">
                                  {item.description}
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </NavigationMenuItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <Link className={navigationMenuTriggerStyle()} to={menu.to}>
                    {menu.name}
                  </Link>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      {isLoggedIn ? (
        <div className="flex items-center gap-4">
          <Button size="icon" variant="ghost" asChild className="relative">
            <Link to="/my/notifications">
              <BellIcon className="size-4" />
              {hasNotifications && (
                <div className="absolute top-1.5 right-1.5 size-2 bg-red-500 rounded-full" />
              )}
            </Link>
          </Button>
          <Button size="icon" variant="ghost" asChild className="relative">
            <Link to="/my/messages">
              <MessageCircleIcon className="size-4" />
              {hasMessages && (
                <div className="absolute top-1.5 right-1.5 size-2 bg-red-500 rounded-full" />
              )}
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage src="https://github.com/serranoarevalo.png" />
                <AvatarFallback>N</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel className="flex flex-col">
                <span className="font-medium">John Doe</span>
                <span className="text-xs text-muted-foreground">@username</span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/my/dashboard">
                    <BarChart3Icon className="size-4 mr-2" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/my/profile">
                    <UserIcon className="size-4 mr-2" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/my/settings">
                    <SettingsIcon className="size-4 mr-2" />
                    Settings
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link to="/auth/logout">
                  <LogOutIcon className="size-4 mr-2" />
                  Logout
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <Button asChild variant="secondary">
            <Link to="/auth/login">Login</Link>
          </Button>
          <Button asChild>
            <Link to="/auth/join">Join</Link>
          </Button>
        </div>
      )}
    </nav>
  );
}

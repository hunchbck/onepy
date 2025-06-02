import {
  BarChart3Icon,
  BellIcon,
  LogOutIcon,
  Menu,
  MessageCircleIcon,
  SettingsIcon,
  UserIcon
} from "lucide-react";
import { Link } from "react-router";
import { Separator } from "~/common/components/ui/separator";
import { cn } from "~/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "./ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "./ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const menus = [
  {
    name: "대시보드",
    to: "/dash"
  },
  {
    name: "조직 관리",
    to: "/orgs",
    items: [
      {
        name: "조직도",
        description: "조직도 시각화 및 관리",
        to: "/orgs/structure"
      },
      {
        name: "멤버 초대",
        description: "조직 멤버 초대 및 권한 설정",
        to: "/orgs/invite"
      }
    ]
  },
  {
    name: "분양 관리",
    to: "/projects",
    items: [
      {
        name: "분양 단지 목록",
        description: "분양 단지 리스트",
        to: "/projects/list"
      },
      {
        name: "계약 관리",
        description: "계약 현황 및 관리",
        to: "/projects/contracts"
      },
      {
        name: "분양 현황판",
        description: "호실별 분양 현황 및 공유",
        to: "/projects/status"
      }
    ]
  },
  {
    name: "상품 등록",
    to: "/products",
    items: [
      {
        name: "현장 등록",
        description: "분양/전매/매매/임대 현장 등록",
        to: "/products/submit"
      },
      {
        name: "내 상품 목록",
        description: "내가 등록한 현장/상품 목록",
        to: "/products/my"
      },
      {
        name: "공유 상품",
        description: "다른 회원과 공유된 상품",
        to: "/products/shared"
      }
    ]
  },
  {
    name: "구인구직",
    to: "/jobs",
    items: [
      {
        name: "구인 공고",
        description: "현장별 구인 공고",
        to: "/jobs/list"
      },
      {
        name: "구직 신청",
        description: "구직자 등록 및 신청",
        to: "/jobs/apply"
      }
    ]
  },
  {
    name: "고객 관리",
    to: "/customers",
    items: [
      {
        name: "고객 목록",
        description: "상담/계약 고객 관리",
        to: "/customers/list"
      },
      {
        name: "상담 이력",
        description: "고객 상담 이력 및 메모",
        to: "/customers/consults"
      }
    ]
  },
  {
    name: "마이페이지",
    to: "/my",
    items: [
      {
        name: "내 정보",
        description: "개인 정보 및 명함 관리",
        to: "/my/profile"
      },
      {
        name: "알림 설정",
        description: "알림 및 활동 내역",
        to: "/my/notifications"
      },
      {
        name: "팔로우/팔로잉",
        description: "팔로우/팔로잉 관리",
        to: "/my/follow"
      },
      {
        name: "DM(쪽지)",
        description: "1:1 쪽지함",
        to: "/my/dm"
      },
      {
        name: "출석체크",
        description: "GPS 출석체크",
        to: "/my/attendance"
      },
      {
        name: "자기소개",
        description: "자기소개 페이지",
        to: "/my/about"
      }
    ]
  }
];

export default function Navigation({
  isLoggedIn,
  hasNotifications,
  hasMessages
}: {
  isLoggedIn: boolean;
  hasNotifications: boolean;
  hasMessages: boolean;
}) {
  return (
    <nav className="bg-background/50 fixed top-0 right-0 left-0 z-50 flex h-16 items-center justify-between px-4 backdrop-blur md:px-20">
      <div className="flex items-center">
        <Link to="/" className="text-lg font-bold tracking-tighter">
          wemake
        </Link>
        <Separator
          orientation="vertical"
          className="mx-4 hidden h-6 md:block"
        />
        {/* 데스크탑 메뉴 */}
        <div className="hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList>
              {menus.map((menu) => (
                <NavigationMenuItem key={menu.name}>
                  {menu.items ? (
                    <>
                      <Link to={menu.to}>
                        <NavigationMenuTrigger>
                          {menu.name}
                        </NavigationMenuTrigger>
                      </Link>
                      <NavigationMenuContent>
                        <ul className="grid w-[600px] grid-cols-2 gap-3 p-4 font-light">
                          {menu.items?.map((item) => (
                            <NavigationMenuItem
                              key={item.to}
                              className={cn([
                                "focus:bg-accent hover:bg-accent rounded-md transition-colors select-none",
                                (item.to === "/products/promote" ||
                                  item.to === "/jobs/submit") &&
                                  "bg-primary/10 hover:bg-primary/20 focus:bg-primary/20 col-span-2"
                              ])}
                            >
                              <NavigationMenuLink>
                                <Link
                                  className="block space-y-1 p-3 leading-none no-underline outline-none"
                                  to={item.to}
                                >
                                  <span className="text-sm leading-none font-medium">
                                    {item.name}
                                  </span>
                                  <p className="text-muted-foreground text-sm leading-snug">
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
      </div>
      {/* 모바일 햄버거 메뉴 */}
      <div className="flex items-center md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="ghost">
              <Menu className="size-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-64 p-0">
            <nav className="flex flex-col gap-2 p-4">
              {menus.map((menu) =>
                menu.items ? (
                  <div key={menu.name} className="mb-2">
                    <div className="font-semibold">{menu.name}</div>
                    <div className="ml-2 flex flex-col gap-1">
                      {menu.items.map((item) => (
                        <Link
                          key={item.to}
                          to={item.to}
                          className="text-muted-foreground hover:text-foreground py-1 text-sm"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={menu.to}
                    to={menu.to}
                    className="py-2 font-semibold"
                  >
                    {menu.name}
                  </Link>
                )
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
      {/* 우측 유저/로그인 버튼 (데스크탑) */}
      <div className="hidden items-center gap-4 md:flex">
        {isLoggedIn ? (
          <>
            <Button size="icon" variant="ghost" asChild className="relative">
              <Link to="/my/notifications">
                <BellIcon className="size-4" />
                {hasNotifications && (
                  <div className="absolute top-1.5 right-1.5 size-2 rounded-full bg-red-500" />
                )}
              </Link>
            </Button>
            <Button size="icon" variant="ghost" asChild className="relative">
              <Link to="/my/messages">
                <MessageCircleIcon className="size-4" />
                {hasMessages && (
                  <div className="absolute top-1.5 right-1.5 size-2 rounded-full bg-red-500" />
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
                  <span className="text-muted-foreground text-xs">
                    @username
                  </span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link to="/my/dash">
                      <BarChart3Icon className="mr-2 size-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link to="/my/profile">
                      <UserIcon className="mr-2 size-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link to="/my/settings">
                      <SettingsIcon className="mr-2 size-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/auth/logout">
                    <LogOutIcon className="mr-2 size-4" />
                    Logout
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            <Button asChild variant="secondary">
              <Link to="/auth/login">Login</Link>
            </Button>
            <Button asChild>
              <Link to="/auth/join">Join</Link>
            </Button>
          </>
        )}
      </div>
      {/* 모바일 우측 버튼(필요시) */}
      <div className="flex items-center gap-2 md:hidden">
        {/* 모바일용 알림/메시지/로그인 버튼 등 필요시 추가 구현 */}
      </div>
    </nav>
  );
}

import type { LucideIcon } from "lucide-react";
import {
  BarChart3Icon,
  BellIcon,
  Building2Icon,
  CalculatorIcon,
  HandCoinsIcon,
  HomeIcon,
  KeyIcon,
  LogOutIcon,
  Menu,
  MessageCircleIcon,
  SettingsIcon,
  UserIcon,
  Users2Icon
} from "lucide-react";
import { useState } from "react";
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
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

interface MenuItem {
  name: string;
  to: string;
  icon?: LucideIcon;
}

interface Menu {
  name: string;
  to: string;
  icon?: LucideIcon;
  items?: MenuItem[];
}

const menus: Menu[] = [
  {
    name: "계산기",
    icon: CalculatorIcon,
    to: "/calculator",
    items: [
      { name: "잔금 계산기", to: "/calculator/balance" },
      { name: "수익률 계산기", to: "/calculator/earnings" }
    ]
  },
  {
    name: "분양",
    icon: Building2Icon,
    to: "/sale",
    items: [
      { name: "지식산업센터", to: "/sale/kic" },
      { name: "오피스빌딩", to: "/sale/office" },
      { name: "프라자상가", to: "/sale/plaza" },
      { name: "오피스텔", to: "/sale/officetel" },
      { name: "생활형숙박", to: "/sale/living" },
      { name: "콘도/호텔", to: "/sale/hotel" }
    ]
  },
  {
    name: "매매/전매",
    icon: HandCoinsIcon,
    to: "/resale",
    items: [
      { name: "팔아요", to: "/resale/sell" },
      { name: "찾아요", to: "/resale/buy" }
    ]
  },
  {
    name: "임차확정",
    icon: KeyIcon,
    to: "/confirmation",
    items: [
      { name: "있어요", to: "/confirmation/here" },
      { name: "구해요", to: "/confirmation/look" }
    ]
  },
  {
    name: "구인/구직",
    icon: Users2Icon,
    to: "/recruit",
    items: [
      { name: "분양인 오세요", to: "/recruit/people" },
      { name: "분양 현장 찾아요", to: "/recruit/site" }
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
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  return (
    <nav className="bg-background/70 fixed top-0 right-0 left-0 z-50 flex h-16 items-center justify-between px-4 shadow-md backdrop-blur-md md:px-20">
      <div className="flex items-center gap-4">
        <Link
          to="/"
          className="text-primary flex items-center gap-2 text-xl font-extrabold tracking-tight"
        >
          <HomeIcon className="size-6" />
          한평
        </Link>
        <Separator
          orientation="vertical"
          className="mx-4 hidden h-6 md:block"
        />
        {/* 데스크탑 메뉴 */}
        <div className="flex gap-2 max-[900px]:hidden">
          {menus.map((menu) => (
            <div
              key={menu.name}
              className="group relative"
              onMouseEnter={() => setOpenMenu(menu.name)}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <Link
                to={menu.to}
                className={cn(
                  "text-muted-foreground hover:text-primary hover:bg-accent flex items-center gap-1 rounded-md px-3 py-2 font-medium transition",
                  "group-hover:bg-accent/60"
                )}
                tabIndex={0}
                aria-haspopup={!!menu.items}
                aria-expanded={openMenu === menu.name}
                onFocus={() => setOpenMenu(menu.name)}
                onBlur={() => setOpenMenu(null)}
              >
                {menu.icon && (
                  <menu.icon className="text-primary/80 mr-1 size-4" />
                )}
                {menu.name}
              </Link>
              {menu.items && (
                <div
                  className={cn(
                    "bg-popover absolute top-full left-0 z-50 min-w-[180px] rounded-lg shadow-lg",
                    openMenu === menu.name ? "block" : "hidden"
                  )}
                >
                  <ul className="py-2">
                    {menu.items.map((item) => (
                      <li key={item.to}>
                        <Link
                          to={item.to}
                          className="text-muted-foreground hover:bg-accent hover:text-primary block rounded-md px-4 py-2 text-sm transition"
                        >
                          {item.icon ? (
                            <item.icon className="mr-1 size-4" />
                          ) : null}
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* 모바일 햄버거 메뉴 */}
      <div className="hidden items-center max-[900px]:flex">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="ghost">
              <Menu className="size-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 p-0">
            <nav className="flex flex-col gap-2 p-4">
              {menus.map((menu) => (
                <div key={menu.name} className="mb-2">
                  <Link
                    to={menu.to}
                    className="text-primary hover:bg-accent/40 flex items-center gap-2 rounded px-2 py-2 font-semibold transition"
                  >
                    {menu.icon && (
                      <menu.icon className="text-primary/80 mr-1 size-5" />
                    )}
                    {menu.name}
                  </Link>
                  {menu.items && (
                    <div className="mt-1 ml-4 flex flex-col gap-1">
                      {menu.items.map((item) => (
                        <Link
                          key={item.to}
                          to={item.to}
                          className="text-muted-foreground hover:text-primary hover:bg-accent/30 rounded px-2 py-1 text-sm transition"
                        >
                          {item.icon ? (
                            <item.icon className="mr-1 size-4" />
                          ) : null}
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
      {/* 우측 유저/로그인 버튼 (데스크탑) */}
      <div className="flex items-center gap-4 max-[900px]:hidden">
        {isLoggedIn ? (
          <>
            <Button size="icon" variant="ghost" asChild className="relative">
              <Link to="/my/notification">
                <BellIcon className="size-4" />
                {hasNotifications && (
                  <div className="absolute top-1.5 right-1.5 size-2 rounded-full bg-red-500" />
                )}
              </Link>
            </Button>
            <Button size="icon" variant="ghost" asChild className="relative">
              <Link to="/my/messages">
                <MessageCircleIcon className="size-4" />
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
                      대시보드
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link to="/my/profile">
                      <UserIcon className="mr-2 size-4" />
                      프로필
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link to="/my/setting">
                      <SettingsIcon className="mr-2 size-4" />
                      설정
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/auth/logout">
                    <LogOutIcon className="mr-2 size-4" />
                    로그아웃
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            <Button
              asChild
              variant="ghost"
              className="text-muted-foreground h-8 w-8 p-0"
              title="로그인"
            >
              <Link to="/auth/login">
                <UserIcon className="size-5" />
                <span className="sr-only">로그인</span>
              </Link>
            </Button>
          </>
        )}
      </div>
      {/* 모바일 우측 버튼 */}
      <div className="hidden items-center gap-2 max-[900px]:flex">
        {isLoggedIn ? (
          <>
            <Button size="icon" variant="ghost" asChild className="relative">
              <Link to="/my/notification">
                <BellIcon className="size-5" />
                {hasNotifications && (
                  <div className="absolute top-1.5 right-1.5 size-2 rounded-full bg-red-500" />
                )}
              </Link>
            </Button>
            <Button size="icon" variant="ghost" asChild className="relative">
              <Link to="/my/messages">
                <MessageCircleIcon className="size-5" />
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
                      대시보드
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link to="/my/profile">
                      <UserIcon className="mr-2 size-4" />
                      프로필
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link to="/my/setting">
                      <SettingsIcon className="mr-2 size-4" />
                      설정
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/auth/logout">
                    <LogOutIcon className="mr-2 size-4" />
                    로그아웃
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            <Button
              asChild
              variant="ghost"
              className="text-muted-foreground h-8 w-8 p-0"
              title="로그인"
            >
              <Link to="/auth/login">
                <UserIcon className="size-5" />
                <span className="sr-only">로그인</span>
              </Link>
            </Button>
          </>
        )}
      </div>
    </nav>
  );
}

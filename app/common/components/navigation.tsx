import {
  BarChart3Icon,
  BellIcon,
  Building2,
  Calculator,
  CheckCircle,
  LogOutIcon,
  Menu,
  MessageCircleIcon,
  RefreshCw,
  SettingsIcon,
  UserIcon,
  Users
} from "lucide-react";
import * as React from "react";
import { Link } from "react-router";
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "~/common/components/ui/avatar";
import { Button } from "~/common/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "~/common/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "~/common/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger
} from "~/common/components/ui/sheet";

const menuItems = [
  {
    title: "계산기",
    href: "/calculator",
    icon: Calculator,
    items: [
      {
        title: "잔금 계산기",
        href: "/calculator/balance",
        description: "입주 시 필요한 잔금을 계산합니다"
      },
      {
        title: "수익률 계산기",
        href: "/calculator/earnings",
        description: "투자 수익률을 계산합니다"
      }
    ]
  },
  {
    title: "분양",
    href: "/sale",
    icon: Building2,
    items: [
      {
        title: "지식산업센터",
        href: "/sale/kic",
        description: "지식산업센터 분양 정보"
      },
      {
        title: "오피스빌딩",
        href: "/sale/office",
        description: "오피스빌딩 분양 정보"
      },
      {
        title: "프라자상가",
        href: "/sale/plaza",
        description: "프라자상가 분양 정보"
      },
      {
        title: "오피스텔",
        href: "/sale/officetel",
        description: "오피스텔 분양 정보"
      },
      {
        title: "생활형숙박",
        href: "/sale/living",
        description: "생활형숙박시설 분양 정보"
      },
      {
        title: "콘도/호텔",
        href: "/sale/hotel",
        description: "콘도/호텔 분양 정보"
      }
    ]
  },
  {
    title: "매매/전매",
    href: "/resale",
    icon: RefreshCw,
    items: [
      {
        title: "팔아요",
        href: "/resale/sell",
        description: "매물을 등록하고 판매하세요"
      },
      {
        title: "찾아요",
        href: "/resale/buy",
        description: "원하는 매물을 찾아보세요"
      }
    ]
  },
  {
    title: "임차 확정",
    href: "/confirmation",
    icon: CheckCircle,
    items: [
      {
        title: "있어요",
        href: "/confirmation/here",
        description: "임대 가능한 물건이 있어요"
      },
      {
        title: "구해요",
        href: "/confirmation/look",
        description: "임대할 물건을 구해요"
      }
    ]
  },
  {
    title: "구인/구직",
    href: "/recruit",
    icon: Users,
    items: [
      {
        title: "분양인 오세요",
        href: "/recruit/people",
        description: "분양인을 모집합니다"
      },
      {
        title: "분양현장 찾아요",
        href: "/recruit/site",
        description: "분양 현장을 찾고 있어요"
      }
    ]
  }
];

export interface NavigationProps {
  isLoggedIn: boolean;
  nickname?: string;
  name?: string;
  avatar?: string | null;
  hasNotifications?: boolean;
  hasMessages?: boolean;
}

export function Navigation({
  isLoggedIn,
  nickname,
  name,
  avatar,
  hasNotifications,
  hasMessages
}: NavigationProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
            <span className="text-sm font-bold text-white">한</span>
          </div>
          <span className="text-xl font-bold text-gray-900">한평</span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            {menuItems.map((item) => (
              <NavigationMenuItem key={item.title}>
                <NavigationMenuTrigger className="text-sm font-medium">
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {item.items.map((subItem) => (
                      <NavigationMenuLink key={subItem.title} asChild>
                        <Link
                          to={subItem.href}
                          className="block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-gray-100 hover:text-blue-600 focus:bg-gray-100 focus:text-blue-600"
                        >
                          <div className="text-sm leading-none font-medium">
                            {subItem.title}
                          </div>
                          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                            {subItem.description}
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Auth Buttons or User Dropdown */}
        <div className="hidden items-center space-x-2 md:flex">
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <Button asChild className="relative" size="icon" variant="ghost">
                <Link to="/my/notifications">
                  <BellIcon className="size-4" />
                  {hasNotifications && (
                    <div className="absolute top-1.5 right-1.5 size-2 rounded-full bg-red-500" />
                  )}
                </Link>
              </Button>
              <Button asChild className="relative" size="icon" variant="ghost">
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
                    {avatar ? (
                      <AvatarImage className="object-cover" src={avatar} />
                    ) : (
                      <AvatarFallback>{name?.[0]}</AvatarFallback>
                    )}
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel className="flex flex-col">
                    <span className="font-medium">{name}</span>
                    <span className="text-muted-foreground text-xs">
                      @{nickname}
                    </span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <Link to="/my/dash">
                        <BarChart3Icon className="mr-2 size-4" />
                        <span className="font-medium">대시보드</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <Link to="/my/profile">
                        <UserIcon className="mr-2 size-4" />
                        <span className="font-medium">프로필</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <Link to="/my/settings">
                        <SettingsIcon className="mr-2 size-4" />
                        <span className="font-medium">설정</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link to="/auth/logout">
                      <LogOutIcon className="mr-2 size-4" />
                      <span className="font-medium">로그아웃</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="rounded font-medium"
              >
                <Link to="/auth/login">로그인</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="sm">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <div className="mt-8 flex flex-col space-y-4">
              {menuItems.map((item) => (
                <div key={item.title} className="space-y-2">
                  <div className="flex items-center text-lg font-semibold">
                    <item.icon className="mr-2 h-5 w-5" />
                    {item.title}
                  </div>
                  <div className="ml-7 space-y-1">
                    {item.items.map((subItem) => (
                      <Link
                        key={subItem.title}
                        to={subItem.href}
                        className="block py-1 text-sm text-gray-600 hover:text-blue-600"
                        onClick={() => setIsOpen(false)}
                      >
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              <div className="space-y-2 border-t pt-4">
                {isLoggedIn ? (
                  <Button
                    variant="ghost"
                    className="w-full justify-start font-medium"
                    asChild
                  >
                    <Link to="/mypage">마이페이지</Link>
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      className="w-full justify-start font-medium"
                      asChild
                    >
                      <Link to="/auth/login">로그인</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

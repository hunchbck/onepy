import {
  Building2Icon,
  CalculatorIcon,
  HandCoinsIcon,
  HomeIcon,
  KeyIcon,
  Menu,
  Moon,
  Sun,
  UserIcon,
  Users2Icon
} from "lucide-react";
import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "~/common/components/ui/accordion";
import { Button } from "~/common/components/ui/button";
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
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "~/common/components/ui/sheet";

const menus = [
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

const ThemeToggle = () => {
  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    if (isDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [isDark]);

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setIsDark(!isDark)}
      className="rounded-full"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      )}
    </Button>
  );
};

function renderMenuItem(menu: any) {
  if (menu.items) {
    return (
      <NavigationMenuItem key={menu.name}>
        <NavigationMenuTrigger>
          {menu.icon && <menu.icon className="mr-1 size-4" />}
          {menu.name}
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="w-56 p-2">
            {menu.items.map((item: any) => (
              <li key={item.to}>
                <NavigationMenuLink asChild>
                  <a
                    href={item.to}
                    className="text-muted-foreground hover:bg-muted hover:text-accent-foreground flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition"
                  >
                    {item.name}
                  </a>
                </NavigationMenuLink>
              </li>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }
  return (
    <NavigationMenuItem key={menu.name}>
      <NavigationMenuLink asChild>
        <a
          href={menu.to}
          className="text-muted-foreground hover:bg-muted hover:text-accent-foreground flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition"
        >
          {menu.icon && <menu.icon className="mr-1 size-4" />}
          {menu.name}
        </a>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}

function renderMobileMenuItem(menu: any) {
  if (menu.items) {
    return (
      <AccordionItem key={menu.name} value={menu.name}>
        <AccordionTrigger className="py-0 font-semibold hover:no-underline">
          {menu.icon && <menu.icon className="mr-1 size-4" />}
          {menu.name}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {menu.items.map((item: any) => (
            <a
              key={item.to}
              href={item.to}
              className="text-muted-foreground hover:bg-muted hover:text-accent-foreground block rounded-md px-3 py-2 text-sm transition"
            >
              {item.name}
            </a>
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }
  return (
    <a
      key={menu.name}
      href={menu.to}
      className="text-muted-foreground hover:bg-muted hover:text-accent-foreground block rounded-md px-3 py-2 text-sm font-semibold transition"
    >
      {menu.icon && <menu.icon className="mr-1 size-4" />}
      {menu.name}
    </a>
  );
}

export default function Navigation() {
  return (
    <section className="border-border border-b py-4">
      <div className="container">
        {/* 데스크탑 네비게이션 */}
        <nav className="hidden justify-between lg:flex">
          <div className="flex items-center gap-6">
            <a href="/" className="flex items-center gap-2">
              <HomeIcon className="w-8" />
              <span className="text-lg font-semibold">한평</span>
            </a>
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {menus.map((menu) => renderMenuItem(menu))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button asChild variant="outline" size="sm">
              <a href="/auth/login">
                <UserIcon className="mr-1 size-4" />
                로그인
              </a>
            </Button>
          </div>
        </nav>
        {/* 모바일 네비게이션 */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center gap-2">
              <HomeIcon className="w-8" />
              <span className="text-lg font-semibold">한평</span>
            </a>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="size-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent className="overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>
                      <a href="/" className="flex items-center gap-2">
                        <HomeIcon className="w-8" />
                        <span className="text-lg font-semibold">한평</span>
                      </a>
                    </SheetTitle>
                  </SheetHeader>
                  <div className="my-6 flex flex-col gap-6">
                    <Accordion
                      type="single"
                      collapsible
                      className="flex w-full flex-col gap-4"
                    >
                      {menus.map((menu) => renderMobileMenuItem(menu))}
                    </Accordion>
                    <div className="mt-6 flex flex-col gap-3">
                      <Button asChild variant="outline">
                        <a href="/auth/login">
                          <UserIcon className="mr-1 size-4" />
                          로그인
                        </a>
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
  useNavigation
} from "react-router";

import { Settings } from "luxon";
import type { Route } from "./+types/root";
import stylesheet from "./app.css?url";
import { Footer } from "./common/components/footer";
import { Navigation } from "./common/components/navigation";
import { getUserById } from "./features/users/queries";
import { cn } from "./lib/utils";
import { makeSSRClient } from "./supa-client";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous"
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
  },
  { rel: "stylesheet", href: stylesheet }
];

export function Layout({ children }: { children: React.ReactNode }) {
  Settings.defaultLocale = "ko";
  Settings.defaultZone = "Asia/Seoul";

  return (
    <html lang="ko" className="">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export const loader = async ({ request }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const {
    data: { user }
  } = await client.auth.getUser();
  console.log("?????", user, "?????");
  if (user) {
    const profile = await getUserById(client, { id: user.id });
    return { user, profile };
  }
  return { user: null, profile: null };
};

export default function App({ loaderData }: Route.ComponentProps) {
  const { pathname } = useLocation();
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const isLoggedIn = loaderData.user !== null;

  return (
    <div
      className={cn({
        "px-5 py-5 lg:px-20": !pathname.includes("/auth/"),
        "animate-pulse transition-opacity": isLoading
      })}
    >
      {pathname.includes("/auth") ? null : (
        <Navigation
          isLoggedIn={isLoggedIn}
          nickname={loaderData.profile?.nickname}
          name={loaderData.profile?.name}
          avatar={loaderData.profile?.avatar}
          hasNotifications={true}
          hasMessages={true}
        />
      )}
      <Outlet />
      {pathname.includes("/auth") ? null : <Footer />}
    </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="container mx-auto p-4 pt-16">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full overflow-x-auto p-4">
          <code>{stack}</code>
        </pre>
      )}
      {typeof error === "object" && error && "message" in error ? (
        <p>{(error as Error).message}</p>
      ) : null}
    </main>
  );
}

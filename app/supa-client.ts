import {
  createBrowserClient,
  createServerClient,
  parseCookieHeader,
  serializeCookieHeader
} from "@supabase/ssr";
import type { Database as SupabaseDatabase } from "database.types";
import type { MergeDeep } from "type-fest";

export type Database = MergeDeep<
  SupabaseDatabase,
  {
    public: {
      Views: {};
    };
  }
>;

export const browserClient = createBrowserClient<Database>(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export const makeSSRClient = (request: Request) => {
  const headers = new Headers();
  const serverSideClient = createServerClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        async getAll() {
          const cookies = parseCookieHeader(
            request.headers.get("cookie") ?? ""
          );
          return cookies.map(({ name, value }) => ({
            name,
            value: value ?? ""
          }));
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            headers.append(
              "Set-Cookie",
              serializeCookieHeader(name, value, options)
            );
          });
        }
      }
    }
  );
  return {
    client: serverSideClient,
    headers
  };
};

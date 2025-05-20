import { redirect } from "react-router";
import { makeSSRClient } from "~/supa-client";
import { getUserById } from "../queries";
import type { Route } from "./+types/my-profile-page";

export async function loader({ request }: Route.LoaderArgs) {
  // find user using the cookies
  const { client } = makeSSRClient(request);
  const {
    data: { user }
  } = await client.auth.getUser();
  if (!user) {
    return redirect("/auth/login");
  }
  // console.log("user", user);
  const profile = await getUserById(client, user.id);
  return redirect(`/users/${profile.username}`);
}

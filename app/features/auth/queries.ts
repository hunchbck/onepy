import { makeSSRClient } from "~/supa-client";

export const checkNicknameExists = async (
  request: Request,
  { nickname }: { nickname: string }
) => {
  const { client } = makeSSRClient(request);
  const { error } = await client
    .from("user_onepy")
    .select("user_id")
    .eq("nickname", nickname)
    .single();
  if (error) {
    return false;
  }
  return true;
};

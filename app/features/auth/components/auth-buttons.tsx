import { LockIcon } from "lucide-react";
import { Link } from "react-router";
import { Button } from "~/common/components/ui/button";
import { Separator } from "~/common/components/ui/separator";
import {
  AppleIcon,
  DiscordIcon,
  GithubIcon,
  GoogleIcon,
  KakaoIcon,
  LineIcon
} from "./icons/provider-icons";

export function AuthButtons() {
  return (
    <div className="flex w-full flex-col items-center gap-10">
      <div className="flex w-full flex-col items-center gap-2">
        <Separator className="w-full" />
        <span className="text-xs font-medium uppercase text-muted-foreground">
          Or continue with
        </span>
        <Separator className="w-full" />
      </div>
      <div className="flex w-full flex-col gap-2">
        <Button variant="outline" className="w-full" asChild>
          <Link to="/auth/social/google/start">
            <GoogleIcon />
            Continue with Google
          </Link>
        </Button>
        <Button variant="outline" className="w-full" asChild>
          <Link to="/auth/social/apple/start">
            <AppleIcon />
            Continue with Apple
          </Link>
        </Button>
        <Button variant="outline" className="w-full" asChild>
          <Link to="/auth/social/kakao/start">
            <KakaoIcon />
            Continue with Kakao Talk
          </Link>
        </Button>
        <Button variant="outline" className="w-full" asChild>
          <Link to="/auth/social/line/start">
            <LineIcon />
            Continue with Line
          </Link>
        </Button>
        <Button variant="outline" className="w-full" asChild>
          <Link to="/auth/social/github/start">
            <GithubIcon />
            Continue with Github
          </Link>
        </Button>
        <Button variant="outline" className="w-full" asChild>
          <Link to="/auth/social/discord/start">
            <DiscordIcon />
            Continue with Discord
          </Link>
        </Button>
        <Button variant="outline" className="w-full" asChild>
          <Link to="/auth/otp/start">
            <LockIcon className="size-4" />
            Continue with OTP
          </Link>
        </Button>
      </div>
    </div>
  );
}

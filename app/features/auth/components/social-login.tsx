import { MessageCircle } from "lucide-react";
import { Link } from "react-router";
import { Button } from "~/common/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "~/common/components/ui/card";

export function SocialLogin() {
  return (
    <Card>
      <CardHeader className="pb-4 text-center">
        <CardTitle className="text-lg">소셜 로그인</CardTitle>
        <CardDescription>빠르고 간편하게 로그인하세요</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" type="button" className="w-full" asChild>
              <Link to="/auth/social/google/start">
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M21.805 10.023h-9.18v3.955h5.627c-.243 1.3-1.47 3.82-5.627 3.82-3.386 0-6.145-2.8-6.145-6.25s2.76-6.25 6.145-6.25c1.93 0 3.23.82 3.97 1.53l2.71-2.63C17.09 2.67 14.98 1.5 12.625 1.5 6.99 1.5 2.5 6.09 2.5 12s4.49 10.5 10.125 10.5c5.84 0 9.68-4.09 9.68-9.84 0-.66-.07-1.16-.16-1.64z"
                  />
                </svg>
                Google
              </Link>
            </Button>
            <Button variant="outline" type="button" className="w-full" asChild>
              <Link to="/auth/social/kakao/start">
                <MessageCircle className="h-4 w-4" />
                Kakao
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

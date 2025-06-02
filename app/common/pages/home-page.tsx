import {
  Building2,
  Calculator,
  CheckCircle,
  Clock,
  MapPin,
  RefreshCw,
  TrendingUp
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { Button } from "~/common/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "~/common/components/ui/card";
import type { Route } from "./+types/home-page";

export const meta: Route.MetaFunction = () => [
  { title: "한평 | 부동산 거래의 새로운 기준" },
  {
    name: "description",
    content:
      "분양부터 전매, 매매, 임대까지 모든 부동산 거래를 한 곳에서. 한평에서 쉽고 빠르게 시작하세요."
  }
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const myProperties = [
    {
      id: 1,
      title: "강남 오피스텔 A동 1205호",
      type: "관심물건",
      status: "분양중",
      price: "3억 2천만원",
      date: "2024-01-15"
    },
    {
      id: 2,
      title: "판교 지식산업센터 B동",
      type: "문의완료",
      status: "상담예정",
      price: "5억 8천만원",
      date: "2024-01-20"
    }
  ];

  const notifications = [
    {
      id: 1,
      title: "관심물건 가격 변동",
      message: "강남 오피스텔 분양가가 5% 인하되었습니다.",
      time: "2시간 전",
      type: "price"
    },
    {
      id: 2,
      title: "새로운 분양 정보",
      message: "선호 지역에 새로운 분양 물건이 등록되었습니다.",
      time: "1일 전",
      type: "new"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative px-4 py-16 md:py-24 lg:py-32">
        <div className="container mx-auto max-w-6xl">
          <div className="space-y-6 text-center">
            <h1 className="text-4xl font-bold text-gray-900 md:text-6xl">
              부동산 거래의 새로운 기준
              <span className="block text-blue-600">한평</span>
            </h1>
            <p className="mx-auto max-w-3xl text-xl text-gray-600 md:text-2xl">
              분양부터 전매, 매매, 임대까지 모든 부동산 거래를 한 곳에서
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Button size="lg" className="px-8 py-3 text-lg" asChild>
                <Link to="/auth/join">시작하기</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-3 text-lg"
                asChild
              >
                <Link to="/about">더 알아보기</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access Cards */}
      <section className="bg-white px-4 py-16">
        <div className="container mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold">
            빠른 서비스 이용
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Link to="/calculator">
              <Card className="cursor-pointer transition-shadow hover:shadow-lg">
                <CardHeader className="text-center">
                  <Calculator className="mx-auto mb-4 h-12 w-12 text-blue-600" />
                  <CardTitle>계산기</CardTitle>
                  <CardDescription>잔금 & 수익률 계산</CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/sale">
              <Card className="cursor-pointer transition-shadow hover:shadow-lg">
                <CardHeader className="text-center">
                  <Building2 className="mx-auto mb-4 h-12 w-12 text-green-600" />
                  <CardTitle>분양</CardTitle>
                  <CardDescription>신규 분양 물건</CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/resale">
              <Card className="cursor-pointer transition-shadow hover:shadow-lg">
                <CardHeader className="text-center">
                  <RefreshCw className="mx-auto mb-4 h-12 w-12 text-orange-600" />
                  <CardTitle>매매/전매</CardTitle>
                  <CardDescription>중고 거래 매칭</CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/confirmation">
              <Card className="cursor-pointer transition-shadow hover:shadow-lg">
                <CardHeader className="text-center">
                  <CheckCircle className="mx-auto mb-4 h-12 w-12 text-purple-600" />
                  <CardTitle>임차 확정</CardTitle>
                  <CardDescription>임대차 매칭</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-gray-50 px-4 py-16">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
            <div>
              <div className="mb-2 text-3xl font-bold text-blue-600 md:text-4xl">
                1,200+
              </div>
              <div className="text-gray-600">등록 물건</div>
            </div>
            <div>
              <div className="mb-2 text-3xl font-bold text-green-600 md:text-4xl">
                850+
              </div>
              <div className="text-gray-600">거래 성사</div>
            </div>
            <div>
              <div className="mb-2 text-3xl font-bold text-orange-600 md:text-4xl">
                500+
              </div>
              <div className="text-gray-600">판매 회원</div>
            </div>
            <div>
              <div className="mb-2 text-3xl font-bold text-purple-600 md:text-4xl">
                2,000+
              </div>
              <div className="text-gray-600">구매 회원</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white px-4 py-16">
        <div className="container mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold">
            왜 한평을 선택해야 할까요?
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <Card>
              <CardHeader>
                <TrendingUp className="mb-4 h-10 w-10 text-blue-600" />
                <CardTitle>높은 수익률</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  정확한 수익률 계산기와 시장 분석을 통해 최적의 투자 기회를
                  제공합니다.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <MapPin className="mb-4 h-10 w-10 text-green-600" />
                <CardTitle>전국 네트워크</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  전국의 분양 현장과 매물 정보를 실시간으로 확인할 수 있습니다.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Clock className="mb-4 h-10 w-10 text-purple-600" />
                <CardTitle>빠른 매칭</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  AI 기반 매칭 시스템으로 최적의 거래 상대방을 빠르게
                  찾아드립니다.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 px-4 py-16 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">
            지금 시작하세요
          </h2>
          <p className="mb-8 text-xl opacity-90">
            한평과 함께 스마트한 부동산 투자를 경험해보세요
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              variant="secondary"
              className="px-8 py-3 text-lg"
              asChild
            >
              <Link to="/auth/join">무료 회원가입</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white px-8 py-3 text-lg text-white hover:bg-white hover:text-blue-600"
              asChild
            >
              <Link to="/about">서비스 둘러보기</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

import {
  Bell,
  Building2,
  Calendar,
  Heart,
  Mail,
  MessageSquare,
  Phone,
  Settings,
  TrendingUp,
  User
} from "lucide-react";
import { useState } from "react";
import { Badge } from "~/common/components/ui/badge";
import { Button } from "~/common/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "~/common/components/ui/card";

export default function MyPage() {
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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
                  <User className="h-10 w-10 text-blue-600" />
                </div>
                <CardTitle>김한평</CardTitle>
                <CardDescription>구매 회원</CardDescription>
                <Badge variant="secondary" className="mx-auto w-fit">
                  건물주
                </Badge>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="mr-2 h-4 w-4" />
                  kim@example.com
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="mr-2 h-4 w-4" />
                  010-1234-5678
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="mr-2 h-4 w-4" />
                  가입일: 2024.01.01
                </div>
              </CardContent>
            </Card>

            <div className="mt-6 space-y-2">
              <Button
                variant={activeTab === "dashboard" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("dashboard")}
              >
                <TrendingUp className="mr-2 h-4 w-4" />
                대시보드
              </Button>
              <Button
                variant={activeTab === "properties" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("properties")}
              >
                <Building2 className="mr-2 h-4 w-4" />내 물건
              </Button>
              <Button
                variant={activeTab === "favorites" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("favorites")}
              >
                <Heart className="mr-2 h-4 w-4" />
                관심목록
              </Button>
              <Button
                variant={activeTab === "messages" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("messages")}
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                메시지
              </Button>
              <Button
                variant={activeTab === "notifications" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("notifications")}
              >
                <Bell className="mr-2 h-4 w-4" />
                알림
              </Button>
              <Button
                variant={activeTab === "settings" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("settings")}
              >
                <Settings className="mr-2 h-4 w-4" />
                설정
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === "dashboard" && (
              <div className="space-y-6">
                <div>
                  <h1 className="mb-2 text-3xl font-bold">대시보드</h1>
                  <p className="text-gray-600">
                    한평 서비스 이용 현황을 확인하세요
                  </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-600">
                        관심 물건
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">12</div>
                      <p className="text-xs text-gray-600">+2 이번 주</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-600">
                        문의 완료
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">5</div>
                      <p className="text-xs text-gray-600">+1 이번 주</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-600">
                        상담 예정
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">3</div>
                      <p className="text-xs text-gray-600">이번 주</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle>최근 활동</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {myProperties.map((property) => (
                        <div
                          key={property.id}
                          className="flex items-center justify-between rounded-lg border p-4"
                        >
                          <div>
                            <h3 className="font-medium">{property.title}</h3>
                            <p className="text-sm text-gray-600">
                              {property.price}
                            </p>
                          </div>
                          <div className="text-right">
                            <Badge variant="outline">{property.type}</Badge>
                            <p className="mt-1 text-xs text-gray-600">
                              {property.date}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="space-y-6">
                <div>
                  <h1 className="mb-2 text-3xl font-bold">알림</h1>
                  <p className="text-gray-600">중요한 소식을 놓치지 마세요</p>
                </div>

                <Card>
                  <CardContent className="p-0">
                    <div className="space-y-0">
                      {notifications.map((notification, index) => (
                        <div
                          key={notification.id}
                          className={`p-4 ${index !== notifications.length - 1 ? "border-b" : ""}`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="mb-1 font-medium">
                                {notification.title}
                              </h3>
                              <p className="mb-2 text-sm text-gray-600">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-500">
                                {notification.time}
                              </p>
                            </div>
                            <Bell className="mt-1 h-5 w-5 text-gray-400" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Other tab contents would go here */}
          </div>
        </div>
      </div>
    </div>
  );
}

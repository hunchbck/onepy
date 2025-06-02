import { Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                <span className="text-sm font-bold text-white">한</span>
              </div>
              <span className="text-xl font-bold">한평</span>
            </div>
            <p className="text-sm text-gray-400">
              부동산 거래의 새로운 기준을 제시하는 플랫폼입니다.
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>서울특별시 강남구 테헤란로 123</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>02-1234-5678</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>contact@hanpyeong.com</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">서비스</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link
                  to="/calculator"
                  className="transition-colors hover:text-white"
                >
                  계산기
                </Link>
              </li>
              <li>
                <Link to="/sale" className="transition-colors hover:text-white">
                  분양
                </Link>
              </li>
              <li>
                <Link
                  to="/resale"
                  className="transition-colors hover:text-white"
                >
                  매매/전매
                </Link>
              </li>
              <li>
                <Link
                  to="/confirmation"
                  className="transition-colors hover:text-white"
                >
                  임차 확정
                </Link>
              </li>
              <li>
                <Link
                  to="/recruit"
                  className="transition-colors hover:text-white"
                >
                  구인/구직
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">고객지원</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link to="/help" className="transition-colors hover:text-white">
                  도움말
                </Link>
              </li>
              <li>
                <Link to="/faq" className="transition-colors hover:text-white">
                  자주 묻는 질문
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="transition-colors hover:text-white"
                >
                  문의하기
                </Link>
              </li>
              <li>
                <Link
                  to="/notice"
                  className="transition-colors hover:text-white"
                >
                  공지사항
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">약관 및 정책</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link
                  to="/terms"
                  className="transition-colors hover:text-white"
                >
                  이용약관
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="transition-colors hover:text-white"
                >
                  개인정보처리방침
                </Link>
              </li>
              <li>
                <Link
                  to="/location"
                  className="transition-colors hover:text-white"
                >
                  위치기반서비스
                </Link>
              </li>
              <li>
                <Link
                  to="/youth"
                  className="transition-colors hover:text-white"
                >
                  청소년보호정책
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 한평. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

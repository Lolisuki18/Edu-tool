import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faClipboardList,
  faChartBar,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/hooks";

export function HomePage() {
  const { user } = useAuth();

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Chào mừng đến với Edu Tools
      </h1>
      <p className="text-xl text-gray-600 mb-2">
        Công cụ hỗ trợ quản lý dự án và báo cáo học tập
      </p>
      {user && (
        <p className="text-lg text-blue-600 mb-8">
          Xin chào, <span className="font-semibold">{user.name}</span>!
        </p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 max-w-6xl mx-auto">
        <a
          href="/jira-to-srs"
          className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow"
        >
          <div className="mb-4 flex justify-center text-blue-500">
            <FontAwesomeIcon icon={faClipboardList} className="w-16 h-16" />
          </div>
          <h3 className="text-2xl font-semibold mb-3 text-gray-900">
            Jira to SRS
          </h3>
          <p className="text-gray-600">
            Chuyển đổi Jira tickets thành tài liệu SRS một cách tự động
          </p>
        </a>
        <a
          href="/github-report"
          className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow"
        >
          <div className="mb-4 flex justify-center text-green-500">
            <FontAwesomeIcon icon={faChartBar} className="w-16 h-16" />
          </div>
          <h3 className="text-2xl font-semibold mb-3 text-gray-900">
            Github Report
          </h3>
          <p className="text-gray-600">
            Tạo báo cáo đóng góp từ Github repository
          </p>
        </a>
        <a
          href="/profile"
          className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow"
        >
          <div className="mb-4 flex justify-center text-blue-500">
            <FontAwesomeIcon icon={faUser} className="w-16 h-16" />
          </div>
          <h3 className="text-2xl font-semibold mb-3 text-gray-900">Hồ sơ</h3>
          <p className="text-gray-600">
            Quản lý thông tin cá nhân và cài đặt API tokens
          </p>
        </a>

        {(user?.role === "admin" || user?.role === "teacher") && (
          <a
            href="/manage-users"
            className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow border-2 border-purple-200"
          >
            <div className="mb-4 flex justify-center text-purple-500">
              <FontAwesomeIcon icon={faUsers} className="w-16 h-16" />
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-gray-900">
              Quản lý User
            </h3>
            <p className="text-gray-600">
              {user?.role === "admin"
                ? "Tạo tài khoản giảng viên"
                : "Tạo tài khoản leader và thành viên"}
            </p>
          </a>
        )}
      </div>
    </div>
  );
}

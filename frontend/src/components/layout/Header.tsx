import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faClipboardList,
  faChartBar,
  faUsers,
  faKey,
  faChalkboardTeacher,
  faCrown,
  faUser,
  type IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/hooks";

interface HeaderProps {
  className?: string;
}

export function Header({ className = "" }: HeaderProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getRoleBadge = (role: string) => {
    const badges: Record<string, { icon: IconDefinition; label: string }> = {
      admin: { icon: faKey, label: "Admin" },
      teacher: { icon: faChalkboardTeacher, label: "Giảng viên" },
      leader: { icon: faCrown, label: "Leader" },
      member: { icon: faUser, label: "Thành viên" },
    };
    const badge = badges[role];
    return badge ? (
      <>
        <FontAwesomeIcon icon={badge.icon} className="mr-1" />
        {badge.label}
      </>
    ) : (
      role
    );
  };

  return (
    <header className={`bg-white shadow-sm ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <a
            href="/"
            className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
          >
            Edu Tools
          </a>
          <nav className="flex items-center gap-6">
            <a
              href="/"
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faHome} />
              Trang chủ
            </a>
            <a
              href="/jira-to-srs"
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faClipboardList} />
              Jira to SRS
            </a>
            <a
              href="/github-report"
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faChartBar} />
              Github Report
            </a>

            {(user?.role === "admin" || user?.role === "teacher") && (
              <a
                href="/manage-users"
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faUsers} />
                Quản lý user
              </a>
            )}

            <div className="border-l pl-6 ml-2 flex items-center gap-4">
              <a
                href="/profile"
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <span className="text-sm font-medium">{user?.name}</span>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                  {user && getRoleBadge(user.role)}
                </span>
              </a>
              <button
                onClick={handleLogout}
                className="text-sm text-red-600 hover:text-red-700 font-medium transition-colors"
              >
                Đăng xuất
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

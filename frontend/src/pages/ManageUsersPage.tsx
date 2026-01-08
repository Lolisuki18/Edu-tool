import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useGroups } from "@/contexts/GroupContext";
import { Button } from "@/components/common";
import type { User, UserRole } from "@/types";

export function ManageUsersPage() {
  const { user } = useAuth();
  const { groups, createGroup, isLoading: groupsLoading } = useGroups();
  const [users, setUsers] = useState<User[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "member" as UserRole,
    groupId: "",
  });
  const [newGroup, setNewGroup] = useState({
    name: "",
    description: "",
  });

  // Helper function to check if current user can create a specific role
  const canCreateRole = (role: UserRole): boolean => {
    if (user?.role === "admin") {
      return role === "teacher";
    }
    if (user?.role === "teacher") {
      return role === "leader" || role === "member";
    }
    return false;
  };
  console.log("Can create roles:", canCreateRole("member"));

  const handleCreateUser = async () => {
    const mockUser: User = {
      id: `user-${Date.now()}`,
      ...newUser,
      groupId: newUser.groupId || undefined,
      createdBy: user?.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setUsers([...users, mockUser]);
    setNewUser({
      name: "",
      email: "",
      password: "",
      role: "member",
      groupId: "",
    });
    setIsCreating(false);
    alert("Tạo tài khoản thành công!");
  };

  const handleCreateGroup = async () => {
    if (!newGroup.name || !user) return;

    try {
      await createGroup({
        name: newGroup.name,
        description: newGroup.description,
        teacherId: user.role === "teacher" ? user.id : user.createdBy || "",
        createdBy: user.id,
        createdByRole: user.role === "teacher" ? "teacher" : "leader",
      });
      setNewGroup({ name: "", description: "" });
      setIsCreatingGroup(false);
      alert("Tạo nhóm thành công!");
    } catch (error) {
      alert("Có lỗi xảy ra khi tạo nhóm!");
    }
  };

  // Get groups for current teacher or leader
  const availableGroups =
    user?.role === "teacher"
      ? groups.filter((g) => g.teacherId === user.id)
      : user?.role === "leader"
      ? groups.filter(
          (g) => g.leaderId === user.id || g.teacherId === user.createdBy
        )
      : groups;

  // Check if user needs to select a group
  const needsGroup = newUser.role === "leader" || newUser.role === "member";

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Quản lý người dùng
        </h1>
        <p className="text-gray-600">
          {user?.role === "admin"
            ? "Quản lý tài khoản giảng viên"
            : user?.role === "teacher"
            ? "Quản lý nhóm, tài khoản leader và thành viên"
            : "Quản lý nhóm và tài khoản thành viên"}
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Danh sách người dùng
          </h2>
          <div className="flex gap-2">
            {(user?.role === "teacher" || user?.role === "leader") && (
              <Button
                variant="outline"
                onClick={() => setIsCreatingGroup(!isCreatingGroup)}
              >
                + Tạo nhóm mới
              </Button>
            )}
            <Button onClick={() => setIsCreating(!isCreating)}>
              + Tạo tài khoản mới
            </Button>
          </div>
        </div>

        {isCreatingGroup && (
          <div className="mb-6 p-4 bg-green-50 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-4">Tạo nhóm mới</h3>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Tên nhóm (VD: SE1801)"
                value={newGroup.name}
                onChange={(e) =>
                  setNewGroup({ ...newGroup, name: e.target.value })
                }
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="Mô tả (tùy chọn)"
                value={newGroup.description}
                onChange={(e) =>
                  setNewGroup({ ...newGroup, description: e.target.value })
                }
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2 mt-4">
              <Button onClick={handleCreateGroup} disabled={groupsLoading}>
                Tạo nhóm
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsCreatingGroup(false)}
              >
                Hủy
              </Button>
            </div>
          </div>
        )}

        {isCreating && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-4">
              Tạo tài khoản mới
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Họ và tên"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="password"
                placeholder="Mật khẩu"
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <select
                value={newUser.role}
                onChange={(e) =>
                  setNewUser({ ...newUser, role: e.target.value as UserRole })
                }
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {user?.role === "admin" && (
                  <option value="teacher">Giảng viên</option>
                )}
                {user?.role === "teacher" && (
                  <>
                    <option value="leader">Leader</option>
                    <option value="member">Thành viên</option>
                  </>
                )}
              </select>

              {needsGroup && (
                <select
                  value={newUser.groupId}
                  onChange={(e) =>
                    setNewUser({ ...newUser, groupId: e.target.value })
                  }
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent col-span-2"
                >
                  <option value="">Chọn nhóm</option>
                  {availableGroups.map((group) => (
                    <option key={group.id} value={group.id}>
                      {group.name}{" "}
                      {group.description ? `- ${group.description}` : ""}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <div className="flex gap-2 mt-4">
              <Button onClick={handleCreateUser}>Tạo tài khoản</Button>
              <Button variant="outline" onClick={() => setIsCreating(false)}>
                Hủy
              </Button>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tên
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vai trò
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    Chưa có người dùng nào. Nhấn "Tạo tài khoản mới" để bắt đầu.
                  </td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {u.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{u.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button className="text-red-600 hover:text-red-900">
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

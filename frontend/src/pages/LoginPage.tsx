import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "@/components/common";
import { useAuth, useFormValidation } from "@/hooks";
import { validators, showToast } from "@/utils";

export function LoginPage() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const { values, errors, handleChange, handleBlur, validateAll } =
    useFormValidation(
      {
        email: "",
        password: "",
      },
      {
        email: validators.email,
        password: (value) => validators.password(value, 1), // Min 1 char for demo
      }
    );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate all fields
    if (!validateAll()) {
      showToast.error("Vui lòng kiểm tra lại thông tin");
      return;
    }

    setIsLoading(true);

    try {
      await login(values.email, values.password);
      navigate("/");
    } catch {
      setError("Email hoặc mật khẩu không đúng");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Đăng nhập</h1>
            <p className="text-gray-600">Edu Tools - Hệ thống quản lý dự án</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email"
              type="email"
              value={values.email}
              onChange={handleChange("email")}
              onBlur={handleBlur("email")}
              error={errors.email}
              placeholder="your@email.com"
              required
            />

            <Input
              label="Mật khẩu"
              type="password"
              value={values.password}
              onChange={handleChange("password")}
              onBlur={handleBlur("password")}
              error={errors.password}
              placeholder="••••••••"
              required
            />

            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-3">Demo accounts:</p>
            <div className="space-y-2 text-xs text-gray-500">
              <div className="bg-gray-50 p-2 rounded">
                <strong>Admin:</strong> admin@edu.com
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <strong>Teacher:</strong> teacher@edu.com
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <strong>Leader:</strong> leader@edu.com
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <strong>Member:</strong> member@edu.com
              </div>
              <p className="text-center pt-2">Password: any</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

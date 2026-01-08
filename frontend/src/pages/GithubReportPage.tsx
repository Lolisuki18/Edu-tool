import { useState } from "react";
import { Button } from "@/components/common";
import { showToast, validators } from "@/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faChartLine } from "@fortawesome/free-solid-svg-icons";

export function GithubReportPage() {
  const [repoUrls, setRepoUrls] = useState<string[]>([""]);
  const [githubToken, setGithubToken] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    repoUrls?: { [key: number]: string };
    dateFrom?: string;
    dateTo?: string;
  }>({});

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    // Validate repository URLs
    const repoErrors: { [key: number]: string } = {};
    repoUrls.forEach((url, index) => {
      if (url.trim()) {
        const urlError = validators.githubUrl(url);
        if (urlError) repoErrors[index] = urlError;
      }
    });

    if (Object.keys(repoErrors).length > 0) {
      newErrors.repoUrls = repoErrors;
    }

    // Check if at least one repo URL is provided
    const hasValidRepos = repoUrls.some((url) => url.trim() !== "");
    if (!hasValidRepos) {
      newErrors.repoUrls = { 0: "Vui lòng nhập ít nhất một repository URL" };
    }

    // Validate dates if provided
    if (dateFrom || dateTo) {
      const dateErrors = validators.dateRange(dateFrom, dateTo);
      if (dateErrors.from) newErrors.dateFrom = dateErrors.from;
      if (dateErrors.to) newErrors.dateTo = dateErrors.to;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddRepo = () => {
    setRepoUrls([...repoUrls, ""]);
  };

  const handleRemoveRepo = (index: number) => {
    if (repoUrls.length > 1) {
      setRepoUrls(repoUrls.filter((_, i) => i !== index));
    }
  };

  const handleRepoChange = (index: number, value: string) => {
    const newUrls = [...repoUrls];
    newUrls[index] = value;
    setRepoUrls(newUrls);

    // Clear error for this field
    if (errors.repoUrls?.[index]) {
      const newRepoErrors = { ...errors.repoUrls };
      delete newRepoErrors[index];
      setErrors({
        ...errors,
        repoUrls:
          Object.keys(newRepoErrors).length > 0 ? newRepoErrors : undefined,
      });
    }
  };

  const handleGenerate = async () => {
    if (!validateForm()) {
      showToast.error("Vui lòng kiểm tra lại thông tin");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      showToast.info("Report generation will be implemented soon!");
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Github Contribution Report
        </h1>
        <p className="text-gray-600">
          Tạo báo cáo đóng góp chi tiết từ nhiều Github repositories
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Cấu hình Repository
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Repository URLs
            </label>
            <div className="space-y-3">
              {repoUrls.map((url, index) => (
                <div key={index}>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={url}
                      onChange={(e) => handleRepoChange(index, e.target.value)}
                      placeholder="https://github.com/username/repository"
                      className={`flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.repoUrls?.[index]
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    {repoUrls.length > 1 && (
                      <button
                        onClick={() => handleRemoveRepo(index)}
                        className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors flex items-center justify-center"
                        type="button"
                      >
                        <FontAwesomeIcon icon={faXmark} />
                      </button>
                    )}
                  </div>
                  {errors.repoUrls?.[index] && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.repoUrls[index]}
                    </p>
                  )}
                </div>
              ))}
              <button
                onClick={handleAddRepo}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                type="button"
              >
                + Thêm repository
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Github Token (Optional)
            </label>
            <input
              type="password"
              value={githubToken}
              onChange={(e) => setGithubToken(e.target.value)}
              placeholder="ghp_xxxxxxxxxxxx"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-sm text-gray-500 mt-1">
              Token giúp tăng rate limit và truy cập private repos
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Từ ngày
              </label>
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => {
                  setDateFrom(e.target.value);
                  if (errors.dateFrom)
                    setErrors({ ...errors, dateFrom: undefined });
                }}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.dateFrom ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.dateFrom && (
                <p className="text-red-600 text-sm mt-1">{errors.dateFrom}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Đến ngày
              </label>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => {
                  setDateTo(e.target.value);
                  if (errors.dateTo)
                    setErrors({ ...errors, dateTo: undefined });
                }}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.dateTo ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.dateTo && (
                <p className="text-red-600 text-sm mt-1">{errors.dateTo}</p>
              )}
            </div>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? "Đang tạo báo cáo..." : "Tạo báo cáo đóng góp"}
          </Button>
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-green-900 mb-2 flex items-center gap-2">
          <FontAwesomeIcon icon={faChartLine} />
          Báo cáo bao gồm
        </h3>
        <ul className="text-sm text-green-800 space-y-1">
          <li>• Tổng số commits của từng thành viên</li>
          <li>• Số dòng code thêm/xóa</li>
          <li>• Pull requests và reviews</li>
          <li>• Issues tạo và giải quyết</li>
          <li>• Biểu đồ hoạt động theo thời gian</li>
        </ul>
      </div>
    </div>
  );
}

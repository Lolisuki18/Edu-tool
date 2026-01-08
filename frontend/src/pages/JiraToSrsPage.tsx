import { useState } from "react";
import { Button } from "@/components/common";
import { showToast, validators } from "@/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";

export function JiraToSrsPage() {
  const [jiraUrl, setJiraUrl] = useState("");
  const [apiToken, setApiToken] = useState("");
  const [projectKey, setProjectKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    jiraUrl?: string;
    apiToken?: string;
    projectKey?: string;
  }>({});

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    const urlError = validators.jiraUrl(jiraUrl);
    if (urlError) newErrors.jiraUrl = urlError;

    const tokenError = validators.token(apiToken, "API Token");
    if (tokenError) newErrors.apiToken = tokenError;

    const keyError = validators.projectKey(projectKey);
    if (keyError) newErrors.projectKey = keyError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGenerate = async () => {
    if (!validateForm()) {
      showToast.error("Vui lòng kiểm tra lại thông tin");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      showToast.info("SRS generation will be implemented soon!");
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Jira to SRS Generator
        </h1>
        <p className="text-gray-600">
          Chuyển đổi Jira tickets thành tài liệu SRS (Software Requirements
          Specification)
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Cấu hình Jira
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Jira URL
            </label>
            <input
              type="text"
              value={jiraUrl}
              onChange={(e) => {
                setJiraUrl(e.target.value);
                if (errors.jiraUrl)
                  setErrors({ ...errors, jiraUrl: undefined });
              }}
              placeholder="https://your-domain.atlassian.net"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.jiraUrl ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.jiraUrl && (
              <p className="text-red-600 text-sm mt-1">{errors.jiraUrl}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              API Token
            </label>
            <input
              type="password"
              value={apiToken}
              onChange={(e) => {
                setApiToken(e.target.value);
                if (errors.apiToken)
                  setErrors({ ...errors, apiToken: undefined });
              }}
              placeholder="Your Jira API token"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.apiToken ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.apiToken && (
              <p className="text-red-600 text-sm mt-1">{errors.apiToken}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Key
            </label>
            <input
              type="text"
              value={projectKey}
              onChange={(e) => {
                setProjectKey(e.target.value.toUpperCase());
                if (errors.projectKey)
                  setErrors({ ...errors, projectKey: undefined });
              }}
              placeholder="PROJ"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.projectKey ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.projectKey && (
              <p className="text-red-600 text-sm mt-1">{errors.projectKey}</p>
            )}
          </div>

          <Button
            onClick={handleGenerate}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? "Đang tạo SRS..." : "Tạo tài liệu SRS"}
          </Button>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-blue-900 mb-2 flex items-center gap-2">
          <FontAwesomeIcon icon={faClipboardList} />
          Hướng dẫn
        </h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Nhập URL của Jira instance của bạn</li>
          <li>• Tạo API token từ Jira Account Settings</li>
          <li>• Nhập Project Key (ví dụ: PROJ, DEV, etc.)</li>
          <li>• Hệ thống sẽ tự động lấy tất cả issues và tạo SRS</li>
        </ul>
      </div>
    </div>
  );
}

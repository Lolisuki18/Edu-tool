// Validation utilities

export const validators = {
  // Email validation
  email: (value: string): string | null => {
    if (!value) return "Email là bắt buộc";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return "Email không hợp lệ";
    return null;
  },

  // Password validation
  password: (value: string, minLength = 6): string | null => {
    if (!value) return "Mật khẩu là bắt buộc";
    if (value.length < minLength)
      return `Mật khẩu phải có ít nhất ${minLength} ký tự`;
    return null;
  },

  // Required field validation
  required: (value: string, fieldName = "Trường này"): string | null => {
    if (!value || value.trim() === "") return `${fieldName} là bắt buộc`;
    return null;
  },

  // URL validation
  url: (value: string): string | null => {
    if (!value) return "URL là bắt buộc";
    try {
      new URL(value);
      return null;
    } catch {
      return "URL không hợp lệ";
    }
  },

  // Github URL validation
  githubUrl: (value: string): string | null => {
    if (!value) return null; // Optional
    if (!value.trim()) return null;

    const githubRegex = /^https:\/\/github\.com\/[\w-]+\/[\w.-]+\/?$/;
    if (!githubRegex.test(value.trim())) {
      return "URL phải có định dạng: https://github.com/username/repository";
    }
    return null;
  },

  // Jira URL validation
  jiraUrl: (value: string): string | null => {
    if (!value) return "Jira URL là bắt buộc";
    if (!value.includes("atlassian.net") && !value.includes("jira")) {
      return "URL phải là Jira instance hợp lệ";
    }
    return validators.url(value);
  },

  // Project key validation (uppercase letters and numbers)
  projectKey: (value: string): string | null => {
    if (!value) return "Project key là bắt buộc";
    const projectKeyRegex = /^[A-Z][A-Z0-9]*$/;
    if (!projectKeyRegex.test(value)) {
      return "Project key phải là chữ in hoa và số (VD: PROJ, DEV)";
    }
    return null;
  },

  // Date validation
  date: (value: string, fieldName = "Ngày"): string | null => {
    if (!value) return `${fieldName} là bắt buộc`;
    const date = new Date(value);
    if (isNaN(date.getTime())) return `${fieldName} không hợp lệ`;
    return null;
  },

  // Date range validation
  dateRange: (
    fromDate: string,
    toDate: string
  ): { from: string | null; to: string | null } => {
    const fromError = validators.date(fromDate, "Từ ngày");
    const toError = validators.date(toDate, "Đến ngày");

    if (!fromError && !toError) {
      const from = new Date(fromDate);
      const to = new Date(toDate);
      if (from > to) {
        return {
          from: null,
          to: "Ngày kết thúc phải sau ngày bắt đầu",
        };
      }
    }

    return { from: fromError, to: toError };
  },

  // Group name validation
  groupName: (value: string): string | null => {
    if (!value) return "Tên nhóm là bắt buộc";
    if (value.length < 2) return "Tên nhóm phải có ít nhất 2 ký tự";
    if (value.length > 50) return "Tên nhóm không được quá 50 ký tự";
    return null;
  },

  // Name validation
  name: (value: string): string | null => {
    if (!value) return "Họ tên là bắt buộc";
    if (value.length < 2) return "Họ tên phải có ít nhất 2 ký tự";
    if (value.length > 100) return "Họ tên không được quá 100 ký tự";
    return null;
  },

  // Token validation
  token: (value: string, fieldName = "Token"): string | null => {
    if (!value) return `${fieldName} là bắt buộc`;
    if (value.length < 10) return `${fieldName} không hợp lệ`;
    return null;
  },

  // Optional token (can be empty)
  optionalToken: (value: string): string | null => {
    if (!value || value.trim() === "") return null;
    if (value.length < 10) return "Token không hợp lệ";
    return null;
  },
};

export default validators;

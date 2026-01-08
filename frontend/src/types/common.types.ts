export type Status = "idle" | "loading" | "success" | "error";

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

export interface SelectOption {
  value: string;
  label: string;
}

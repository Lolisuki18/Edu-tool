import { useContext } from "react";
import { GroupContext } from "@/contexts/GroupContext";

export function useGroups() {
  const context = useContext(GroupContext);
  if (context === undefined) {
    throw new Error("useGroups must be used within a GroupProvider");
  }
  return context;
}

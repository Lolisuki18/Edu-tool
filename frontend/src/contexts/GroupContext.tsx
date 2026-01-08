import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { Group, GroupState, CreateGroupData } from "@/types/group.types";
import { STORAGE_KEYS } from "@/constants";

const GroupContext = createContext<GroupState | undefined>(undefined);

// Mock groups data
const MOCK_GROUPS: Group[] = [
  {
    id: "g1",
    name: "SE1801",
    description: "Software Engineering - Nhóm 1",
    teacherId: "2",
    memberCount: 5,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "g2",
    name: "SE1802",
    description: "Software Engineering - Nhóm 2",
    leaderId: "3",
    teacherId: "2",
    memberCount: 6,
    createdAt: "2026-01-02T00:00:00.000Z",
    updatedAt: "2026-01-02T00:00:00.000Z",
  },
];

export function GroupProvider({ children }: { children: ReactNode }) {
  const [groups, setGroups] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedGroups = localStorage.getItem(STORAGE_KEYS.GROUPS);
    if (savedGroups) {
      try {
        setGroups(JSON.parse(savedGroups));
      } catch (error) {
        console.error("Failed to parse groups data:", error);
        setGroups(MOCK_GROUPS);
      }
    } else {
      setGroups(MOCK_GROUPS);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(STORAGE_KEYS.GROUPS, JSON.stringify(groups));
    }
  }, [groups, isLoading]);

  const createGroup = async (data: CreateGroupData) => {
    setIsLoading(true);
    try {
      // TODO: Call backend API
      await new Promise((resolve) => setTimeout(resolve, 500));

      const newGroup: Group = {
        id: `g${Date.now()}`,
        name: data.name,
        description: data.description,
        teacherId: data.teacherId,
        memberCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setGroups((prev) => [...prev, newGroup]);
    } finally {
      setIsLoading(false);
    }
  };

  const updateGroup = async (id: string, data: Partial<Group>) => {
    setIsLoading(true);
    try {
      // TODO: Call backend API
      await new Promise((resolve) => setTimeout(resolve, 500));

      setGroups((prev) =>
        prev.map((group) =>
          group.id === id
            ? { ...group, ...data, updatedAt: new Date().toISOString() }
            : group
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const deleteGroup = async (id: string) => {
    setIsLoading(true);
    try {
      // TODO: Call backend API
      await new Promise((resolve) => setTimeout(resolve, 500));

      setGroups((prev) => prev.filter((group) => group.id !== id));
    } finally {
      setIsLoading(false);
    }
  };

  const getGroupsByTeacher = (teacherId: string) => {
    return groups.filter((group) => group.teacherId === teacherId);
  };

  return (
    <GroupContext.Provider
      value={{
        groups,
        isLoading,
        createGroup,
        updateGroup,
        deleteGroup,
        getGroupsByTeacher,
      }}
    >
      {children}
    </GroupContext.Provider>
  );
}

export function useGroups() {
  const context = useContext(GroupContext);
  if (context === undefined) {
    throw new Error("useGroups must be used within a GroupProvider");
  }
  return context;
}

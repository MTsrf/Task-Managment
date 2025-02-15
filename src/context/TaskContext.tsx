import { createContext, useState, ReactNode } from "react";

interface FilterState {
  status?: string;
  category?: string;
  date?: string;
  search?: string;
}
export type TaskProps = {
  id: string;
  title: string;
  date: string;
  status: string;
  category: string;
};

interface TaskContextType {
  error: string;
  isLoading: boolean;
  filters: FilterState;
  task: TaskProps[];
  setFilters: (filters: FilterState) => void;
  setTask: (task: TaskProps[]) => void;
  setError(error: string): void;
  setLoading(isLoading: boolean): void;
}

export const TaskContext = createContext<TaskContextType | undefined>(
  undefined
);

const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [filters, setFilters] = useState<FilterState>({});
  const [task, setTask] = useState<TaskProps[]>([]);
  const [error, setError] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);

  return (
    <TaskContext.Provider
      value={{
        filters,
        setFilters,
        task,
        setTask,
        error,
        setError,
        isLoading,
        setLoading,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;

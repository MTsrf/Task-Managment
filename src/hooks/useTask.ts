import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context)
    throw new Error("useTaskContext must be used within a TaskProvider");
  return context;
};

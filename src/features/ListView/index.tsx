import React from "react";
import TaskHeader from "./TaskHeader";
import TaskSection from "./TaskSection";
import { useTask } from "../../hooks/useTask";

const ListView = () => {
  const { task: tasks } = useTask();
  return (
    <div>
      <TaskHeader />
      <TaskSection
        title="Todo"
        color="#f8c8ff"
        tasks={tasks.filter((task) => task.status === "TO-DO") || []}
        addTask={true}
      />
      <TaskSection
        title="In-Progress"
        color="#85D9F1"
        tasks={tasks.filter((task) => task.status === "IN-PROGRESS") || []}
      />
      <TaskSection
        title="Completed"
        color="#CEFFCC"
        tasks={tasks.filter((task) => task.status === "COMPLETED") || []}
      />
    </div>
  );
};

export default ListView;

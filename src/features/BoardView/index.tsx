import { Row } from "antd";
import React from "react";

import SectionView from "./SectionView";
import { useTask } from "../../hooks/useTask";

const RowStyle: React.CSSProperties = {
  minHeight: "100vh",
  background: "white",
  display: "flex",
  gap: "16px",
  padding: "16px",
};

const defaultSections = ["TO-DO", "IN-PROGRESS", "COMPLETED"];
const BoardView = () => {
  const { task: tasks } = useTask();
  const groupedTasks = tasks.reduce((acc, task) => {
    if (!acc[task.status]) {
      acc[task.status] = [];
    }
    acc[task.status].push(task);
    return acc;
  }, {} as Record<string, typeof tasks>);

  const allSections = defaultSections.reduce((acc, status) => {
    acc[status] = groupedTasks[status] || [];
    return acc;
  }, {} as Record<string, typeof tasks>);

  return (
    <Row gutter={16} style={RowStyle} justify="start">
      {Object.entries(allSections).map(([status, tasks]) => (
        <SectionView key={status} title={status} tasks={tasks} />
      ))}
    </Row>
  );
};

export default BoardView;

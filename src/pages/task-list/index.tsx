import React, { useEffect } from "react";
import ListView from "../../features/ListView";
import { Container } from "../../components/common/StyledComponent/Common";
import { useSettings } from "../../hooks/useSettings";

import styled from "styled-components";
import BoardView from "../../features/BoardView";
import { ModalComponent } from "../../components/common/ModalComponent";
import FilterBar from "./FilterBar";
import { useQuery } from "@tanstack/react-query";
import { useTask } from "../../hooks/useTask";
import { getTask } from "../../service/taskService";
import { TaskProps } from "../../context/TaskContext";
import { Spin } from "antd";

const Header = styled.div`
  margin-bottom: 30px;
`;
const TaskList = () => {
  const {
    viewInfo: { view },
  } = useSettings();
  const { filters, setTask, isLoading: loading } = useTask();

  const { data, isLoading } = useQuery({
    queryKey: ["tasks", filters],
    queryFn: () => getTask(filters),
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (data) setTask(data as TaskProps[]);
  }, [data, setTask, isLoading]);

  const renderView = () => {
    switch (view) {
      case "list":
        return <ListView />;
      case "board":
        return <BoardView />;
      default:
        return <ListView />;
    }
  };

  return (
    <>
      <ModalComponent />
      <Container>
        <Header>
          <FilterBar />
        </Header>
        {isLoading || loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "50vh",
            }}
          >
            <Spin />
          </div>
        ) : (
          renderView()
        )}
      </Container>
    </>
  );
};

export default TaskList;

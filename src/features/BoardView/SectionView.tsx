import { Col, Dropdown, MenuProps, Spin, Tag } from "antd";
import React, { useState } from "react";
import styled from "styled-components";
import { H2 } from "../../components/common/StyledComponent/Typography";
import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { TaskProps } from "../../context/TaskContext";
import { formatTimestamp } from "../../lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "../../service/taskService";

const ColStyle: React.CSSProperties = {
  background: "#F1F1F1",
  borderRadius: "10px",
  border: "1px solid #F1F1F1",
  boxSizing: "border-box",
  padding: "12px",
  overflow: "hidden",
};

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TaskMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    font-size: 10px;
    color: #666;
    font-weight: 500;
    font-family: "Mulish", sans-serif;
  }
`;

const TaskContainer = styled.div`
  border: 1px solid rgba(88, 87, 81, 0.2);
  background: #ffffff;
  border-radius: 10px;
  margin-top: 10px;
  padding: 16px 16px 10px 16px;
  max-height: 110px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const Title = styled(Tag)<{ bgcolor: string }>`
  background: ${(props) => props.bgcolor || "black"};
  padding: 5px;
  font-family: "Mulish", sans-serif;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 10px;
`;
const DropdownWrapper = styled.div`
  display: inline-block;
`;
const OptionMenu = styled.div`
  display: flex;
  align-items: baseline;
  gap: 15px;
  font-weight: 500;
  font-family: "Mulish", sans-serif;

  &:hover {
    color: red;
  }
`;

const MoreButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px 8px;
  display: flex;
  align-items: center;

  &:hover {
    background: #f5f5f5;
    border-radius: 4px;
  }
`;
const SectionStyleView = {
  TitleColor: (title: string) => {
    switch (title) {
      case "TO-DO":
        return "#FAC3FF";
      case "IN-PROGRESS":
        return "#85D9F1";
      case "COMPLETED":
        return "#A2D6A0";
      default:
        return "black";
    }
  },
};

interface SectionViewProps {
  title: string;
  tasks: TaskProps[];
}

const TaskCard = ({ tasks }: { tasks: TaskProps }) => {
  const queryClient = useQueryClient();
  const { mutateAsync: deleteTaskMutation, isPending: isDeletePending } =
    useMutation({
      mutationFn: deleteTask,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
      },
    });
  const [open, setOpen] = useState(false);
  const OptionMenus: MenuProps["items"] = [
    {
      key: 1,
      label: (
        <OptionMenu>
          <EditOutlined />
          <span>Edit</span>
        </OptionMenu>
      ),
    },
    {
      key: 2,
      label: (
        <OptionMenu>
          <DeleteOutlined />
          <span>Delete</span>
        </OptionMenu>
      ),
    },
  ];
  return (
    <TaskContainer>
      <Header>
        <H2 fontSize="18px">
          {" "}
          {tasks.status === "COMPLETED" ? <s>{tasks.title}</s> : tasks.title}
        </H2>
        <DropdownWrapper>
          {isDeletePending ? (
            <Spin />
          ) : (
            <Dropdown
              menu={{
                items: OptionMenus,
                onClick: ({ key }) => {
                  if (key === "2") {
                    deleteTaskMutation(tasks.id);
                  }
                },
              }}
              trigger={["click"]}
              open={open}
              placement="bottomRight"
              onOpenChange={setOpen}
            >
              <MoreButton>
                <EllipsisOutlined />
              </MoreButton>
            </Dropdown>
          )}
        </DropdownWrapper>
      </Header>
      <TaskMeta>
        <span>{tasks.category}</span>
        <span>{formatTimestamp(Number(tasks.date))}</span>
      </TaskMeta>
    </TaskContainer>
  );
};
const SectionView: React.FC<SectionViewProps> = ({ title, tasks }) => {
  return (
    <Col span={7} className="gutter-row" style={ColStyle}>
      <Title bgcolor={SectionStyleView.TitleColor(title)}>{title}</Title>
      {tasks.length === 0 && <p> No Task</p>}
      {tasks.map((task) => (
        <TaskCard key={task.id} tasks={task} />
      ))}
    </Col>
  );
};

export default SectionView;

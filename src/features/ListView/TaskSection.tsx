import {
  CheckCircleFilled,
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Checkbox,
  Collapse,
  Dropdown,
  GetProp,
  MenuProps,
  Space,
  Spin,
} from "antd";
import React, { useState } from "react";
import styled from "styled-components";
import { H2 } from "../../components/common/StyledComponent/Typography";
import TaskForm from "./TaskForm";
import { Image } from "../../components/common/StyledComponent/IconImage";
import { STATUS_OPTIONS } from "../../lib/constant";
import { TaskProps } from "../../context/TaskContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask, updateTask } from "../../service/taskService";
import { formatTimestamp } from "../../lib/utils";
const { Panel } = Collapse;

const StyledCollapse = styled(Collapse)<{ bgcolor: string }>`
  margin-top: 20px;
  border-radius: 5px;
  border: none;
  background: ${(props) => props.bgcolor || "black"};
  border-radius: 10px;
  shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  .ant-collapse-content {
    background: #f1f1f1;

    .ant-collapse-content-box {
      padding: 0 !important;
    }
  }
`;

export const CheckboxField = styled(Checkbox)`
  width: 20px;
  height: 20px;
  border: 2px solid #979797;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  .ant-checkbox-inner {
    width: 20px;
    height: 20px;
    border-radius: 4px;
    border: 2px solid #979797;
    background: #fff;
  }

  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #7b1984;
    border-color: #7b1984;
  }

  .ant-checkbox-checked::after {
    display: none;
  }

  &:hover {
    .ant-checkbox-inner {
      border-color: #7b1984;
    }
  }
`;
const PanelHeader = styled.span`
  color: black;
  font-weight: 600;
  font-size: 16px;
  font-family: "Mulish", sans-serif;
`;

const PlusButton = styled(PlusOutlined)`
  font-size: 20px;
  color: #7b1984;
`;
const ButtonWrapper = styled.div`
  cursor: pointer;
  max-width: 200px;
  padding: 0px 30px;
  display: flex;
  gap: 10px;
  align-items: center;
`;
const TaskListContainer = styled.div`
  padding: 0;
`;
const TaskDate = styled.span`
  color: black;
  font-size: 14px;
  font-family: "Mulish", sans-serif;
`;

const SpaceWrap = styled(Space)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const DropdownWrapper = styled.div`
  display: inline-block;
`;

const CategoryTag = styled.span`
  color: black;
  font-size: 14px;
  font-family: "Mulish", sans-serif;
`;
const TaskItem = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  align-items: center;
  gap: 16px;
  padding: 13px 16px;
  border-bottom: 1px solid #dddadd;

  &:last-child {
    border-bottom: none;
  }
`;

const TaskIcon = styled.span`
  color: #666;
  display: flex;
  align-items: center;
`;

const TaskContent = styled.div`
  display: flex;
  align-items: center;
  font-family: "Mulish", sans-serif;
  gap: 10px;
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
const Divider = styled.div`
  padding: 13px 16px;
  border-bottom: 1px solid #dddadd;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StatusTag = styled.span`
  width: 150px;
  padding: 5px;
  border-radius: 4px;
  background: #dddadd;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.19);
  cursor: pointer;
  font-family: "Mulish", sans-serif;
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

interface TaskSectionProps {
  title: string;
  color: string;

  tasks: TaskProps[] | [];
  addTask?: boolean;
}

const TaskItemComponent = ({ task }: { task: TaskProps }) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [openOptions, setOpenOptions] = useState<boolean>(false);
  const { mutateAsync: deleteTaskMutation, isPending: isDeletePending } =
    useMutation({
      mutationFn: deleteTask,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
      },
    });
  const { mutateAsync: updateTaskMutation, isPending: isUpdatePending } =
    useMutation({
      mutationFn: ({ id, status }: { id: string; status: string }) =>
        updateTask(id, { status }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
      },
    });
  const StatusList: MenuProps["items"] = STATUS_OPTIONS.map((item, index) => {
    return {
      key: index + 1,
      label: item,
    };
  });

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

  const onChangeCheckBox: GetProp<typeof Checkbox.Group, "onChange"> = (
    checkedValues
  ) => {
    console.log("checked = ", checkedValues);
  };
  return (
    <TaskItem key={task.id}>
      <TitleContainer>
        <Checkbox.Group onChange={onChangeCheckBox}>
          <CheckboxField value={task.id} />
        </Checkbox.Group>
        <TaskContent>
          <TaskIcon>
            <Image src="/assets/img/svg/drag_icon.svg" alt="drag-icon" />
            {task.status === "COMPLETED" ? (
              <CheckCircleFilled
                style={{ fontSize: "17px", color: "#1B8D17" }}
              />
            ) : (
              <CheckCircleFilled
                style={{ fontSize: "17px", color: "#A9A9A9" }}
              />
            )}
          </TaskIcon>
          {task.status === "COMPLETED" ? <s>{task.title}</s> : task.title}
        </TaskContent>
      </TitleContainer>
      <TaskDate>{formatTimestamp(Number(task.date))}</TaskDate>
      {/* <StatusTag>{task.status}</StatusTag> */}
      <DropdownWrapper>
        {isUpdatePending ? (
          <Spin />
        ) : (
          <Dropdown
            menu={{
              items: StatusList,
              onClick: ({ key }) => {
                const count = Number(key);
                const status = STATUS_OPTIONS[count - 1];
                console.log({ status });
                if (key) {
                  updateTaskMutation({
                    id: task.id,
                    status: status,
                  });
                }
              },
            }}
            trigger={["click"]}
            open={open}
            placement="bottomLeft"
            onOpenChange={setOpen}
          >
            <StatusTag>{task.status}</StatusTag>
          </Dropdown>
        )}
      </DropdownWrapper>
      <SpaceWrap>
        <CategoryTag>{task.category}</CategoryTag>
        {isDeletePending ? (
          <Spin />
        ) : (
          <DropdownWrapper>
            <Dropdown
              menu={{
                items: OptionMenus,
                onClick: ({ key }) => {
                  if (key === "2") {
                    deleteTaskMutation(task.id);
                  }
                },
              }}
              trigger={["click"]}
              open={openOptions}
              placement="bottomLeft"
              onOpenChange={setOpenOptions}
            >
              <MoreButton>
                <EllipsisOutlined />
              </MoreButton>
            </Dropdown>
          </DropdownWrapper>
        )}
      </SpaceWrap>
    </TaskItem>
  );
};
const TaskSection: React.FC<TaskSectionProps> = ({
  color,
  title,

  tasks,
  addTask = false,
}) => {
  const [onVisibleForm, setOnVisibleForm] = useState<boolean>(false);
  const Count = tasks?.length || null;

  return (
    <>
      <StyledCollapse
        accordion
        expandIconPosition="end"
        bgcolor={color}
        defaultActiveKey={[title]}
      >
        <Panel
          header={
            <PanelHeader>{`${title} ${Count ? `(${Count})` : ""}`}</PanelHeader>
          }
          key={title}
        >
          {addTask && (
            <>
              <Divider>
                <ButtonWrapper onClick={() => setOnVisibleForm(true)}>
                  <PlusButton>+</PlusButton>
                  <H2 fontSize="14px" fontFamily="Mulish, sans-serif">
                    ADD TASK
                  </H2>
                </ButtonWrapper>
              </Divider>
              {onVisibleForm && (
                <Divider>
                  <TaskForm cancel={() => setOnVisibleForm(false)} />
                </Divider>
              )}
            </>
          )}
          <TaskListContainer>
            {tasks.map((task) => (
              <TaskItemComponent key={task.id} task={task} />
            ))}
          </TaskListContainer>
        </Panel>
      </StyledCollapse>
    </>
  );
};

export default TaskSection;

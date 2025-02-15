import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  message,
  Menu,
  Dropdown,
  FormInstance,
} from "antd";
import {
  CalendarOutlined,
  EnterOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import dayjs, { Dayjs } from "dayjs";
import { STATUS_OPTIONS } from "../../lib/constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTask } from "../../service/taskService";

const StyledForm = styled(Form)`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  align-items: center;
  gap: 10px;

  .ant-form-item-explain-error {
    font-size: 13px;
    font-family: "Mulish", sans-serif;
  }
`;
const StyledDatePicker = styled(DatePicker)`
  width: auto;
  border: 1px solid #d9d9d9;
  border-radius: 20px;
  padding: 5px 15px;
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  color: #333;
  font-family: "Mulish", sans-serif;
  font-size: 14px;
  width: 150px;

  &:hover,
  &:focus {
    border-color: #a0a0a0;
    box-shadow: none;
    background: none;
  }

  .ant-picker-input > input {
    font-size: 14px;
    color: #333;
    background: none;
  }
  .ant-picker-suffix {
    display: none;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-left: 50px;
`;

const TextField = styled(Input)`
  width: 100%;
  border: none !important;
  background: none !important;
  box-shadow: none !important;
  outline: none !important;
  font-family: "Mulish", sans-serif !important;
  font-size: 16px;
  color: #333;

  &::placeholder {
    font-size: 16px;
    color: #999;
  }

  &:focus {
    border: none !important;
    box-shadow: none !important;
  }
`;

const DropdownWrapper = styled.div`
  display: inline-block;
`;

const CancelButton = styled.button`
  background: none !important;
  border: none !important;
  shadow: none !important;
  font-family: "Mulish", sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: black;
  cursor: pointer;
`;

const CategoryOptions = ["WORK", "PERSONAL"];

const categoryItems = CategoryOptions.map((category) => ({
  key: category,
  label: category,
}));

interface FormValues {
  title: string;
  date: Dayjs | null;
  status: string;
  category: string;
}

interface TaskFormProps {
  cancel: () => void;
}
const TaskForm: React.FC<TaskFormProps> = ({ cancel }) => {
  const [form] = Form.useForm<FormValues>();
  const queryClient = useQueryClient();
  const { mutateAsync: addTaskMutation, isPending } = useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
  const [openStatus, setOpenStatus] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);

  useEffect(() => {
    form.setFieldsValue({
      title: "",
      date: null,
      status: "",
      category: "",
    });
  }, [form]);

  const onHandleCancel = () => {
    cancel();
    form.resetFields();
  };

  const onHandleDate = (date: unknown, dateString: string | string[]) => {
    if (date && date instanceof dayjs) {
      form.setFieldValue("date", date);
    } else {
      form.setFieldValue("date", null);
    }
  };

  const MenuStatus = (
    <Menu
      onClick={(value) => {
        form.setFieldValue("status", value.key);
        setOpenCategory(false);
      }}
    >
      {STATUS_OPTIONS.map((status) => (
        <Menu.Item key={status}>{status}</Menu.Item>
      ))}
    </Menu>
  );

  const MenuCategory = (
    <Menu
      onClick={(value) => {
        form.setFieldValue("category", value.key);
        setOpenCategory(false);
      }}
      items={categoryItems}
    ></Menu>
  );

  const handleSubmit = async (values: any) => {
    const { date, ...rest } = values;
    const timestamp = date ? date.valueOf() : null;
    try {
      await addTaskMutation({
        ...rest,
        date: timestamp,
      });
      message.success("Task added successfully!");
    } catch (error) {
      message.error("Failed to add task.");
    } finally {
      onHandleCancel();
    }
  };

  return (
    <StyledForm
      form={form as FormInstance<unknown>}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{
        title: "",
        date: null,
        status: "",
        category: "",
      }}
    >
      <Form.Item
        style={{ marginLeft: "50px" }}
        name="title"
        rules={[{ required: true, message: "Field is required" }]}
      >
        <TextField placeholder="Task title" />
      </Form.Item>

      <Form.Item
        name="date"
        rules={[{ required: true, message: "Field is required" }]}
      >
        <StyledDatePicker
          format="DD-MM-YYYY"
          placeholder="Add date"
          prefix={<CalendarOutlined />}
          onChange={onHandleDate}
        />
      </Form.Item>

      <Form.Item
        name="status"
        rules={[{ required: true, message: "Field is required" }]}
      >
        <DropdownWrapper>
          <Dropdown
            overlay={MenuStatus}
            trigger={["click"]}
            open={openStatus}
            placement="bottomLeft"
            onOpenChange={setOpenStatus}
          >
            <Button shape="circle" icon={<PlusOutlined />} />
          </Dropdown>
        </DropdownWrapper>
      </Form.Item>

      <Form.Item
        name={"category"}
        rules={[{ required: true, message: "Field is required" }]}
      >
        <DropdownWrapper>
          <Dropdown
            overlay={MenuCategory}
            trigger={["click"]}
            open={openCategory}
            placement="bottomLeft"
            onOpenChange={setOpenCategory}
          >
            <Button shape="circle" icon={<PlusOutlined />} />
          </Dropdown>
        </DropdownWrapper>
      </Form.Item>

      <ButtonContainer>
        <Button
          type="primary"
          htmlType="submit"
          icon={<EnterOutlined />}
          iconPosition="end"
          style={{ borderRadius: "20px" }}
          loading={isPending}
        >
          ADD
        </Button>
        <CancelButton onClick={onHandleCancel} type="button">
          CANCEL
        </CancelButton>
      </ButtonContainer>
    </StyledForm>
  );
};

export default TaskForm;

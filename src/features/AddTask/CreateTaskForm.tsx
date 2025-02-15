// CreateTaskForm.tsx
import React, { useState } from "react";
import { Form, Select, Button, FormInstance, message } from "antd";

import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import dayjs, { Dayjs } from "dayjs";
import {
  BodyContent,
  CloseIcon,
  FieldContainer,
  FooterContainer,
  ImageContainer,
  ImagePreview,
  ImageWrapper,
  Label,
  QuillContainer,
  StyledDatePicker,
  StyledDragger,
  StyledRadioButton,
  StyledRadioGroup,
  StyledUploadContainer,
  StyleSelect,
  TextField,
} from "./CreateTaskForm.style";
import { STATUS_OPTIONS } from "../../lib/constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTask } from "../../service/taskService";
import { useSettings } from "../../hooks/useSettings";

const { Option } = Select;
interface FormValues {
  title: string;
  date: Dayjs | null;
  status: string;
  category: string;
  description: string;
  file: any;
}

export const CreateTaskForm: React.FC = () => {
  const {
    ModalInfo: { closeModal },
  } = useSettings();
  const queryClient = useQueryClient();
  const addTaskMutation = useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [form] = Form.useForm<FormValues>();
  const [charCount, setCharCount] = useState(0);

  const { quill, quillRef } = useQuill({
    modules: {
      toolbar: [
        ["bold", "italic", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
      ],
    },
    placeholder: "Enter description...",
    theme: "snow",
  });

  React.useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        const text = quill.getText().trim();
        if (text.length > 300) {
          quill.deleteText(300, quill.getLength());
        } else {
          form.setFieldValue("description", quill.root.innerHTML);
          setCharCount(text.length);
        }
      });
    }
  }, [quill, form]);

  const onHandleDate = (date: unknown, dateString: string | string[]) => {
    if (date && date instanceof dayjs) {
      form.setFieldValue("date", date);
    } else {
      form.setFieldValue("date", null);
    }
  };
  const onFinish = async (values: FormValues) => {
    const { file, date, ...rest } = values;
    const timestamp = date ? date.valueOf() : null;
    try {
      await addTaskMutation.mutate({
        ...rest,
        date: timestamp,
      });

      message.success("Task added successfully!");
      closeModal();
    } catch (error) {
      message.error("Failed to add task.");
    }
  };

  return (
    <Form
      form={form as FormInstance<FormValues>}
      onFinish={onFinish}
      layout="vertical"
      requiredMark={false}
      initialValues={{
        title: "",
        date: null,
        status: "",
        category: "",
        description: "",
      }}
    >
      <BodyContent>
        <Form.Item name="title" rules={[{ required: true }]}>
          <TextField placeholder="Task Title" />
        </Form.Item>
        <Form.Item name={"description"}>
          <QuillContainer>
            <div ref={quillRef} style={{ height: "150px" }} />
            <p className="char-count">{charCount}/300 characters</p>
          </QuillContainer>
        </Form.Item>
        <FieldContainer>
          <Form.Item
            name="category"
            rules={[{ required: true }]}
            label={<Label>Task Category*</Label>}
            style={{ flex: 1 }}
          >
            <StyledRadioGroup
            // onChange={(e) => setCategory(e.target.value)}
            // value={category}
            >
              <StyledRadioButton value="WORK">Work</StyledRadioButton>
              <StyledRadioButton value="PERSONAL">Personal</StyledRadioButton>
            </StyledRadioGroup>
          </Form.Item>
          <Form.Item
            name="date"
            label={<Label>Due on*</Label>}
            style={{ flex: 1 }}
            rules={[{ required: true }]}
          >
            <StyledDatePicker
              format="DD-MM-YYYY"
              placeholder="DD/MM/YYYY"
              onChange={onHandleDate}
            />
          </Form.Item>
          <Form.Item
            label={<Label>Task Status*</Label>}
            name="status"
            rules={[{ required: true }]}
            style={{ flex: 1 }}
          >
            <StyleSelect placeholder="Choose">
              {STATUS_OPTIONS?.map((option, index) => (
                <Option value={option} key={index}>
                  {option}
                </Option>
              ))}
            </StyleSelect>
          </Form.Item>
        </FieldContainer>

        <Form.Item label="Attachment" name="file">
          <StyledUploadContainer>
            <StyledDragger
              showUploadList={false}
              beforeUpload={(file) => {
                form.setFieldValue("file", file);
                setUploadedFile(file); // Store file in state

                // Generate preview for image files
                if (file.type.startsWith("image/")) {
                  const reader = new FileReader();
                  reader.onload = (e) =>
                    setFilePreview(e.target?.result as string);
                  reader.readAsDataURL(file);
                } else {
                  setFilePreview(null);
                }

                return false; // Prevent automatic upload
              }}
            >
              <p>
                Drop your files here or <span>Update</span>
              </p>
            </StyledDragger>
            <ImageContainer>
              {filePreview && (
                <ImageWrapper>
                  <CloseIcon
                    onClick={() => {
                      setFilePreview(null);
                      setUploadedFile(null);
                      form.setFieldValue("file", null);
                    }}
                  />
                  <ImagePreview src={filePreview} alt="Preview" />{" "}
                </ImageWrapper>
              )}

              {uploadedFile && !filePreview && (
                <p>Uploaded file: {uploadedFile.name}</p>
              )}
            </ImageContainer>
          </StyledUploadContainer>
        </Form.Item>
      </BodyContent>
      <Form.Item>
        <FooterContainer>
          <Button
            style={{ borderRadius: "20px" }}
            onClick={() => {
              closeModal();
            }}
          >
            CANCEL
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            style={{ borderRadius: "20px" }}
          >
            CREATE
          </Button>
        </FooterContainer>
      </Form.Item>
    </Form>
  );
};

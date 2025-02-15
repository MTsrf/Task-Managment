import { CloseCircleOutlined } from "@ant-design/icons";
import { DatePicker, Input, Radio, Select, Upload } from "antd";
import styled from "styled-components";

const { Dragger } = Upload;

export const StyledUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Mulish", sans-serif;
`;

export const BodyContent = styled.div`
  padding: 10px 20px;
`;

export const StyledDragger = styled(Dragger)`
  .ant-upload {
    width: 100%;
    border-radius: 8px;
    background: #f9f9f9 !important;
    text-align: center;
    border: 0;
  }
  .ant-upload > .ant-upload-btn {
    padding: 6px 0px 0px;
    border: 1px solid #d9d9d9;
    font-size: 14px;
    font-family: "Mulish", sans-serif;

    span {
      color: #2956dd;
      text-decoration: underline;
    }
  }

  .ant-upload-hint {
    color: #666;
  }
`;

export const TextField = styled(Input)`
  background: #f1f1f1;
  padding: 10px;
  border-radius: 10px;
  font-size: 16px;
  font-family: "Mulish", sans-serif;

  &:hover {
    border: 1px solid #d9d9d9;
    background: #f1f1f1;
  }
  &:focus {
    border: 1px solid #d9d9d9;
    background: #f1f1f1;
    outline: none;
    box-shadow: none;
  }
`;

export const StyledDatePicker = styled(DatePicker)`
  width: 200px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  padding: 5px 15px;
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  color: #333;
  font-family: "Mulish", sans-serif;
  font-size: 14px;
  background: #f1f1f1;

  &:hover,
  &:focus {
    border-color: #a0a0a0;
    box-shadow: none;
    background: #f1f1f1;
  }

  .ant-picker-input > input {
    font-size: 14px;
    color: #333;
    background: #f1f1f1;
  }
`;

export const QuillContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: 150px;
  max-height: 200px;
  background-color: #f1f1f1;
  border-radius: 10px;

  .ql-toolbar {
    background-color: #f1f1f1;
    border: 0;
    padding: 5px;
    left: 2px;
    bottom: 2px;
    position: absolute;
    z-index: 1;
  }
  .ql-toolbar + .ql-container {
    border-top: 1px solid #d9d9d9 !important;
  }

  .ql-container {
    background-color: #;
    border-radius: 10px;
    border: 1px solid #d9d9d9;
  }
  .ql-toolbar.ql-snow {
    border: 0;
  }
  .ql-editor {
    overflow-y: auto;
    min-height: 120px;
    max-height: 150px;
  }

  .char-count {
    text-align: right;
    font-size: 12px;
    color: gray;
    margin-top: 4px;
    position: absolute;
    bottom: 0px;
    right: 10px;
    z-index: 1;
  }
`;

export const FieldContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StyledRadioGroup = styled(Radio.Group)`
  display: flex;
  gap: 12px;
`;

export const StyledRadioButton = styled(Radio.Button)`
  border: 1px solid #d9d9d9 !important;
  border-radius: 20px !important;
  font-size: 16px;
  font-weight: 500;
  color: #000;
  background: #fff;
  transition: all 0.3s ease-in-out;
  font-family: "Mulish", sans-serif;

  &:hover {
    border-color: #7b1984 !important;
    color: #7b1984;
  }

  &.ant-radio-button-wrapper-checked {
    background: #7b1984 !important;
    color: white !important;
    border-color: #7b1984 !important;
  }

  &.ant-radio-button-wrapper:not(:first-child)::before {
    display: none !important;
  }
`;
export const StyledUpload = styled(Upload)`
  .ant-upload {
    width: 100%;
    border: 1px solid #d9d9d9 !important;
    border-radius: 8px;
    background: #fff;
    text-align: center;
    font-size: 16px;
    color: #999;
    transition: all 0.3s ease-in-out;
  }
`;

export const Label = styled.span`
  font-size: 16px;
  font-family: "Mulish", sans-serif;
`;

export const StyleSelect = styled(Select)`
  width: 100%;
  border: 1px solid #d9d9d9 !important;
  border-radius: 8px;
  background-color: #f1f1f1;
  font-size: 16px;
  color: #999;
  transition: all 0.3s ease-in-out;

  &:hover {
    border: 1px solid #d9d9d9 !important;
  }

  .ant-select-selector {
    background-color: #f1f1f1 !important;
    border: 1px solid #d9d9d9;
    &:hover {
      border: 1px solid #d9d9d9 !important;
    }
    &:focus,
    &:active {
      background-color: #f1f1f1 !important;
      border: 1px solid #d9d9d9 !important;
    }
  }
`;

export const FooterContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 20px 24px;
  border-top: 1px solid #d9d9d9;
  background: #f1f1f1;
  border-radius: 0 0 8px 8px;
  gap: 12px;
`;

export const ImageContainer = styled.div`
  width: 100%;
  height: 100px;
`;

export const ImageWrapper = styled.div`
  margin-top: 12px;
  width: 100px;
  height: 100px;
  border-radius: 5px;
  border: 1px solid #d9d9d9;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

export const ImagePreview = styled.img`
  margin-top: 12px;
  max-width: 100%;
  height: auto;
  border-radius: 5px;
  border: 1px solid #d9d9d9;
`;

export const CloseIcon = styled(CloseCircleOutlined)`
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
`;

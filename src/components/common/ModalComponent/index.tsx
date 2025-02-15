import React from "react";
import { Modal } from "antd";
import { useSettings } from "../../../hooks/useSettings";
import styled from "styled-components";

const ModalStyle = styled(Modal)`
  .ant-modal-content {
    padding: 0px;
  }
  .ant-modal-content > .ant-modal-close > .ant-modal-close-x {
    color: #000000 !important;
  }
  .ant-modal-content > .ant-modal-header {
    padding: 20px 24px;
    border-bottom: 1px solid #f1f1f1;
  }
  .ant-modal-content > .ant-modal-header > .ant-modal-title {
    font-weight: 600 !important;
    font-family: "Mulish", sans-serif !important;
    font-size: 24px !important;
  }
`;
export const ModalComponent: React.FC = () => {
  const { ModalInfo } = useSettings();
  const { closeModal, isModalOpen, modalContent } = ModalInfo;

  return (
    <ModalStyle
      open={isModalOpen}
      onCancel={closeModal}
      footer={null}
      width={800}
      title={"Create Task"}
    >
      {modalContent}
    </ModalStyle>
  );
};

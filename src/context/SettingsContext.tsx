import React from "react";

type ViewType = "list" | "board";

type ViewInformationProps = {
  view: ViewType;
  toggleView: (view: ViewType) => void;
};
type ModalInformationProps = {
  isModalOpen: boolean;
  modalContent: React.ReactNode;
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
};
interface SettingsContextType {
  viewInfo: ViewInformationProps;
  ModalInfo: ModalInformationProps;
}

const SettingsContext = React.createContext<SettingsContextType | undefined>(
  undefined
);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [view, setView] = React.useState<ViewType>("list");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalContent, setModalContent] = React.useState<React.ReactNode>(null);

  const toggleView = (newView: ViewType) => {
    setView(newView);
  };
  const openModal = (content: React.ReactNode) => {
    console.log({ content });
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  const ProviderValue = {
    viewInfo: { view, toggleView },
    ModalInfo: {
      isModalOpen: isModalOpen,
      modalContent: modalContent,
      openModal: openModal,
      closeModal: closeModal,
    },
  };
  return (
    <SettingsContext.Provider value={ProviderValue}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsContext;

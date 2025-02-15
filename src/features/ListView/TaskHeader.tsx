import React from "react";
import styled from "styled-components";
import { Image } from "../../components/common/StyledComponent/IconImage";

const HeaderContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 16px;
  padding: 12px 16px;
  border-top: 1px solid #f0f0f0;
  margin-top: 20px;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const HeaderItem = styled.div<{ $clickable?: boolean }>`
  color: #6e6e6e;
  font-weight: 500;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: ${(props) => (props.$clickable ? "pointer" : "default")};
  user-select: none;
`;

interface Column {
  key: string;
  title: string;
  sortable: boolean;
}

const columns: Column[] = [
  { key: "taskName", title: "Task name", sortable: false },
  { key: "dueDate", title: "Due on", sortable: true },
  { key: "status", title: "Task Status", sortable: false },
  { key: "category", title: "Task Category", sortable: false },
];
const TaskHeader = () => {
  return (
    <HeaderContainer>
      {columns.map((column) => (
        <HeaderItem
          key={column.key}
          $clickable={column.sortable}
          //   onClick={() => column.sortable && handleSort(column.key)}
        >
          {column.title}
          {column.sortable && (
            <Image size="10px" src="/assets/img/svg/Sort.svg" alt="sort-icon" />
          )}
        </HeaderItem>
      ))}
    </HeaderContainer>
  );
};

export default TaskHeader;

import React from "react";
import { Select, DatePicker, Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useSettings } from "../../hooks/useSettings";
import { CreateTaskForm } from "../../features/AddTask/CreateTaskForm";
import { useTask } from "../../hooks/useTask";

const { Option } = Select;

const FilterBarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: space-between;
  padding: 10px;
  width: 100%;
  font-family: "Mulish", sans-serif;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  span {
    font-size: 12px;
    font-weight: 500;
  }

  @media (max-width: 768px) {
    order: 2; /* Moves to center */
    justify-content: center;
    width: 100%;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  span {
    font-size: 12px;
    font-weight: 500;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

const StyledSelect = styled(Select)`
  width: 120px;

  .ant-select-selector {
    padding: 30px;
    border-radius: 30px !important;
  }
`;

const StyledDatePicker = styled(DatePicker)`
  border-radius: 20px;
`;

const StyledInput = styled(Input)`
  width: 200px;
  border-radius: 20px;

  @media (max-width: 768px) {
    order: 3;
    text-align: center;
  }
`;

const AddTaskButton = styled(Button)`
  color: white;
  border-radius: 20px;
  padding: 5px 20px;
  font-weight: bold;

  @media (max-width: 768px) {
    width: 100%;
    order: 1;
  }
`;

const FilterBar: React.FC = () => {
  const { filters, setFilters } = useTask();
  const {
    ModalInfo: { openModal },
  } = useSettings();

  return (
    <FilterBarContainer>
      <FilterGroup>
        <span>Filter by:</span>
        <div>
          <StyledSelect
            placeholder="Category"
            onChange={(category) => {
              console.log({ category });
              setFilters({ ...filters, category: category as string });
            }}
          >
            <Option value="WORK">WORK</Option>
            <Option value="PERSONAL">PERSONAL</Option>
          </StyledSelect>
          <StyledDatePicker placeholder="Due Date" />
        </div>
      </FilterGroup>
      <Divider>
        <StyledInput
          suffix={<SearchOutlined />}
          placeholder="Search"
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />
        <AddTaskButton
          type="primary"
          onClick={() => openModal(<CreateTaskForm />)}
        >
          ADD TASK
        </AddTaskButton>
      </Divider>
    </FilterBarContainer>
  );
};

export default FilterBar;

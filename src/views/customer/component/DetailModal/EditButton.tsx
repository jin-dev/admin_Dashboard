import React from 'react';
import { Button } from 'react-rainbow-components';

type Props = {
  label: string;
  editMode: boolean;
  loading: boolean;
  handleEditmode?: () => void;
  handleReset: () => void;
  handleSubmit: () => void;
};

const EditButton = ({
  label,
  editMode,
  loading,
  handleEditmode,
  handleReset,
  handleSubmit,
}: Props) => {
  const clickReset = () => {
    handleReset();
    handleEditmode && handleEditmode();
  };
  return editMode ? (
    <div>
      <Button
        label="저장"
        variant="success"
        onClick={handleSubmit}
        isLoading={loading}
      />
      <Button label="취소" onClick={clickReset} />
    </div>
  ) : (
    <Button label={label} variant="brand" onClick={handleEditmode} />
  );
};

export default EditButton;

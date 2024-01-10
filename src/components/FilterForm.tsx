import React from "react";
import { TextField, Box } from "@mui/material";

interface FilterFormProps {
  onFilterChange: (value: string) => void;
}

// FilterForm component declaration
const FilterForm: React.FC<FilterFormProps> = ({ onFilterChange }) => {
  // Function to handle input changes in the TextField
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    onFilterChange(value);
  };

  return (
    <Box mb={2}>
      {/* TextField for filtering by name */}
      <TextField
        label="Filter by Name"
        variant="standard"
        fullWidth
        onChange={handleInputChange}
      />
    </Box>
  );
};

export default FilterForm;

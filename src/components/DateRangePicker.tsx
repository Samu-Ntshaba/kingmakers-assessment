import React, { useEffect } from "react";
import { Box, TextField } from "@mui/material";

interface DateRangePickerProps {
  onDateRangeChange: (startDate: string, endDate: string) => void;
  startDate: string;
  endDate: string;
}

// DateRangePicker component declaration
const DateRangePicker: React.FC<DateRangePickerProps> = ({
  onDateRangeChange,
  startDate,
  endDate,
}) => {
  // Function to handle changes in the Start Date TextField
  const handleStartDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newStartDate = event.target.value;
    validateAndSetDates(newStartDate, endDate);
  };

  // Function to handle changes in the End Date TextField
  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEndDate = event.target.value;
    validateAndSetDates(startDate, newEndDate);
  };

  // Function to validate dates and trigger date range change
  const validateAndSetDates = (newStartDate: string, newEndDate: string) => {
    if (new Date(newEndDate) >= new Date(newStartDate)) {
      onDateRangeChange(newStartDate, newEndDate);
    } else {
      onDateRangeChange(newStartDate, newStartDate);
    }
  };

  // Effect hook to set small screen state based on window width
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 600);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // State for tracking small screen size
  const [isSmallScreen, setIsSmallScreen] = React.useState<boolean>(
    window.innerWidth < 600
  );

  return (
    <Box mb={2}>
      {/* Start Date TextField */}
      <TextField
        label="Start Date"
        type="date"
        variant="outlined"
        value={startDate}
        size="small"
        onChange={handleStartDateChange}
        fullWidth={isSmallScreen}
        style={{ margin: isSmallScreen ? "10px 0" : "0 10px" }}
        InputLabelProps={{
          shrink: true,
        }}
      />
      {/* End Date TextField */}
      <TextField
        label="End Date"
        type="date"
        variant="outlined"
        value={endDate}
        size="small"
        onChange={handleEndDateChange}
        fullWidth={isSmallScreen}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          min: startDate,
        }}
      />
    </Box>
  );
};

export default DateRangePicker;

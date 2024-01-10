// Utility functions related to date manipulation
const dateUtils = {
  // Function to format date as a string
  formatDate: (date: Date): string => {
    return new Intl.DateTimeFormat("en-US").format(date);
  },

  // Function to check if a date falls within a specified range
  isWithinDateRange: (date: Date, startDate: Date, endDate: Date): boolean => {
    return date >= startDate && date <= endDate;
  },
};

export default dateUtils;

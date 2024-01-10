import { useState } from "react";
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Box,
  Button,
} from "@mui/material";
import DateRangePicker from "../DateRangePicker";
import FilterForm from "../FilterForm";
import styles from "./CampaignList.module.css";

interface Campaign {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  budget: number;
}

interface CampaignListProps {
  campaigns: Campaign[];
  updateCampaigns: (newCampaigns: Campaign[]) => void;
}

const CampaignList: React.FC<CampaignListProps> = ({ campaigns }) => {
  // States for filtering and pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  // Function to handle search input change
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setPage(1);
  };

  // Function to handle date range selection change
  const handleDateRangeChange = (start: string, end: string) => {
    setStartDate(start);
    setEndDate(end);
  };

  // Filtering campaigns based on search term and date range
  const filteredCampaigns = campaigns.filter((campaign) => {
    const startDateInRange =
      startDate === "" || new Date(campaign.startDate) >= new Date(startDate);
    const endDateInRange =
      endDate === "" || new Date(campaign.endDate) <= new Date(endDate);

    return (
      campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      startDateInRange &&
      endDateInRange
    );
  });

  // Pagination logic
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = page * itemsPerPage;
  const paginatedCampaigns = filteredCampaigns.slice(startIndex, endIndex);

  return (
    <Paper className={styles.CampaignList}>
      <Box p={2} className={styles.campaignTable}>
        {/* Filter form and date range picker */}
        <div className={styles.filterContainer}>
          <FilterForm onFilterChange={handleSearchChange} />
          <div className={styles.inputField}>
            <DateRangePicker
              onDateRangeChange={handleDateRangeChange}
              startDate={startDate}
              endDate={endDate}
            />
          </div>
        </div>

        {/* Table displaying campaign data */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Budget (USD)</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedCampaigns.map((campaign) => (
                <TableRow
                  key={campaign.id}
                  style={{
                    backgroundColor:
                      new Date(campaign.endDate) >= new Date()
                        ? "#B9F6CA"
                        : "#EF9A9A",
                  }}
                >
                  <TableCell>{campaign.name}</TableCell>
                  <TableCell>{campaign.startDate}</TableCell>
                  <TableCell>{campaign.endDate}</TableCell>
                  <TableCell>{campaign.budget}</TableCell>
                  <TableCell>
                    {new Date(campaign.endDate) >= new Date()
                      ? "Active"
                      : "Inactive"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination buttons */}
        <Box mt={2} display="flex" justifyContent="center">
          <Button
            variant="outlined"
            onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
            disabled={page === 1}
          >
            Prev
          </Button>
          <Typography variant="body1" style={{ margin: "0 10px" }}>
            Page {page}
          </Typography>
          <Button
            variant="outlined"
            onClick={() =>
              setPage((prevPage) =>
                startIndex + itemsPerPage < filteredCampaigns.length
                  ? prevPage + 1
                  : prevPage
              )
            }
            disabled={endIndex >= filteredCampaigns.length}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default CampaignList;

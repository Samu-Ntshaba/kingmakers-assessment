import React, { useState, useEffect } from "react";
import CampaignList from "./components/CampaignList/CampaignList";
import { Campaign } from "./types";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

// Extend the Window interface to declare the addCampaigns method
declare global {
  interface Window {
    addCampaigns?: (newCampaigns: Campaign[]) => void;
  }
}

const App: React.FC = () => {
  // State for storing the campaigns
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  // Function to add new campaigns
  const addCampaigns = (newCampaigns: Campaign[]) => {
    setCampaigns((prevCampaigns) => [...prevCampaigns, ...newCampaigns]);
  };

  // Load initial campaign data on component mount
  useEffect(() => {
    const staticCampaigns: Campaign[] = [
      {
        id: 1,
        name: "Divavu",
        startDate: "9/19/2017",
        endDate: "3/9/2018",
        budget: 88377,
      },
      {
        id: 2,
        name: "Active Example",
        startDate: "9/19/2017",
        endDate: "3/9/2024",
        budget: 88377,
      },
      {
        id: 3,
        name: "Jaxspan",
        startDate: "11/21/2017",
        endDate: "2/21/2018",
        budget: 608715,
      },
      {
        id: 4,
        name: "Miboo",
        startDate: "11/1/2017",
        endDate: "6/20/2017",
        budget: 239507,
      },
      {
        id: 5,
        name: "Other Example",
        startDate: "11/1/2024",
        endDate: "3/9/2024",
        budget: 88377,
      },
      {
        id: 6,
        name: "Trilith",
        startDate: "8/25/2017",
        endDate: "11/30/2017",
        budget: 179838,
      },
      {
        id: 7,
        name: "Layo",
        startDate: "11/28/2017",
        endDate: "3/10/2018",
        budget: 837850,
      },
      {
        id: 8,
        name: "Photojam",
        startDate: "7/25/2017",
        endDate: "6/23/2017",
        budget: 858131,
      },
      {
        id: 9,
        name: "Blogtag",
        startDate: "6/27/2017",
        endDate: "1/15/2018",
        budget: 109078,
      },
      {
        id: 10,
        name: "Rhyzio",
        startDate: "10/13/2017",
        endDate: "1/25/2018",
        budget: 272552,
      },
      {
        id: 11,
        name: "Zoomcast",
        startDate: "9/6/2017",
        endDate: "11/10/2017",
        budget: 301919,
      },
      {
        id: 12,
        name: "Realbridge",
        startDate: "3/5/2018",
        endDate: "10/2/2017",
        budget: 505602,
      },
    ];

    // Get the current date
    const currentDate = new Date();

    // Update campaigns with additional 'active' property based on current date
    const updatedCampaigns = staticCampaigns.map((campaign) => {
      const campaignStartDate = new Date(campaign.startDate);
      const campaignEndDate = new Date(campaign.endDate);
      const isActive =
        currentDate >= campaignStartDate && currentDate <= campaignEndDate;

      return {
        ...campaign,
        active: isActive,
      };
    });

    // Assign the addCampaigns function to the window object
    window.addCampaigns = (newCampaigns: Campaign[]) => {
      addCampaigns(newCampaigns);
    };

    // Set the campaigns state with the updated campaign data
    setCampaigns(updatedCampaigns);
  }, []);

  return (
    <div>
      {/* Header component */}
      <Header />

      {/* CampaignList component */}
      <CampaignList campaigns={campaigns} updateCampaigns={addCampaigns} />

      {/* Footer component */}
      <Footer />
    </div>
  );
};

export default App;

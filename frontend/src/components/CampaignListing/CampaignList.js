import React, { useState, useEffect } from "react";
import { getCampaigns } from "../../services/api";
import "./CampaignList.css";

const CampaignList = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const campaignsData = await getCampaigns();
        if (campaignsData && campaignsData.data) {
          setCampaigns(campaignsData.data);
        } else {
          setError("No campaigns found");
        }
      } catch (err) {
        console.error("Error fetching campaigns:", err);
        setError("Failed to fetch campaigns");
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  const getAudienceSize = (audience) => {
    if (Array.isArray(audience)) {
      const sizeInfo = audience.find((aud) => aud.audienceSize !== undefined);
      return sizeInfo ? sizeInfo.audienceSize : "N/A";
    }
    return "N/A";
  };

  if (loading) {
    return <div>Loading campaigns...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2 className="heading">Past Campaigns</h2>
      {campaigns.length === 0 ? (
        <p>No campaigns available.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th className="message-column">Message</th>
              <th className="sentAt-column">Sent At</th>
              <th>Status</th>
              <th>Audience Size</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign) => (
              <tr key={campaign._id}>
                <td className="message-column">{campaign.message}</td>
                <td className="sentAt-column">
                  {new Date(campaign.sentAt).toLocaleString()}
                </td>
                <td>{campaign.status}</td>
                <td>{getAudienceSize(campaign.audience)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CampaignList;

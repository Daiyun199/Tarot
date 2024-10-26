import React from "react";
import "./socialMetric.scss";

const socialData = [
  { platform: "Facebook", friends: 89000, feeds: 459 },
  { platform: "Twitter", followers: 973000, tweets: 1792 },
  { platform: "LinkedIn", contacts: 500, feeds: 1292 },
  { platform: "Events", events: "12+", meetings: 4 },
];

const SocialMetrics: React.FC = () => (
  <div className="card-grid">
    {socialData.map((item, index) => (
      <div key={index} className="card">
        <h4>{item.platform}</h4>
        <p>Followers: {item.friends || item.followers || item.contacts}</p>
        <p>Feeds: {item.feeds || item.tweets || item.meetings}</p>
      </div>
    ))}
  </div>
);

export default SocialMetrics;

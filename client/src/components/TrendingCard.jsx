import React, { useEffect, useState } from "react";
import "../styles/trendingcard.css";
import axios from "axios";

function TrendingCard() {
  const [isActive, setIsActive] = useState(false);

  const [trends, setTrends] = useState([]);

  useEffect(() => {
    const fetchHashtags = async () => {
      try {
        // Fetch hashtags
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}${"/api/posts/hashtags"}`,
          { withCredentials: true }
        );
        setTrends(response.data);
      } catch (error) {
        console.error("Error getting user data:", error.response.data);
      }
    };

    fetchHashtags();
  }, []);

  const downArrow = (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z"
          fill="#0F0F0F"
        ></path>{" "}
      </g>
    </svg>
  );

  const rightArrow = (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          d="M10 7L15 12L10 17"
          stroke="#000000"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>{" "}
      </g>
    </svg>
  );

  const toggleTrends = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="trendingCard">
      <div onClick={toggleTrends} className="top">
        <h3>Trending 🔥</h3>
        {isActive ? downArrow : rightArrow}
      </div>
      <div className={`trends ${isActive ? "active" : ""}`}>
        {trends?.map((trend, id) => {
          return (
            <div className="trend">
              <p className="trendName">{trend.hashtag}</p>
              <p>{trend.count} posts</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TrendingCard;

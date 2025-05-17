// SentimentPieChart.jsx
import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import axios from "axios";
import Sidebar from "./Sidebar";

const SentimentPieChart = () => {
  const [sentimentCounts, setSentimentCounts] = useState({
    positive: 0,
    negative: 0,
  });

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/aireview-analysis/" //fetch api from backend
        );
        const { keywords = [], summary = "" } = response.data;

        const counts = keywords.reduce(
          (acc, sentiment) => {
            if (sentiment === "positive") acc.positive += 1;
            else if (sentiment === "negative") acc.negative += 1;
            return acc;
          },
          { positive: 0, negative: 0 }
        );

        setSentimentCounts(counts);
      } catch (error) {
        console.error("Error fetching sentiment data:", error);
      }
    };

    fetchFeedback();
  }, []);

  const data = {
    labels: ["Positive", "Negative"],
    datasets: [
      {
        data: [sentimentCounts.positive, sentimentCounts.negative],
        backgroundColor: ["#66BB6A", "#EF5350"],
        hoverBackgroundColor: ["#81C784", "#E57373"],
      },
    ],
  };

  return (
    <div className="flex flex-col md:flex-row pt-16">
      <Sidebar />
      <h1 className="text-2xl font-bold mb-4 text-yellow-400 text-center">
        Weekly AI Review Sentiment Analysis
      </h1>
      <div className="flex flex-col items-left justify-center min-h-screen bg-black-100">
        <p className="mb-4">
          This chart shows the sentiment distribution of the feedback received.
        </p>
        <div style={{ width: "400px", margin: "0 auto" }}>
          <h3 className="text-green-500">Overall Feedback</h3>
          <Pie data={data} />
          <a
            className="bg-blue-600 hover:bg-green-700 text-white text-sm px-3 py-1 rounded-lg transition-all"
            href="/pages/admin/admin-dashboard"
          >
            Back to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
};

export default SentimentPieChart;

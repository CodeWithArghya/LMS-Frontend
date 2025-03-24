import React, { useState, useEffect } from "react";

const Coming = () => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const countDownDate = new Date("May 10, 2025 11:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();

      const distance = countDownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance > 0) {
        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      } else {
        setTimeLeft("MAINTAINANCE OVER ");

        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "0px" }}>
      <p style={{ fontSize: "30px" }}>{timeLeft}</p>
    </div>
  );
};

export default Coming;

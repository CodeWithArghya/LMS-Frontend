import React from "react";
import Coming from "../components/Comming";

export default function MaintainancePage() {
  return (
    <div className="container">
      <h1 className="text-center text-danger m-2">
        Site is Under Maintainance
      </h1>

      <h4 className="text-center text-primary">Please Try Again Later</h4>

      <div className="container text-center">
        <img
          src="assets/img/maintainance.jpg"
          alt="Main"
          style={{
            maxWidth: "100%",
            height: "auto",
            marginBottom: "20px",
            margin: "auto",
          }}
        />
      </div>
      <h4 className="text-center bg-dark text-warning m-2 p-2">
        Visit this page after ::
        <span className="text-info">
          <Coming />
        </span>
      </h4>
    </div>
  );
}

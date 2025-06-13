import React, { useState } from "react";
import "../App.css";

function Question() {
  const [result, setResult] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  const handleImageUpload = (event) => {
    setImage(event.target.files[0]);
    setResult(null); // Reset result when a new image is uploaded
    setError(null); // Reset error message
  };

  const fetchApiResponse = async () => {
    if (!image) {
      setError("Please upload an image before generating the analysis!");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://13.204.77.147:8000/api/object/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error analyzing the image!");
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error:", error);
      setError(
        "An error occurred while fetching the analysis. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="text-center w-full max-w-lg p-4 border border-gray-300 shadow-lg rounded-lg">
        <label htmlFor="imageInput" className="font-medium block mb-2">
          Upload your Drawing image here:
        </label>
        <input
          type="file"
          id="imageInput"
          accept="image/*"
          onChange={handleImageUpload}
          className="mb-2 border p-2 w-full rounded-md"
        />
        <button
          onClick={fetchApiResponse}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-300 w-full"
        >
          {loading ? "Generating..." : "Click me"}
        </button>

        {loading && (
          <div className="mt-3 text-center">
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
              <div className="bg-blue-600 h-2.5 rounded-full animate-pulse"></div>
            </div>
            <p>Processing... Please wait.</p>
          </div>
        )}
      </div>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {result ? (
        <div className="w-full max-w-lg border border-gray-300 shadow-lg rounded-lg p-4">
          <h2 className="text-center text-xl font-bold text-red-500">
            This is a <span className="text-blue-500">{result.question}</span>
          </h2>
          <button
            onClick={() => setOpen(!open)}
            className="w-full mt-3 px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md transition duration-300"
          >
            {open ? "Hide Questions & Answers" : "View Questions & Answers"}
          </button>
          {open && (
            <div className="mt-4 max-h-64 overflow-y-auto p-2 border border-gray-200 rounded-lg">
              {Array.isArray(result.ans) && result.ans.length > 0 ? (
                result.ans.map((qa, index) => (
                  <div
                    key={index}
                    className="mb-3 p-3 border border-gray-200 rounded-lg shadow-sm"
                  >
                    <p>
                      <strong>Question:</strong>{" "}
                      <span className="text-red-500">{qa.question}</span>
                    </p>
                    <p>
                      <strong>Answer:</strong>{" "}
                      <span className="text-green-500">{qa.answer}</span>
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-red-500 text-center">
                  No questions and answers available, reload the image again.
                </p>
              )}
            </div>
          )}
        </div>
      ) : (
        <p className="text-center text-red-500">
          Upload Your Drawing image here then Click "Generate".
        </p>
      )}
    </div>
  );
}

export default Question;

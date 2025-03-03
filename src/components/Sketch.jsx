import React, { useRef, useState, useEffect } from "react";

const DrawingCanvas = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [ctx, setCtx] = useState(null);
  const [color, setColor] = useState("black"); // Default brush color
  const [isErasing, setIsErasing] = useState(false); // Toggle for eraser

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 700; // Set canvas width
    canvas.height = 500; // Set canvas height
    const context = canvas.getContext("2d");

    // Set up the canvas background color
    context.fillStyle = "white"; // Set background to white
    context.fillRect(0, 0, canvas.width, canvas.height); // Fill the canvas with the background color

    context.lineWidth = 2;
    context.lineCap = "round";
    setCtx(context);
  }, []);

  const startDrawing = (e) => {
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };
  const handleReload = () => {
    window.location.reload(); // Reloads the entire page
  };

  const draw = (e) => {
    if (!isDrawing) return;

    if (isErasing) {
      // Set the stroke style to white to act as an eraser
      ctx.strokeStyle = "white";
    } else {
      // Set the stroke style to the selected color
      ctx.strokeStyle = color;
    }

    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };

  const stopDrawing = () => {
    ctx.closePath();
    setIsDrawing(false);
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;

    // Ensure the background remains visible in the downloaded image
    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");

    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;

    // Set the background color
    tempCtx.fillStyle = "white";
    tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

    // Draw the current canvas content on top of the background
    tempCtx.drawImage(canvas, 0, 0);

    // Convert the temp canvas to a data URL
    const image = tempCanvas.toDataURL("image/jpeg");

    // Create a download link
    const link = document.createElement("a");
    link.href = image;
    link.download = "drawing.jpg"; // Default file name
    link.click();
  };

  return (
    <div className="flex flex-col space-y-4 items-center">
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="border border-gray-300 shadow-lg"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />

      {/* Tools */}
      <div className="flex space-x-4 items-center">
        {/* Color Picker */}
        <div className="flex items-center space-x-2">
          <label htmlFor="colorPicker" className="font-medium">
            Select Color:
          </label>
          <input
            id="colorPicker"
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-10 h-10 p-1 border border-gray-300 rounded-lg shadow-sm"
          />
        </div>

        {/* Eraser Button */}
        <button
          onClick={() => setIsErasing(!isErasing)}
          className={`px-4 py-2 rounded-lg shadow-md text-white font-semibold transition duration-300 ${
            isErasing
              ? "bg-green-500 hover:bg-green-600"
              : "bg-red-500 hover:bg-red-600"
          }`}
        >
          {isErasing ? "Pencil" : "Eraser"}
        </button>

        {/* Download Button */}
        <button
          onClick={downloadImage}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-300"
        >
          Download as JPEG
        </button>

        <button
          onClick={handleReload}
          className="px-4 py-2 bg-yellow-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transition duration-300"
        >
          Reset
        </button>
      </div>
      <a
        href="/student/student-dashboard"
        className="px-4 py-2 bg-green-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transition duration-300"
      >
        Back to Dashboard
      </a>
    </div>
  );
};

export default DrawingCanvas;

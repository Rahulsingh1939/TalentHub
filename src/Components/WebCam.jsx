import React, { Fragment, useEffect, useState, useRef } from "react";
import Webcam from "react-webcam";
import axios from "axios";

function WebCamera() {
  const webcamRef = useRef(null);
  const captureInterval = useRef(null);
  const [isCameraOpen, setIsCameraOpen] = useState(true);

  // Fetch all image files
  let captureCount = 1;
  const captureImage = () => {
    capture();
    console.log('Image being captured')
    captureCount--;
    if (captureCount <= 0) {
      clearInterval(captureInterval.current);
      setIsCameraOpen(false);
    }
  };
  useEffect(() => {
    captureInterval.current = setInterval(captureImage, 5000);
    return () => clearInterval(captureInterval.current);
  }, []);



  const dataURLtoBlob = (dataURL) => {
    const byteString = window.atob(dataURL.split(",")[1]);
    const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];

    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  const capture = async () => {
    const imageSrc = webcamRef.current.getScreenshot({
      width: 1280,
      height: 720,
    });
    const blob = dataURLtoBlob(imageSrc);
    const formData = new FormData();
    formData.append("file", blob, "image.jpg");
    const response = await axios.post(
      `${import.meta.env.VITE_REACT_APP_URL}/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.status === 201) {
      console.log("Image uploaded successfully!");
    } else {
      console.error(`Error uploading image: ${response.status}`);
    }
  };

  const cameraBox = {
    marginTop: "50px",
    textAlign: "center",
  };
  const cameraAPIStyle = {
    border: "4px solid #d1d1d1",
    borderRadius: "20px",
    width: "36rem",
  };
  return (
    <Fragment>
      <div style={cameraBox}>
        {isCameraOpen && (
          <Webcam
            style={cameraAPIStyle}
            mirrored={true}
            audio={false}
            screenshotFormat="image/jpeg"
            ref={webcamRef}
          />
        )}
      </div>
    </Fragment>
  );
}
export default WebCamera;

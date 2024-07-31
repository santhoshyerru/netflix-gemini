import React from "react";
import { FaTimes } from "react-icons/fa";

const VideoPopup = ({ videoKey, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="relative w-full max-w-4xl h-[80vh]">
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white hover:text-gray-300"
        >
          <FaTimes size={24} />
        </button>
        <iframe
          src={`https://www.youtube.com/embed/${videoKey}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </div>
    </div>
  );
};

export default VideoPopup;

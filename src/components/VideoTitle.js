import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[20%] px-6 md:px-24 absolute text-white bg-gradient-to-r from-black ">
      <h1 className="text-2xl md:text-6xl font-bold">{title}</h1>
      <p className="hidden md:inline-block py-6 text-lg w-1/2 overflow-hidden text-ellipsis line-clamp-3">
        {overview}
      </p>

      <div className="my-2 md:my-0">
        <button className="bg-white text-black py-1 md:py-4 px-3 md:px-12 mx-2 text-xl hover:bg-opacity-80 rounded-lg">
          ▶️play
        </button>
        <button className="hidden md:inline-block bg-gray-500 text-black p-4 w px-12 mx-2 text-xl bg-opacity-50 rounded-lg">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;

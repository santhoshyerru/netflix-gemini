import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IMG_CDN_URL, API_OPTIONS } from "../utils/constants";
import { FaArrowLeft, FaPlay, FaPause } from "react-icons/fa";
import VideoPopup from "./VideoPopup";
import Header from "./Header";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showText, setShowText] = useState(true);
  const trailerRef = useRef(null);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    if (isPlaying) {
      setTimeout(() => setShowOverlay(true), 1000);
      setTimeout(() => setShowOverlay(false), 6000);
    } else {
      setShowOverlay(false);
    }
  }, [isPlaying]);
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const [movieResponse, videosResponse] = await Promise.all([
          fetch(
            `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
            API_OPTIONS
          ),
          fetch(
            `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
            API_OPTIONS
          ),
        ]);
        const movieData = await movieResponse.json();
        const videosData = await videosResponse.json();
        setMovie(movieData);
        setVideos(videosData.results);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  useEffect(() => {
    if (videos.length > 0) {
      const timer = setTimeout(() => {
        setIsPlaying(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [videos]);

  useEffect(() => {
    let textTimer;
    if (isPlaying) {
      textTimer = setTimeout(() => {
        setShowText(false);
      }, 5000);
    } else {
      setShowText(true);
    }

    return () => clearTimeout(textTimer);
  }, [isPlaying]);

  if (!movie) return <div>Loading...</div>;

  const trailerVideo =
    videos.find((video) => video.type === "Trailer") || videos[0];

  const togglePlayPause = () => {
    if (trailerRef.current) {
      if (isPlaying) {
        trailerRef.current.contentWindow.postMessage(
          '{"event":"command","func":"pauseVideo","args":""}',
          "*"
        );
      } else {
        trailerRef.current.contentWindow.postMessage(
          '{"event":"command","func":"playVideo","args":""}',
          "*"
        );
      }
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <div className="relative">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-15 left-4 z-20 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all duration-300"
        >
          <FaArrowLeft size={24} />
        </button>
        <div className="relative h-[70vh] w-screen overflow-hidden ">
          {isPlaying && trailerVideo ? (
            <div className="relative w-full h-full">
              <iframe
                ref={trailerRef}
                src={`https://www.youtube.com/embed/${trailerVideo.key}?enablejsapi=1&autoplay=1&mute=1&controls=0&showinfo=0&rel=0&modestbranding=1&loop=1&playlist=${trailerVideo.key}`}
                title={trailerVideo.name}
                className="w-screen h-[70vh] md:h-screen object-cover aspect-video bg-black bg-opacity-50"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <img
              src={`${IMG_CDN_URL}${movie.backdrop_path}`}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0  bg-black bg-opacity-50 "></div>
          <div
            className={`absolute inset-0 flex flex-col justify-start p-8 ml-16 mt-80 transition-opacity duration-1000 ${
              showOverlay ? "opacity-100" : "opacity-0"
            }`}
          >
            <h1 className="hidden md:inline-block text-4xl  font-bold text-white mb-4">
              {movie.title}
            </h1>
            <p className=" hidden md:inline-block text-white w-1/4 mb-4">
              {movie.overview}
            </p>
          </div>
          <div
            className={`absolute inset-0 flex items-center transition-all duration-1000 ${
              isPlaying ? "translate-x-[-100%]" : ""
            }`}
          >
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3">
                  <img
                    src={`${IMG_CDN_URL}${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full rounded-lg shadow-lg"
                  />
                </div>
                <div
                  className={`md:w-2/3 md:pl-8 mt-4 md:mt-0 transition-opacity duration-1000 ${
                    showText ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <h1 className="hidden md:inline-block text-4xl font-bold text-white mb-4">
                    {movie.title}
                  </h1>
                  <p className="hidden md:inline-block text-xl text-gray-300 mb-4">
                    {movie.tagline}
                  </p>
                  <p className="hidden md:inline-block text-white mb-4">
                    {movie.overview}
                  </p>
                  <div className="hidden md:inline-block text-gray-300">
                    <p>Release Date: {movie.release_date}</p>
                    <p>Runtime: {movie.runtime} minutes</p>
                    <p>
                      Genres:{" "}
                      {movie.genres.map((genre) => genre.name).join(", ")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={togglePlayPause}
            className="absolute bottom-4 right-4 z-20 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all duration-300"
          >
            {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
          </button>
        </div>
        <div className="bg-black">
          {" "}
          <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold text-white mb-4">More Clips</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {videos.map((video) => (
                <div
                  key={video.id}
                  className="relative cursor-pointer"
                  onClick={() => setSelectedVideo(video)}
                >
                  <img
                    src={`https://img.youtube.com/vi/${video.key}/0.jpg`}
                    alt={video.name}
                    className="w-full rounded-lg"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <FaPlay
                      size={48}
                      className="text-white opacity-75 hover:opacity-100 transition-opacity"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {selectedVideo && (
          <VideoPopup
            videoKey={selectedVideo.key}
            onClose={() => setSelectedVideo(null)}
          />
        )}
      </div>
    </>
  );
};

export default MovieDetails;

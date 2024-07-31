import React, { useState, useEffect, useCallback, useRef } from "react";
import { GENRES, IMG_CDN_URL, API_OPTIONS } from "../utils/constants";
import { Link } from "react-router-dom";
const MovieCard = ({ movie }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [trailer, setTrailer] = useState(null);
  const timeoutRef = useRef(null);

  const posterPath = movie?.poster_path;
  const movieTitle = movie?.title;
  const movieId = movie?.id;
  const genresList = movie?.genre_ids?.map(
    (id) => GENRES.find((genre) => genre.id === id)?.name
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
    if (!trailer) {
      timeoutRef.current = setTimeout(() => {
        getMovieVideos();
      }, 1500); // Reduced delay for faster response
    }
  }, [trailer]);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setTrailer(null);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const getMovieVideos = async () => {
    if (trailer) return; // Avoid refetching if we already have the trailer
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        API_OPTIONS
      );
      const json = await data.json();

      const filteredData = json.results?.filter(
        (video) => video.type === "Trailer"
      );
      const trailerVideo = filteredData?.length
        ? filteredData[0]
        : json.results?.[0];

      setTrailer(trailerVideo);
    } catch (error) {
      console.error("Error fetching movie trailer:", error);
    }
  };

  if (!posterPath) return null;

  return (
    <Link to={`/movie/${movieId}`} className="block">
      <div
        className="w-36 md:w-48 relative overflow-hidden  shadow-lg transition-all duration-300 ease-in-out cursor-pointer"
        style={{
          transform: isHovering ? "scale(1.05)" : "scale(1)",
          zIndex: isHovering ? 10 : 1,
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative w-full h-0 pb-[150%]">
          {" "}
          {/* Adjust aspect ratio as needed */}
          {isHovering && trailer ? (
            <iframe
              className="absolute top-0 left-0 w-full h-full object-cover"
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&modestbranding=1&loop=1&playlist=${trailer.key}`}
              title={trailer.name}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <img
              alt="Movie Poster"
              src={IMG_CDN_URL + posterPath}
              className="absolute top-0 left-4 w-full h-full object-cover"
            />
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-white font-bold text-lg mb-1">{movieTitle}</h3>
            <p className="text-gray-300 text-xs">{genresList?.join(", ")}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;

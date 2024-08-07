import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";
const GptMovieSuggestions = () => {
  const { movieNames, moviesResults } = useSelector((store) => store.gpt);
  if (!movieNames) {
    return null;
  }

  return (
    <div className="p-4 m-4 bg-black bg-opacity-70 text-white">
      <div>
        {movieNames.map((movieName, index) => (
          <MovieList
            key={movieName}
            title={movieName}
            movies={moviesResults[index]}
          />
        ))}
      </div>
    </div>
  );
};

export default GptMovieSuggestions;

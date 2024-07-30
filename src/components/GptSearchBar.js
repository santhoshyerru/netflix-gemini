import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import openai from "../utils/openAi";
import { API_OPTIONS } from "../utils/constants";
import { addGptMoviesResult } from "../utils/gptSlice";
import { GoogleGenerativeAI } from "@google/generative-ai";
const GptSearchBar = () => {
  const langkey = useSelector((store) => store.config.lang);
  const searchText = useRef();
  const dispatch = useDispatch();
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };
  const handleGptSearchClick = async () => {
    console.log(searchText.current.value);
    const gptQuery =
      "Act as a Movie Recommendation System and suggest some movies for the query" +
      searchText.current.value +
      "Only give me names of 5 movies, comma separated like the example result given ahead. Example Result: Gadar, sholay, Gabbar, Big Man, Bad Boys";
    // Make an APi call to open ai and get the movie results
    // const gptResults = await openai.chat.completions.create({
    //   messages: [{ role: "user", content: gptQuery }],
    //   model: "gpt-3.5-turbo",
    // });
    // console.log(gptResults);
    const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(gptQuery);
    const response = await result.response;
    const movieNames = response.text().split(",");
    const promises = movieNames.map((movie) => searchMovieTMDB(movie));
    const movieResults = await Promise.all(promises);

    dispatch(
      addGptMoviesResult({ movieNames: movieNames, movieResults: movieResults })
    );
    console.log("movie details", movieResults);
  };
  return (
    <div className="pt-[35%] md:pt-[10%] flex justify-center">
      <form
        className="w-full md:w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          type="text"
          className="p-4 m-4 col-span-9"
          ref={searchText}
          placeholder={lang[langkey].gptSearchPlaceholder}
        />
        <button
          className="py-2 px-4 m-4 bg-red-700 text-white rounded-lg col-span-3"
          onClick={handleGptSearchClick}
        >
          {lang[langkey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;

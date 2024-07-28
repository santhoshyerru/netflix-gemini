import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addNowPlayingMovies, addPopularMovies, addTopRatedMovies, addUpcomingMovies } from "../utils/moviesSlice";
import { API_OPTIONS } from "../utils/constants";

const useUpcomingMovies = ()=>{
    const dispatch = useDispatch();

    const getUpcomingMovies= async() =>{
        const latestMovies= await fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', API_OPTIONS)
        const json = await latestMovies.json();
       
        dispatch(addUpcomingMovies(json.results))
      }
      useEffect(()=>{
        getUpcomingMovies();
      },[])
}
export default useUpcomingMovies;
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addNowPlayingMovies, addPopularMovies, addTopRatedMovies } from "../utils/moviesSlice";
import { API_OPTIONS } from "../utils/constants";

const useTopRatedMovies = ()=>{
    const dispatch = useDispatch();

    const getTopRatedMovies= async() =>{
        const latestMovies= await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', API_OPTIONS)
        const json = await latestMovies.json();
       
        dispatch(addTopRatedMovies(json.results))
      }
      useEffect(()=>{
        getTopRatedMovies();
      },[])
}
export default useTopRatedMovies;
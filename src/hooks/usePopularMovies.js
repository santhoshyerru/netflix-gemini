import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addNowPlayingMovies, addPopularMovies } from "../utils/moviesSlice";
import { API_OPTIONS } from "../utils/constants";

const usePopularMovies = ()=>{
    const dispatch = useDispatch();

    const getPopularMovies = async() =>{
        const latestMovies= await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', API_OPTIONS)
        const json = await latestMovies.json();
       
        dispatch(addPopularMovies(json.results))
      }
      useEffect(()=>{
        getPopularMovies();
      },[])
}
export default usePopularMovies;
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../utils/moviesSlice";
import { API_OPTIONS } from "../utils/constants";

const useNowPlayingMovies = ()=>{
    const dispatch = useDispatch();

    const getNowPlaying = async() =>{
        const latestMovies= await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', API_OPTIONS)
        const json = await latestMovies.json();
       
        dispatch(addNowPlayingMovies(json.results))
      }
      useEffect(()=>{
        getNowPlaying();
      },[])
}
export default useNowPlayingMovies;
import { useEffect, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { Plane } from "react-loader-spinner";

import { MovieType } from "./types";
import { MainComp, Character } from "./components";
import image from "./assets/starwars.png";
import "./App.css";

function App() {
  const [movies, setMovies] = useState<MovieType>({
    count: "",
    next: null,
    previous: null,
    results: [],
  });
  const [movie, setMovie] = useState<string>("");

  const handleGetChar = (val: any) => {
    if (movies) {
      setMovie(val);
    }
  };

  const getMovies = async () => {
    const data = await fetch("https://swapi.dev/api/films");
    const result = await data.json();
    setMovies(result);
  };

  const getMovie = () => {
    if (movies.results !== undefined)
      return movies?.results.filter((cur: any) => cur.title === movie);
    return []
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="main-app-container">
      {movies.results ? (
        <motion.div>
          <MainComp
            title={movies.results.map((cur: any) => ({
              title: cur.title,
            }))}
            setMovieFn={handleGetChar}
            marqueeTxt={
              getMovie().length !== 0 ? getMovie()[0].opening_crawl : ""
            }
          />
          {getMovie().length !== 0 ? (
            <div className="table-display">
              <motion.div className="main-app-table-section">
                <Character apiArr={getMovie()[0].characters} />
              </motion.div>
            </div>
          ) : (
            <div className="no-table">
              <span>
                <Plane ariaLabel="loading-indicator" color="yellow" />
                <p className="no-table-txt">please select a movie</p>
              </span>
            </div>
          )}
        </motion.div>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            className="loader-container"
          >
            <div>
              <img src={image} alt="star wars" className="loader-img" />
              <Plane ariaLabel="loading-indicator" color="yellow" />
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}

export default App;

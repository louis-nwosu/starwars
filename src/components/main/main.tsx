import { FC, useState } from "react";

import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";

import image from "../../assets/starwars.png";
import "./styles.css";

interface MainCompProps {
  title: Array<{ title: string }>;
  setMovieFn: (val: string) => void;
  marqueeTxt: string | undefined;
}

export const MainComp: FC<MainCompProps> = ({
  title,
  setMovieFn,
  marqueeTxt,
}) => {
  const [movie, setMovie] = useState("");
  const handleSetMovie = (e: any) => {
    setMovie(e.target.value);
  };
  const handleMovie = () => setMovieFn(movie);

  return (
    <motion.div className="sw-logo-container">
      <div>
        <img src={image} alt="star wars" className="main-comp-img" />
      </div>
      <span className="sw-main-btn-container">
        <select
          id="pet-select"
          value={movie}
          onChange={handleSetMovie}
          className="option-comp"
        >
          <option value="">Please choose an option</option>
          {title?.map((cur) => (
            <option value={cur.title} key={cur.title}>{cur.title}</option>
          ))}
        </select>
        <button onClick={handleMovie}>Search</button>
      </span>
      {movie ? (
        <Marquee gradient={false} delay={3}>
          <p className="marquee-txt">{marqueeTxt}</p>
        </Marquee>
      ) : null}
    </motion.div>
  );
};

export { MainComp as default };

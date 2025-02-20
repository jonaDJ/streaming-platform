import React from "react";
import { MovieProps } from "@/lib/types";
import MovieCard from "./MovieCards";
import useDynamicItemWidth from "../hooks/useDynamicItemWidth";

interface GridCardsProps {
  movies: MovieProps[];
}

const GridCards: React.FC<GridCardsProps> = ({ movies }) => {
  const { itemWidth } = useDynamicItemWidth();

  return (
    <div
      className={`grid gap-y-8`}
      style={{
        gridTemplateColumns: `repeat(auto-fill, minmax(${itemWidth}, 1fr))`,
        gridAutoColumns: `minmax(${itemWidth}, 1fr)`,
      }}
    >
      {movies.length > 0 ? (
        movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} baseWidth={itemWidth} />
        ))
      ) : (
        <p className="text-white text-center col-span-full">
          No results found.
        </p>
      )}
    </div>
  );
};

export default GridCards;

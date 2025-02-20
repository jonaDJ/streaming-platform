import { MovieProps } from "@/lib/types";
import { useState, useEffect } from "react";
import { LeftArrowIcon, RightArrowIcon } from "./icons/Icons";
import Wrapper from "./layout/Wrapper";
import MovieCard from "./ui/MovieCards";
import useDynamicItemWidth from "./hooks/useDynamicItemWidth";

interface ScrollSectionProps {
  movies: MovieProps[];
  title: string;
}

const ScrollSection: React.FC<ScrollSectionProps> = ({ movies, title }) => {
  const [hovered, setHovered] = useState(false);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const { scrollRef, itemWidth } = useDynamicItemWidth();

  useEffect(() => {
    if (!scrollRef.current) return;

    const scrollContainer = scrollRef.current;
    const handleScroll = () => {
      if (!scrollRef.current) return;
      const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
      setIsAtStart(scrollLeft <= 5);
      setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 5);
    };

    scrollContainer.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      scrollContainer?.removeEventListener("scroll", handleScroll);
    };
  }, [scrollRef]);

  const scrollToDirection = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    const containerWidth = scrollRef.current.clientWidth;
    const scrollAmount = containerWidth * 0.92;
    const offset = direction === "left" ? -scrollAmount : scrollAmount;

    scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <section className="mt-10">
      <Wrapper>
        <h2 className="text-h2 font-semibold mb-1 md:mb-2 lg:mb-3 xl:mb-4">
          {title}
        </h2>
      </Wrapper>
      <div
        className="m-0 relative touch-action-pan-y"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <button
          onClick={() => scrollToDirection("left")}
          className="absolute left-0 top-0 bottom-0 flex items-center justify-center z-30  transition-opacity duration-200 shadow-md"
          style={{ width: "4%" }}
        >
          {!isAtStart && (
            <span className="bg-black bg-opacity-60 w-full h-full flex items-center justify-center hover:bg-opacity-30">
              {hovered && <LeftArrowIcon />}
            </span>
          )}
        </button>

        <div
          ref={scrollRef}
          className="px-[4%] grid relative grid-flow-col grid-rows-1 overflow-x-auto scroll-smooth hide-scrollbar transition-all duration-300"
          style={{
            gridTemplateColumns: `repeat(auto-fill, minmax(${itemWidth}, 1fr))`,
            gridAutoColumns: `minmax(${itemWidth}, 1fr)`,
          }}
        >
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} baseWidth={itemWidth} />
          ))}
        </div>

        <button
          onClick={() => scrollToDirection("right")}
          className="absolute right-0 top-0 bottom-0 flex items-center justify-center z-30 rounded-r-md  transition-opacity duration-200 shadow-md"
          style={{ width: "4%" }}
        >
          {!isAtEnd && (
            <span className="bg-black bg-opacity-60 w-full h-full flex items-center justify-center hover:bg-opacity-30">
              {hovered && <RightArrowIcon />}
            </span>
          )}
        </button>
      </div>
    </section>
  );
};

export default ScrollSection;

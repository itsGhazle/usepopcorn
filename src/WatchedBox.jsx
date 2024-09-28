import React from "react";
import { useState } from "react";
import WatchedSummery from "./WatchedSummery";
import WatchedList from "./WatchedMovieList";

function WatchedBox({watched}) {
 
  const [isOpen2, setIsOpen2] = useState(true);

  return (
    <>
      <div className="box">
        <button
          className="btn-toggle"
          onClick={() => setIsOpen2((open) => !open)}
        >
          {isOpen2 ? "–" : "+"}
        </button>
        {isOpen2 && (
          <>
            <WatchedSummery watched={watched} />
            <WatchedList watched={watched} />
          </>
        )}
      </div>
    </>
  );
}

export default WatchedBox;

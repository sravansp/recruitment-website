"use clients";
import React, { useState } from "react";

const TextReadMore = ({ text, length = 1000 }) => {
  const maxLength = 1000; // Set your desired max length
  const [showFullText, setShowFullText] = useState(false);
  const yourLongText = text;

  const shortenedText = showFullText
    ? yourLongText
    : `${yourLongText.slice(0, length)}`;

  return (
    <div className="relative overflow-hidden">
      <p className="pblack !font-normal">{shortenedText}</p>
      {yourLongText.length > maxLength && (
        <button
          className={`flex items-center justify-center w-full font-semibold text-primary bg-gradient-to-b from-white/70 to-white dark:from-black/70 dark:to-black ${
            showFullText ? "relative h-8" : "absolute bottom-0 h-20"
          }`}
          onClick={() => setShowFullText(!showFullText)}
          // style={{background: "linear-gradient(180deg, rgba(255, 255, 255, 0.69) 9.65%, #FFF 50%)"}}
        >
          {showFullText ? "Read Less" : "Read More"}
        </button>
      )}
    </div>
  );
};

export default TextReadMore;

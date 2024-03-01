"use clients";
import React, { useState } from "react";

const TextReadMore = ({ text, length = 1000 }) => {
  const maxLength = 1000; // Set your desired max length
  const [showFullText, setShowFullText] = useState(false);
  const yourLongText = text || 
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet a laboriosam placeat laudantium in, accusantium ipsum, vel corporis, minima id architecto aliquam voluptatem. Iusto eos suscipit non odit facere architecto corrupti perferendis odio! Consequatur soluta consectetur, deleniti est, veniam esse delectus enim tempore ex, sapiente at neque perferendis rerum repellat qui veritatis temporibus sunt? Necessitatibus porro rerum eos, dicta unde ex eaque quis magni vitae atque error non quod dolorum molestias facere provident, consectetur voluptatem iure, fugit perferendis? Eveniet assumenda odit possimus ipsa. Magni error quasi eum corporis ipsum ea, quas culpa sit accusamus illo et voluptates provident, dolorem perspiciatis, aliquam vel. Ad debitis error quibusdam alias consequuntur optio sed consequatur! Cum maiores maxime iste quam cupiditate sint eveniet similique, magni consequuntur eaque voluptatibus numquam quibusdam aliquid ab laudantium repellendus. Aperiam nulla doloribus eum optio eos exercitationem officia saepe quia eius accusamus enim voluptate nemo voluptas deserunt, quidem labore amet, quisquam cumque blanditiis vel aliquam. Est perspiciatis quasi nihil ut necessitatibus, sint, vel facilis illum expedita officiis ratione amet reiciendis obcaecati adipisci asperiores animi illo laboriosam mollitia perferendis, voluptate explicabo quia atque. Nemo mollitia eligendi possimus quis, delectus tenetur id, nobis explicabo est porro nesciunt sapiente natus nulla magni incidunt."; // Replace with your actual long text

  const shortenedText = showFullText
    ? yourLongText
    : `${yourLongText.slice(0, length)}...`;

  return (
    <div>
      <p className="pblack !font-normal">{shortenedText}</p>
      {yourLongText.length > maxLength && (
        <button
          className="text-blue-500 underline"
          onClick={() => setShowFullText(!showFullText)}
        >
          {showFullText ? "Read Less" : "Read More"}
        </button>
      )}
    </div>
  );
};

export default TextReadMore;

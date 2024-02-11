import React from "react";
import ImageCard from "./ImageCard";

function ImageGrid({ images, totalHits, hasSearched }) {
  return (
    <div>
      <div className="total_hits">
        {hasSearched && <h2>Total Search Results: {totalHits}</h2>}{" "}
      </div>
      {/* Conditionally display */}
      <div className="image-grid">
        {images.map((image, index) => (
          <ImageCard key={`${image.id}-${index}`} image={image} />
        ))}
      </div>
    </div>
  );
}

export default ImageGrid;

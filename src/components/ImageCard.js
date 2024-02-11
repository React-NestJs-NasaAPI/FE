import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fasFaHeart } from "@fortawesome/free-solid-svg-icons"; // 채워진 하트
import { faHeart as farFaHeart } from "@fortawesome/free-regular-svg-icons"; // 빈 하트
import "../styles/ImageCard.css";

function ImageCard({ image, isFavoritedByDefault, isProfilePage }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFavorited, setIsFavorited] = useState(isFavoritedByDefault); // 찜하기 상태

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const toggleFavorite = async (event) => {
    event.stopPropagation(); // 이벤트 버블링 방지
    const newFavoritedState = !isFavorited;
    setIsFavorited(newFavoritedState);

    // 찜하기 상태에 따른 API 엔드포인트 결정
    const endpoint = newFavoritedState ? "/favorite/add" : "/favorite/remove";

    try {
      const response = await fetch(`http://localhost:8000${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("groomAccessToken")}`, // 인증 토큰 사용
        },
        body: JSON.stringify({
          // 이미지 정보 전송
          url: image.url,
          title: image.title,
          center: image.center,
          date_created: image.date_created,
          description: image.description,
          keywords: image.keywords.join(", "),
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to update favorite status");
      }

      alert("Favorite status updated successfully", data);
    } catch (error) {
      alert("Error updating favorite status:", error);
      // 상태 복구
      setIsFavorited(!newFavoritedState);
    }
  };

  return (
    <div
      className={`image-card ${isFlipped ? "flipped" : ""} ${
        isProfilePage ? "profile-card" : ""
      }`}
      onClick={handleFlip}
    >
      <img src={image.url} alt={image.title} />
      <div className="image-info">
        <h4>{image.title}</h4>
        <p>Center: {image.center}</p>
        <p>Created: {image.date_created}</p>
      </div>
      {isFlipped && (
        <div className="image-detail">
          <p>이미지 상세 정보: {image.description}</p>
          <p>키워드: {image.keywords}</p>
        </div>
      )}
      <div className="favorite-button">
        <button
          onClick={toggleFavorite}
          style={{ background: "none", border: "none" }}
        >
          <FontAwesomeIcon
            icon={isFavorited ? fasFaHeart : farFaHeart}
            color={isFavorited ? "red" : "black"}
            size="lg"
          />
        </button>
      </div>
    </div>
  );
}

export default ImageCard;

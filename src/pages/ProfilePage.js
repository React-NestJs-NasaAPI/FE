import React, { useEffect, useState } from "react";
import ImageCard from "../components/ImageCard";
import NavBar from "../components/NavBar";
import "../styles/ProfilePage.css";
const ProfilePage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch("http://localhost:8000/favorite", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("groomAccessToken")}`, // 인증 토큰 사용
          },
        });
        console.log(response);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setFavorites(data);
      } catch (error) {
        console.error("Fetching favorites failed", error);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <>
      <NavBar showSearch={false} isProfilePage={true} />
      <div>
        {favorites.map((favorite) => (
          <ImageCard
            key={favorite.id}
            image={favorite.image}
            isFavoritedByDefault={true}
            isProfilePage={true}
          />
        ))}
      </div>
    </>
  );
};

export default ProfilePage;

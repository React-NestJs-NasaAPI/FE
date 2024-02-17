import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import ImageGrid from "../components/ImageGrid";
import ScrollToTop from "../components/ScrollToTop";
import NASAApi from "../api/nasaApi"; // 변경
import axios from "axios";

const Main = () => {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("star");
  const [searchResultTotal, setSearchResultTotal] = useState(0);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedCenter, setSelectedCenter] = useState(""); // 추가

  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true);

      try {
        const { images: fetchedImages, totalHits } = await NASAApi.fetchImages(
          searchTerm,
          currentPage,
          selectedCenter
        );

        // 사용자가 로그인했는지 확인합니다.
        const token = localStorage.getItem("groomAccessToken");
        let favorites = [];
        if (token) {
          // 로그인한 경우, 백엔드에서 찜한 이미지 목록을 불러옵니다.
          const response = await axios.get("http://43.203.91.122/favorite", {
            headers: { Authorization: `Bearer ${token}` },
          });
          favorites = response.data;
        }

        // 불러온 이미지 목록에 찜 여부를 표시합니다.
        const imagesWithFavorites = fetchedImages.map((image) => ({
          ...image,
          isFavorited: favorites.some((fav) => fav.image.url === image.url),
        }));

        setImages((prevImages) => [...prevImages, ...imagesWithFavorites]);
        setSearchResultTotal(totalHits);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [searchTerm, currentPage, selectedCenter]); // 변경

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
          document.documentElement.scrollHeight &&
        !isLoading
      ) {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);

  const handleSearch = (searchValue) => {
    setImages([]);
    setSearchTerm(searchValue);
    setSelectedCenter("");

    setCurrentPage(1);
    setHasSearched(true);
  };

  const handleCenterSelect = (selectedCenter) => {
    setSelectedCenter(selectedCenter);
    setImages([]);
    setCurrentPage(1);
  };

  return (
    <div className="app">
      <Sidebar
        selectedCenter={selectedCenter}
        onCenterSelect={handleCenterSelect}
      />
      <NavBar className="NavBar" onSearch={handleSearch} />
      <ImageGrid
        images={images}
        totalHits={searchResultTotal}
        hasSearched={hasSearched}
      />
      {isLoading && <p>Loading more images...</p>}
      <ScrollToTop />
    </div>
  );
};

export default Main;

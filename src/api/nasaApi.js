import axios from "axios";

const NASAApi = {
  fetchImages: async (
    searchTerm,
    currentPage,
    selectedCenter,
    startDate,
    endDate
  ) => {
    try {
      const params = {
        q: searchTerm,
        media_type: "image",
        page: currentPage,
        page_size: 10,
        ...(selectedCenter && { center: selectedCenter }),
        ...(startDate && { year_start: startDate }), // 올바른 파라미터 이름과 조건부 추가
        ...(endDate && { year_end: endDate }),
      };
      const response = await axios.get("https://images-api.nasa.gov/search", {
        params,
      });

      const images = response.data.collection.items.map((item) => ({
        id: item.data[0].nasa_id,
        title: item.data[0].title,
        url: item.links[0].href,
        center: item.data[0].center,
        date_created: item.data[0].date_created,
        description: item.data[0].description || "No description available",
        keywords: item.data[0].keywords || [],
      }));

      const totalHits = response.data.collection.metadata.total_hits;

      return { images, totalHits };
    } catch (error) {
      console.error("Error fetching images:", error);
      throw new Error("Failed to fetch images");
    }
  },
};

export default NASAApi;

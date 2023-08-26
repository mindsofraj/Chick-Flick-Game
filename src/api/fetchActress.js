import axios from "axios";
const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;

// Fetch Heroine Image
const API_KEY = apiKey;

export const fetchHeroineImages = async (page) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}&query=indian&page=${page}`
    );
    // Filter and get the first 8 Indian heroines with profile images
    const popularActress = response.data.results
      .filter(
        (person) =>
          person.known_for_department === "Acting" &&
          person.profile_path &&
          person.gender === 1
      )
      .slice(0, 8);

    //   setHeroineImages(popularActress);
    return popularActress;
  } catch (error) {
    return error;
  }
};

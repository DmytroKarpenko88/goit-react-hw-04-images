import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '34271519-257a556d5fe8c31a240fa9516';

export async function fetchPhoto(searchValue, numberPage = 1) {
  const config = {
    params: {
      key: API_KEY,
      q: searchValue,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: numberPage,
      per_page: 12,
    },
  };

  try {
    let { data } = await axios.get(`${BASE_URL}`, config);
    return data;
  } catch (error) {
    return error.message;
  }
}

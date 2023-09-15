import axios from 'axios';

const configAx = {
  method: 'get',
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '17867869-5b3518daf30dfafc0a833511f',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 12,
  },
};

async function serviceGetImages({ searchString, page }) {
  configAx.params.q = searchString;
  configAx.params.page = page;
  const { data } = await axios('', configAx);
  return data;
}

export { serviceGetImages };

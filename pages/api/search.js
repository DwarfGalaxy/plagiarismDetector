import axios from 'axios';
//bypass cors
export default function handler(req, res) {
  const { query } = req.query;
  

  const url = `https://google.com/search?q=${query}`;
  axios.get(url, {
    headers: {
      ...req.headers,
      host: 'google.com',
      referer: 'https://google.com',
    },
    timeout: 6000,
  }).then((response) => {
    res.status(200).json(response.data);
  }
  );
}



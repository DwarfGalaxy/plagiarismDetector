import axios from 'axios';
export default function handler(req, res) {
  const { query } = req.query;
  axios.get(query,{
    timeout:3000
  }).then((response) => {
    res.status(200).json(response.data);
  }
  );
}



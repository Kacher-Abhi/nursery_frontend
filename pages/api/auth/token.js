import axios from 'axios';

export default async function handler(req, res) {
    try {
        console.log('API route hit!');
        console.log(req.body.nurseryId);

    const formData = new FormData();
    formData.set('nurseryId', req.body.get('nurseryId'));
    formData.set('username', req.body.get('username'));
    formData.set('password', req.body.get('password'));

    const response = await axios.post('http://localhost:8080/auth/token', formData);
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
}
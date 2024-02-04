import axios from 'axios';

export async function POST(req, res) {
    // const body = await req.json()
    // console.log(body)
    try {
        console.log("APi route hit");
        console.log('Received data:', req.body);
        let text = await new Response(ReadableStream).text();
        // console.log(text);
        // console.log(req.response.data);
    const response = await axios.post('http://localhost:8080/auth/token', text);
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
}

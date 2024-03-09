import { cookies } from 'next/headers'

export async function POST(request) {
  // const body = await req.json()
  // console.log(body)
  var returnRes;
  try {
    console.log("APi route hit");
    const formData = await request.formData()
    // console.log(text);
    // console.log(req.response.data);
    

    const response = await fetch(`${process.env.API_HOST}/auth/token`, {
      method: 'post',
      body: formData,
      
    });
    if(response.ok){
      console.log("setting cookie")
      cookies().set({
        name: 'token',
        value: response.data,
        httpOnly: true,
        path: '/',
      })
      returnRes = await response.json()
      // console.log(returnRes);
     return new Response(JSON.stringify(returnRes), {
      status: response.status,
      statusText: response.statusText,
      headers: {
        "Content-Type": "application/json",
      },
    });
    }
    else{
      console.log("API failed")
      returnRes = await response.text()
      return new Response(JSON.stringify({  error: returnRes }), {
        status: response.status,
        statusText: response.statusText,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: "Oops! Something went wrong, please try reloading the browser" }), {
      status: 500,
      statusText: "Internal Server Error",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

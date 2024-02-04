export async function POST(request,{params}){
    const formData = await request.formData();
    
    console.log(formData,"formData");
    const response = await fetch(`${process.env.API_HOST}/auth/findByEmail`,{method: 'post', body:formData});
    if(response.ok){
        const returnRes = await response.json();
        console.log(returnRes);
        return new Response(JSON.stringify(returnRes), {
            status: response.status,
            statusText: response.statusText,
            headers: {
              "Content-Type": "application/json",
            },
          });
    }
    else{
        const errorRes = await response.text();
        console.log(errorRes);
        return new Response(JSON.stringify(errorRes), {
            status: response.status,
            statusText: response.statusText,
            headers: {
              "Content-Type": "application/json",
            },
          });
    }
}
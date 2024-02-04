export async function GET(request, { params }){
    var response;
    console.log("url",`${process.env.API_HOST}/nurseries/${params.nurseryId}`)
    const apiRes = await fetch(`${process.env.API_HOST}/nurseries/${params.nurseryId}`);
    if(apiRes.ok){
        response = await apiRes.json();
    }
    else{
        response = await apiRes.text();
        return new Response.error(response)
    }
    return new Response(response);
}
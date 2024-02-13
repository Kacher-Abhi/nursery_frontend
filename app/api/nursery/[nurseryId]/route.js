export async function GET(request, { params }){
    var response;
    // const token = request.cookies.get('jwt');
    console.log("url",`${process.env.API_HOST}/nurseries/${params.nurseryId}`)
    const apiRes = await fetch(`${process.env.API_HOST}/nurseries/${params.nurseryId}`,{headers: {
        // Authorization: `Bearer ${token.value}`,
        // tenant: params.nurseryId
      },});
    if(apiRes.ok){
        response = await apiRes.json();
        console.log("okay", response)
    }
    else{
        response = await apiRes.text();
        console.log("fail", response)
        // if(response.includes('io.jsonwebtoken')){
        //     return new Response(JSON.stringify('User is not logged in currently'), {
        //         status: 500,
        //         statusText: response.statusText,
        //         headers: {
        //           "Content-Type": "application/json",
        //         },
        //       });
        // }
        return new Response(JSON.stringify(response), {
            status: 500,
            statusText: response.statusText,
            headers: {
              "Content-Type": "application/json",
            },
          });
    }
    return new Response(JSON.stringify(response), {
        status: 200,
        statusText: response.statusText,
        headers: {
          "Content-Type": "application/json",
        },
      });
}
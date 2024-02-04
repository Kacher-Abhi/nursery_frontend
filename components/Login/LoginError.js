const LoginError =({nurseryId})=>{
    return(
        <>
            <div>
                The Nursery with ID {nurseryId} Does not Exist with our system please try entering the right NurseryID in the <a href="/login">login page</a>  
            </div>
        </>
    )
}   
export default LoginError;
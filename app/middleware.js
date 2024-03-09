import { NextResponse } from "next/server";
import { useSelector } from "react-redux";

// we are not exporting by default
export async function middleware(req, ev) {
  
  const userName = useSelector((store)=> store.currentUser.username);
  console.log("username", userName);
  const token = req ? req.cookies?.token : null;
  const nurseryId = req ? req.cookies?.nurseryId : null;
  const profile = await fetch(`${process.env.API_HOST}/auth/validateToken`,{method:'POST',body: JSON.stringify({'username': username, 'token':token, 'nurseryId':nurseryId})});
  // if profile exists you want to continue. Also
  // maybe user sends request for log-in, and if a user wants to login, obviously it has no token
  const { pathname } = req.nextUrl;
  if (
    // whatever your api route for login is
    pathname.includes("/api/login") || profile 
  ) {
    return NextResponse.next();
  }

  
  if (!profile && pathname !== "/login") {
    // since you want to redirect the user to "/"
    return NextResponse.redirect("/");
  }
}
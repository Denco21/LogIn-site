import { NextResponse } from "next/server";

export default function middleware(req) {
    let verify = req.cookies.get("LoggedIn")
    let AdminVerify = req.cookies.get("AdminLoggedIn")
    let UserVerify = req.cookies.get("UserLoggedIn")
    let url = req.url
    
    if(!verify && url === "http://localhost:3000/Admin") {
        return NextResponse.redirect("http://localhost:3000/");
    }
    if(!verify && url === "http://localhost:3000/User") {
        return NextResponse.redirect("http://localhost:3000/");
    }
    if(!AdminVerify && url === "http://localhost:3000/Admin") {
        return NextResponse.redirect("http://localhost:3000/User");
    }
    if(!UserVerify && url === "http://localhost:3000/User") {
        return NextResponse.redirect("http://localhost:3000/Admin");
    }

}
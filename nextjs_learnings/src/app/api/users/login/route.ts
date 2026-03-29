import {connect} from "@/src/dbConfig/dbConfig"
import User from "@/src/models/userModel";
import { NextRequest , NextResponse} from "next/server";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken";

connect()

export async function POST(request:NextRequest){
 
    try{
        const reqBody=await request.json()
        const {email,password}=reqBody;
        console.log(reqBody);

        //check if user exists
        const user=await User.findOne({email})
        if(!user)
        {
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        }

        //check if password is correct
        const validPassword=await bcryptjs.compare(password, user.password)
        if(!validPassword)
        {
            return NextResponse.json({error: "Invalid password"}, {status: 400})
        }
        //create token data
        const tokenData={
            id: user._id,
            email: user.email,
            username: user.username

        }
        //create token (use a dev fallback secret when TOKEN_SECRET is not set)
        const jwtSecret = process.env.TOKEN_SECRET || "dev-secret"
        const token = jwt.sign(tokenData, jwtSecret, { expiresIn: "1d" })
        const response=NextResponse.json({
            message: "Login successful",
           sucess:true,
        })
       response.cookies.set("token", token, 
        {httpOnly: true,path: "/"})

        return response;

    }
    catch(error:any){
        return NextResponse.json({error: error.message}, {status: 500})
    }
}

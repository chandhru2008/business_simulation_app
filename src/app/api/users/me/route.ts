/* eslint-disable @typescript-eslint/no-explicit-any */
import { getDB } from "@/lib/get-db";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const token: any = req.cookies.get('token');
    console.log(token)
    if (!token) {
      return NextResponse.json({
        message: "No user logged in",
      },{status : 400});
    }
    const decoded: any = jwt.verify(token.value, process.env.JWT_SECRETE!)
    const db = await getDB();
    console.log('deocded in routes : ', decoded)
    const user = await db.getUserByEmail(decoded.email)
    console.log('user', user)
    return NextResponse.json(user)
  } catch (e) {
    console.log(e);
    return NextResponse.json(e);
  }
}
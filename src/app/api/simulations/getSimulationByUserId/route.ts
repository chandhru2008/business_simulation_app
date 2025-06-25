import { getDB } from "@/lib/get-db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const data = req.headers.get('x-user');
    console.log(data)
    if(!data){
      throw new Error ('User details does not seted in Header');
    }
    const userDetails = await JSON.parse(data)
    const db = await getDB();
    const user = await db.getUserByEmail(userDetails.email)
    const simulation = await db.getSimulationIdByUserId(user.id)
    return NextResponse.json(simulation);
  } catch (e) {
    console.log(e);
    return NextResponse.json(e);
  }
}
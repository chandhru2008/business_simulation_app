import { getDB } from "@/lib/get-db";
import { NextResponse } from "next/server";

export async function GET(){
    const db = await getDB();
    const allSimulations = await db.getAllSimulations();
    return NextResponse.json(allSimulations, {status : 200});
}
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Company } from "@/components/simulation/types";
import { getDB } from "@/lib/get-db";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {
        const db = await getDB();
        const data = req.headers.get('x-user');
        if(!data){
            throw new Error ('User not found');
        }
        const userId = await JSON.parse(data).id;
        const companyDeatails: Company = await req.json();
        const { id } = await db.getSimulationByName(companyDeatails.simulationName);
        companyDeatails.simulationId = id;
        companyDeatails.userId = userId;
        const createdCompany = await db.createCompany(companyDeatails);
        return NextResponse.json({ createdCompany}, { status: 201 });
    }catch(e : any){
        return NextResponse.json({message : e.message}, { status : 500});
    }
}
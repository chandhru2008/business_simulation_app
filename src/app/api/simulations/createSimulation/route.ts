import { Company } from "@/components/simulation/types";
import { getDB } from "@/lib/get-db";
import { NextRequest, NextResponse } from "next/server";


export interface Simulation {
    id: string;
    name: string;
    description: string;
    config: string; // or a specific object type if you're parsing/storing JSON
    currentPeriod: number;
    status: string;
    created_by?: string;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    companies? : Company[];
}

export async function POST(req: NextRequest) {
    try {
        const simulation: Simulation = await req.json();
        const data = req.headers.get('x-user');
        if (!data) {
            return NextResponse.json({
                message: "No user logged in",
            }, { status: 400 });
        }
        const userId = await JSON.parse(data).id
        const db = await getDB();
        simulation.created_by = userId;
        const simId = await db.createSimulation(simulation);
        for(const company of simulation.companies!){
            company.simulationId = simId
            await db.createCompany(company);
        }
        return NextResponse.json(simId, {status : 201});
    } catch (e) {
        return NextResponse.json({ message: e }, {status : 500});
    }
}
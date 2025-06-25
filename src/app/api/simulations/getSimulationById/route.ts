/* eslint-disable @typescript-eslint/no-explicit-any */

import { getDB } from "@/lib/get-db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const simulationId = req.nextUrl.searchParams.get('simId');
        if (!simulationId) {
            throw new Error('Simulation id is missing');
        }
        const db = await getDB();
        const simulation = await db.getSimulationById(simulationId);
        return NextResponse.json(simulation, { status: 200 })
    } catch (e: any) {
        return NextResponse.json({ meesage: e.meesage }, { status: 500 });
    }

}
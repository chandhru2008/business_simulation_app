import { Product } from "@/components/simulation/types";
import { getDB } from "@/lib/get-db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const productDetails: Product = await req.json();
        const db = await getDB();
        const compantId = await db.getCompanyByName(productDetails.companyName)
        productDetails.companyId = compantId;
        const product = await db.createProduct(productDetails);
        return NextResponse.json(product, { status: 201 });
    } catch (e) {
        console.log(e);
        return NextResponse.json({ message: e }, { status: 500 });
    }
}
import { getDB } from "@/lib/get-db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const productId = req.nextUrl.searchParams.get('product-id');
        const db = await getDB();
        const product = await db.getProduct(productId!);
        return NextResponse.json(product, { status: 200 });
    } catch (e) {
        console.log(e);
        NextResponse.json({ message: e }, { status: 500 });
    }
}
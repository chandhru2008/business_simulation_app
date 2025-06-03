import { NextRequest, NextResponse } from 'next/server';
import {cookies} from 'next/headers'
export async function POST() {
    try{
        const cookieStore = await cookies();
        cookieStore.delete('token');
        return NextResponse.json({mesage:"Logout successfully"},{status:200})
    }
    catch{
        return NextResponse.json({message:"Logout fialed"},{status:500})
    }
}
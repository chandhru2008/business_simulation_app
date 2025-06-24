import { NextRequest, NextResponse } from "next/server";
import { getTokenFromRequest } from "./app/utils/getTokenFromRequest";
import { jwtVerify } from 'jose';


export async function middleware(req: NextRequest) {
    try {
        console.log('middle ware is called');
        const token = getTokenFromRequest(req);
        const secret = new TextEncoder().encode(process.env.JWT_SECRETE);
        const decode = await jwtVerify(token, secret);
        const requestHeaders = new Headers(req.headers);
        requestHeaders.set('x-user', JSON.stringify(decode.payload));
        const response = NextResponse.next({
            headers : requestHeaders
        });
        return response;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e : any) {
        return NextResponse.json({ message: e.message })
    }

}

export const config = {
    matcher: ['/api/simulation/:path*'],
}
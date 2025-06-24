import { NextRequest } from "next/server";

export function getTokenFromRequest(req: NextRequest) {
    const token = req.cookies.get('token');
    try {
        if (!token) {
            throw new Error('Token is missing');
        }
        return token.value;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }catch(e : any){
        throw new Error (e.message);
    }
  
}
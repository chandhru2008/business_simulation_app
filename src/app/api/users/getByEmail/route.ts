import { NextRequest, NextResponse } from 'next/server';
import { getDB } from '@/lib/get-db'; // This is safe to use here
import * as bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers';

export async function GET(req: NextRequest) {
    try {
        const { email }: any = await req.json();

        if (email ) {
            return NextResponse.json({ meesage: 'Missing email' }, { status: 400 });
        }

        const db = await getDB();

        console.log('email : ', email);

        const existingUser = await db.getUserByEmail(email);
        if (!existingUser) {
            return NextResponse.json({ message: 'Email does not exit' }, { status: 400 });
        }

        const token = jwt.sign({ ...existingUser }, process.env.JWT_SECRETE!, { expiresIn: '10h' });
        const cookieStore = await cookies()
        cookieStore.set('token', token, {
            httpOnly: true,
            path: '/',
            secure: true
        })

        console.log('Token : ', token)

        return NextResponse.json({
            existingUser
        }, { status: 201 });

    } catch (err) {
        console.log("Error : ", err);
        return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
    }
}

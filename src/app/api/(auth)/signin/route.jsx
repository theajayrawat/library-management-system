import { NextResponse } from "next/server";
import { Users } from "../../../lib/model/user";
import { DBString } from "../../../lib/db";
import mongoose from "mongoose";

export async function POST(req) {
    try {
        await mongoose.connect(DBString);    
        const { username, password } = await req.json();
        const User = await Users.findOne({ email: username, pass: password });

        if(!User) {
            return NextResponse.json(
                { message: 'email and password not correct', type: 'error' },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { message: 'User signed in successfully', type: 'success' },
            { status: 200 }
        );

    } catch (error) {
        return NextResponse.json(
            { message: 'An internal server error occurred', type: 'error' },
            { status: 500 }
        );
    }
}
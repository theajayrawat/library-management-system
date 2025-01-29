import { NextResponse } from "next/server";
import { Users } from "../../../lib/model/user";
import { DBString } from "../../../lib/db";
import mongoose from "mongoose";

export async function POST(req) {
    try {
        await mongoose.connect(DBString);    
        const { username, password } = await req.json();

        const existingUser = await Users.findOne({ email: username, pass: password });
        if (existingUser) {
            return NextResponse.json(
                { message: 'User already exists', type: 'error' },
                { status: 400 }
            );
        }

        const newUser = new Users({
            email: username,
            pass: password,
        });
        await newUser.save();

        return NextResponse.json(
            { message: 'User signed up successfully', type: 'success' },
            { status: 200 }
        );

    } catch (error) {
        console.error(error); // Log the error for debugging
        return NextResponse.json(
            { message: 'An internal server error occurred', type: 'error' },
            { status: 500 }
        );
    }
}

"use client";
import { useState } from "react";

export default function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(null);

    const handleSignUp = () => {
        if (!username || !password) {
            setMessage("Please fill in all fields.");
            setTimeout(() => {
                setMessage(""); 
            }, 3000);
            return;
        }

        if(confirmPassword != password) {
            setMessage("Password is not matching.");
            setTimeout(() => {
                setMessage(""); 
            }, 3000);
            return;
        }

        fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                setMessage("Sign up successful!");
            })
            .catch(error => {
                console.error('Error:', error);
                setMessage("An error occurred. Please try again.");
            }).finally(()=>{
                setTimeout(() => {
                    setMessage(""); 
                }, 3000);
            });
    };

    return (
        <div className="h-screen flex justify-center items-center flex-col">
            <div className="max-w-sm w-full p-6 bg-white border border-gray-200 rounded-lg shadow">
                <h1 className="text-3xl font-extrabold text-center">Sign Up</h1>
                <div className="mt-4">
                    <label className="block mb-2 text-sm text-black font-semibold">Username</label>
                    <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Enter your username"
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>
                <div className="mt-4">
                    <label className="block mb-2 text-sm text-black font-semibold">Password</label>
                    <input
                        type="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Enter your password"
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div className="mt-4">
                    <label className="block mb-2 text-sm text-black font-semibold">Confirm Password</label>
                    <input
                        type="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Enter your password"
                        onChange={e => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button
                    type="button"
                    className="mt-6 w-full text-white bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5"
                    onClick={handleSignUp}
                >
                    Sign Up
                </button>
                {message && (
                    <p className="mt-4 text-center text-sm text-gray-700">
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}

import React, { useState } from "react";
import { Input } from "@/components/ui/input"
import { Label } from '@/components/ui/label'
import { Button } from "@/components/ui/button"

const New_Dentist = ({ handleSignIn }) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone_number, setPhone_number] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault()
        // call api
    }

    return (
        <>
            <div className={"p-4"}>
                <h1 className="mb-4 text-center text-2xl font-semibold text-white">
                    New Dentist
                </h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-3">
                    <div >
                        <Label htmlFor="name">Name</Label>
                        <Input type="name" placeholder="Enter your Name" />
                    </div>
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input type="email" placeholder="Enter your Email" />
                    </div>
                    <div>
                        <Label htmlFor="phone_number">Phone Number</Label>
                        <Input type="phone_number" placeholder="Enter your Number" />
                    </div>
                    <Button className="mt-4">Add Dentist</Button>
                </form>
            </div>
            <p
                className="my-3 cursor-pointer text-center text-sm text-gray-500 hover:text-blue-700"
                onClick={handleSignIn}
            >
            </p>
        </>
    );
};

export default New_Dentist;

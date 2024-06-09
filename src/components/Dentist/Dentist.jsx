import React from "react";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { addDentist } from "@/services/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/components/ui/use-toast";

const formSchema = z.object({
    name: z.string().nonempty("Name is required"),
    email: z.string().email("Invalid email address"),
    phone_number: z.string().nonempty("Phone number is required"),
});

const New_Dentist = () => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phone_number: "",
        },
    });

    async function onSubmit(values) {
        try {
            
            const token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJDYXJpZGVudE1lZGl4IiwiaXNzIjoiQ2FyaWRlbnRNZWRpeCIsImV4cCI6MTcxODU1MjYxMiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6InRlc3R1c2VyQGVtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiOTEzZGYxM2QtMDI1Mi00ZmFhLWEyMDAtMDJjM2ViYzA3MjIxIiwianRpIjoiZTYwYzVkOGEtODRmYi00MWE1LThiZDQtNmI2MjhmMjliY2JiIiwiaWF0IjoxNzE3OTQ3ODEyLCJuYmYiOjE3MTc5NDc4MTJ9.H4ZytGYUnVHNb_JQLot2J7kXPcdHOJyR5KaR9YQrIWnrVUFayGzb6z9gxF82ezRZVkIwOMinBGeJ7sy5uRWkWA';

            if (!token) {
                throw new Error("No token found, please login again.");
            }
            const response = await addDentist(token, values.email, values.name, values.phone_number);
            toast({
                title: "Dentist added successfully",
                description: "The dentist has been added to the system.",
                status: "success",
            });
            form.reset();
        } catch (error) {
            toast({
                title: "Error adding dentist",
                description: error.message || "An error occurred.",
                status: "error",
            });
        }
    }

    return (
        <div className="p-4">
            <h1 className="mb-4 text-center text-2xl font-semibold text-white">
                New Dentist
            </h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3 p-3">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter Dentist's Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter Dentist's Email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone_number"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter Dentist's Number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="mt-4">
                        Add Dentist
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default New_Dentist;

import React from "react";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { addUserToClinicAdminByEmail } from "@/services/auth.js";
import { toast } from "@/components/ui/use-toast";

const formSchema = z.object({
    email: z.string().email("Invalid email address"),
});

const New_Admin = () => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    });

    async function onSubmit(values) {
        try {
            const token = window.localStorage.getItem('token');
            if (!token) {
                throw new Error("No token found, please login again.");
            }
            await addUserToClinicAdminByEmail(token, values.email);
            toast({
                title: "Admin added successfully",
                description: "The admin has been added to the system.",
                status: "success",
            });
            form.reset();
        } catch (error) {
            toast({
                title: "Error adding admin",
                description: error.message || "An error occurred.",
                status: "error",
            });
        }
    }

    return (
        <div className="p-4">
            <h1 className="mb-4 text-center text-2xl font-semibold text-gray-600">
                New Admin
            </h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3 p-3">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <Input placeholder="Enter your Email" {...field} />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="mt-4">
                        Add Admin
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default New_Admin;

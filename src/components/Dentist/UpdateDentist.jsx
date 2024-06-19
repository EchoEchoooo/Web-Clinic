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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/components/ui/use-toast";

const formSchema = z.object({
  name: z.string().nonempty("Name is required"),
  email: z.string().email("Invalid email address"),
  phone_number: z.string().nonempty("Phone number is required"),
});

const UpdateDentist = ({ dentist, onUpdate }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: dentist?.name || "",
      email: dentist?.email || "",
      phone_number: dentist?.phoneNumber || "",
    },
  });

  async function onSubmit(values) {
    try {
      await onUpdate(values);
    } catch (error) {
      toast({
        title: "Error updating dentist",
        description: error.message || "An error occurred.",
        status: "error",
      });
    }
  }

  return (
    <div className="p-4">
      <h1 className="mb-4 text-center text-2xl font-semibold text-white">
        Update Dentist
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3 p-3"
        >
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
            Update Dentist
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UpdateDentist;

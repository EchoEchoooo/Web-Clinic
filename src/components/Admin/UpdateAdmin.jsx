import React, { useState } from "react";
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
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().nonempty("Name is required"),
});

const UpdateAdmin = ({ admin, onUpdate, actionLoading }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: admin?.email || "",
      name: admin?.name || "",
      phone_number: admin?.phoneNumber || "",
    },
  });

  async function onSubmit(values) {
    try {
      await onUpdate(values, admin.id);
    } catch (error) {
      toast({
        title: "Error updating admin",
        description: error.response.data.message ||  error.message,
        status: "error",
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3 p-3"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your Name" {...field} />
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
                <Input placeholder="Enter Admin's Number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={actionLoading}>
          {actionLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Updating...
            </>
          ) : (
            "Update Admin"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default UpdateAdmin;

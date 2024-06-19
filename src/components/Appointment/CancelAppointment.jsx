import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  reason: z.string().nonempty("Reason is required"),
});

const AcceptAppointmentForm = ({ onSubmit, actionLoading }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reason: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3 p-3"
      >
        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reason</FormLabel>
              <Input placeholder="Enter reason for acceptance" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={actionLoading}>
          {actionLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Accept Appointment"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default AcceptAppointmentForm;

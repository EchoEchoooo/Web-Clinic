import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Dashboard = () => {
  const [dentist, setReports] = useState([
    {
      name: "John Doe",
      email: "test@gmail.com",
      phone_number: "1234567890",
      schedule: {
        Monday: "1:00pm - 3:00pm",
        Tuesday: "1:00pm - 3:00pm",
        Wednesday: "1:00pm - 3:00pm",
        Thursday: "1:00pm - 3:00pm",
        Friday: "1:00pm - 3:00pm",
        Saturday: "1:00pm - 3:00pm",
      },
    },
    {
      name: "John Doe",
      email: "test@gmail.com",
      phone_number: "1234567890",
      schedule: {
        Monday: "1:00pm - 3:00pm",
        Tuesday: "1:00pm - 3:00pm",
        Wednesday: "1:00pm - 3:00pm",
        Thursday: "1:00pm - 3:00pm",
        Friday: "2:00pm - 3:00pm",
        Saturday: "1:00pm - 3:00pm",
      },
    },
    {
      name: "John Doe",
      email: "test@gmail.com",
      phone_number: "1234567890",
      schedule: {
        Monday: "1:00pm - 3:00pm",
        Tuesday: "1:00pm - 3:00pm",
        Wednesday: "2:00pm - 3:00pm",
        Thursday: "1:00pm - 3:00pm",
        Friday: "1:00pm - 3:00pm",
        Saturday: "1:00pm - 3:00pm",
      },
    },
    {
      name: "John Doe",
      email: "test@gmail.com",
      phone_number: "1234567890",
      schedule: {
        Monday: "1:00pm - 3:00pm",
        Tuesday: "1:00pm - 3:00pm",
        Wednesday: "1:00pm - 3:00pm",
        Thursday: "1:00pm - 3:00pm",
        Friday: "2:00pm - 3:00pm",
        Saturday: "1:00pm - 3:00pm",
      },
    },
  ]);

  return (
    <div className="mt-4 flex flex-row flex-wrap gap-8">
      {dentist.map((dentist, index) => (
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>{dentist.name}</CardTitle>
          </CardHeader>
          <CardContent>{dentist.email}</CardContent>
          <CardContent>{dentist.phone_number}</CardContent>
          <CardFooter className="flex justify-between">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">View Schedule</Button>
              </DialogTrigger>
              <DialogContent className="bg-white text-black dark:bg-zinc-950 dark:text-zinc-50 sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Weekly Schedule</DialogTitle>
                  <DialogDescription>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-1 gap-4">
                    {Object.entries(dentist.schedule).map(
                      ([day, time], index) => (
                        <div key={index}>
                          <strong>{day}:</strong> {time}
                        </div>
                      ),
                    )}
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Close
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button variant="destructive">Remove</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
export default Dashboard;

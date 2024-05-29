import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
const Appointments = () => {
  const [users, setUsers] = useState([
    {
      name: "John Doe",
      date: "02-02-2003",
      time: "7:01 AM",
      email: "johndoe@gmail.com",
      image: "View",
      status: "Pending",
    },
    {
      name: "John Doe",
      date: "02-02-2003",
      time: "7:01 AM",
      email: "johndoe@gmail.com",
      image: "View",
      status: "Pending",
    },
    {
      name: "John Doe",
      date: "02-02-2003",
      time: "7:01 AM",
      email: "johndoe@gmail.com",
      image: "View",
      status: "Pending",
    },
  ]);

  return (
    <div className="d-flex">
      <Table>
        <TableCaption>A list of your recent appointments.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white text-black dark:bg-zinc-950 dark:text-zinc-50">
          {users.map((user, index) => (
            <TableRow>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.date}</TableCell>
              <TableCell>{user.time}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Button variant="link">View</Button>
              </TableCell>
              <TableCell>{user.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
export default Appointments;

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

const AdminDashboard = () => {
  const [admins, setAdmins] = useState([
    {
      name: "John Doe",
      email: "johndoe@gmail.com",
    },
    {
      name: "John Doe",
      email: "johndoe@gmail.com",
    },
    {
      name: "John Doe",
      email: "johndoe@gmail.com",
    },
  ]);

  return (
    <div className="d-flex">
      <Table>
        <TableCaption>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="mr-20px">Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white text-black dark:bg-zinc-950 dark:text-zinc-50">
          {admins.map((admin, index) => (
            <TableRow>
              <TableCell>{admin.name}</TableCell>
              <TableCell>{admin.email}</TableCell>
              <TableCell>
                <Button variant = "destructive"> 
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
export default AdminDashboard;

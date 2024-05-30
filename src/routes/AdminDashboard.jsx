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
        <TableHeader>
          <TableRow >
            <TableHead >Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className = "px-8" >Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white text-black dark:bg-zinc-950 dark:text-zinc-50">
          {admins.map((admin, index) => (
            <TableRow>
              <TableCell>{admin.name}</TableCell>
              <TableCell>{admin.email}</TableCell>
              <TableCell>
                <Button variant = "link"> 
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

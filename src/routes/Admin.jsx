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

const Admin = () => {
  const [admins, setAdmins] = useState([
    {
      name: "John Doe",
      email: "johndoe@gmail.com",
      status: "Pending",
    },
    {
      name: "John Doe",
      email: "johndoe@gmail.com",
      status: "Pending",
    },
    {
      name: "John Doe",
      email: "johndoe@gmail.com",
      status: "Pending",
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
            <TableHead className="w-[200px]">Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white text-black dark:bg-zinc-950 dark:text-zinc-50">
          {admins.map((admin, index) => (
            <TableRow>
              <TableCell>{admin.name}</TableCell>
              <TableCell>{admin.email}</TableCell>
              <TableCell>{admin.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
export default Admin;

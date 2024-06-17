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
import { getDentists } from "@/services/auth.js";

const DentistDashboard = () => {
  const [dentists, setDentists] = useState([]);

  useEffect(() => {
    const fetchDentists = async () => {
      try {
        const token = window.localStorage.getItem("token");
        const response = await getDentists(token);
        setDentists(response.data);
      } catch (error) {
        console.error("Error fetching dentists:", error);
      }
    };

    fetchDentists();
  }, []);

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
          {dentists.map((admin, index) => (
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
export default DentistDashboard;

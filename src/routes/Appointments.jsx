import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { getAppointments } from "@/services/auth";
import { Table, TableBody, TableCell, TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table";


const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJDYXJpZGVudE1lZGl4IiwiaXNzIjoiQ2FyaWRlbnRNZWRpeCIsImV4cCI6MTcxODU1MjYxMiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6InRlc3R1c2VyQGVtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiOTEzZGYxM2QtMDI1Mi00ZmFhLWEyMDAtMDJjM2ViYzA3MjIxIiwianRpIjoiZTYwYzVkOGEtODRmYi00MWE1LThiZDQtNmI2MjhmMjliY2JiIiwiaWF0IjoxNzE3OTQ3ODEyLCJuYmYiOjE3MTc5NDc4MTJ9.H4ZytGYUnVHNb_JQLot2J7kXPcdHOJyR5KaR9YQrIWnrVUFayGzb6z9gxF82ezRZVkIwOMinBGeJ7sy5uRWkWA"; 
        const response = await getAppointments(token); 
        setAppointments(response.data); 
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []); 

  return (
    <div className="d-flex">
      <Table>
        <TableCaption>A list of your recent appointments.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Clinic Name</TableHead>
            <TableHead>Scheduled Date</TableHead>
            <TableHead>Scheduled Time</TableHead>
            <TableHead>Dentist Name</TableHead>
            <TableHead>Dentist Email</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white text-black dark:bg-zinc-950 dark:text-zinc-50">
          {appointments.map((appointment, index) => (
            <TableRow key={index}>
              <TableCell>{appointment.clinic.name}</TableCell>
              <TableCell>{new Date(appointment.scheduledAt).toLocaleDateString()}</TableCell>
              <TableCell>{new Date(appointment.scheduledAt).toLocaleTimeString()}</TableCell>
              <TableCell>{appointment.dentist.name}</TableCell>
              <TableCell>{appointment.dentist.email}</TableCell>
              <TableCell>
                <Button variant="link">View</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Appointments;

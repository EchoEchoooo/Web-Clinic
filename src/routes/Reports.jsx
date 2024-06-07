import React, { useState, useEffect } from "react";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,

} from "@/components/ui/alert-dialog";
import { getSharedReports } from '@/services/auth';
import { toast } from "@/components/ui/use-toast";
import { deleteSharedReport } from "@/services/auth";
import { Dialog } from "@radix-ui/react-dialog";

const token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJDYXJpZGVudE1lZGl4IiwiaXNzIjoiQ2FyaWRlbnRNZWRpeCIsImV4cCI6MTcxODM3MDUwNCwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6InRlc3R1c2VyQGVtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiNGFkNThjYzQtYzg5ZC00ZGNkLWFkODMtYmI0MDI1MGU0ODg5IiwianRpIjoiYjNlZGU1OGMtZjg5OS00YjY5LWIxNjctMTU0NjU3YTdkZjc3IiwiaWF0IjoxNzE3NzY1NzA0LCJuYmYiOjE3MTc3NjU3MDR9.qiNlf50n0msr6l20M7nRIrOBisyMUw_D_Xir2ib4lvXPuxc2LzlMHoUp-x4RwDwFVHR5wKA6H6d61B3kL3kV3g';
const Reports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await getSharedReports(token);
        setReports(response.data);
      } catch (error) {
        console.error("Error fetching shared reports:", error);

        toast({
          title: "Error fetching shared reports",
          description: error.message,
          status: "error",
          variant: "destructive"
        });
      }
    };

    fetchReports();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

/*   const handleView = async (reportId) => {
    try {
      await viewSharedReport(token, reportId);

    } catch (error) {
      console.error("Error viewing shared report:", error);
      toast({
        title: "Error viewing shared report",
        description: error.message,
        status: "error",
        variant: "destructive"
      });
    }
  }; */

  const handleRemove = async (reportId) => {
    try {
      await deleteSharedReport(token, reportId);
      setReports(reports.filter(report => report.id !== reportId));
      toast({
        title: "Report removed",
        description: "The shared report has been successfully removed.",
        status: "success",
      });
    } catch (error) {
      console.error("Error removing shared report:", error);
      toast({
        title: "Error removing shared report",
        description: error.message,
        status: "error",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="flex flex-row flex-wrap gap-8 mt-4">
      {reports.map((report, index) => (
        <Card className="w-[350px]" key={index}>
          <CardHeader>
            <CardTitle>{report.title}</CardTitle>
            <CardDescription>{`Created at ${formatDate(report.createdAt)}`}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-row flex-wrap gap-2 justify-center">
              {report.images.map((image, idx) => (
                <AlertDialog key={idx}>
                  <AlertDialogTrigger asChild>
                    <div>
                      <img className="h-64 object-cover rounded-xl" src={`https://api.carident.live/${image.plottedImagePath}`} alt={`Report ${index} image ${idx}`} />
                    </div>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="bg-white text-black dark:bg-zinc-950 dark:text-zinc-50">{`Image #${idx + 1}`}</AlertDialogTitle>
                      <AlertDialogDescription>
                        <div className="flex justify-center">
                          <img className="rounded-lg" src={`https://api.carident.live/${image.plottedImagePath}`} alt={`Report ${index} image ${idx}`} />
                        </div>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="bg-white text-black dark:bg-zinc-950 dark:text-zinc-50">Close</AlertDialogCancel>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">View</Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Remove</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="bg-white text-black dark:bg-zinc-950 dark:text-zinc-50" >Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-white text-black dark:bg-zinc-950 dark:text-zinc-50">Cancel</AlertDialogCancel>
                  <AlertDialogAction asChild> 
                    <Button variant = "destructive" onClick={() => handleRemove(report.id)}>Remove</Button>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default Reports;
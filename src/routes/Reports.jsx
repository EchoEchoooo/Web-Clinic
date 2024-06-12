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
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { getSharedReports, deleteSharedReport } from "@/services/auth";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/Authycontext";

const Reports = () => {
  const { user } = useAuth();
  const [reports, setReports] = useState([]);

  // Token provided for testing
  const token =
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJDYXJpZGVudE1lZGl4IiwiaXNzIjoiQ2FyaWRlbnRNZWRpeCIsImV4cCI6MTcxODU1MjYxMiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6InRlc3R1c2VyQGVtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiOTEzZGYxM2QtMDI1Mi00ZmFhLWEyMDAtMDJjM2ViYzA3MjIxIiwianRpIjoiZTYwYzVkOGEtODRmYi00MWE1LThiZDQtNmI2MjhmMjliY2JiIiwiaWF0IjoxNzE3OTQ3ODEyLCJuYmYiOjE3MTc5NDc4MTJ9.H4ZytGYUnVHNb_JQLot2J7kXPcdHOJyR5KaR9YQrIWnrVUFayGzb6z9gxF82ezRZVkIwOMinBGeJ7sy5uRWkWA";

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
          variant: "destructive",
        });
      }
    };

    fetchReports();
  }, [user]);

  const handleRemove = async (reportId) => {
    try {
      await deleteSharedReport(token, reportId);
      setReports(reports.filter((report) => report.id !== reportId));
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
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };


  return (
    <div className="mt-4 flex flex-row flex-wrap gap-8">
      {reports.map((report, index) => (
        <Card className="w-[350px]" key={index}>
          <CardHeader>
            <CardTitle>{report.title}</CardTitle>
            <CardDescription>{`Created at ${formatDate(report.createdAt)}`}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-row flex-wrap justify-center gap-2">
              {report.images.map((image, idx) => (
                <Dialog key={idx}>
                  <DialogTrigger asChild>
                    <div>
                      <img
                        className="h-64 rounded-xl object-cover"
                        src={`https://api.carident.live/${image.plottedImagePath}`}
                        alt={`Report ${index} image ${idx}`}
                      />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="">
                    <DialogHeader>
                      <DialogTitle
                        className="bg-white text-black dark:bg-zinc-950 dark:text-zinc-50">{`Image #${idx + 1}`}</DialogTitle>
                      <DialogDescription>
                        <div className="flex justify-center">
                          <img
                            className="rounded-lg max-h-[calc(100vh-12rem)]"
                            src={`https://api.carident.live/${image.plottedImagePath}`}
                            alt={`Report ${index} image ${idx}`}
                          />
                        </div>
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <DialogClose className="bg-white text-black dark:bg-zinc-950 dark:text-zinc-50">
                        Close
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Dialog> 
              <DialogTrigger asChild>
                <Button variant="outline">View</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="bg-white text-black dark:bg-zinc-950 dark:text-zinc-50">Report Details</DialogTitle>
                  <DialogDescription>
                    Created at: {formatDate(report.createdAt)}
                    <br />
                    Detections:
                    <br />
                    Healthy = {report.images.reduce((acc, img) => acc + img.detections.filter(detection => detection.className === "-0-Healthy").length, 0)}
                    <br />
                    Initial-Caries = {report.images.reduce((acc, img) => acc + img.detections.filter(detection => detection.className === "-1-Initial-Caries").length, 0)}
                    <br />
                    Moderate-Caries = {report.images.reduce((acc, img) => acc + img.detections.filter(detection => detection.className === "-2-Moderate-Caries").length, 0)}
                    <br />
                    Extensive-Caries = {report.images.reduce((acc, img) => acc + img.detections.filter(detection => detection.className === "-3-Extensive-Caries").length, 0)}
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose className="bg-white text-black dark:bg-zinc-950 dark:text-zinc-50">Close</DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="destructive">Remove</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="bg-white text-black dark:bg-zinc-950 dark:text-zinc-50">
                    Are you absolutely sure?
                  </DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose className="bg-white text-black dark:bg-zinc-950 dark:text-zinc-50">
                    Cancel
                  </DialogClose>
                  <DialogClose asChild>
                    <Button
                      variant="destructive"
                      onClick={() => handleRemove(report.id)}
                    >
                      Remove
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
  
};

export default Reports;

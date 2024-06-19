import React, { useEffect, useState } from "react";
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
import { Badge } from "@/components/ui/badge";

import { deleteSharedReport, getSharedReports } from "@/services/auth.js";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/Authycontext";
import { Loader2 } from "lucide-react";

const Reports = () => {
  const { user } = useAuth();
  const [reports, setReports] = useState([]);
  const [removeIsLoading, setRemoveIsLoading] = useState(false);

  // Token provided for testing
  const token = window.localStorage.getItem("token");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await getSharedReports(token);
        setReports(response.data);
      } catch (error) {
        console.error("Error fetching shared reports:", error);
        toast({
          title: "Error fetching shared reports",
          description: error.response.data.message ||  error.message,
          status: "error",
          variant: "destructive",
        });
      }
    };

    fetchReports();
  }, [user, token]);

  const handleRemove = async (reportId) => {
    try {
      setRemoveIsLoading(true);
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
        description: error.response.data.message ||  error.message,
        status: "error",
        variant: "destructive",
      });
    } finally {
      setRemoveIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getVariantForClass = (className) => {
    switch (className) {
      case "-0-Healthy":
        return "healthy";
      case "-1-Initial-Caries":
        return "initial";
      case "-2-Moderate-Caries":
        return "moderate";
      case "-3-Extensive-Caries":
        return "extensive";
      default:
        return "default";
    }
  };

  const getClassName = (className) => {
    switch (className) {
      case "-0-Healthy":
        return "Healthy";
      case "-1-Initial-Caries":
        return "Initial";
      case "-2-Moderate-Caries":
        return "Moderate";
      case "-3-Extensive-Caries":
        return "Extensive";
      default:
        return "Unknown";
    }
  };

  const getClassCounts = (images) => {
    const counts = {
      "-0-Healthy": 0,
      "-1-Initial-Caries": 0,
      "-2-Moderate-Caries": 0,
      "-3-Extensive-Caries": 0,
    };

    images.forEach((image) => {
      image.detections.forEach((detection) => {
        if (counts[detection.className] !== undefined) {
          counts[detection.className]++;
        }
      });
    });

    return counts;
  };

  const getImageClassCounts = (image) => {
    const counts = {
      "-0-Healthy": 0,
      "-1-Initial-Caries": 0,
      "-2-Moderate-Caries": 0,
      "-3-Extensive-Caries": 0,
    };

    image.detections.forEach((detection) => {
      if (counts[detection.className] !== undefined) {
        counts[detection.className]++;
      }
    });

    return counts;
  };

  return (
    <div className="mt-4 flex flex-row flex-wrap gap-8">
      {reports.map((report, index) => {
        const counts = getClassCounts(report.images);
        return (
          <Card className="w-[350px]" key={index}>
            <CardHeader>
              <CardTitle>{report.title}</CardTitle>
              <CardDescription>{`Created at ${formatDate(report.createdAt)}`}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-row flex-wrap justify-center gap-2">
                {report.images.map((image, idx) => {
                  const imageCounts = getImageClassCounts(image);
                  return (
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
                          <DialogTitle className="bg-white text-black dark:bg-zinc-950 dark:text-zinc-50">{`Image #${idx + 1}`}</DialogTitle>
                          <DialogDescription>
                            <div className="flex justify-center">
                              <img
                                className="max-h-[calc(100vh-12rem)] rounded-lg"
                                src={`https://api.carident.live/${image.plottedImagePath}`}
                                alt={`Report ${index} image ${idx}`}
                              />
                            </div>
                            <div className="mt-2 flex flex-wrap gap-2">
                              {Object.keys(imageCounts).map((className) => (
                                <Badge
                                  key={className}
                                  variant={getVariantForClass(className)}
                                  className="self-start rounded-full px-2 py-1"
                                >
                                  {getClassName(className)}:{" "}
                                  {imageCounts[className]}
                                </Badge>
                              ))}
                            </div>
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <DialogClose>
                            <Button>Close</Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  );
                })}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {Object.keys(counts).map((className) => (
                  <Badge
                    key={className}
                    variant={getVariantForClass(className)}
                    className="rounded-full px-2 py-1"
                  >
                    {getClassName(className)}: {counts[className]}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">View Details</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="bg-white text-black dark:bg-zinc-950 dark:text-zinc-50">
                      {report.title}
                    </DialogTitle>
                    <DialogDescription>
                      {report.description}
                      <br />
                      <br />
                      Created at: {formatDate(report.createdAt)}
                      <br />
                      Created by: {report.user.name}
                      <br />
                      <br />
                      Total Images: {report.images.length}
                      <br />
                      <div className="mt-2 flex flex-col gap-2">
                        {Object.keys(counts).map((className) => (
                          <div
                            key={className}
                            className="flex flex-row items-center gap-2"
                          >
                            <Badge
                              variant={getVariantForClass(className)}
                              className="h-1 justify-center rounded-full px-2 py-1"
                            />
                            <p>
                              {getClassName(className)}: {counts[className]}
                            </p>
                          </div>
                        ))}
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose>
                      <Button>Close</Button>
                    </DialogClose>
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
                      the report and remove its data from our servers.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button className="bg-white text-black dark:bg-zinc-950 dark:text-zinc-50">Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                      {removeIsLoading ? (
                        <Button variant="destructive" disabled>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Remove
                        </Button>
                      ) : (
                        <Button
                          variant="destructive"
                          onClick={() => handleRemove(report.id)}
                        >
                          Remove
                        </Button>
                      )}
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default Reports;

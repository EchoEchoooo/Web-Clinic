import React, { useState } from "react";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
} from "@/components/ui/alert-dialog"

const Reports = () => {
  let image = "https://upload.wikimedia.org/wikipedia/commons/d/db/06-10-06smile.jpg";

  const [reports, setReports] = useState([
    {
      date: "02-02-2003",
      name: "Untitled at 02-02-2003",
      images: [image, image, image, image]
    },
    {
      date: "02-02-2003",
      name: "Untitled at 02-02-2003",
      images: [image, image, image, image]
    },
    {
      date: "02-02-2003",
      name: "Untitled at 02-02-2003",
      images: [image, image, image, image]
    },
    {
      date: "02-02-2003",
      name: "Untitled at 02-02-2003",
      images: [image, image, image, image]
    },
    {
      date: "02-02-2003",
      name: "Untitled at 02-02-2003",
      images: [image, image, image, image]
    }
  ]);

  return (
    <div className="flex flex-row flex-wrap gap-8 mt-4">
      {reports.map((report, index) => (
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>{report.name}</CardTitle>
            <CardDescription>{`Created at ${report.date}`}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-row flex-wrap gap-2 justify-center">
              {report.images.map((image, index) => (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <div className="">
                      <img className="w-24 h-24 object-cover rounded-xl" src={image} />
                    </div>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className = "bg-white text-black dark:bg-zinc-950 dark:text-zinc-50" >{`Image #${index + 1}`}</AlertDialogTitle>
                      <AlertDialogDescription>
                        <img className="rounded-lg" src={image} />
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className = "bg-white text-black dark:bg-zinc-950 dark:text-zinc-50">Close</AlertDialogCancel>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">View</Button>
            <Button variant="destructive">Remove</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
export default Reports
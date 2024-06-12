import { Link } from "react-router-dom";
import {
  Activity,
  ArrowUpRight,
  Calendar,
  CalendarX2,
  Clipboard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { getAppointments, getSharedReports } from "@/services/auth.js";

const Dashboard = () => {
  const maxAppointmentsAdd = 10;
  const [maxAppointments, setMaxAppointments] = useState(5);
  const [appointments, setAppointments] = useState([]);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        console.log(
          `Fetching appointments with token: ${window.localStorage.getItem("token")}`,
        );
        const token = window.localStorage.getItem("token");
        const response = await getAppointments(token);
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    const fetchReports = async () => {
      try {
        console.log(
          `Fetching reports with token: ${window.localStorage.getItem("token")}`,
        );
        const token = window.localStorage.getItem("token");
        const response = await getSharedReports(token);
        setReports(response.data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };

    fetchAppointments();
    fetchReports();
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Appointments
              </CardTitle>
              <Calendar className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{`${appointments.length} Appointments`}</div>
              <p className="text-muted-foreground text-xs">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Cancelled Appointments
              </CardTitle>
              <CalendarX2 className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{`${appointments.filter((x) => x.status === "Cancelled").length} Cancelled`}</div>
              <p className="text-muted-foreground text-xs">
                +18.2% from last month
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Reports</CardTitle>
              <Clipboard className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{`${reports.length} Reports`}</div>
              <p className="text-muted-foreground text-xs">
                +19% from last month
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Dentists Active
              </CardTitle>
              <Activity className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3 Dentists</div>
              <p className="text-muted-foreground text-xs">
                Everyone is active now
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Appointments</CardTitle>
                <CardDescription>
                  Recent appointments from your clinics.
                </CardDescription>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link to="/appointments">
                  View All
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
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
                  {appointments
                    .slice(0, maxAppointments)
                    .map((appointment, index) => (
                      <TableRow key={index}>
                        <TableCell>{appointment.clinic.name}</TableCell>
                        <TableCell>
                          {new Date(
                            appointment.scheduledAt,
                          ).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {new Date(
                            appointment.scheduledAt,
                          ).toLocaleTimeString()}
                        </TableCell>
                        <TableCell>{appointment.dentist.name}</TableCell>
                        <TableCell>{appointment.dentist.email}</TableCell>
                        <TableCell>
                          <Button variant="link" className="p-0">
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}

                  {appointments.length > maxAppointments && (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-center"
                        onClick={() =>
                          setMaxAppointments(
                            maxAppointments + maxAppointmentsAdd,
                          )
                        }
                      >
                        <Button variant="link">View More</Button>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-5">
            <CardHeader>
              <CardTitle>Recent Reports</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              {reports.slice(0, 3).map((report, index) => (
                <div key={index} className="flex items-center justify-between">
                  <img
                    className="h-16 w-16 rounded-lg"
                    src={`https://api.carident.live/${report.images[0].originalImagePath}`}
                    alt="Avatar"
                  />
                  <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">
                      {report.title}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {report.description}
                    </p>
                  </div>
                  <div className="w-28 text-xs text-right">
                    {(() => {
                      let counts = report.images
                        .flatMap((x) => x.detections)
                        .sort((a, b) => a.classId - b.classId)
                        .reduce((acc, obj) => {
                          let regex = /-\d-(\w+)/;
                          let match = obj.className.match(regex);
                          let key = match ? match[1] : obj.className;
                          if (!acc[key]) {
                            acc[key] = 0;
                          }
                          acc[key]++;
                          return acc;
                        }, {});

                      return Object.entries(counts)
                        .map(([key, value]) => `${value} ${key}`)
                        .join(", ");
                    })()}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};
export default Dashboard;

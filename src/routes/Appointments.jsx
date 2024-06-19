"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, Loader2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getAppointments, updateAppointment } from "@/services/auth.js";
import AcceptAppointmentForm from "@/components/Appointment/AcceptAppointment.jsx";
import CancelAppointmentForm from "@/components/Appointment/CancelAppointment.jsx";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const columns = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: "Avatar",
      accessorKey: "user.imagePath",
      header: "",
      cell: ({ row }) => (
        <Avatar>
          <AvatarImage src={`https://api.carident.live${row.getValue("Avatar")}`} />
          <AvatarFallback>{row.getValue("Name")[0]}</AvatarFallback>
        </Avatar>
      ),
    },
    {
      id: "Name",
      accessorKey: "user.name",
      header: "Name",
    },
    {
      id: "Email",
      accessorKey: "user.email",
      header: "Email",
    },
    {
      id: "Scheduled Date",
      accessorKey: "scheduledAt",
      header: ({ column }) => (
        <Button
          className="-ml-4"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Scheduled Date <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) =>
        new Date(row.getValue("Scheduled Date")).toLocaleString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        }),
    },
    {
      id: "Created At",
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) =>
        new Date(row.getValue("Created At")).toLocaleString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        }),
    },
    {
      id: "Dentist Name",
      accessorKey: "dentist.name",
      header: "Dentist",
    },
    {
      id: "Dentist Email",
      accessorKey: "dentist.email",
      header: "Email",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("status")}</div>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const appointment = row.original;
        return (
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="link">Accept</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="bg-white text-black dark:bg-zinc-950 dark:text-zinc-50">
                    Accept Appointment
                  </DialogTitle>
                  <DialogDescription>
                    Are you sure you want to accept this appointment?
                  </DialogDescription>
                </DialogHeader>
                <AcceptAppointmentForm
                  onSubmit={(reason) =>
                    handleAction(appointment.id, "Accepted", reason)
                  }
                  actionLoading={actionLoading}
                />
                <DialogFooter>
                  <DialogClose asChild>
                    <Button>Cancel</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="link">Cancel</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="bg-white text-black dark:bg-zinc-950 dark:text-zinc-50">
                    Cancel Appointment
                  </DialogTitle>
                  <DialogDescription>
                    Are you sure you want to cancel this appointment?
                  </DialogDescription>
                </DialogHeader>
                <CancelAppointmentForm
                  onSubmit={(reason) =>
                    handleAction(appointment.id, "Cancelled", reason)
                  }
                  actionLoading={actionLoading}
                />
                <DialogFooter>
                  <DialogClose asChild>
                    <Button>Cancel</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = window.localStorage.getItem("token");
        const response = await getAppointments(token);
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        toast({
          title: "Error fetching appointments",
          description: error.response.data.message || error.message,
          status: "error",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleAction = async (appointmentId, status, reason) => {
    try {
      setActionLoading(true);
      const token = window.localStorage.getItem("token");
      await updateAppointment(token, appointmentId, { status, reason });
      setAppointments(
        appointments.map((appointment) =>
          appointment.id === appointmentId
            ? { ...appointment, status }
            : appointment,
        ),
      );
      toast({
        title: `Appointment ${status === "Accepted" ? "accepted" : "cancelled"}`,
        description: `The appointment has been ${status.toLowerCase()}.`,
        status: "success",
      });
    } catch (error) {
      console.error(`Error updating appointment status:`, error);
      toast({
        title: `Error ${status === "Accepted" ? "accepting" : "cancelling"} appointment`,
        description: error.response.data.message,
        status: "error",
        variant: "destructive",
      });
    } finally {
      setActionLoading(false);
    }
  };

  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data: appointments,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full text-black dark:text-zinc-50">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter by dentist email..."
          value={table.getColumn("Dentist Email")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("Dentist Email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Appointments;

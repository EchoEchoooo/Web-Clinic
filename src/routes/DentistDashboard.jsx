import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
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
import { toast } from "@/components/ui/use-toast";
import { getDentists, removeDentist, updateDentist } from "@/services/auth.js";
import { Edit, Trash, Loader2 } from "lucide-react";
import NewDentist from "@/components/Dentist/NewDentist";
import UpdateDentist from "@/components/Dentist/UpdateDentist";

const DentistDashboard = () => {
  const [dentists, setDentists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    const fetchDentists = async () => {
      try {
        const token = window.localStorage.getItem("token");
        const response = await getDentists(token);
        setDentists(response.data);
      } catch (error) {
        console.error("Error fetching dentists:", error);
        toast({
          title: "Error fetching dentists",
          description: error.response.data.message ||  error.message,
          status: "error",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchDentists();
  }, []);

  const handleRemove = async (dentistId) => {
    try {
      setActionLoading(true);
      const token = window.localStorage.getItem("token");
      await removeDentist(token, dentistId);
      setDentists(dentists.filter((dentist) => dentist.id !== dentistId));
      toast({
        title: "Dentist removed",
        description: "The dentist has been successfully removed.",
        status: "success",
      });
    } catch (error) {
      console.error("Error removing dentist:", error);
      toast({
        title: "Error removing dentist",
        description: error.response.data.message ||  error.message,
        status: "error",
        variant: "destructive",
      });
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdate = async (values, dentistId) => {
    try {
      setActionLoading(true);
      const token = window.localStorage.getItem("token");
      await updateDentist(token, dentistId, values);
      setDentists(
        dentists.map((dentist) =>
          dentist.id === dentistId ? { ...dentist, ...values } : dentist
        )
      );
      toast({
        title: "Dentist updated",
        description: "The dentist's details have been successfully updated.",
        status: "success",
      });
    } catch (error) {
      console.error("Error updating dentist:", error);
      toast({
        title: "Error updating dentist",
        description: error.response.data.message ||  error.message,
        status: "error",
        variant: "destructive",
      });
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="flex-col">
      <div className="my-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button>New Dentist</Button>
          </DialogTrigger>
          <DialogContent className="p-0 sm:max-w-[425px]">
            <NewDentist />
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead className="px-8">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white text-black dark:bg-zinc-950 dark:text-zinc-50">
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              </TableCell>
            </TableRow>
          ) : (
            dentists.map((dentist) => (
              <TableRow key={dentist.id}>
                <TableCell>{dentist.name}</TableCell>
                <TableCell>{dentist.email}</TableCell>
                <TableCell>{dentist.phoneNumber ?? "---"}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="link"
                        >
                          <div className="flex items-center gap-1 text-gray-400 dark:text-gray-600">
                            <Trash size={16} />
                            <p>Remove</p>
                          </div>
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="bg-white text-black dark:bg-zinc-950 dark:text-zinc-50">
                            Are you absolutely sure?
                          </DialogTitle>
                          <DialogDescription>
                            This action cannot be undone. This will permanently
                            delete the dentist from your records.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button>Cancel</Button>
                          </DialogClose>
                          <DialogClose asChild>
                            {actionLoading ? (
                              <Button variant="destructive" disabled>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Remove
                              </Button>
                            ) : (
                              <Button
                                variant="destructive"
                              >
                                Remove
                              </Button>
                            )}
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="link"
                        >
                          <div className="flex items-center gap-1 text-gray-400 dark:text-gray-600">
                            <Edit size={16} />
                            <p>Edit</p>
                          </div>
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogTitle>Update Dentist</DialogTitle>
                        <DialogDescription>
                          Updating {dentist.name}&apos;s details.
                        </DialogDescription>
                        <UpdateDentist dentist={dentist} onUpdate={handleUpdate} actionLoading={actionLoading} />
                      </DialogContent>
                    </Dialog>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default DentistDashboard;

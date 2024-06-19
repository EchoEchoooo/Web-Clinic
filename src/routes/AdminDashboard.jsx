import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import {
  getClinicAdmins,
  removeUserFromClinicAdminByEmail, updateUser
} from "@/services/auth.js";
import { Edit, Loader2, Trash } from "lucide-react";
import NewAdmin from "@/components/Admin/NewAdmin";
import UpdateAdmin from "@/components/Admin/UpdateAdmin";

const AdminDashboard = () => {
  const [admins, setAdmins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const token = window.localStorage.getItem("token");
        const response = await getClinicAdmins(token);
        setAdmins(response.data);
      } catch (error) {
        console.error("Error fetching admins:", error);
        toast({
          title: "Error fetching admins",
          description: error.response.data.message ||  error.message,
          status: "error",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  const handleRemove = async (adminEmail) => {
    try {
      setActionLoading(true);
      const token = window.localStorage.getItem("token");
      await removeUserFromClinicAdminByEmail(token, adminEmail);
      setAdmins(admins.filter((admin) => admin.email !== adminEmail));
      toast({
        title: "Admin removed",
        description: "The admin has been successfully removed.",
        status: "success",
      });
    } catch (error) {
      console.error("Error removing admin:", error);
      toast({
        title: "Error removing admin",
        description: error.response.data.message ||  error.message,
        status: "error",
        variant: "destructive",
      });
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdate = async (values, id) => {
    try {
      setActionLoading(true);
      const token = window.localStorage.getItem("token");
      await updateUser(token, id, values); // Assuming updateAdmin function exists
      setAdmins(
        admins.map((admin) =>
          admin.id === id ? { ...admin, ...values } : admin,
        ),
      );
      toast({
        title: "Admin updated",
        description: "The admin's details have been successfully updated.",
        status: "success",
      });
    } catch (error) {
      console.error("Error updating admin:", error);
      toast({
        title: "Error updating admin",
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
            <Button>New Admin</Button>
          </DialogTrigger>
          <DialogContent className="p-0 sm:max-w-[425px]">
            <NewAdmin />
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
            admins.map((admin, index) => (
              <TableRow key={index}>
                <TableCell className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage
                      src={`https://api.carident.live${admin.imagePath}`}
                    />
                    <AvatarFallback>
                      {admin.name
                        .split(" ")
                        .map((name) => name.charAt(0).toUpperCase())
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  {admin.name}
                </TableCell>
                <TableCell>{admin.email}</TableCell>
                <TableCell>{admin.phoneNumber ?? "---"}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="link">
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
                            delete the admin from your records.
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
                                onClick={() => handleRemove(admin.email)}
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
                        <Button variant="link">
                          <div className="flex items-center gap-1 text-gray-400 dark:text-gray-600">
                            <Edit size={16} />
                            <p>Edit</p>
                          </div>
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Update Admin</DialogTitle>
                          <DialogDescription>
                            Updating {admin.name}&apos;s details.
                          </DialogDescription>
                        </DialogHeader>
                        <UpdateAdmin admin={admin} onUpdate={handleUpdate} actionLoading={actionLoading} />
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

export default AdminDashboard;

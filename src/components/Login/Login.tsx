import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OrganizationLogin from "./OrganizationLogin";

import { useSearchParams } from "react-router-dom";
import StudentProctorLogin from "./Student-Procotor";

const UserLogin = () => {
  const [open, setOpen] = useState(false);
  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("modal") === "login") {
      setOpen((prev) => {
        return true;
      });
    }
  }, [searchParams.get("modal")]);

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        if (open) {
          setSearchParams({});
          setOpen(false);
        }
      }}
    >
      <DialogContent className="min-h-[60vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-center">
            Login
          </DialogTitle>
          {/* <DialogDescription>Enter Account Credentials.</DialogDescription> */}
        </DialogHeader>
        <Tabs defaultValue="organization" className="">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="organization">Organization</TabsTrigger>
            <TabsTrigger value="proctor">Proctor / Student</TabsTrigger>
            {/* <TabsTrigger value="proctor">Student</TabsTrigger> */}
          </TabsList>
          <TabsContent value="organization">
            <OrganizationLogin setOpen={setOpen} />
          </TabsContent>
          <TabsContent value="proctor">
            <StudentProctorLogin setOpen={setOpen} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default UserLogin;

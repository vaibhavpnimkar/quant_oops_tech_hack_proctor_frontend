import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useSearchParams } from "react-router-dom";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OrganizationSignup from "./OrganizationSignup";
import StudentSignup from "./StudentSignup";

const CreateAccount = () => {
  const [open, setOpen] = useState(false);
  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("modal") === "signup") {
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
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-center mb-4">
            Register
          </DialogTitle>
          {/* <DialogDescription>Create Your Account.</DialogDescription> */}
        </DialogHeader>
        <Tabs defaultValue="organization" className="">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="organization">Organization</TabsTrigger>
            <TabsTrigger value="student">Student</TabsTrigger>
          </TabsList>
          <TabsContent value="organization">
            <OrganizationSignup setOpen={setOpen} />
          </TabsContent>
          <TabsContent value="student">
            <StudentSignup setOpen={setOpen} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAccount;

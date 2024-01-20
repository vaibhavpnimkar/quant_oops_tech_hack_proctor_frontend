import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProctorValidation } from "@/lib/validations/user";
import { z } from "zod";
import { useCreateProctorMutation } from "../api";

const CreateProctor = () => {
  const { mutate: registerProctorFn } = useCreateProctorMutation();
  const [serverErrors, setServerErrors] = useState({
    email: false,
  });

  const form = useForm({
    resolver: zodResolver(ProctorValidation),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  interface BProps {
    name: string;
    email: string;
    password: string;
  }

  const createUser = (body: BProps) => {
    registerProctorFn(
      { body },
      {
        onSuccess: (data: any) => {
          console.log(data);
          form?.reset();
        },
        onError: (err: any) => {
          console.log(err);
          setServerErrors((prev) => {
            return {
              email: true,
            };
          });
        },
      }
    );
  };

  const onSubmit = async (values: z.infer<typeof ProctorValidation>) => {
    console.log(values);

    createUser({
      name: values?.name,
      email: values?.email,
      password: values?.password,
    });
  };

  return (
    <div className="sm:p-8 p-6 py-16 min-h-[90vh] shadow-md flex justify-center items-center">
      <div className="flex flex-col p-6 py-16 bg-gray-100 rounded-sm w-[100%] sm:w-[80%] md:w-[60%] lg:w-[50%] xl:w-[40%] h-[60%]">
        <h1 className="text-2xl font-bold text-gray-600 text-center mb-[0.5rem]">
          Create Proctor
        </h1>
        <h1 className="text-xl font-semibold text-gray-600 text-center mb-[2rem]">
          Enter the details of the proctor
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col justify-start gap-5 w-[100%]"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center w-full">
                  <FormLabel className="text-base text-gray-500">
                    Name
                  </FormLabel>
                  <div className="col-span-3">
                    <FormControl className="">
                      <Input
                        placeholder="Enter your name"
                        type="text"
                        className=""
                        {...field}
                      />
                    </FormControl>
                    {form?.formState?.errors?.name && (
                      <FormMessage>
                        {form?.formState?.errors?.name?.message}
                      </FormMessage>
                    )}
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center w-full">
                  <FormLabel className="text-base text-gray-500">
                    Email
                  </FormLabel>
                  <div className="col-span-3">
                    <FormControl
                      onChange={() =>
                        setServerErrors((prev) => ({ ...prev, email: false }))
                      }
                      className=""
                    >
                      <Input
                        placeholder="Email"
                        type="email"
                        className="focus-visible:ring-0 ring-0"
                        {...field}
                      />
                    </FormControl>
                    {form?.formState?.errors?.email && (
                      <FormMessage>
                        {form?.formState?.errors?.email?.message}
                      </FormMessage>
                    )}
                    {serverErrors.email && (
                      <FormMessage>Email Already Exists!</FormMessage>
                    )}
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center w-full">
                  <FormLabel className="text-base text-gray-500">
                    Password
                  </FormLabel>
                  <div className="col-span-3">
                    <FormControl className="">
                      <Input
                        placeholder="Enter a password"
                        type="password"
                        className=""
                        {...field}
                      />
                    </FormControl>
                    {form?.formState?.errors?.password && (
                      <FormMessage>
                        {form?.formState?.errors?.password?.message}
                      </FormMessage>
                    )}
                  </div>
                </FormItem>
              )}
            />
            <Button variant={"default"} className="mt-[1rem]" type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateProctor;

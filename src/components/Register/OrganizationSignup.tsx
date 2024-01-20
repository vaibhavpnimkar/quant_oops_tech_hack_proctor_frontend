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
import { isBase64Image } from "@/lib/utils";
import { UserValidation } from "@/lib/validations/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";
import { useCreateAdminMutation } from "../api";
import useCloudinary from "./useCloudinary";
import { showToast } from "@/lib/showToast";

interface Props {
  setOpen: (x: boolean) => any;
}

const OrganizationSignup = ({ setOpen }: Props) => {
  const [files, setFiles] = useState<File[]>([]);
  const { sendRequest: imageUpload } = useCloudinary();
  const { mutate: registerAdminFn } = useCreateAdminMutation();
  let [searchParams, setSearchParams] = useSearchParams();
  const [serverErrors, setServerErrors] = useState({
    email: false,
  });

  const form = useForm({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      profilePic: "",
      name: "",
      email: "",
      password: "",
    },
  });
  interface BProps {
    profilePic: string;
    name: string;
    email: string;
    password: string;
  }

  const createUser = (body: BProps) => {
    registerAdminFn(
      { body },
      {
        onSuccess: (data: any) => {
          console.log(data);
          showToast("Your account has been created successfully.", "success");
          setSearchParams({});
          setOpen(false);
        },
        onError: (err: any) => {
          console.log(err);
          setServerErrors((prev) => {
            return {
              ...prev,
              email: true,
            };
          });
        },
      }
    );
  };
  const onSubmit = async (values: z.infer<typeof UserValidation>) => {
    console.log(values);

    const blob = values?.profilePic;

    console.log(blob);

    const hasImageChanged = isBase64Image(blob);

    if (hasImageChanged) {
      const data = new FormData();
      data.append("file", blob);
      data.append("upload_preset", "blogapppreset");

      imageUpload(
        {
          url: "https://api.cloudinary.com/v1_1/dntn0wocu/image/upload",
          method: "POST",
          body: data,
        },
        (res) => {
          console.log(res);

          // api call to save to database
          createUser({
            name: values?.name,
            email: values?.email,
            password: values?.password,
            profilePic: res,
          });
        },
        (err) => {
          console.log(err);
        }
      );
    }
  };

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();
    const fileReader = new FileReader();
    if (e?.target?.files && e?.target?.files?.length > 0) {
      const file = e?.target?.files[0];

      setFiles(Array.from(e?.target?.files));

      if (!file?.type?.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event?.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start gap-5"
      >
        <FormField
          control={form.control}
          name="profilePic"
          render={({ field }) => (
            <FormItem className="grid items-center grid-cols-4 gap-4">
              <FormLabel className="">
                {field?.value ? (
                  <img
                    src={field?.value}
                    alt="profile_image"
                    width={96}
                    height={96}
                    style={{ width: 64, height: 64, borderRadius: "100%" }}
                    className="object-contain rounded-full"
                  />
                ) : (
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbHvZ2JK-oa1Hcq0hCVxF-PDwfMQY09ocJ3A&usqp=CAU"
                    alt="profile_image"
                    width={96}
                    height={96}
                    style={{ width: 64, height: 64, borderRadius: "100%" }}
                    className="object-contain"
                  />
                )}
              </FormLabel>
              <div className="col-span-3">
                <FormControl className="flex-1 col-span-3 text-gray-400 text-base-semibold">
                  <Input
                    type="file"
                    accept="image/*"
                    placeholder="Upload a photo"
                    className=""
                    onChange={(e) => handleImage(e, field?.onChange)}
                  />
                </FormControl>
                {form?.formState?.errors?.profilePic && (
                  <FormMessage>
                    {form?.formState?.errors?.profilePic?.message}
                  </FormMessage>
                )}
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="grid items-center w-full grid-cols-4">
              <FormLabel className="text-gray-500 text-base-semibold text-light-2">
                Name
              </FormLabel>
              <div className="col-span-3">
                <FormControl className="col-span-3">
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
            <FormItem className="grid items-center w-full grid-cols-4">
              <FormLabel className="text-base-semibold text-light-2">
                Email
              </FormLabel>
              <div className="col-span-3">
                <FormControl
                  onChange={() =>
                    setServerErrors((prev) => ({ ...prev, email: false }))
                  }
                  className="col-span-3"
                >
                  <Input
                    placeholder="Email"
                    type="email"
                    className=""
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
            <FormItem className="grid items-center w-full grid-cols-4">
              <FormLabel className="text-base-semibold text-light-2">
                Password
              </FormLabel>
              <div className="col-span-3">
                <FormControl className="col-span-3">
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
        <Button className="" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default OrganizationSignup;

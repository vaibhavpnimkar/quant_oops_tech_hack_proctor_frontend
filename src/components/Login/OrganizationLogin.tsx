import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  //   FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  //   FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useLoginUserMutation } from "../api";
import { useForm } from "react-hook-form";
import { LoginValidation } from "@/lib/validations/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "../ui/use-toast";
import { userState } from "@/atoms/userState";
import { useSetRecoilState } from "recoil";

interface Props {
  setOpen: (x: boolean) => any;
}

const OrganizationLogin = ({ setOpen }: Props) => {
  let [searchParams, setSearchParams] = useSearchParams();
  const { mutate: loginUserFn } = useLoginUserMutation();
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);

  const form = useForm({
    resolver: zodResolver(LoginValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  interface BProps {
    email: string;
    password: string;
  }

  const loginUser = (body: BProps) => {
    loginUserFn(
      { body },
      {
        onSuccess: (data: any) => {
          console.log(data);
          localStorage.setItem(
            "accessToken",
            data?.data?.accessTokens?.accessToken
          );
          localStorage.setItem("role", data?.data?.role);
          localStorage.setItem("userId", data?.data?.id);
          setSearchParams({});
          setOpen(false);
          setUser((prev) => {
            return {
              accessToken: data?.data?.accessTokens?.accessToken,
              role: data?.data?.role,
            };
          });
          if (data?.data?.role === "organization") {
            navigate("/organization/dashboard");
          }
        },
        onError: (err: any) => {
          console.log(err);
          toast({
            title:
              "Organization Not Found!! Please check your email/password and try again.",
          });
        },
      }
    );
  };

  const onSubmit = async (values: z.infer<typeof LoginValidation>) => {
    console.log(values);

    // api call to save user to database

    loginUser({
      email: values?.email,
      password: values?.password,
    });
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start gap-5"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center w-full">
              <FormLabel className="text-base-semibold text-light-2">
                Email
              </FormLabel>
              <div className="col-span-3">
                <FormControl className="col-span-3">
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
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center w-full">
              <FormLabel className="text-base-semibold text-light-2">
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
        <Button className="mt-6" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default OrganizationLogin;

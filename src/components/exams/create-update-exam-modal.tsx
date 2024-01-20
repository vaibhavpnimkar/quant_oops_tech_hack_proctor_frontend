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
import { ExamValidation } from "@/lib/validations/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectGroup } from "@radix-ui/react-select";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  useCreateExamMutation,
  useGetExamByIdMutation,
  useUpdateExamMutation,
} from "../api";

import { EXAM_TYPE, EXAM_TYPE_MAPPING } from "@/constants/ExamType";
import { useSearchParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

function isNumber(value: any): boolean {
  return typeof value === "number" && !isNaN(value);
}

interface IProps {
  open: boolean;
  setOpen: (x: boolean) => any;
  isCreateModal: boolean;
  refetchData: () => any;
}

const CreateExamModal = ({
  open,
  setOpen,
  refetchData,
  isCreateModal,
}: IProps) => {
  const { mutate: registerExamFn } = useCreateExamMutation();
  const { mutate: updateExamFn } = useUpdateExamMutation();
  const { mutate: getExamByIdFn } = useGetExamByIdMutation();

  const [searchParams, setSearchParams] = useSearchParams();
  const [serverErrors, setServerErrors] = useState({
    // email: false,
  });

  const form = useForm({
    resolver: zodResolver(ExamValidation),
    defaultValues: {
      name: "",
      description: "",
      duration: "",
      startTime: "",
      passingMarks: "",
      totalQuestions: "",
      examType: "",
    },
  });

  useEffect(() => {
    if (isCreateModal || !open) return;

    if (!searchParams.get("examId")) {
      setOpen(false);
      return;
    }
    getExamByIdFn(
      { body: { examId: +searchParams.get("examId")! } },
      {
        onSuccess: (data: any) => {
          console.log(data);
          form.setValue("name", data?.data?.name);
          form.setValue("description", data?.data?.description);
          form.setValue("duration", data?.data?.duration.toString());
          form.setValue("startTime", data?.data?.startTime);
          form.setValue("passingMarks", data?.data?.passingMarks.toString());
          form.setValue(
            "totalQuestions",
            data?.data?.totalQuestions.toString()
          );
          form.setValue("examType", data?.data?.examType);
        },
        onError: (err: any) => {
          console.log(err);
        },
      }
    );
  }, [open]);

  interface BProps {
    name: string;
    description: string;
    duration: number;
    startTime: string;
    passingMarks: number;
    totalQuestions: number;
    examType: string;
  }

  const createExam = (body: BProps) => {
    registerExamFn(
      { body },
      {
        onSuccess: (data: any) => {
          console.log(data);
          form?.reset();
          refetchData();
          setOpen(false);
        },
        onError: (err: any) => {
          console.log(err);
          setServerErrors((prev) => {
            return {
              // email: true,
            };
          });
        },
      }
    );
  };

  const updateExam = (body: BProps) => {
    const data = {
      ...body,
      id: +searchParams.get("examId")!,
    };
    updateExamFn(
      { body: data },
      {
        onSuccess: (data: any) => {
          console.log(data);
          form?.reset();
          refetchData();
          setOpen(false);
        },
        onError: (err: any) => {
          console.log(err);
          setServerErrors((prev) => {
            return {
              // email: true,
            };
          });
        },
      }
    );
  };

  const onSubmit = async (values: z.infer<typeof ExamValidation>) => {
    if (!isNumber(+values?.duration)) {
      form.setError("duration", {
        message: "Duration must be a number",
      });
      return;
    }
    if (!isNumber(+values?.passingMarks)) {
      form.setError("passingMarks", {
        message: "Passing marks must be a number",
      });
      return;
    }
    if (!isNumber(+values?.totalQuestions)) {
      form.setError("totalQuestions", {
        message: "Total questions must be a number",
      });
      return;
    }
    const body = {
      name: values?.name,
      description: values?.description,
      duration: +values?.duration,
      startTime: values?.startTime,
      passingMarks: +values?.passingMarks,
      totalQuestions: +values?.totalQuestions,
      examType: values?.examType,
    };
    if (isCreateModal) {
      createExam(body);
    } else {
      updateExam(body);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(false);
        setSearchParams((prev) => {
          prev.delete("examId");
          return prev;
        });
        if (!isCreateModal) form.reset();
      }}
    >
      <DialogContent className="sm:max-w-[425px] ">
        <DialogHeader>
          <DialogTitle>
            {isCreateModal ? "Create Exam" : "Update Exam"}
          </DialogTitle>
          <DialogDescription>
            {isCreateModal ? "Enter" : "Update"} the details of the exam
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col p-6 bg-muted rounded-sm w-[100%]">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col justify-start gap-6 w-[100%]"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="grid items-center w-full grid-cols-4">
                    <FormLabel className="text-sm text-gray-500">
                      Name
                    </FormLabel>
                    <div className="relative col-span-3">
                      <FormControl className="">
                        <Input
                          placeholder="Enter name"
                          type="text"
                          className=""
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="absolute text-xs" />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="grid items-center w-full grid-cols-4">
                    <FormLabel className="text-sm text-gray-500 d-flex">
                      Description
                    </FormLabel>
                    <div className="relative col-span-3">
                      <FormControl
                        onChange={() =>
                          setServerErrors((prev) => ({ ...prev, email: false }))
                        }
                        className=""
                      >
                        <Textarea
                          placeholder="Description"
                          className="focus-visible:ring-0 ring-0"
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="absolute text-xs" />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem className="grid items-center w-full grid-cols-4">
                    <FormLabel className="text-sm text-gray-500">
                      Duration
                    </FormLabel>
                    <div className="relative col-span-3">
                      <FormControl className="">
                        <Input
                          type="number"
                          placeholder="Duration in minutes"
                          inputMode="numeric"
                          className=""
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="absolute text-xs" />
                      {/* {form?.formState?.errors?.duration && (
                      <FormMessage>
                        {form?.formState?.errors?.duration?.message}
                      </FormMessage>
                    )} */}
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem className="grid items-center w-full grid-cols-4">
                    <FormLabel className="text-sm text-gray-500">
                      Start Time
                    </FormLabel>
                    <div className="relative col-span-3">
                      <FormControl className="">
                        <input
                          type="datetime-local"
                          className=""
                          {...field}
                        ></input>
                      </FormControl>
                      <FormMessage className="absolute text-xs" />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="passingMarks"
                render={({ field }) => (
                  <FormItem className="grid items-center w-full grid-cols-4">
                    <FormLabel className="text-sm text-gray-500">
                      Passing Marks
                    </FormLabel>
                    <div className="relative col-span-3">
                      <FormControl className="">
                        <Input
                          placeholder="Passing Marks"
                          type="number"
                          className=""
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="absolute text-xs" />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="totalQuestions"
                render={({ field }) => (
                  <FormItem className="grid items-center w-full grid-cols-4">
                    <FormLabel className="text-sm text-gray-500">
                      Total Questions
                    </FormLabel>
                    <div className="relative col-span-3">
                      <FormControl className="">
                        <Input
                          placeholder="Total Questions"
                          type="number"
                          className=""
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="absolute text-xs" />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="examType"
                render={({ field }) => {
                  return (
                    <FormItem className="grid items-center w-full grid-cols-4">
                      <FormLabel className="text-sm text-gray-500">
                        Exam Type
                      </FormLabel>
                      <div className="relative col-span-3">
                        <FormControl className="">
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            {...field}
                          >
                            <SelectTrigger className="">
                              <SelectValue placeholder="Select exam type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value={EXAM_TYPE.multiple_choice}>
                                  {EXAM_TYPE_MAPPING.multiple_choice}
                                </SelectItem>
                                <SelectItem value={EXAM_TYPE.coding}>
                                  {EXAM_TYPE_MAPPING.coding}
                                </SelectItem>
                                <SelectItem value={EXAM_TYPE.both}>
                                  {EXAM_TYPE_MAPPING.both}
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage className="absolute text-xs" />
                      </div>
                    </FormItem>
                  );
                }}
              />
              <Button variant={"default"} className="mt-[1rem]" type="submit">
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateExamModal;

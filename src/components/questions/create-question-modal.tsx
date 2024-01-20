import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { EXAM_TYPE, EXAM_TYPE_MAPPING } from "@/constants/ExamType";
import { QuestionValidation } from "@/lib/validations/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateExamQuestionMutation } from "../api";
import { IExam } from "../exams/exam-table-config";
import Loader from "../ui/loader";

interface IProps {
  open: boolean;
  setOpen: (x: boolean) => any;
  refetchData: () => any;
  examData: IExam;
}

const CreateQuestionModal = ({
  open,
  setOpen,
  refetchData,
  examData,
}: IProps) => {
  const { mutate: createQuestionFn, isLoading } =
    useCreateExamQuestionMutation();
  const [serverErrors, setServerErrors] = useState({
    email: false,
  });

  const form = useForm({
    resolver: zodResolver(QuestionValidation),
    defaultValues: {
      examId: "1",
      question: "",
      description: "",
      questionType: "",
      marks: "",
      negativeMarks: "",
      options: [] as { option: string; isCorrect: boolean }[],
    },
  });
  const questionType = form.watch("questionType");
  const { fields, append, remove } = useFieldArray({
    name: "options",
    control: form.control,
  });
  interface BProps {
    examId: number;
    question: string;
    description: string;
    questionType: string;
    marks: number;
    negativeMarks: number;
    options: { option: string; isCorrect: boolean }[];
  }

  const createQuestion = (body: BProps) => {
    createQuestionFn(
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
              email: true,
            };
          });
        },
      }
    );
  };

  const onSubmit = async (values: z.infer<typeof QuestionValidation>) => {
    if (questionType === EXAM_TYPE.multiple_choice) {
      let correct_count = 0;
      for (let i = 0; i < values.options.length; i++) {
        if (values.options[i].isCorrect) {
          correct_count++;
        }
      }
      values = {
        ...values,
        questionType: correct_count <= 1 ? "single_select" : "multi_select",
      };
    }

    createQuestion({
      examId: examData.id,
      question: values.question,
      description: values.description,
      questionType: values.questionType,
      marks: +values.marks,
      negativeMarks: +values.negativeMarks,
      options: values.options,
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(false);
      }}
    >
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create Question</DialogTitle>
          <DialogDescription>Enter the question details</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col p-8 bg-gray-100 rounded-sm w-[100%]">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col justify-start gap-5 w-[100%]"
            >
              <FormField
                control={form.control}
                name="question"
                render={({ field }) => (
                  <FormItem className="grid items-center w-full grid-cols-4">
                    <FormLabel className="text-base text-gray-500">
                      Question
                    </FormLabel>
                    <div className="col-span-3">
                      <FormControl className="">
                        <Input
                          placeholder="Enter your question"
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
                    <FormLabel className="text-base text-gray-500">
                      Description
                    </FormLabel>
                    <div className="col-span-3">
                      <FormControl className="">
                        <Textarea
                          placeholder="Description"
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
                name="questionType"
                render={({ field }) => {
                  return (
                    <FormItem className="grid items-center w-full grid-cols-4">
                      <FormLabel className="text-sm text-gray-500">
                        Question Type
                      </FormLabel>
                      <div className="relative col-span-3">
                        <FormControl className="">
                          <Select
                            defaultValue={field.value}
                            onValueChange={field.onChange}
                            {...field}
                          >
                            <SelectTrigger className="">
                              <SelectValue placeholder="Select question type" />
                            </SelectTrigger>
                            <SelectContent>
                              {examData.examType === EXAM_TYPE.coding ? (
                                <SelectItem value={EXAM_TYPE.coding}>
                                  {EXAM_TYPE_MAPPING.coding}
                                </SelectItem>
                              ) : examData.examType ===
                                EXAM_TYPE.multiple_choice ? (
                                <SelectGroup>
                                  <SelectItem value={EXAM_TYPE.multiple_choice}>
                                    {EXAM_TYPE_MAPPING.multiple_choice}
                                  </SelectItem>
                                </SelectGroup>
                              ) : (
                                <SelectGroup>
                                  <SelectItem value={EXAM_TYPE.coding}>
                                    {EXAM_TYPE_MAPPING.coding}
                                  </SelectItem>
                                  <SelectItem value={EXAM_TYPE.multiple_choice}>
                                    {EXAM_TYPE_MAPPING.multiple_choice}
                                  </SelectItem>
                                </SelectGroup>
                              )}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage className="absolute text-xs" />
                      </div>
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="marks"
                render={({ field }) => {
                  return (
                    <FormItem className="grid items-center w-full grid-cols-4">
                      <FormLabel className="text-sm text-gray-500">
                        Marks
                      </FormLabel>
                      <div className="relative col-span-3">
                        <FormControl className="">
                          <Input
                            placeholder="Enter  marks"
                            type="number"
                            className=""
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="absolute text-xs" />
                      </div>
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="negativeMarks"
                render={({ field }) => {
                  return (
                    <FormItem className="grid items-center w-full grid-cols-4">
                      <FormLabel className="text-sm text-gray-500">
                        Negative Marks
                      </FormLabel>
                      <div className="col-span-3 ">
                        <FormControl className="">
                          <Input
                            placeholder="Enter negative marks"
                            type="number"
                            className=""
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="absolute text-xs" />
                      </div>
                    </FormItem>
                  );
                }}
              />
              {questionType === "coding" ? null : (
                <div className="grid items-center w-full grid-cols-4">
                  <FormLabel className="text-sm text-gray-500">
                    Options
                  </FormLabel>
                  <div className="flex flex-col col-span-3 gap-4">
                    {fields.map((field, index) => (
                      <div
                        key={field.id}
                        className="flex items-center justify-between gap-2"
                      >
                        <FormControl className="w-[100%]">
                          <Input
                            placeholder="Enter option"
                            type="text"
                            className=""
                            {...form.register(
                              `options.${index}.option` as const
                            )}
                            {...field}
                          />
                        </FormControl>
                        <FormControl className="">
                          <Input
                            type={"checkbox"}
                            className=""
                            {...form.register(
                              `options.${index}.isCorrect` as const
                            )}
                            {...field}
                            name={`options[${index}].isCorrect`}
                          />
                        </FormControl>
                        <Button variant="default" onClick={() => remove(index)}>
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Button
                      // variant="primary"
                      className="mt-[1rem]"
                      onClick={() => append({ option: "", isCorrect: false })}
                    >
                      Add Option
                    </Button>
                  </div>
                </div>
              )}
              {isLoading ? (
                <Loader size={8} />
              ) : (
                <Button variant={"default"} className="mt-[1rem]" type="submit">
                  Submit
                </Button>
              )}
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateQuestionModal;

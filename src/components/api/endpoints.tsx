import { apiClient } from "@/lib/providers/api-provider";
import {
  CreateAdminProps,
  CreateExamProps,
  CreateExamQuestionProps,
  CreateProctorProps,
  CreateStudentProps,
  DeleteQuestionProps,
  GetAllLiveExamQuestionsProps,
  GetAllProctorsProps,
  GetExamAllQuestionsProps,
  GetExamByIdProps,
  LoginStudentProps,
  LoginUserProps,
  RemoveProctorProps,
  SendEmailProps,
  SubmitQuestionProps,
  UpdateExamProps,
} from "./APIProps";

export const createAdmin = ({ body }: CreateAdminProps): Promise<any> =>
  apiClient("/api/v1/register-organization/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

export const UserLogin = ({ body }: LoginUserProps): Promise<any> =>
  apiClient("/api/v1/login-organization/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

export const createStudent = ({ body }: CreateStudentProps): Promise<any> =>
  apiClient("/api/v1/register-student/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

export const createProctor = ({ body }: CreateProctorProps): Promise<any> =>
  apiClient("/api/v1/create-proctor/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
    body: JSON.stringify(body),
  });

export const getAllProctors = ({ body }: GetAllProctorsProps): Promise<any> => {
  return apiClient(
    `/api/v1/get-all-proctors?limit=${body?.limit}&offset=${body?.offset}`,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    }
  );
};

export const removeProctor = ({ body }: RemoveProctorProps): Promise<any> =>
  apiClient("/api/v1/remove-proctor/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
    body: JSON.stringify(body),
  });

export const createExam = ({ body }: CreateExamProps): Promise<any> => {
  return apiClient("/api/v1/exam/create-exam/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
    body: JSON.stringify(body),
  });
};

export const getAllExams = ({ body }: GetAllProctorsProps): Promise<any> => {
  return apiClient(
    `/api/v1/exam/get-all-exams?limit=${body?.limit}&offset=${body?.offset}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    }
  );
};

export const updateExam = ({ body }: UpdateExamProps): Promise<any> =>
  apiClient("/api/v1/exam/update-exam/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
    body: JSON.stringify(body),
  });

export const getExamById = ({ body }: GetExamByIdProps): Promise<any> =>
  apiClient(`/api/v1/exam/get-exam-by-id?examId=${body?.examId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
  });

export const getAllExamQuestions = ({
  body,
}: GetExamAllQuestionsProps): Promise<any> =>
  apiClient(
    `/api/v1/exam/get-all-exam-questions?limit=${body?.limit}&offset=${body?.offset}&examId=${body?.examId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    }
  );

export const createExamQuestion = ({
  body,
}: CreateExamQuestionProps): Promise<any> =>
  apiClient("/api/v1/exam/create-exam-question/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
    body: JSON.stringify(body),
  });

export const deleteExamQuestion = ({
  body,
}: DeleteQuestionProps): Promise<any> =>
  apiClient("/api/v1/exam/delete-exam-question/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
    body: JSON.stringify(body),
  });

export const StudentLogin = ({ body }: LoginStudentProps): Promise<any> =>
  apiClient("/api/v1/login-student/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

export const ProctorLogin = ({ body }: LoginStudentProps): Promise<any> =>
  apiClient("/api/v1/login-proctor/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

export const getStudents = ({ body }: any): Promise<any> =>
  apiClient(
    `/api/v1/get-all-students?limit=${body?.limit}&offset=${body?.offset}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    }
  );

export const getStudentsByExamId = ({ body }: any): Promise<any> =>
  apiClient(
    `/api/v1/exam/get-all-students?examId=${body.examId}&limit=${body?.limit}&offset=${body?.offset}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    }
  );

export const sendEmail = ({ body }: SendEmailProps): Promise<any> =>
  apiClient("/api/v1/exam/send-exam-mail/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
    body: JSON.stringify(body),
  });

// export const addStudents = ({ body }: AddStudentsProps): Promise<any> =>
//   apiClient("/api/v1/add-students/", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: "Bearer " + localStorage.getItem("accessToken"),
//     },
//     body: JSON.stringify(body),
//   });

export const verifyStudent = ({ body }: any): Promise<any> =>
  apiClient("/api/v1/verify-student", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
    body: JSON.stringify(body),
  });

export const getAllLiveExamQuestions = ({
  body,
}: GetAllLiveExamQuestionsProps) =>
  apiClient(`/api/v1/live-exam/get-questions?examId=${body.examId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
  });

export const startExam = ({ body }: any) => {
  return apiClient(`/api/v1/live-exam/start-exam`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
    body: JSON.stringify(body),
  });
};

export const finishExam = ({ body }: any) => {
  return apiClient(`/api/v1/live-exam/finish-exam`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
    body: JSON.stringify(body),
  });
};

export const submitQuestion = ({ body }: SubmitQuestionProps) => {
  return apiClient(`/api/v1/live-exam/submit-question`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
    body: JSON.stringify(body),
  });
};

export const getLLMLogs = ({ body }: any): Promise<any> =>
  apiClient(
    `/api/v1/exam/get-student-logs?examId=${body.examId}&studentId=${body.studentId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    }
  );

  export const getProfileData=({body}:any):Promise<any>=>
  apiClient(`/api/v1/get-student-profile`,{
    method:"GET",
    headers:{
      "Content-Type":"application/json",
      Authorization:"Bearer "+localStorage.getItem("accessToken")
    }
  })
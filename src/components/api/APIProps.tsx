export interface CreateAdminProps {
  body: { profilePic: string; name: string; password: string; email: string };
}

export interface CreateStudentProps {
  body: {
    profilePic: string;
    name: string;
    password: string;
    email: string;
    organizationId: string;
    aadharNumber: string;
    panNumber: string;
    aadharPic: string;
    panPic: string;
  };
}
export interface LoginUserProps {
  body: { email: string; password: string };
}

export interface LoginStudentProps {
  body: { email: string; password: string; organizationId: string };
}

export interface CreateProctorProps {
  body: { email: string; password: string; name: string };
}

export interface GetAllProctorsProps {
  body: { limit: Number; offset: Number };
}

export interface RemoveProctorProps {
  body: { proctorId: number };
}

export interface CreateExamProps {
  body: {
    name: string;
    description: string;
    duration: number;
    startTime: string;
    passingMarks: number;
    totalQuestions: number;
    examType: string;
  };
}

export interface GetAllExamsProps {
  body: { limit: Number; offset: Number };
}

export interface UpdateExamProps {
  body: {
    id: number;
    name: string;
    description: string;
    duration: number;
    startTime: string;
    passingMarks: number;
    totalQuestions: number;
    examType: string;
  };
}

export interface GetExamByIdProps {
  body: { examId: number };
}

export interface GetExamAllQuestionsProps {
  body: { examId: number; limit: Number; offset: Number };
}

export interface CreateExamQuestionProps {
  body: {
    examId: number;
    question: string;
    description: string;
    questionType: string;
    marks: number;
    negativeMarks: number;
    options: { option: string; isCorrect: boolean }[];
  };
}

export interface DeleteQuestionProps {
  body: { questionId: number };
}

export interface GetStudentsProps {
  body: { limit: Number; offset: Number };
}

export interface SendEmailProps {
  body: { examId: number; studentIds: number[] };
}

// export interface AddStudentsProps {
//   body: { studentId: number; examId: number };
// }

export interface GetAllLiveExamQuestionsProps {
  body: { examId: number };
}

export interface SubmitQuestionProps {
  body: { examId: number; questionId: number; options: number[] };
}

import React, { useEffect, useState } from "react";

import { useGetProfileDataMutation } from "@/components/api";
import { EditProfileValidation } from "@/lib/validations/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface IStudentProfile {
  profilePic: string;
  aadharNumber: string;
  aadharPic: string;
  panNumber: string;
  panPic: string;
  name: string;
  email: string;
  organizationId: string;
}

const StudentProfile = () => {
  const [isEdit, setIsEdit] = React.useState<boolean>(false);

  const [profileData, setProfileData] = useState<IStudentProfile | null>(null);
  const { mutate: getProfileDataFn } = useGetProfileDataMutation();
  const form = useForm({
    resolver: zodResolver(EditProfileValidation),
    defaultValues: {
      profilePic: "",
      aadharNumber: "",
      aadharPic: "",
      panNumber: "",
      panPic: "",
      name: "",
      email: "",
      password: "",
      organizationId: "",
    },
  });

  useEffect(() => {
    getProfileDataFn(
      {},
      {
        onSuccess: (data: any) => {
          setProfileData(data?.data);
          console.log(data?.data);
        },
        onError: (err: any) => {
          console.log(err);
        },
      }
    );
  }, []);

  const onSubmit = async (values: z.infer<typeof EditProfileValidation>) => {
    console.log(values);

    // api call to save user to database

    // loginUser({
    //   email: values?.email,
    //   password: values?.password,
    // });
  };
  return (
    <div className="">
      <div className="flex justify-between w-full mb-8">
        <h1 className="text-3xl font-semibold text-slate-500">My Profile</h1>
      </div>
      {profileData && (
        <div className="">
          <div className="flex items-center justify-center gap-6">
            <h1>
              Name: <span>{profileData?.name}</span>
            </h1>
            <img src={profileData?.profilePic} className="h-32" />
          </div>

          <div className="flex items-center justify-center gap-6 mt-8">
            <h1 className="mt-8">
              Adhaar Number : <span>{profileData?.aadharNumber}</span>
            </h1>
            <img src={profileData?.aadharPic} className="h-32" />
          </div>

          <div className="flex items-center justify-center gap-6 mt-8">
            <h1 className="mt-8">
              Pan Number : <span>{profileData?.panNumber}</span>
            </h1>
            <img src={profileData?.panPic} className="h-32" />
          </div>

          <div className="flex flex-col items-center justify-center gap-6 mt-8">
            <h1 className="mt-8">
              Email: <span>{profileData?.email}</span>
            </h1>
            <h1>
              Organization: <span>{profileData?.organizationId}</span>
            </h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentProfile;

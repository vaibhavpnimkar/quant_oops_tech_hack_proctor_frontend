import { useCallback, useState } from "react";

interface RProps {
  url: string;
  method: string;
  body: any;
}

const useCloudinary = () => {
  const [isLoading, setIsloading] = useState(false);
  const [url, setUrl] = useState<string>("");

  const sendRequest = useCallback(
    async (
      requestConfig: RProps,
      dataHandler: (res: any) => void,
      errorHandler: (err: any) => void
    ) => {
      setIsloading(true);
      try {
        const response = await fetch(requestConfig.url, {
          method: requestConfig.method ? requestConfig.method : "GET",
          body: requestConfig.body ? requestConfig.body : null,
        });

        if (!response.ok) {
          throw new Error("Request failed!");
        }

        const data = await response.json();
        console.log(data);
        dataHandler(data?.secure_url);
        setUrl(data?.secure_url);
      } catch (error) {
        console.log(error);
        errorHandler(error);
      }
      setIsloading(false);
    },
    []
  );

  return {
    isLoading,
    sendRequest,
    url,
  };
};

export default useCloudinary;

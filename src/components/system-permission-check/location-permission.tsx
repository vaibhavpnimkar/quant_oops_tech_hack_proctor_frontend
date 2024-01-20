import { CheckCircle2, MapPin } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

interface IProps {
  setPermissionCount: React.Dispatch<React.SetStateAction<number>>;
}

const LocationPermission = ({ setPermissionCount }: IProps) => {
  const [locationPermission, setLocationPermission] = React.useState<
    boolean | null
  >(null);
  const getLocationPermission = async () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("Location permission granted");
        console.log("Latitude:", position.coords.latitude);
        console.log("Longitude:", position.coords.longitude);
      },
      (error) => {
        console.error("Location permission denied");
      }
    );
    setPermissionCount((prevState) => prevState + 1);
    setLocationPermission(true);
  };
  //   useEffect(() => {
  //     getLocationPermission();
  //   }, []);

  return (
    <div className="flex items-center justify-between gap-8 p-4 border rounded-lg border-primary">
      <div className="flex items-center gap-2">
        <MapPin className="text-primary" />
        <h3 className="text-lg ">Location Permission</h3>
      </div>
      {locationPermission === true ? (
        <div className="px-6 py-2 border rounded-lg border-primary">
          <CheckCircle2 className="text-primary" />
        </div>
      ) : (
        <Button className="ml-2" onClick={getLocationPermission}>
          Allow
        </Button>
      )}
    </div>
  );
};

export default LocationPermission;

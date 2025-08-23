"use client";
import { useEffect, useState } from "react";
import JobDetails from "./JobDescription";
import Jobs from "./Jobs";
import { JobsFilter } from "./JobsFilter";
import { Navigation } from "./Navigation";

const AllJobs = () => {
  // const country: any = useAppSelector(
  //   (state) => state.rootReducer.jobs.country
  // );
  // const dispatch = useAppDispatch();
  const [coordinates, setCoordinate] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    if (navigator?.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          const { lat, lng } = pos;
          setCoordinate({ lat, lng });
        }
      );
    }
  }, []);

  // useEffect(() => {
  //   if (coordinates.lat <= 0 || coordinates.lng <= 0) return;
  //   else {
  //     dispatch(getCountryName({ lat: coordinates.lat, lng: coordinates.lng }));
  //   }
  // }, [dispatch, coordinates.lat, coordinates.lng]);

  // useEffect(() => {
  //   if (!country) return;
  //   else {
  //     dispatch(getCountryStates({ country }));
  //   }
  // }, [dispatch, country]);

  return (
    <div className="bg-gray-100">
      <Navigation />
      <div className="flex items-center justify-center py-8">
        <div className="w-[95%] grid grid-items-center lg:justify-center xl:grid-flow-col md:grid-cols-[35%_65%] xl:grid-cols-[20%_55%_25%]">
          <JobsFilter />
          <Jobs />
          <JobDetails />
        </div>
      </div>
    </div>
  );
};

export default AllJobs;

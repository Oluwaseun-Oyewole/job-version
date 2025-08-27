/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { JobParams } from "@/utils/types";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { Dispatch, SetStateAction } from "react";

interface SliderTooltipProps {
  children?: React.ReactNode;
  theme: any;
}

const SliderTooltip: React.FC<SliderTooltipProps> = ({
  children,
  theme = {},
}) => {
  const themeTooltip = {
    ...theme,
    color: theme.color || "red",
    fontSize: theme.fontSize || "14px",
    fontFamily: theme.fontFamily || "Source Sans Pro, mono",
    whiteSpace: theme.whiteSpace || "nowrap",
    position: "relative",
    bottom: "100%",
    paddingTop: "50px",
    transform: "translate(-50%, -10px)",
  };
  return <div style={themeTooltip}>{children}</div>;
};

const SliderComponent = ({
  values,
  setValues,
}: {
  values: JobParams;
  setValues: Dispatch<SetStateAction<JobParams>>;
}) => {
  return (
    <>
      <Slider
        value={[Number(values?.min_salary), Number(values?.max_salary)]}
        min={500}
        max={1000000}
        range
        onChange={(e: any) =>
          setValues((prev) => ({ ...prev, min_salary: e[0], max_salary: e[1] }))
        }
        handleRender={(renderProps) => {
          return (
            <div {...renderProps.props}>
              <SliderTooltip
                theme={{
                  color: "#0049FC",
                  fontWeight: "medium",
                }}
              ></SliderTooltip>
            </div>
          );
        }}
      />
      <div className="flex items-center justify-between mt-6 text-deepBlue font-medium text-[14px]">
        <p>&#36;{values?.min_salary && values?.min_salary}</p>
        <p>&#36;{values?.max_salary && values?.max_salary}</p>
      </div>
    </>
  );
};

export default SliderComponent;

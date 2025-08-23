enum JobType {
  fulltime = "fulltime",
  parttime = "parttime",
  contract = "contract",
  internship = "internship",
  volunteer = "volunteer",
}

export type Job = {
  id: number;
  label: string;
  value: JobType;
  checked: boolean;
};

export enum Experience {
  JUNIOR,
  MID_LEVEL,
  SENIOR,
}

export enum JobMode {
  FULL_TIME,
  PART_TIME,
  CONTRACT,
}

export enum Job_type {
  Contract,
  FullTime,
  PartTime,
}

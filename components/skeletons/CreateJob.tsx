"use client";
import { createJob } from "@/app/actions/action";
import { EXPERIENCE_LEVELS, JOB_MODES, JOB_TYPES } from "@/utils/constants";
import { useActionState } from "react";
import ErrorAlert from "../ErrorAlert";
import Spinner from "../Spinner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function CreateJobForm() {
  const [state, formAction, isPending] = useActionState(createJob, null);
  const style =
    "w-full px-4 py-3 bg-gray-50 border border-gray-300 text-sm rounded-lg focus:outline-none h-[20] focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-sm resize-none";

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="txt-xl md:text-3xl font-bold text-gray-900 mb-2">
            Create New Job Posting
          </h1>
          <p className="text-gray-600 text-sm md:text-md">
            Fill out the details below to post your job opportunity
          </p>
        </div>

        {state?.error && <ErrorAlert error={state?.error} />}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <form action={formAction} className="p-8">
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">
                Basic Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-1">
                  <label
                    htmlFor="job_title"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Job Title <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    id="job_title"
                    name="job_title"
                    required
                    className={style}
                    placeholder="e.g. Senior Frontend Developer"
                  />
                </div>

                <div className="md:col-span-1">
                  <label
                    htmlFor="company_name"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    id="company_name"
                    name="company_name"
                    required
                    className={style}
                    placeholder="e.g. TechCorp Inc."
                  />
                </div>

                <div className="md:col-span-2">
                  <label
                    htmlFor="company_info"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Company Information <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="company_info"
                    name="company_info"
                    required
                    rows={3}
                    className={style}
                    placeholder="Brief description about the company..."
                  />
                </div>

                <div className="md:col-span-1">
                  <label
                    htmlFor="salary"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Annual Salary (USD)
                  </label>
                  <Input
                    type="number"
                    id="salary"
                    name="salary"
                    min="0"
                    className={style}
                    placeholder="e.g. 80000"
                  />
                </div>

                <div className="md:col-span-1">
                  <label
                    htmlFor="location"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Location
                  </label>
                  <Input
                    type="text"
                    id="location"
                    name="location"
                    className={style}
                    placeholder="e.g. San Francisco, CA or Remote"
                  />
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">
                Job Details
              </h2>

              <div className="mb-6">
                <label
                  htmlFor="job_description"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Job Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="job_description"
                  name="job_description"
                  rows={6}
                  required
                  className={style}
                  placeholder="Detailed job description, responsibilities, requirements..."
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="slug"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Job Slug <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  id="slug"
                  name="slug"
                  required
                  pattern="^[a-z0-9]+(?:-[a-z0-9]+)*$"
                  className={style}
                  placeholder="e.g. senior-frontend-developer-techcorp"
                />
                <p className="text-sm text-gray-500 mt-2 flex items-center">
                  <svg
                    className="w-4 h-4 mr-1 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Use lowercase letters, numbers, and hyphens only (URL-friendly
                  identifier)
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label
                    htmlFor="experience_level"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Experience Level
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="experience_level"
                    name="experience_level"
                    required
                    className={style}
                  >
                    <option value="">Select level</option>
                    {EXPERIENCE_LEVELS.map((level) => (
                      <option key={level} value={level}>
                        {level
                          .replace("_", " ")
                          .toLowerCase()
                          .replace(/\b\w/g, (l) => l.toUpperCase())}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="job_type"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Job Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="job_type"
                    name="job_type"
                    required
                    className={style}
                  >
                    <option value="">Select type</option>
                    {JOB_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type
                          .replace("_", " ")
                          .toLowerCase()
                          .replace(/\b\w/g, (l) => l.toUpperCase())}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="job_mode"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Work Mode <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="job_mode"
                    name="job_mode"
                    required
                    className={style}
                  >
                    <option value="">Select mode</option>
                    {JOB_MODES.map((mode) => (
                      <option key={mode} value={mode}>
                        {mode
                          .replace("_", " ")
                          .toLowerCase()
                          .replace(/\b\w/g, (l) => l.toUpperCase())}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="skills"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Required Skills <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="skills"
                    name="skills"
                    rows={3}
                    className={style}
                    placeholder="List or enter the required skill-set, e.g. JavaScript, React, TypeScript, Node.js"
                  />
                </div>

                <div>
                  <label
                    htmlFor="benefits"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Benefits & Perks
                  </label>
                  <textarea
                    id="benefits"
                    name="benefits"
                    rows={3}
                    className={style}
                    placeholder="e.g. Health insurance, 401k, Remote work, Flexible hours"
                  />
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">
                Application Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="mode_of_submission"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    How to Apply
                  </label>
                  <input
                    type="text"
                    id="mode_of_submission"
                    name="mode_of_submission"
                    className={style}
                    placeholder="e.g. Send resume to jobs@company.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="no_of_hires"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Number of Positions
                  </label>
                  <input
                    type="number"
                    id="no_of_hires"
                    name="no_of_hires"
                    min="1"
                    className={style}
                    placeholder="e.g. 2"
                  />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={isPending}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  {isPending ? (
                    <div className="flex items-center">
                      <Spinner />
                      Creating Job...
                    </div>
                  ) : (
                    "Create Job Posting"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </div>
        {state?.error && <ErrorAlert error={state?.error} />}
      </div>
    </div>
  );
}

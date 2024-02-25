import React from 'react'

function JobListCopy() {
    const data = [
        {
          Total_number_of_jobs_posted: "3612",
          Source_diversity: "35%",
          open_jobs: "80",
          rejection_average: "19320",
          hired_count: "152",
        },
      ];
  return (
    <div>
         <div className="w-full mt-12 rounded-sm h-24 sm:w-full sm:max-h-7">
        {data.map((data) => (
          <div className="bg-white rounded-md shadow-md m-4 p-4 flex dark:bg-black dark:text-white h-24">
            <div className="flex items-center w-1/5 sm:w-1/5">
              <div className="ml-4">
                <p className="para">Total No of Jobs Posted</p>
                <h1 className="h1 mt-4">
                  <b>{data.Total_number_of_jobs_posted}</b>
                </h1>
              </div>
            </div>
            <div className="h-divider !border-gray-300 ml-12"></div>
            <div className="flex items-center w-1/5 sm:w-1/5">
              <div className="ml-4">
                <p className="para">Source Diversity</p>
                <h1 className="h1 mt-4">
                  <b>{data.Source_diversity}</b>
                </h1>
              </div>
            </div>
            <div className="h-divider !border-gray-300 ml-12"></div>
            <div className="flex items-center w-1/5 sm:w-1/5">
              <div className="ml-4">
                <p className="para">Open Jobs</p>
                <h1 className="h1 mt-4">
                  <b>{data.open_jobs}</b>
                </h1>
              </div>
            </div>
            <div className="h-divider !border-gray-300 ml-12"></div>
            <div className="flex items-center w-1/5 sm:w-1/5">
              <div className="ml-4">
                <p className="para">Rejection Average</p>
                <h1 className="h1 mt-4">
                  <b>{data.rejection_average}</b>
                </h1>
              </div>
            </div>
            <div className="h-divider !border-gray-300 ml-12"></div>
            <div className="flex items-center w-1/5 sm:w-1/5">
              <div className="ml-4">
                <p className="para">Hired Count</p>
                <h1 className="h1 mt-4">
                  <b>{data.hired_count}</b>
                </h1>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default JobListCopy
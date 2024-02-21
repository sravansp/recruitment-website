import React from "react";

const ActivityFeed = () => {
  return (
    <div className="grid lg:grid-cols-12">
      <div className="lg:col-span-8">
        <div className="relative h-64 bg-white border border-black rounded-lg border-opacity-10">
          <div className="p-2.5 left-[4px] top-[4.31px] absolute justify-center items-center gap-1 inline-flex">
            <div className="text-indigo-600 text-base font-['SF Pro'] leading-snug">
              Marketing Manager
            </div>
            <div className="text-black text-base font-normal font-['SF Pro'] leading-snug">
              at Emirates
            </div>
          </div>
          <div className="left-[14px] top-[59px] absolute flex-col justify-start items-start inline-flex">
            <div className="justify-start items-center gap-2.5 inline-flex">
              <div className="w-8 h-8 pl-2.5 pr-2 py-2 bg-slate-100 rounded-3xl justify-center items-center flex">
                <div className="relative flex flex-col items-start justify-start w-4 h-4 opacity-50" />
              </div>
              <div className="flex items-start justify-start gap-1">
                <div className="text-black text-xs font-['SF Pro'] leading-tight">
                  Grace Bennet Anderson
                </div>
                <div className="opacity-70 text-black text-xs font-normal font-['SF Pro'] leading-tight">
                  was moved from
                </div>
                <div className="text-black text-xs font-['SF Pro'] leading-tight">
                  Interview{" "}
                </div>
                <div className="opacity-70 text-black text-xs font-normal font-['SF Pro'] leading-tight">
                  to
                </div>
                <div className="text-black text-xs font-['SF Pro'] leading-tight">
                  Rejected
                </div>
              </div>
            </div>
            <div className="px-4 justify-start items-start gap-2.5 inline-flex">
              <div className="w-5 h-px origin-top-left rotate-90 border border-slate-100"></div>
            </div>
            <div className="justify-start items-center gap-2.5 inline-flex">
              <div className="w-8 h-8 pl-2 pr-2.5 py-2 bg-slate-100 rounded-3xl justify-center items-center flex">
                <div className="relative flex flex-col items-start justify-start w-4 h-4 opacity-50" />
              </div>
              <div className="flex items-start justify-start gap-1">
                <div className="text-black text-xs font-['SF Pro'] leading-tight">
                  Interview scheduled
                </div>
                <div className="opacity-70 text-black text-xs font-normal font-['SF Pro'] leading-tight">
                  with
                </div>
                <div className="text-black text-xs font-['SF Pro'] leading-tight">
                  Grace Bennet Anderson{" "}
                </div>
                <div className="opacity-70 text-black text-xs font-normal font-['SF Pro'] leading-tight">
                  for 19 May 2024 at 14:30
                </div>
              </div>
            </div>
            <div className="px-4 justify-start items-start gap-2.5 inline-flex">
              <div className="w-5 h-px origin-top-left rotate-90 border border-slate-100"></div>
            </div>
            <div className="justify-start items-center gap-2.5 inline-flex">
              <div className="w-8 h-8 pl-2 pr-2.5 py-2 bg-slate-100 rounded-3xl justify-center items-center flex">
                <div className="relative flex flex-col items-start justify-start w-4 h-4 opacity-50" />
              </div>
              <div className="flex items-start justify-start gap-1">
                <div className="text-black text-xs font-['SF Pro'] leading-tight">
                  Grace Bennet Anderson
                </div>
                <div className="opacity-70 text-black text-xs font-normal font-['SF Pro'] leading-tight">
                  was moved from
                </div>
                <div className="text-black text-xs font-['SF Pro'] leading-tight">
                  Candidate
                </div>
                <div className="opacity-70 text-black text-xs font-normal font-['SF Pro'] leading-tight">
                  to
                </div>
                <div className="text-black text-xs font-['SF Pro'] leading-tight">
                  Interview
                </div>
              </div>
            </div>
            <div className="px-4 justify-start items-start gap-2.5 inline-flex">
              <div className="w-5 h-px origin-top-left rotate-90 border border-slate-100"></div>
            </div>
            <div className="justify-start items-center gap-2.5 inline-flex">
              <div className="flex items-center justify-center w-8 h-8 p-2 bg-slate-100 rounded-3xl">
                <div className="relative flex flex-col items-start justify-start w-4 h-4 opacity-50" />
              </div>
              <div className="flex items-start justify-start gap-1">
                <div className="text-black text-xs font-['SF Pro'] leading-tight">
                  Grace Bennet Anderson
                </div>
                <div className="opacity-70 text-black text-xs font-normal font-['SF Pro'] leading-tight">
                  applied to
                </div>
                <div className="text-indigo-600 text-xs font-['SF Pro'] leading-tight">
                  Marketing Manager
                </div>
                <div className="opacity-70 text-black text-xs font-normal font-['SF Pro'] leading-tight">
                  at
                </div>
                <div className="text-black text-xs font-['SF Pro'] leading-tight">
                  Emirates
                </div>
              </div>
            </div>
            <div className="px-4" />
          </div>
          <div className="left-[890px] top-[67px] absolute flex-col justify-start items-start gap-8 inline-flex">
            <div className="opacity-40 text-black text-xs font-normal font-['SF Pro'] leading-tight">
              24 May 2024
            </div>
            <div className="opacity-40 text-black text-xs font-normal font-['SF Pro'] leading-tight">
              17 May 2024
            </div>
            <div className="opacity-40 text-black text-xs font-normal font-['SF Pro'] leading-tight">
              16 May 2024
            </div>
            <div className="opacity-40 text-black text-xs font-normal font-['SF Pro'] leading-tight">
              14 May 2024
            </div>
          </div>
        </div>
      </div>
      <div className="lg:col-span-4"></div>
    </div>
  );
};

export default ActivityFeed;

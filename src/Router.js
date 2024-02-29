import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { rtl } from "./Redux/slice";
import { useTranslation } from "react-i18next";
import Sidebar from "./components/Menus/Sidebar";
import JobsList from "./components/Jobs/JobsList";
import Appearance from "./components/Settings/Appearance/Appearance";
import JobDetails from "./components/Jobs/JobDetails";
import CandidatesList from "./components/Candidates/CandidatesList";
import CandidateProfile from "./components/Candidates/CandidateProfile";
import AllJobs from "./components/Jobs/AllJobs";
import JobCard from "./components/common/JobCard";
import JobTabs from "./components/common/JobTabs";
import Notification from "./components/Settings/Notification";
import Company from "./components/Company/Company";
import TeamMembers from "./components/Team_members/TeamMembers";
import Intergration from "./components/Settings/Intergration";

export default function Router() {
  const { i18n } = useTranslation();

  const layout = useSelector((state) => state.layout.value);
  const mode = useSelector((state) => state.layout.mode);
  const dispatch = useDispatch();
  // const [loginData, setLoginData] = useState();
  // const [endload, setEndLoad] = useState();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  useEffect(() => {
    const layout = localStorage.getItem("layout");
    if (layout !== null) {
      dispatch(rtl(layout));
    }
    changeLanguage(layout === "rtl" ? "ar" : "en");
    // setLoginData(JSON.parse(localStorage.getItem("LoginData")));
  }, []);

  return (
    <BrowserRouter basename="">
      <div
        className={`main_content flex bg-[#F8FAFC] dark:bg-black h-full min-h-screen font-Inter ${mode}`}
        dir={layout}
      >
        {/* <NavigationMenu /> */}

        <Sidebar />
        <div className="absolute top-0 h-full overflow-auto transition-all duration-300 home dark:bg-black pink:bg-pink-600">
          <Header />
          <div className="relative px-4 py-8 md:p-4 2xl:p-8 content">
            <Routes>
              {/* Company submenus */}
              <Route path="/JobsList" element={<JobsList />} />
              <Route path="/Appearance" element={<Appearance />} />
              <Route path="/JobDetails" element={<JobDetails />} />
              <Route path="/CandidateList" element={<CandidatesList />} />
              <Route path="/CandidateProfile" element={<CandidateProfile />} />
              <Route path="/AllJobs" element={<AllJobs />} />
              <Route path="/jobcard" element={<JobCard />}></Route>
              <Route path="/jobtabs" element={<JobTabs />}></Route>
              <Route path="/Notification" element={<Notification />}></Route>
              <Route path="/Company" element={<Company />}></Route>
              <Route path="/members" element={<TeamMembers />}></Route>
              <Route path="/Integrations" element={<Intergration />}></Route>
            </Routes>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 p-2 opacity-40">
          <h1 className="text-xs 2xl:text-md">Developement Mode</h1>
        </div>
      </div>
    </BrowserRouter>
  );
}

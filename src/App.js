import "./App.css";
import "../src/assets/css/background.css";
import "../src/assets/css/style.css";
import "../src/assets/css/loader.css";
import "../src/assets/css/pluggins.css";
import Router from "./Router";
import { ConfigProvider, theme } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { themeColor } from "./Redux/slice";
import { ThemeProvider } from "./Context/Theme/ThemeContext";
import axios from "axios";
import API from "./components/Api";
import JobCard from "./components/common/JobCard";
import { getAllOrganisation } from "./components/Api";

function App() {
  const dispatch = useDispatch();
  const colorPrimary = useSelector((state) => state.layout.themeColor);
  const mode = useSelector((state) => state.layout.mode)
  
  useEffect(() => {
    dispatch(themeColor(colorPrimary));
  }, [colorPrimary, dispatch]);

  // Only use For temp

  const getOrganisaction = async () => {
    const response = await getAllOrganisation();
    console.log(response);
    localStorage.setItem(
      "organisationId",
      JSON.stringify(
        parseInt(response?.result[0]?.organisationId)
      )
    );
  };

  useEffect(() => {
    getOrganisaction();
  }, []);

  return (
    <ThemeProvider>
      <ConfigProvider
        theme={{
          token: { colorPrimary },
          algorithm:
            mode === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
        }}
      >
        <Router />
        
      </ConfigProvider>
    </ThemeProvider>
  );
}

export default App;

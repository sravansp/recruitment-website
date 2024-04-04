import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

// IMAGES
import logo from "../../assets/images/logo.svg";

// TRANSLATION
import { useTranslation } from "react-i18next";

import { Menu } from "antd";
import SelectCompany from "./SelectCompany";
import { useTheme } from "../../Context/Theme/ThemeContext";
import { useDispatch } from "react-redux";
import { hamburger } from "../../Redux/slice";

// ICONS

import { IoMdCompass } from "react-icons/io";
import { BsBriefcaseFill } from "react-icons/bs";
import { HiDocumentText, HiOutlineSquare3Stack3D } from "react-icons/hi2";
import { HiUsers } from "react-icons/hi";
import { RiSettings4Fill } from "react-icons/ri";
import { IoCashOutline, IoHelpCircle } from "react-icons/io5";
import {  PiBriefcaseDuotone, PiBriefcaseMetalDuotone, PiCheckSquareOffsetThin, PiCreditCardLight, PiPalette, PiPaletteDuotone, PiUser } from "react-icons/pi";
import { FaKey } from "react-icons/fa";
import { GoKey } from "react-icons/go";
import { CiBank } from "react-icons/ci";
import { LuMonitorDot } from "react-icons/lu";


const Sidebar = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  // const primaryColor = localStorage.getItem("mainColor");
  const [activeMenu, setActiveMenu] = useState(null);
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [isHamburgerClicked, setHamburgerClicked] = useState(false);
  const [activeSubMenuLink, setActiveSubMenuLink] = useState(null);
  const [selectedMainMenu, setSelectedMainMenu] = useState(null);
  const submenuRef = useRef(null);
  const [storedSelectedMenu, setStoredSelectedMenu] = useState("");

  const [showSelectedMenu, setShowSelectedMenu] = useState(false);
  // let submenuTimeout;

  const { theme } = useTheme();

  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    const handleSubmenuMouseEnter = (menuId) => {
      if (!isHamburgerClicked) {
        setActiveMenu(menuId);
        setShowSubmenu(true);
      }
    };

    const handleSubmenuMouseLeave = (menu) => {
      if (!isHamburgerClicked) {
        setShowSubmenu(false);
        setActiveMenu(null);
        setSelectedMainMenu(menu.title);

      }
    };

    if (submenuRef.current) {
      submenuRef.current.addEventListener(
        "mouseenter",
        handleSubmenuMouseEnter
      );
      submenuRef.current.addEventListener(
        "mouseleave",
        handleSubmenuMouseLeave
      );
    }
  }, []);

  const handleMenuClick = (menu) => {
    setActiveMenu(menu.id);
    setSelectedMainMenu(menu.title);
    console.log(selectedMainMenu);
    localStorage.setItem("selectedMainMenu", menu.title);
  };

  const handleMenuHover = (menuId) => {
    const hoveredMenu = navData[0].topmenu.find(
      (menuItem) => menuItem.id === menuId
    );

    if (hoveredMenu) {
      if (!hoveredMenu.submenus || hoveredMenu.submenus.length === 0) {
        // Display the selected menu's submenus
        const storedSelectedMenu = localStorage.getItem('selectedMainMenu');
        console.log("selected menu1", storedSelectedMenu);

        const activeTopMenuData = navData[0]?.topmenu?.find((menuItem) => menuItem.title === storedSelectedMenu);

        if (activeTopMenuData) {
          console.log("active", activeTopMenuData.id)
          setActiveMenu(activeTopMenuData.id);
        } else {
          // Handle the case when the stored menu is not found in top menu
          setActiveMenu(null);
        }
      } else {
        console.log("selected menu2", showSelectedMenu);

        // Display the hovered menu's submenus
        setShowSelectedMenu(false);
        setActiveMenu(menuId);
      }
    }
    //  if hamburger is not active
    if (hoveredMenu && !isHamburgerClicked) {
      if (hoveredMenu) {
        setActiveMenu(hoveredMenu.id);
        setShowSubmenu(true);
      } else {
        setActiveMenu(null);
      }

    }
  };

  const handleMenuMouseLeave = () => {
    // Update selectedMainMenu based on the value in local storage
    const storedSelectedMenu = localStorage.getItem('selectedMainMenu');
    setSelectedMainMenu(storedSelectedMenu);

    // Find the active menu and set it
    const activeTopMenuData = navData[0]?.topmenu?.find((menuItem) => menuItem.title === storedSelectedMenu);

    if (activeTopMenuData) {
      setActiveMenu(activeTopMenuData.id);
    } else {
      // Handle the case when the stored menu is not found in top menu
      setActiveMenu(null);
    }
    // Hide submenus when mouse leaves
    setShowSelectedMenu(false);

    if (!isHamburgerClicked) {
      setShowSubmenu(false);
    }
  };


  const handleHamburgerClick = () => {
    setHamburgerClicked((prevClicked) => !prevClicked);
    setShowSubmenu(false);
    const storedSelectedMenuId = localStorage.getItem("selectedMainMenuId");
    if (storedSelectedMenuId) {
      setActiveMenu(storedSelectedMenuId)
    } else {
      setActiveMenu(null)
    }
    // Save the hamburger state to localStorage
    localStorage.setItem(
      "hamburgerClicked",
      JSON.stringify(!isHamburgerClicked)
    );

    // Add or remove the 'sidebar-open' class to/from the body element
    // document.body.classList.toggle('sidebar-open', !isHamburgerClicked);
  };

  // useEffect(() => {
  //   dispatch(hamburger(isHamburgerClicked));
  // }, [isHamburgerClicked, dispatch]);


  useEffect(() => {
    // Retrieve the hamburger state from localStorage when the component mounts
    const storedSelectedMenu = localStorage.getItem("selectedMainMenu");
    const storedSelectedMenuId = localStorage.getItem("selectedMainMenuId");
    if (storedSelectedMenu) {
      setSelectedMainMenu(storedSelectedMenu);
    }
    if (storedSelectedMenuId) {
      setActiveMenu(storedSelectedMenuId);
    }
    const storedHamburgerClicked = JSON.parse(
      localStorage.getItem("hamburgerClicked")
    );
    if (storedHamburgerClicked !== null) {
      setHamburgerClicked(storedHamburgerClicked);
    }
  }, []);

  useEffect(() => {
    if (isHamburgerClicked) {
      setShowSubmenu(false);
    }
  }, [isHamburgerClicked]);
 
  const isSubmenuVisible = isHamburgerClicked || showSubmenu;
  useEffect(() => {
    const storedMenu = localStorage.getItem('selectedMainMenu');
    setStoredSelectedMenu(storedMenu);
  }, []); // Run this effect only once on mount


  // SIDEBAR MENU ARRAYS
  const navData = [
    {
      topmenu: [
        {
          id: 1,
          title: t("Discover"),
          link: "/",
          icon: (
            <IoMdCompass
              size={"100%"}
              className={`text-white transition-all duration-300 group-hover:text-primary ${
                selectedMainMenu === t("Discover") ? "text-primary" : ""
              }`}
            />
          ),
          menuId: 1,
          directLink: true,
        },
        {
          id: 2,
          title: t("Jobs"),
          icon: (
            <BsBriefcaseFill
              size={"100%"}
              className={`text-white transition-all duration-300 group-hover:text-primary ${selectedMainMenu === t("Jobs") ? "text-primary" : ""
                }`}
            />
           
          ),
           link:"/AllJobs",
          // submenus: [
          //   {
          //     catid: 2,
          //     id: 1,
          //     parentMenu: "Jobs",
          //     parentId: 2,
          //     title: t("Jobs"),
          //     status: false,
          //     // subMenu: [
          //     //   {
          //     //     id: 21,
          //     //     title: t("Job List"),
          //     //     icon: (
          //     //       <PiBriefcaseDuotone className="!text-base 2xl:!text-2xl" />
          //     //     ),
          //     //     link: "/AllJobs",
          //     //   },
          //     //   {
          //     //     id: 22,
          //     //     title: t("Job Details"),
          //     //     icon: (
          //     //       <PiBriefcaseMetalDuotone className="!text-base 2xl:!text-2xl" />
          //     //     ),
          //     //     link: "/JobDetails",
          //     //   },
               
          //     // ],
          //   },
          // ],
        },
        {
          id: 3,
          title: t("Candidates"),
          icon: (
            <HiUsers
              size={"100%"}
              className={`text-white transition-all duration-300 group-hover:text-primary ${selectedMainMenu === t("Candidates") ? "text-primary" : ""
                }`}
            />
           
          ),
          link:"/CandidateList",
          
          // submenus: [
          //   {
          //     catid: 3,
          //     id: 1,
          //     parentMenu: "Candidates",
          //     parentId: 3,
          //     title: t("General"),
          //     status: false,
          //     subMenu: [
          //       {
          //         id: 31,
          //         title: t("Candidate Profile"),
          //         icon: (
          //           <PiUser className="!text-base 2xl:!text-2xl" />
          //         ),
          //         link: "/CandidateProfile",
          //       },
          //       {
          //         id: 32,
          //         title: t("Candidate List"),
          //         icon: (
          //           <PiUser className="!text-base 2xl:!text-2xl" />
          //         ),
          //         link: "/CandidateList",
          //       },
               
          //     ],
          //   },
          // ],
          
        },
        {
          id: 4,
          title: t("Reports"),
          icon: (
            <HiDocumentText
              size={"100%"}
              className={`text-white transition-all duration-300 group-hover:text-primary ${selectedMainMenu === t("Reports") ? "text-primary" : ""
                }`}
            />
          ),
        },
       

        {
          id: 5,
          title: t("Settings"),
          icon: (
            <RiSettings4Fill
              size={"100%"}
              className={`text-white transition-all duration-300 group-hover:text-primary ${selectedMainMenu === t("Settings") ? "text-primary" : ""
                }`}
            />
          ),
          submenus: [
            {
              catid: 1,
              id: 1,
              parentMenu: "Settings",
              parentId: 5,
              title: t("General"),
              status: false,
              subMenu: [
                {
                  id: 112,
                  title: t("Appearance"),
                  icon: (
                    <PiPaletteDuotone className="!text-base 2xl:!text-2xl" />
                  ),
                  link: "/Appearance",
                },
                {
                  id: 113,
                  title: t("Notification"),
                  icon: (
                    <IoCashOutline  className="!text-base 2xl:!text-2xl" />
                  ),
                  link: "/Notification",
                },
                {
                  id: 114,
                  title: t("Role and Privileges"),
                  icon: (
                    <GoKey  className="!text-base 2xl:!text-2xl" />
                  ),
                  link: "/Privilege",
                },
                
               
              ],
            },
            {
              catid: 1,
              id: 2,
              parentMenu: "Settings",
              parentId: 5,
              title: t("Other"),
              status: false,
              subMenu: [
                {
                  id: 115,
                  title: t("Company"),
                  icon: (
                    <CiBank className="!text-base 2xl:!text-2xl" />
                  ),
                  link: "/Company",
                },
                {
                  id: 116,
                  title: t("Team members"),
                  icon: (
                    <HiOutlineSquare3Stack3D  className="!text-base 2xl:!text-2xl" />
                  ),
                  link: "/members",
                },
                {
                  id: 117,
                  title: t("System settings"),
                  icon: (
                    <PiCheckSquareOffsetThin  className="!text-base 2xl:!text-2xl"/>
                  ),
                  link: "/Systemsettings",
                },
                {
                  id: 118,
                  title: t("Integrations"),
                  icon: (
                    <PiCreditCardLight className="!text-base 2xl:!text-2xl" />
                  ),
                  link: "/Integrations",
                },
                {
                  id: 119,
                  title: t("Templates"),
                  icon: (
                    <LuMonitorDot  className="!text-base 2xl:!text-2xl" />
                  ),
                  link: "/Templates",
                },
                
               
              ],
            },
          ],
       
        },
        {
          id: 6,
          title: t("Help"),
          icon: (
            <IoHelpCircle
              size={"100%"}
              className={`text-white transition-all duration-300 group-hover:text-primary ${selectedMainMenu === t("Help") ? "text-primary" : ""
                }`}
            />
          ),
        },
      ],
    },
  ];

  const topMenus = navData[0].topmenu.filter(
    (menuItem) => menuItem.title !== t("Settings") && menuItem.title !== t("Help") && menuItem.title !== ""
  );
  const bottomMenus = navData[0].topmenu.filter(
    (menuItem) => menuItem.title === t("Settings") || menuItem.title === t("Help") || menuItem.title === ""
  );

  const items = [{ label: "Navigation One", key: "1", icon: "" }];

  navData.forEach((menuItem) => {
    if (menuItem.title === "") {
      menuItem.selectedMainMenu = storedSelectedMenu === menuItem.id;
    }
  });

  // console.log(navData);
  return (
    <aside
      className={`z-[1000] sidebar top-0 ltr:left-0 rtl:right-0 font-figtree hidden lg:block fixed dark:!bg-black bg-primary h-full w-16 2xl:w-[88px] !py-5 !px-3 ${isHamburgerClicked ? "open" : "close"
        }`}
    >
      <div className="flex items-center justify-center px-2 brand-img">
        <img className="object-contain w-11 2xl:w-full" src={logo} alt="logo" />
      </div>
      <div className="flex items-center justify-center py-4">
      <div
        className="hamburger w-7 h-6 2xl:h-[38px] 2xl:w-[50px] rounded-md 2xl:rounded-xl bg-white bg-opacity-10 flex justify-center items-center p-[6px]"
        onClick={handleHamburgerClick}
      >
        <div
        className={`flex-col gap-[2px] 2xl:gap-1 vhcenter ${isHamburgerClicked ? 'is-active' : ''} cursor-pointer`}>
        <span className={`line w-3 2xl:w-[18px] h-[0.12rem] rounded-md bg-gray-100 block mx-auto transition-all duration-300 ease-in-out transform ${isHamburgerClicked ? 'translate-x-[3px]' : ''}`}></span>
        <span className={`line w-3 2xl:w-[18px] h-[0.12rem] rounded-md bg-gray-100 block mx-auto transition-all duration-300 ease-in-out transform ${isHamburgerClicked ? '' : 'translate-x-0'}`}></span>
        <span className={`line w-3 2xl:w-[18px] h-[0.12rem] rounded-md bg-gray-100 block mx-auto transition-all duration-300 ease-in-out transform ${isHamburgerClicked ? '-translate-x-[3px]' : ''}`}></span>
      </div>
      </div>
    </div>
      <ul className="m-0 appearance-none h-[calc(100%_-_4.5rem)] 2xl:h-[calc(100%_-_6.5rem)]">
        <div className="flex flex-col items-center justify-between h-full">
          <div className="flex flex-col !gap-2 2xl:!gap-3 top-menu">
            {topMenus.map((menuItem) => (
              // MAIN MENUS
              <li
                key={menuItem.id}
                className={`menu-link relative group ${activeSubMenuLink === menuItem.id ? "active" : ""
                  }`}
                onClick={() => handleMenuClick(menuItem)}
                onMouseEnter={() => handleMenuHover(menuItem.id, true)}
                style={{
                  opacity: menuItem.title === "" ? 0 : 1,
                  cursor: menuItem.title === "" ? "default" : "pointer",
                  // Add the following line to override the cursor for transparent items
                }}
              >
                <Link to={menuItem.link} className="menu-item flex flex-col items-center gap-1 2xl:gap-[6px] ">
                  <div
                    className={`w-7 h-7 2xl:h-[50px] 2xl:w-[50px] rounded-md 2xl:rounded-xl bg-white bg-opacity-10 border border-white !border-opacity-20 flex justify-center items-center p-[6px] 2xl:p-[10px] group-hover:bg-white transition-all duration-300 menu-item-cat${selectedMainMenu === menuItem.title
                        ? "bg-white bg-opacity-100"
                        : ""
                      }`}
                  > <Link to={menuItem.link}>{menuItem.icon}</Link>
                    
                  </div>
                  <p className="text-[9px] 2xl:text-xs text-white">
                    <Link to={menuItem.link}>{menuItem.title}</Link>
                    
                  </p>
                </Link>
              </li>
            ))}


          </div>
          <div className="flex flex-col !gap-2 2xl:!gap-3 bottom-menu">
            {bottomMenus.map((menuItem) => (
              <li
                key={menuItem.id}
                className={`menu-link relative group ${activeSubMenuLink === menuItem.id ? "active" : ""
                  }`}
                onClick={() => handleMenuClick(menuItem)}
                onMouseEnter={() => handleMenuHover(menuItem.id, true)}
                style={{
                  opacity: menuItem.title === "" ? 0 : 1,
                  cursor: menuItem.title === "" ? "default" : "pointer",
                  // Add the following line to override the cursor for transparent items
                }}
              >
                <div className="menu-item flex flex-col items-center gap-1 2xl:gap-[6px] ">
                  <div
                    className={`w-7 h-7 2xl:h-[50px] 2xl:w-[50px] rounded-md 2xl:rounded-xl bg-white bg-opacity-10 border border-white !border-opacity-20 flex justify-center items-center p-[6px] group-hover:bg-white transition-all duration-300 menu-item-cat${selectedMainMenu === menuItem.title
                        ? "bg-white bg-opacity-100"
                        : ""
                      }`}
                  >
                    {menuItem.icon}
                  </div>
                  <p className="text-[9px] 2xl:text-xs text-white">
                    {menuItem.title}
                  </p>
                </div>
              </li>
            ))}
          </div>
          <div
            className={`${isSubmenuVisible ? "block" : "hidden"}
       ${isHamburgerClicked ? "fixed" : "absolute"} 
       ${theme === "pink" ? "bg-[#FEF5F7]" : "bg-white"} 
       opacity-100 dark:bg-black ltr:left-[64px] rtl:right-[64px] ltr:2xl:left-[88px] rtl:2xl:right-[88px] p-2.5 2xl:p-2.5 ltr:rounded-tr-lg ltr:rounded-br-lg rtl:rounded-tl-lg rtl:rounded-bl-lg w-[196px] 2xl:w-[278px] top-0 h-full border border-black border-opacity-20 dark:border-l dark:border-l-secondaryDark flex flex-col gap-3`}
            onMouseEnter={handleMenuHover}
            onMouseLeave={handleMenuMouseLeave}
            key={Menu.id}
          >
            <div className="py-2 brand-name">
              <h1 className="text-sm font-semibold 2xl:text-lg text-primary">
              <span className="font-bold uppercase">Loyaltri</span> <span className="uppercase text-[#707070] font-light">Recruitment</span>
              </h1>
            </div>

            <SelectCompany />
            {activeMenu !== null && (
              <Menu
                mode="inline"
                className="bg-transparent submenubar dark:text-white !border-e-0 overflow-auto"
                defaultOpenKeys={navData[0].topmenu.map((item) =>
                  item.id.toString()
                )}
              >
                {navData[0].topmenu[activeMenu - 1]?.submenus?.map(
                  (submenuItem) =>
                    submenuItem.link ? (
                      <Menu.Item
                        key={submenuItem.id}
                        title={submenuItem.title}
                        icon={submenuItem.icon}
                        className={`submenu-link capitalize text-black dark:text-white dark:hover:!bg-secondaryDark dark:hover:!text-white !pl-3.5 !h-8 2xl:!h-10 text-sm ${currentPath === submenuItem.link ? "active" : ""
                          }`}
                        onClick={() => {
                          setActiveSubMenuLink(submenuItem.catid);
                          setSelectedMainMenu(submenuItem.parentMenu);
                          localStorage.setItem(
                            "selectedMainMenu",
                            submenuItem.parentMenu
                          );
                        }}
                      >
                        <Link
                          className="2xl:text-sm text-[10px] dark:text-white"
                          to={submenuItem.link}
                        >
                          {submenuItem.title}
                        </Link>
                      </Menu.Item>
                    ) : (
                      <Menu.SubMenu
                        key={submenuItem.id}
                        title={submenuItem.title}
                        className="text-[8px] 2xl:text-[12px] uppercase"
                      >
                        {submenuItem?.subMenu?.map((submenusubItem) => (
                          <Menu.Item
                            key={submenusubItem.id}
                            title={submenusubItem.title}
                            icon={submenusubItem.icon}
                            className={`submenu-link capitalize text-black dark:text-white dark:hover:!bg-secondaryDark dark:hover:!text-white !pl-3.5 !h-8 2xl:!h-10 2xl:text-sm text-[10px] ${currentPath === submenusubItem.link
                              ? "active"
                              : ""
                              }`}
                            onClick={() => {
                              setActiveSubMenuLink(submenuItem.catid);
                              setSelectedMainMenu(submenuItem.parentMenu);
                              localStorage.setItem(
                                "selectedMainMenu",
                                submenuItem.parentMenu
                              );
                            }}
                          >
                            <Link
                              className="2xl:text-sm text-[10px] dark:text-white"
                              to={submenusubItem.link}
                            >
                              {submenusubItem.title}
                            </Link>
                          </Menu.Item>
                        ))}
                      </Menu.SubMenu>
                    )
                )}

              </Menu>
            )}
          </div>
        </div>
      </ul>
    </aside>

  );
};

export default Sidebar;


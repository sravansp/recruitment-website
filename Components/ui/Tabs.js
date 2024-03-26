import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { useState } from "react";
import { Segmented } from 'antd';

 
export function TabsCustomAnimation() {
  const data = [
    {
      label: "Active",
      value: "Active",
      // desc: `It really matters and then like it really doesn't matter.
      // What matters is the people who are sparked by it. And the people
      // who are like offended by it, it doesn't matter.`,
    },
    {
      label: "Inactive",
      value: "Inactive",
      // desc: `Because it's about motivating the doers. Because I'm here
      // to follow my dreams and inspire other people to follow their dreams, too.`,
    },
 
    // {
    //   label: "Vue",
    //   value: "vue",
    //   desc: `We're not always in the position that we want to be at.
    //   We're constantly growing. We're constantly making mistakes. We're
    //   constantly trying to express ourselves and actualize our dreams.`,
    // },
 
    // {
    //   label: "Angular",
    //   value: "angular",
    //   desc: `Because it's about motivating the doers. Because I'm here
    //   to follow my dreams and inspire other people to follow their dreams, too.`,
    // },
 
    // {
    //   label: "Svelte",
    //   value: "svelte",
    //   desc: `We're not always in the position that we want to be at.
    //   We're constantly growing. We're constantly making mistakes. We're
    //   constantly trying to express ourselves and actualize our dreams.`,
    // },
  ];
  const [activeTab, setActiveTab] = useState(data[0].value); // Set the initial active tab

  const handleTabChange = (value) => {
    setActiveTab(value);
  };
  return (
    <div>
    {/* <Tabs id="custom-animation"  value={activeTab} > */}
      {/* <TabsHeader className="bg-[#F1F1F1] w-48 text-black">
        {data.map(({ label, value }) => (
         <Tab 
         key={value} 
         value={value}
         className={`px-4 py-2 w-24 ${activeTab === value ? 'text-black z-10 bg-white' : ''}`}
         onClick={() => handleTabChange(value)}
       >
            {label}
          </Tab>
        ))}
      </TabsHeader> */}
      {/* <TabsBody
        animate={{
          initial: { y: 250 },
          mount: { y: 0 },
          unmount: { y: 250 },
        }}
      >
        {data.map(({ value, desc }) => (
          <TabPanel key={value} value={value}>
            {desc}
          </TabPanel>
        ))}
      </TabsBody> */}
    {/* </Tabs> */}
    <Segmented
        defaultValue="center"
        style={{ marginBottom: 8 }}
        className="px-4 py-2 w-32 "
            
           options={['Active','Inactive']}

      />
    </div>
  );
}
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
 
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
 
  return (
    <Tabs id="custom-animation" value="html" >
      <TabsHeader className="bg-[#F1F1F1] w-48">
        {data.map(({ label, value }) => (
          <Tab 
            key={value} 
            value={value}
            className="px-4 py-2 w-24" // Adjust width using padding
          >
            {label}
          </Tab>
        ))}
      </TabsHeader>
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
    </Tabs>
  );
}
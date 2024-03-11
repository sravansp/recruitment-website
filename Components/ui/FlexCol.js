import { Flex } from "antd";
import React from "react";

export default function FlexCol({ children, className, gap = 24 }) {
  return (
    <Flex gap={gap} className={`${className} flex flex-col   `}>
      {children}
    </Flex>
  );
}

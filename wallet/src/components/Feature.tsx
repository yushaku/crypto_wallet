import React, { HTMLAttributes } from "react";
import {
  TfiArrowTopRight,
  TfiPlus,
  TfiExchangeVertical,
  TfiStatsUp,
} from "react-icons/tfi";

const featurelist = [
  {
    Icon: TfiArrowTopRight,
    link: "Send",
    name: "Send",
  },
  {
    Icon: TfiPlus,
    link: "Buy",
    name: "Buy",
  },
  {
    Icon: TfiExchangeVertical,
    link: "Exchange",
    name: "Exchange",
  },
  {
    Icon: TfiStatsUp,
    link: "Portfolio",
    name: "Portfolio",
  },
];

export const Features = ({
  className,
  ...props
}: HTMLAttributes<HTMLUListElement>) => {
  return (
    <ul className={`flex gap-5 justify-center ${className}`} {...props}>
      {featurelist.map(({ name, Icon }, i) => {
        return (
          <li key={i}>
            <Icon
              color="white"
              className="bg-blue-500 mx-auto rounded-full w-8 h-8 border-blue-500 border-[8px]"
            />
            <span className="text-gray-600">{name}</span>
          </li>
        );
      })}
    </ul>
  );
};

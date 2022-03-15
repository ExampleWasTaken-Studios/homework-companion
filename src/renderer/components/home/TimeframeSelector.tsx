import React, { Dispatch, useState } from "react";

interface TimeframeSelectorProps {
  firstSelectorContent: string;
  secondSelectorContent: string;
  setState: Dispatch<React.SetStateAction<TimeframeSelection>>;
}

export const TimeframeSelector = ({ firstSelectorContent, secondSelectorContent, setState }: TimeframeSelectorProps) => {
  const [allCss, setAllCss] = useState("timeframe-selector timeframe-selector-active");
  const [tomorrowCss, setTomorrowCss] = useState("timeframe-selector");

  const allClickHandler = () => {
    setAllCss("timeframe-selector timeframe-selector-active");
    setTomorrowCss("timeframe-selector");
    setState("all");
  };

  const tomorrowClickHandler = () => {
    setAllCss("timeframe-selector");
    setTomorrowCss("timeframe-selector timeframe-selector-active");
    setState("tomorrow");
  };
  
  return (
    <>
      <a onClick={allClickHandler}>
        <li className={allCss}>{firstSelectorContent}</li>
      </a>
      <a onClick={tomorrowClickHandler}>
        <li className={tomorrowCss}>{secondSelectorContent}</li>
      </a>
    </>
  );
};
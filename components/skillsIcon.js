/* eslint-disable @next/next/no-img-element */
import React from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import util from "../styles/util.module.css";

export default function SkillsIcon({ icon, technology }) {
  const imageStyles = {
    marginRight: "23px",
  };
  return (
    <>
      <Tooltip.Provider delayDuration={500}>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <img
              className={"skillsInvert" + " " + util.flexCol}
              height={25}
              width={25}
              src={"/skills/" + icon + ".png"}
              alt={technology}
              style={imageStyles}
            />
          </Tooltip.Trigger>

          <Tooltip.Content className={util.tooltip}>
            <span>{technology}</span>
            <Tooltip.Arrow className={util.arrow} />
          </Tooltip.Content>
        </Tooltip.Root>
      </Tooltip.Provider>
    </>
  );
}

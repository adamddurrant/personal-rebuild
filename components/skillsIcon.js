/* eslint-disable @next/next/no-img-element */
import React from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import util from "../styles/util.module.css";
import styles from "../components/navLink.module.css";

export default function SkillsIcon({ icon, technology }) {
  const imageStyles = {
    paddingRight: "15px",
  };
  return (
    <>
      <Tooltip.Provider delayDuration={500}>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <img
              className={"skillsInvert" + " " + util.flexCol}
              height={40}
              width={40}
              src={"/skills/" + icon + ".svg"}
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

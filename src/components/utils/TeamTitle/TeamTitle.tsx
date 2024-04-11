'use client'
import React, { FC, useState } from "react";
import { pressStart2p } from "@/app/[lang]/fonts";
type Props = {
  title?: string,
};
const TeamTitle:FC<Props> = ({ title }) => {
  const [teamTitle, setTeamTitle] = useState(title || 'Назва команди')

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeamTitle(e.target.value);
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    e.target.select();
  }

  const handleBlur = () => {
    // I haven't found the endpoint to send title;
    // it will be needed to change it later;
    // Also, I don't know the team id, so I commented it out
    fetch("endpoint-to-send-title", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: teamTitle,
        // teamID: someID
      })
    })
  }
  return (
    <>
      <input
        type="text"
        className={`${pressStart2p.className} bg-main-background h-14 text-3xl p-2 box-border rounded-[10px] text-center selection:text-main-font-color selection:bg-selected-background`}
        value={teamTitle}
        onChange={handleTitleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </>
  )
}

export default TeamTitle;

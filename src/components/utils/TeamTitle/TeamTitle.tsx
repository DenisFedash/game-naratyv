'use client'
import React, { FC, useState } from "react";
import { pressStart2p } from "@/app/[lang]/fonts";
type Props = {
  title?: string,
};
const TeamTitle:FC<Props> = ({ title }) => {
  const [defaultTeamTitle, setDefaultTeamTitle] = useState(title || 'Назва команди')
  const [teamTitle, setTeamTitle] = useState(defaultTeamTitle)

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDefaultTeamTitle(e.target.value);
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    e.target.select();
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    if (!e.target.value.trim()) {
      setDefaultTeamTitle(teamTitle);
      return;
    }

    setTeamTitle(e.target.value.trim());
    // I haven't found the endpoint to send title;
    // it will be needed to change it later;
    // Also, I don't know the team id, so I commented it out
    fetch("endpoint-to-send-title", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: e.target.value.trim(),
        // teamID: someID
      })
    })
  }
  return (
    <>
      <input
        type="text"
        className={`${pressStart2p.className} bg-main-background h-14 text-3xl p-2 box-border rounded-[10px] text-center selection:text-main-font-color selection:bg-selected-background`}
        value={defaultTeamTitle}
        onChange={handleTitleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </>
  )
}

export default TeamTitle;

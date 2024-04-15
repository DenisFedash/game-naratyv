"use client";

import { useState, useEffect, FC } from "react";
import { RulesComponentProps } from "@/interfaces/Props.interface";
import { savePlayerName } from "@/app/(server)/api/players/route";

export const AddNicknameInput: FC<RulesComponentProps> = ({ textTr }) => {
    const [name, setName] = useState("");
    const [ip_address, setIpAddress] = useState("");
    const [device_info, setDeviceInfo] = useState("");
  
    useEffect(() => {
      const getIpAddressAndDeviceInfo = async () => {
        const res = await fetch("https://api.ipify.org?format=json");
        const data = await res.json();
  
        setIpAddress(data.ip);
        setDeviceInfo(navigator.userAgent);
      };
  
      getIpAddressAndDeviceInfo();
    }, []);
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      await savePlayerName({ name, ip_address, device_info });
      setName(""); 
    };
  
  return (
  
      <form onSubmit={handleSubmit}>
        <input
          type="text"
           value={name}
           onChange={(e) => setName(e.target.value)}
           placeholder={textTr.rulePlayerAddNicknameInput}
          className="w-[550px] h-[84px] border border-main-font-color rounded-lg shadow-3xl bg-main-white bg-keyboard bg-no-repeat bg-[center_left_1rem] flex text-3xl pl-32 ml-auto mr-auto">
        </input>
      </form>
  )
}





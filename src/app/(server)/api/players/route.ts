import { NextResponse } from "next/server";
import { PlayerData } from "../../../../interfaces/Props.interface"

export const savePlayerName = async ({ name, ip_address, device_info }: PlayerData) => {
  const res = await fetch("/api/players", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, ip_address, device_info }),
  });

  if (res.status === 200) {
    return NextResponse.json({ success: true })
  }
};
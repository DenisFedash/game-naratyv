'use client'
import Avatars from '@/components/utils/Avatars/Avatars';
import { pressStart2p } from "@/app/[lang]/fonts";
import React, { FC, useState } from 'react'

type Props = {}

type Team = {
  id: string,
  title: string,
  players: any[],
}

const GamePage: FC<Props> = () => {
  const [teams, setTeams] = useState<Team[]>([])
  const [currentTeam, setCurrentTeam] = useState<Team>(teams[0])

  const handleTeamChange = (id: string) => {
    setCurrentTeam(teams.filter(team => team.id === id)[0]);
  }
  return (
    <>
      <div className='min-h-svh'>
        <div className='grid grid-cols-3 max-w-[1280px] mx-auto mt-4 mb-14'>
          <div></div>
          <div className={`${pressStart2p.className} bg-main-background h-14 text-3xl p-2 box-border rounded-[10px] text-center selection:text-main-font-color selection:bg-selected-background`}>
            {currentTeam?.title}
          </div>
          <div className='justify-self-end mr-5'>
            <Avatars
              players={currentTeam?.players || []}
              activePlayerId={1}
              secondsLeft={300}
            />
          </div>
        </div>
        <div className='grid grid-cols-3 h-16 bg-main-white max-w-[1280px] w-[1280px] mx-auto mb-[1px] border-[1px] border-light-grey'>
          <div></div>
          <div className='justify-self-center self-center flex gap-3'>
            {teams.map(team => (
              <button
                onClick={() => handleTeamChange(team.id)}
                className={`${currentTeam?.id == team.id ? "bg-main-yellow" : "bg-light-grey"} w-6 h-6 rounded-lg`}
              ></button>
            ))}
          </div>
          <span className='justify-self-end self-center mr-16 text-[32px] leading-snug'>
            00:00
          </span>
        </div>
        {/* It should be a painter in the future */}
        <div
          className='max-w-[1280px] w-[1280px] h-[532px] bg-main-white mx-auto mb-8 border-[1px] border-light-grey'
        ></div>
      </div>
    </>
  )
}

export default GamePage;

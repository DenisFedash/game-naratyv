import { FC, useEffect, useState } from "react";

// I have not found the player type declaration I need.
// If further there already exists one that fitts the requirenments
// you can delete this one and replace it.
type Player = {
  id: number,
  img: string,
  name: string,
}

type Props = {
    players: Player[],
    activePlayerId: number,
    secondsLeft: number,
}

const Avatars:FC<Props> = ({ players, activePlayerId, secondsLeft }) => {
  const [ activePlayer ] = players.filter(player => player.id === activePlayerId);
  const [greenDeg, setGreenDeg] = useState(360 - ((secondsLeft % 180 || 180) * 2));


  useEffect(() => {
    const greenTimeout = setInterval(() => {
      setGreenDeg(prev => prev + 2);
    }, 1000);

    return () => {
      clearInterval(greenTimeout);
    }
  }, [])

  return (
    <>
      <div className="flex justify-between gap-11">
        <div>
          <img
            src={activePlayer.img}
            className="w-[54px] h-[54px] rounded-full object-cover mb-[2px] box-border p-[2px]"
            style={{ background: `conic-gradient(green ${greenDeg}deg, #FD8D3B 0deg)` }}
          />
          <p className="text-main-font-color font-normal text-xs text-center leading-4">{activePlayer.name}</p>
        </div>

        <div className="flex">
          {players.map((player, i, arr) => {
            return player.id !== activePlayerId
              ? <img
                  src={player.img}
                  className="h-[54px] min-w-[54px] w-[54px] rounded-full border-dark-grey border-[1px] mr-[-25px] object-cover"
                  style={{ zIndex: arr.length - i }}
                />
              : <></>
          })}
        </div>
      </div>
    </>
  )
};

export default Avatars;

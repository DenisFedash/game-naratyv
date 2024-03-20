import { FC } from "react";

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
}

const Avatars:FC<Props> = ({ players, activePlayerId }) => {
  const [ activePlayer ] = players.filter(player => player.id === activePlayerId);

  return (
    <>
      <div className="flex justify-between gap-11">
        <div>
          <img src={activePlayer.img} className="w-[54px] h-[54px] rounded-full border-orange border-2 object-cover mb-[2px]"/>
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

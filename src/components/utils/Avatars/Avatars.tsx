import { FC } from "react";

type Player = {
  id: number,
  img: string,
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
        <img src={activePlayer.img} className="w-[54px] h-[54px] rounded-full border-orange border-2 object-cover"/>

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

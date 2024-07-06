import { FC, useEffect, useState } from "react";
import Image from "next/image";
import avatar from "../../../../public/img/avatars/avatar.jpg";
import avatar1 from "../../../../public/img/avatars/avatar1.jpg";
import avatar2 from "../../../../public/img/avatars/avatar2.jpg";
import avatar3 from "../../../../public/img/avatars/avatar3.jpg";


type Player = {
  id: number;
  img: string;
  name: string;
};

type Props = {
  players: Player[];
  activePlayerId: number;
  secondsLeft: number;
};

let img = [avatar, avatar1, avatar2, avatar3];

let players = [
  {
    id: 1,
    name: "Марина",
  },
  {
    id: 2,
    name: "Тарас",
  },
  {
    id: 3,
    name: "Таня",
  },
  {
    id: 4,
    name: "Оля",
  }
]


const Avatars: FC<Props> = ({ 
  // activePlayerId, 
  // activePlayer,
  // setActivePlayer
  // secondsLeft 
}) => {
const [greenDeg, setGreenDeg] = useState(0);
const [activePlayer, setActivePlayer] = useState(0);
const [activePlayerId, setActivePlayerId] = useState(1);
  
   useEffect(() => {
     img.sort(() => Math.random() - 0.5);
     const initialGreenDeg = 360 / players.length;
     setGreenDeg(initialGreenDeg);
     players.forEach((player, index) => {
       player.img = img[index];
     });
   }, []);

   useEffect(() => {
     const greenTimeout = setInterval(() => {
       setGreenDeg((prev) => prev + (360 / players.length));
     }, 1000);

     return () => {
       clearInterval(greenTimeout);
     };
   }, []);

   useEffect(() => {
     const playerInterval = setInterval(() => {
       setActivePlayer((prev) => (prev + 1) % players.length);
       setActivePlayerId(players[(activePlayer + 1) % players.length].id);
       setGreenDeg(360 / players.length); 
    }, 10000);
  
     return () => {
     clearInterval(playerInterval);
   };
 }, [activePlayer]);


  // useEffect(() => {
  //   img.sort(() => Math.random() - 0.5);
  //   const initialGreenDeg = 360 / players.length;
  //   setGreenDeg(initialGreenDeg);
  //   players.forEach((player, index) => {
  //     player.img = img[index];
  //   });
  // }, []);
  
  // useEffect(() => {
  //   if (activePlayer !== null) {
  //     const greenTimeout = setInterval(() => {
  //       setGreenDeg((prev) => prev + (360 / players.length));
  //     }, 1000);
  
  //     return () => {
  //       clearInterval(greenTimeout);
  //     };
  //   }
  // }, [activePlayer]);
  
  // useEffect(() => {
  //   if (activePlayer !== null) {
  //     const playerInterval = setInterval(() => {
  //       setActivePlayer((prev) => (prev + 1) % players.length);
  //       setActivePlayerId(players[(activePlayer + 1) % players.length].id);
  //       setGreenDeg(360 / players.length);
  //     }, 10000);
  
  //     return () => {
  //       clearInterval(playerInterval);
  //     };
  //   }
  // }, [activePlayer]);

   const activePlayerAvatar = players.find((player) => player.id === activePlayerId)?.img;
   const activePlayerName = players.find((player) => player.id === activePlayerId)?.name;
 

   return (
     <div className="flex justify-end">
       <div className="flex justify-between gap-11 w-[300px]">
         <div>
           <Image
             src={activePlayerAvatar}
             alt="avatar"
             className="w-[64px] h-[64px] rounded-full object-cover mb-[4px] box-border p-[2px]"
             style={{
               background: `conic-gradient(green ${greenDeg}deg, #FD8D3B 0deg)`,
               position: 'relative',
             }}
           />
           <p className="text-main-font-color font-normal text-base text-center leading-4">
             {activePlayerName || "Гравець не знайдений"}
           </p>
         </div>
 
         <div className="flex min-w-fit">
           {players.map((player) => {
             if (player.id !== activePlayerId) {
               return (
                 <Image
                   key={player.id}
                   src={player.img}
                   alt="avatar"
                   width={54}
                   height={54}
                   className="h-[64px] min-w-[64px] w-[64px] rounded-full border-dark-grey border-[1px] mr-[-15px] object-cover"
                   style={{ zIndex: players.length - player.id }}
                 />
               );
             }
             return null;
           })}
         </div>
       </div>
     </div>
   );
 };
 
 export default Avatars;


// type Player = {
//   id: number,
//   img: string,
//   name: string,
// }

// type Props = {
//     players: Player[],
//     activePlayerId: number,
//     secondsLeft: number,
// }


// const Avatars:FC<Props> = ({ players, activePlayerId, secondsLeft }) => {
//   const [ activePlayer ] = players.filter(player => player.id === activePlayerId);
//   const [greenDeg, setGreenDeg] = useState(360 - ((secondsLeft % 180 || 180) * 2));


//   useEffect(() => {
//     const greenTimeout = setInterval(() => {
//       setGreenDeg(prev => prev + 2);
//     }, 1000);

//     return () => {
//       clearInterval(greenTimeout);
//     }
//   }, [])

//   return (
//     <>
//       <div className="flex justify-between gap-11">
//         <div>
//           <Image
//             src={activePlayer?.img || ""}
//             alt="avatar"
//             className="w-[54px] h-[54px] rounded-full object-cover mb-[2px] box-border p-[2px]"
//             style={{ background: `conic-gradient(green ${greenDeg}deg, #FD8D3B 0deg)` }}
//           />
//           <p className="text-main-font-color font-normal text-xs text-center leading-4">{activePlayer?.name}</p>
//         </div>

//         <div className="flex min-w-fit">
//           {players.map((player, i, arr) => {
//             return player.id !== activePlayerId
//               ? <Image
//                   src={player.img}
//                   alt="avatar"
//                   className="h-[54px] min-w-[54px] w-[54px] rounded-full border-dark-grey border-[1px] mr-[-25px] object-cover"
//                   style={{ zIndex: arr.length - i }}
//                 />
//               : <></>
//           })}
//         </div>
//       </div>
//     </>
//   )
// };

// export default Avatars;

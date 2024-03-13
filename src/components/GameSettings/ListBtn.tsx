import Image from "next/image";
import listBtn from "../../../public/icon/settings-topic-list-btn.svg"
import { RuleNumber } from "../utils/RuleCard/RuleNumber";


export const ListBtn: React.FC<{ setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }> = ({ setIsOpen }) => {
    const handleClick = () => {
      setIsOpen(prevState => !prevState);
    };

    return (
         <button onClick={handleClick} className="mr-[330px]">
              <RuleNumber className=" w-16 h-16 bg-main-yellow">
              <Image
              src={listBtn}
              alt="list-button"
              width={48}
              height={48}
              className="w-12 h-12 ml-auto mr-auto mt-auto mb-auto"
              />
              </RuleNumber>
          </button>
    )
}
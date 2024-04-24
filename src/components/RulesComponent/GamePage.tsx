import { BtnComponent } from "./BtnComponent";
import { RulesDetailed } from "./RulesDetailed ";


export const GamePage = ({textTr, lang}) => {
    return (
        <>
        <BtnComponent lang={lang} textTr={textTr}/>
        <RulesDetailed lang={lang} textTr={textTr} role={"details"}/>
        </>
    )
}
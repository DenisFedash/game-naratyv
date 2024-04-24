import { RulesAdmin } from "./RulesAdmin";
import { RulesAdminBtn } from "./RulesAdminBtn";

export const RulesAdminPage = ({ textTr, lang, role }) => {
    return (
        <>
        <RulesAdminBtn textTr={textTr} lang={lang}/>
        <RulesAdmin textTr={textTr} lang={lang} role={role}/>
        </>
    )
}
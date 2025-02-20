import Candidatelists from "../../components/student/Election/candidatelist.jsx";
import Electionui from "../../components/student/Election/electionui.jsx"
import Elections from "../../components/student/Election/election.jsx"
import RegisterCandidate from "../../components/student/Election/registercandidate.jsx"
import Result from "../../components/student/Election/result.jsx"
import Votings from "../../components/student/Election/votesystem.jsx"
import { Outlet } from "react-router-dom";
import react from "react";

export const Election = () => {
    return (
        <>
            <Elections />
            
           
        </>
    );
};

export const Candidatelist = () => {
    return (
        <>
        <Candidatelists />
        </>
    );
};
export const Registerstudent=()=>{
    return (
        <>
        <RegisterCandidate />
        </>
    );
};
export const Electionu=()=>{
    return (
        <>
        <Electionui />
        </>
    );
}
export const Results=()=>{
    return (
        <>
        <Result />
        </>
    )
};
export const Voting=()=>{
    return (
        <>
        <Votings />
        </>
    )
}



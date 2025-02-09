import React from 'react';
import { styled } from "styled-components";

const ResultContainer = styled.div`
    width: 100%;
    height: 3rem;
    align-items: center;
    display: flex;
    border-top: 2px solid indianred;
`;

const Rank = styled.div`
    width: 10%;
`;

const Name = styled.a`
    width: 40%
`;

const Time = styled.div`
    width: 20%;
`;

const LeaderboardResult = ({ props }) => {
    const { name, minutes, seconds, link, hs, dnf, iter } = props;

    return (
        <ResultContainer>
            <Rank>{iter}</Rank>
            <Name href={link} target="_blank">{name}</Name>
            <Time>{dnf ? 'DNF' : `${minutes}m ${seconds}.${hs}s`}</Time>
        </ResultContainer>
    );
};

export default LeaderboardResult;
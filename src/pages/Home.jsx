import LogoWide from "../static/logo-wide.png"
import {Button} from "@mui/material";
import {styled} from "styled-components";

const ButtonHolder = styled.div`
  display: flex;
`;

export default function Home() {
    return (
        <>
            <img src={LogoWide} className="logoFull" alt="Logo" />
            <ButtonHolder>
                <Button />
            </ButtonHolder>
        </>
    );
};
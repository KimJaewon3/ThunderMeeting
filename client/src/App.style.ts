import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const StyledNavLink = styled(NavLink)<{ sidebar?: undefined | 'true' }>`
  :link, :visited {
    color: ${props => `${props.sidebar ? 'white' : 'black'}`};
    text-decoration: none;
  }
`;

export const StyledModalBack = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
  background-color: rgba(201, 201, 201, 0.5);
`;

export const StyledCommonModal = styled.div`
  z-index: 4;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 5em;
  box-shadow: 5px 5px rgb(112, 112, 112);
  display: flex;
  flex-direction: column;
  margin-bottom: 10vh;
  div {
    display: flex;
    align-items: baseline;
    margin: 5px;
    p {
      flex-basis: 50%;
    }
    input {
      margin: 1em 0 1em 1em;
      padding: 5px;
    }
  }
`;

export const StyledCommonButton = styled.button`
  padding: 5px;
  background-color: #ffd448;
  border: #a18817 1px solid;
  border-radius: 5px;
  &:hover {
    background-color: #e7aa25;
  }
  & + & {
    margin-left: 2em;
  }
`;

export const StyledInput = styled.input`
  padding: 5px;
`;

export const StyledCommonImg = styled.img`
  display: block;
  margin: 0 auto;
`;

export const StyledProfileImgBox = styled.div<{ size: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => props.size};
  height: ${props => props.size};
  overflow: hidden;
  border: 2px solid black;
  border-radius: 50%;
  img {
    max-height: ${props => props.size};
    max-width: ${props => props.size};
  }
`;

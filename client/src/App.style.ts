import styled from "styled-components";

export const StyledModalBack = styled.div`
display: flex;
justify-content: center;
align-items: center;
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
z-index: 2;
background-color: rgba(201, 201, 201, 0.5);
`;

export const StyledCommonModal = styled.div`
  z-index: 3;
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

export const StyledButton = styled.button`
  width: 7em;
  padding: 0.5em;
  margin: 1em;
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
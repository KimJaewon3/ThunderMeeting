import styled from "styled-components";
import { userInfoType } from "../modules/userInfo";

type StyledProps = {
  xpos: number;
  ypos: number;
}

type Props = {
  xpos: number;
  ypos: number;
  info: userInfoType | undefined;
}

const StyledMemberInfoOverlay = styled.div<StyledProps>`
  position: absolute;
  top: ${props => props.ypos + 'px'};
  left: ${props => props.xpos + 'px'};
  background-color: white;
  border: 2px solid gray;
  border-radius: 5px;
  padding: 10px;
  z-index: 3;
`;

export default function MemberInfoOverlay({ xpos, ypos, info }: Props) {

  return (
    <StyledMemberInfoOverlay xpos={xpos} ypos={ypos}>
      <p>이름: {info?.name}</p>
      <p>mbti: {info?.mbti}</p>
      <p>상메: {info?.sangme}</p>
      <p>좋아요: {info?.like}</p>
    </StyledMemberInfoOverlay>
  )
}

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
  z-index: 3;
  background-color: #8d8d8d;
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

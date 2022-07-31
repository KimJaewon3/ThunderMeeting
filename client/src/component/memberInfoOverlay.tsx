import styled from "styled-components";
import { StyledProfileImgBox } from "../App.style";
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
  .overlay-nick {
    font-size: larger;
  }
`;

export default function MemberInfoOverlay({ xpos, ypos, info }: Props) {

  return (
    <StyledMemberInfoOverlay xpos={xpos} ypos={ypos}>
      <StyledProfileImgBox size="100px">
        <img src={info?.profileImage} />
      </StyledProfileImgBox>
      <p className="overlay-nick">{info?.nick}</p>
      <p>{info?.sangme}</p>
      <p>- mbti: {info?.mbti}</p>
      <p>- 좋아요: {info?.like}</p>
    </StyledMemberInfoOverlay>
  )
}

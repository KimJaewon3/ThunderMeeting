import { NavLink, useNavigate } from "react-router-dom";
import { GrLogout } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { updateAccessToken } from "../modules/token";
import { isSignIn } from "../modules/sign";
import { deleteUserInfo } from "../modules/userInfo";
import styled from "styled-components";
import { StyledNavLink } from "../App.style";
import { RootState } from "../modules";

const StyledSidebar = styled.div`
  background-color: #724e00;
  color: white;
  height: 96vh;
  width: 10vh;
  display: flex;
  flex-direction: column;
  padding: 2vh;
  >* {
    margin-top: 2em;
  }
  .sign-out-box {
    display: flex;
    align-items:center;
    >* {
      margin-right: 1em;
    }
  }
`;

type Props = {
  handleSidebarOpen: (val: boolean) => void;
}

export default function Sidebar({ handleSidebarOpen }: Props) {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const userInfo = useSelector((state: RootState) => state.userInfoReducer);

  function handleSignOut() {
    dispatch(updateAccessToken(''));
    dispatch(isSignIn(false));
    dispatch(deleteUserInfo());
    handleSidebarOpen(false);
    nav('/');
  }
  
  return (
    <StyledSidebar>
      <p>{userInfo.nick}</p>
      <p>상메 리덕스로</p>
      <StyledNavLink to={'/mypage'} sidebar='true'>MyPage</StyledNavLink>
      <div>약속 보기</div>
      <div className="sign-out-box">
        <GrLogout/>
        <p onClick={handleSignOut}>Sign Out</p>
      </div>
    </StyledSidebar>
  )
}

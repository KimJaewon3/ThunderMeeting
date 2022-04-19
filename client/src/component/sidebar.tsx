import { NavLink, useNavigate } from "react-router-dom";
import { GrLogout } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { updateAccessToken } from "../modules/token";
import { isSignIn } from "../modules/sign";
import { deleteUserInfo, updateSangme } from "../modules/userInfo";
import styled from "styled-components";
import { StyledNavLink } from "../App.style";
import { RootState } from "../modules";
import { BsPencil } from "react-icons/bs";
import { useState } from "react";
import { APIURL } from "../App";

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
  const [ isWritingSangme, setIsWritingSangme ] = useState(false);
  const [ textInput, setTextInput ] = useState(userInfo.sangme);

  function handleSignOut() {
    dispatch(updateAccessToken(''));
    dispatch(isSignIn(false));
    dispatch(deleteUserInfo());
    handleSidebarOpen(false);
    nav('/');
  }

  function writeSangme() {
    setIsWritingSangme(true);
  }

  function submitSangme() {
    console.log(textInput);
    
    APIURL.patch('account/createSangme', {
      sangme: textInput,
      id: userInfo.id,
    }).then(res => {
      console.log(res);
      setIsWritingSangme(false);
      dispatch(updateSangme(textInput));
    }).catch(err => console.log(err));
  }

  function handleTextInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setTextInput(e.target.value);
  }

  function goToIntro() {
    handleSidebarOpen(false);
    nav('/');
  }
  
  return (
    <StyledSidebar>
      <p>{userInfo.nick}</p>
      <div>
        {isWritingSangme ? (
          <div>
            <textarea defaultValue={textInput} onChange={e=>handleTextInput(e)}></textarea>
            <button onClick={submitSangme}>확인</button>
          </div>
        ) : (
          <p>{userInfo.sangme.length === 0 ? '상태 메세지를 작성해보세요!' : userInfo.sangme}</p>
        )}
        <BsPencil onClick={writeSangme}/>
      </div>
      <StyledNavLink to={'/mypage'} sidebar='true'>MyPage</StyledNavLink>
      <div onClick={goToIntro}>약속 보기</div>
      <div className="sign-out-box">
        <GrLogout/>
        <p onClick={handleSignOut}>Sign Out</p>
      </div>
    </StyledSidebar>
  )
}

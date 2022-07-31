import { NavLink, useNavigate } from "react-router-dom";
import { GrLogout } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { updateAccessToken } from "../modules/token";
import { isSignIn } from "../modules/sign";
import { deleteUserInfo, updateSangme } from "../modules/userInfo";
import styled from "styled-components";
import { StyledNavLink, StyledProfileImgBox } from "../App.style";
import { RootState } from "../modules";
import { BsPencil } from "react-icons/bs";
import { useState } from "react";
import { APIURL } from "../App";

const StyledSidebar = styled.div`
  background-color: #724e00;
  color: white;
  height: 96vh;
  width: 10vw;
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
  .sidebar-sangme-container {
    display: flex;
    flex-direction: column;
    textarea {
      height: 5em;
      resize: none;
    }
    .sidebar-sangme-btn-box {
      display: flex;
      flex-direction: row-reverse;
      button {
        margin-left: 5px;
      }
    }
  }
  .sidebar-nick {
    font-size: large;
  }
`;

type Props = {
  handleSidebarOpen: (val: boolean) => void;
}

export default function Sidebar({ handleSidebarOpen }: Props) {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const userInfo = useSelector((state: RootState) => state.userInfoReducer);
  const accessToken = useSelector((state: RootState) => state.tokenReducer.accessToken);
  const [ isWritingSangme, setIsWritingSangme ] = useState(false);
  const [ textInput, setTextInput ] = useState(userInfo.sangme);

  function handleSignOut() {
    handleSidebarOpen(false);
    dispatch(updateAccessToken(''));
    dispatch(isSignIn(false));
    dispatch(deleteUserInfo());
    nav('/');
  }

  function writeSangme() {
    setIsWritingSangme(true);
  }

  function submitSangme() {
    APIURL.patch('account/createSangme', {
      sangme: textInput,
      id: userInfo.id,
    }, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      }
    }).then(res => {
      setIsWritingSangme(false);
      dispatch(updateSangme(textInput));
    }).catch(err => {
      alert(err.response.data.message);
      if (err.response.data.data === 'access-token-error') {
        handleSidebarOpen(false);
        dispatch(updateAccessToken(''));
        dispatch(isSignIn(false));
        dispatch(deleteUserInfo());
        window.location.reload();
      }
    });
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
      <div>
        <StyledProfileImgBox size="100px">
          <img src={userInfo.profileImage}/>
        </StyledProfileImgBox>
        <p className="sidebar-nick">{userInfo.nick}</p>
      </div>
      <div>
        {isWritingSangme ? (
          <div className="sidebar-sangme-container">
            <textarea defaultValue={textInput} onChange={e=>handleTextInput(e)}></textarea>
            <div className="sidebar-sangme-btn-box">
              <button onClick={()=>setIsWritingSangme(false)}>취소</button>
              <button onClick={submitSangme}>확인</button>
            </div>
          </div>
        ) : (
          <p>{userInfo.sangme.length === 0 ? '상태 메세지를 작성해보세요!' : userInfo.sangme}</p>
        )}
        <BsPencil onClick={writeSangme}/>
      </div>
      <StyledNavLink to={'/mypage'} sidebar='true'>- MyPage</StyledNavLink>
      <div onClick={goToIntro}>- 약속 보기</div>
      <div className="sign-out-box">
        <GrLogout />
        <p onClick={handleSignOut}>Sign Out</p>
      </div>
    </StyledSidebar>
  )
}

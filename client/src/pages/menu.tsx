import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { StyledModalBack, StyledNavLink } from "../App.style";
import SignIn from "../component/signIn";
import SignUp from "../component/signUp";
import { RootState } from "../modules";
import { AiOutlineBars, AiTwotoneThunderbolt } from 'react-icons/ai';
import Sidebar from "../component/sidebar";
import { updateIsSignInModalOpen } from "../modules/modalOpen";
import smoke from "../images/smoke.png";
import { APIURL } from "../App";
import { updateAccessToken } from "../modules/token";
import { isSignIn } from "../modules/sign";
import { deleteUserInfo } from "../modules/userInfo";
import { useNavigate } from "react-router-dom";

const StyledMenu = styled.div`
  background-color: #ffd448;
  > div {
    display: flex;
    padding: 3em 0 3em 0;
    align-items: center;
    font: italic bold 20px serif;
    .sign {
      width: 5em;
    }
    &:first-child {
      margin-left: 25vw;
    }
    &:last-child {
      margin-right: 25vw;
    }
    > * {
      flex: 1;
      display: flex;
      flex-direction: row-reverse;
    }
    > :first-child{
      display: flex;
      flex-direction: row;
    }
  }
  img {
    display: none;
    margin-left: 5px;
    width: 50px;
  }
  .menu-icon:hover {
    display: flex;
    transition: transform 0.1s linear;
    transform: translateX(-10px);
    
  }
`;

const StyledClearModalBack = styled(StyledModalBack)`
  background-color: rgba(0, 0, 0, 0);
  justify-content: flex-end;
  z-index: 3;
`;

export default function Menu() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [ isSideBarOpen, setIsSideBarOpen ] = useState(false);
  const [ isSignUpOpen, setIsSignUpOpen ] = useState(false);
  const isSignInState = useSelector((state: RootState) => state.signReducer.isSignIn);
  const isSignInModalOpen = useSelector((state: RootState) => state.modalOpenReducer.isSignInModalOpen);
  const accessToken = useSelector((state: RootState) => state.tokenReducer.accessToken);

  useEffect(() => {
    if (isSignInState) {
      APIURL.get("/account/vaildAccount", {
        headers: {
          authorization: `Bearer ${accessToken}`,
        }
      }).then(res => {
        // console.log(res)
      }).catch(err => {
        if (err.response.data.data === 'access-token-error') {
          alert(err.response.data.message);
          console.log(err.response.data.message)
          dispatch(updateAccessToken(''));
          dispatch(isSignIn(false));
          dispatch(deleteUserInfo());
          nav("/");
        }
      });
    }
  }, []);

  function handleSidebarOpen(val: boolean) {
    setIsSideBarOpen(val);
  }

  function handleSignUpClick(val: boolean) {
    setIsSignUpOpen(val);
  }

  function handleSignInClick(val: boolean) {
    dispatch(updateIsSignInModalOpen(val));
  }

  function handleModalBackgroundClick(target: string, e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (e.target === e.currentTarget) {
      if (target === 'signIn') {
        handleSignInClick(false);
      }
      if (target === 'signUp') {
        setIsSignUpOpen(false);
      }
      if (target === 'sidebar') {
        setIsSideBarOpen(false);
      }
    }
  }

  return (
    <div>
      <StyledMenu>
        <div>
          <StyledNavLink to={'/'}>
            <div>
              <AiTwotoneThunderbolt size={50} />
              <div>thunder</div>
            </div>
          </StyledNavLink>

          <StyledNavLink to={'/main'}>
            <div className="menu-icon"> 
              <p>약속 잡기</p>  
            </div>
          </StyledNavLink>

          <StyledNavLink to={'/'}>
            <div className="menu-icon"> 
              <p>약속 확인</p>  
            </div>
          </StyledNavLink>

          {/*
          <StyledNavLink to={'/reviewBoard'}>
            <div className="menu-icon"> 
              <p>후기 게시판</p>  
              <img src={smoke}/>
            </div>
          </StyledNavLink>
          */}

          {isSignInState ? (
            <div className="sign" onClick={()=>handleSidebarOpen(true)}>
              <AiOutlineBars/>
            </div>
          ) : (
            <div className="sign" onClick={()=>handleSignInClick(true)}>로그인</div>
          )} 
        </div>
      </StyledMenu>

      {isSideBarOpen &&
        <StyledClearModalBack onClick={(e)=>handleModalBackgroundClick('sidebar', e)}>
          <Sidebar handleSidebarOpen={handleSidebarOpen}/>
        </StyledClearModalBack>
      }

      {isSignInModalOpen && 
        <StyledModalBack onClick={(e)=>handleModalBackgroundClick('signIn', e)}>
          <SignIn handleSignInClick={handleSignInClick} handleSignUpClick={handleSignUpClick}/>
        </StyledModalBack>
      }

      {isSignUpOpen &&
        <StyledModalBack onClick={(e)=>handleModalBackgroundClick('signUp', e)}>
          <SignUp handleSignUpClick={handleSignUpClick}></SignUp>  
        </StyledModalBack>
      }
    </div>
  );
}

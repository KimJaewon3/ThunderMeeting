import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { StyledModalBack, StyledNavLink } from "../App.style";
import SignIn from "../component/signIn";
import SignUp from "../component/signUp";
import { RootState } from "../modules";
import { AiOutlineBars } from 'react-icons/ai';
import Sidebar from "../component/sidebar";
import { updateIsSignInModalOpen } from "../modules/modalOpen";

const StyledMenu = styled.nav`
  display: flex;
  background-color: #ffd448;
  padding: 3em;
  justify-content: space-between;
  .sign {
    width: 5em;
  }
`;

const StyledClearModalBack = styled(StyledModalBack)`
  background-color: rgba(0, 0, 0, 0);
  justify-content: flex-end;
  z-index: 3;
`;

export default function Menu() {
  const dispatch = useDispatch();
  const [ isSideBarOpen, setIsSideBarOpen ] = useState(false);
  // const [ isSignInOpen, setIsSignInOpen ] = useState(false);
  const [ isSignUpOpen, setIsSignUpOpen ] = useState(false);
  const isSignInState = useSelector((state: RootState) => state.signReducer.isSignIn);
  const isSignInModalOpen = useSelector((state: RootState) => state.modalOpenReducer.isSignInModalOpen);

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
        <StyledNavLink to={'/'}>로고(intro)</StyledNavLink>
        <StyledNavLink to={'/main'}>thunder(main)</StyledNavLink>
        {isSignInState ? (
          <div className="sign" onClick={()=>handleSidebarOpen(true)}>
            <AiOutlineBars/>
          </div>
        ) : (
          <div className="sign" onClick={()=>handleSignInClick(true)}>Sign In</div>
        )} 
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

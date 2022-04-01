import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { StyledModalBack } from "../App.style";
import SignIn from "../component/signIn";
import SignUp from "../component/signUp";
import { RootState } from "../modules";
import { isSignIn } from "../modules/sign";
import { updateAccessToken } from "../modules/token";
import { deleteUserInfo } from "../modules/userInfo";
import { AiOutlineBars } from 'react-icons/ai';

const StyledMenu = styled.nav`
  display: flex;
  background-color: #ffd448;
  justify-content: space-between;
  padding: 3em;
`;

export default function Menu() {
  const dispatch = useDispatch();
  const [ isSignInOpen, setIsSignInOpen ] = useState(false);
  const [ isSignUpOpen, setIsSignUpOpen ] = useState(false);
  const isSignInState = useSelector((state: RootState) => state.signReducer.isSignIn);

  function handleSignInClick(val: boolean) {
    setIsSignInOpen(val);
  }

  function handleSignUpClick(val: boolean) {
    setIsSignUpOpen(val);
  }

  function handleModalBackgroundClick(target: string, e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (e.target === e.currentTarget) {
      if (target === 'signIn') {
        setIsSignInOpen(false);
      }
      if (target === 'signUp') {
        setIsSignUpOpen(false);
      }
    }
  }

  function handleSignInOrOut() {
    if (!isSignInState) {
      handleSignInClick(true);
    } else {
      // sign out (token, sign)
      dispatch(updateAccessToken(''));
      dispatch(isSignIn(false));
      dispatch(deleteUserInfo());
    }
  }

  return (
    <div>
      <StyledMenu>
        <NavLink to={'/'}>로고(intro)</NavLink>
        <NavLink to={'/main'}>thunder(main)</NavLink>
        <div onClick={handleSignInOrOut}>{isSignInState ? <AiOutlineBars/> : 'sign in'}</div>
      </StyledMenu>

      {isSignInOpen && 
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
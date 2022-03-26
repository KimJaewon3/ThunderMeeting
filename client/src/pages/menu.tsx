import { useState } from "react";
import { NavLink } from "react-router-dom";
import SignIn from "../component/signIn";
import SignUp from "../component/signUp";

export default function Menu() {
  const [ isSignInOpen, setIsSignInOpen ] = useState(false);
  const [ isSignUpOpen, setIsSignUpOpen ] = useState(false);

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

  return (
    <div>
      <NavLink to={'/'}>로고(intro)</NavLink>
      <NavLink to={'/main'}>thunder(main)</NavLink>
      <div onClick={()=>handleSignInClick(true)}>sign in</div>

      {
        isSignInOpen && 
          <div onClick={(e)=>handleModalBackgroundClick('signIn', e)}>
            <SignIn handleSignInClick={handleSignInClick} handleSignUpClick={handleSignUpClick}/>
          </div>
      }

      {
        isSignUpOpen &&
          <div onClick={(e)=>handleModalBackgroundClick('signUp', e)}>
            <SignUp handleSignUpClick={handleSignUpClick}></SignUp>  
          </div>
      }
    </div>
  );
}
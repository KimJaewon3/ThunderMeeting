import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { APIURL } from "../App";
import { StyledCommonModal, StyledButton } from "../App.style";
import { isSignIn } from "../modules/sign";
import { updateAccessToken } from "../modules/token";
import { updateUserInfo } from "../modules/userInfo";

const StyledModal = styled(StyledCommonModal)`
  .btn-box {
    margin: 0 auto;
  }
`;

type Props = {
  handleSignInClick: (val: boolean) => void;
  handleSignUpClick: (val: boolean) => void;
}

export default function SignIn({ handleSignInClick, handleSignUpClick }: Props) {
  const dispatch = useDispatch();
  const [ textInput, setTextInput ] = useState({
    email: '',
    password: '',
  });

  function textInputHandler(target: string, e: React.ChangeEvent<HTMLInputElement>) {
    //console.log(e.target.value)
    setTextInput({
      ...textInput,
      [target]: e.target.value,
    });
  }

  function signInBtnHandler() {


    // 로그인 요청
    APIURL
      .post('/account/signIn', textInput)
      .then(res => {
        console.log(res.data.data)
        dispatch(updateUserInfo(res.data.data.userInfo));
        dispatch(updateAccessToken(res.data.data.accessToken));
        dispatch(isSignIn(true));
        handleSignInClick(false);
      })
      .catch(err => console.log(err));
  }

  function signUpBtnHandler() {
    handleSignUpClick(true);
    handleSignInClick(false);
  }

  return (
    <StyledModal>
      <div>
        <p>Email(Id)</p>
        <input onChange={e=>textInputHandler('email', e)}></input>
      </div>
      <div>
        <p>Password</p>
        <input onChange={e=>textInputHandler('password', e)}></input>
      </div>
      <div className="btn-box">
        <StyledButton onClick={signInBtnHandler}>Sign In</StyledButton>
        <StyledButton onClick={signUpBtnHandler}>Sign Up</StyledButton>
      </div>
    </StyledModal>
  );
}
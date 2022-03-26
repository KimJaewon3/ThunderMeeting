import { useState } from "react";
import { useDispatch } from "react-redux";
import { APIURL } from "../App";
import { getUserInfo } from "../modules/userInfo";

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
        console.log(res)
        dispatch(getUserInfo(res.data.data));
        handleSignInClick(false);
      })
      .catch(err => console.log(err));
  }

  function signUpBtnHandler() {
    handleSignUpClick(true);
  }

  return (
    <div>
      <p>Email(Id)</p>
      <input onChange={e=>textInputHandler('email', e)}></input>
      <p>Password</p>
      <input onChange={e=>textInputHandler('password', e)}></input>
      <button onClick={signInBtnHandler}>Sign In</button>
      <button onClick={signUpBtnHandler}>Sign Up</button>
    </div>
  );
}
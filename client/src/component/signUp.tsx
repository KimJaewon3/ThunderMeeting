import { useEffect, useState } from "react";
import styled from "styled-components";
import { emailReg, nameReg, nickReg, phoneReg } from "../api/inputValueReg";
import { APIURL } from "../App";
import { StyledButton, StyledCommonModal } from "../App.style";

const StyledModal = styled(StyledCommonModal)`
  align-items: unset;
  label {
    margin: 0 1em 0 1em;
  }
  .verify-alert {
    color: red;
  }
  .btn-box {
    justify-content: flex-end;
  };
`;

type Props = {
  handleSignUpClick: (val: boolean) => void;
}

export default function SignUp({ handleSignUpClick }: Props) {
  const [ textInput, setTextInput ] = useState<{[key: string]: string}>({
    email: '',
    password: '',
    verifyPassword: '',
    name: '',
    nick: '',
    mbti: '',
    phone: '',
  });
  const [ sex, setSex ] = useState<'f' | 'm'>('m');
  const [ verifyAlert, setVerifyAlert ] = useState('');

  useEffect(() => {
    setVerifyAlert(verifyInputValue());
  }, [textInput]);

  function verifyInputValue() {
    if (!(emailReg.test(textInput.email))) return '올바른 email을 입력해주세요';
    if (textInput.password !== textInput.verifyPassword) return '비밀번호 확인을 위해 다시 입력해주세요';
    if (!(nameReg.test(textInput.name))) return '올바른 이름을 입력해주세요';
    if (!(nickReg.test(textInput.nick))) return '올바른 닉네임을 입력해주세요'
    if (!(phoneReg.test(textInput.phone))) return '올바른 번호를 입력해주세요';
    
    return '';
  }

  function textInputHandler(target: string, e: React.ChangeEvent<HTMLInputElement>) {
    //console.log(e.nativeEvent.text)
    setTextInput({
      ...textInput,
      [target]: e.target.value,
    });
  }

  function signUpBtnHandler() {
    // api요청 /SignUp

    APIURL
      .post('/account/signUp', {...textInput, sex: sex})
      .then(res => {
        // console.log(res);
        handleSignUpClick(false);
      })
      .catch(err => console.log(err));
  }

  return (
    <StyledModal>
      {Object.keys(textInput).map(key => {
        return (
          <div key={key}>
            <p>{key}</p>
            <input onChange={(e)=>textInputHandler(key, e)}></input>
          </div>
      )})}
      <div>
        <p>sex</p>
        <label>
          남
          <input type='checkbox' value='남'></input>
        </label>
        <label>
          여
          <input type='checkbox' value='여'></input>
        </label>
      </div>
      
      <p className="verify-alert">{verifyAlert}</p>
      
      <div className="btn-box">
        <StyledButton 
          onClick={signUpBtnHandler}
          disabled={verifyAlert !== ''}>
        회원가입
        </StyledButton>
      </div>
        
    </StyledModal>
  );
}
import { useEffect, useState } from "react";
import styled from "styled-components";
import { emailReg, nameReg, nickReg, phoneReg } from "../api/inputValueReg";
import { APIURL } from "../App";
import { StyledCommonButton, StyledCommonModal } from "../App.style";

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
  const [ sex, setSex ] = useState({
    m: false,
    f: false,
  });
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
    setTextInput({
      ...textInput,
      [target]: e.target.value,
    });
  }

  function signUpBtnHandler() {
    if (!sex.m && !sex.f) {
      return setVerifyAlert('성별을 선택해주세요');
    }

    APIURL
      .post('/account/signUp', {
        ...textInput,
        sex: sex.m ? 'm' : 'f'
      })
      .then(res => {
        handleSignUpClick(false);
      })
      .catch(err => console.log(err));
  }

  function handleSexChoice(target: 'f' | 'm') {
    if (target === 'f') {
      setSex({
        'm': false,
        [target]: true
      });
    } else {
      setSex({
        'f': false,
        [target]: true
      });
    }
    
    setVerifyAlert('');
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
          <p>남</p>
          <input type='checkbox' value='남' checked={sex.m} onChange={()=>handleSexChoice('m')}></input>
        </label>
        <label>
          <p>여</p>
          <input type='checkbox' value='여' checked={sex.f} onChange={()=>handleSexChoice('f')}></input>
        </label>
      </div>
      
      <p className="verify-alert">{verifyAlert}</p>
      
      <div className="btn-box">
        <StyledCommonButton 
          onClick={signUpBtnHandler}
          disabled={verifyAlert !== ''}>
          회원가입
        </StyledCommonButton>
      </div>
        
    </StyledModal>
  );
}
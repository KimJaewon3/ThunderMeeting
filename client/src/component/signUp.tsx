import { useEffect, useState } from "react";
import { APIURL } from "../App";


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
    const emailReg = new RegExp('^[0-9a-z]+@[0-9a-z]+\\.[a-z]{2,3}$', 'i');
    const nameReg = new RegExp('^[a-z]*$', 'i');
    const phoneReg = new RegExp('^[0-9]*$');

    if (!(emailReg.test(textInput.email))) return '올바른 email을 입력해주세요';
    if (textInput.password !== textInput.verifyPassword) return '비밀번호를 확인해주세요';
    if (!(nameReg.test(textInput.name))) return '올바른 이름을 입력해주세요';
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
        console.log(res);
        handleSignUpClick(false);
      })
      .catch(err => console.log(err));
  }

  return (
    <div>
      <div>
        {Object.keys(textInput).map(key => {
          return (
            <div key={key}>
              <p>{key}</p>
              <input onChange={(e)=>textInputHandler(key, e)}></input>
            </div>
        )})}
        <p>sex</p>
        <input type='checkbox' value='남'></input>
        <input type='checkbox' value='여'></input>
      </div>


      <div>
        <button onClick={signUpBtnHandler} disabled={verifyAlert !== ''}>회원가입</button>
        <p>{verifyAlert}</p>
      </div>
    </div>
  );
}
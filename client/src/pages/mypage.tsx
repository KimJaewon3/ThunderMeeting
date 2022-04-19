import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { emailReg, nameReg, nickReg, phoneReg } from "../api/inputValueReg";
import { APIURL } from "../App";
import { RootState } from "../modules";
import { updateUserInfo } from "../modules/userInfo";

type TextInput = {
  [key: string]: string;
}

// 수정 불가능 목록 : email sex like 
// 수정 가능 목록 : mbti name nick phone
// 별도 수정 : password

export default function Mypage() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.userInfoReducer);
  const [ isModify, setIsModify ] = useState(false);
  const [ verifyAlert, setVerifyAlert ] = useState('');
  const initialTextInput = {
    name: '',
    nick: '',
    mbti: '',
    phone: '',
    sangme: '',
  };
  const [ textInput, setTextInput ] = useState<TextInput>(initialTextInput);

  useEffect(() => {
    setVerifyAlert(verifyInputValue());
  }, [textInput]);

  function verifyInputValue() {
    if (!(nameReg.test(textInput.name))) return '올바른 이름을 입력해주세요';
    if (!(nickReg.test(textInput.nick))) return '올바른 닉네임을 입력해주세요';
    if (!(phoneReg.test(textInput.phone))) return '올바른 번호를 입력해주세요';
    
    return '';
  }

  function handleTextInput(target: string, e: React.ChangeEvent<HTMLInputElement>) {
    setTextInput({
      ...textInput,
      [target]: e.target.value,
    });
  }

  function handleModifyInfo() {
    if (!isModify) {
      setTextInput({
        name: userInfo.name,
        nick: userInfo.nick,
        mbti: userInfo.mbti,
        phone: userInfo.phone,
        sangme: userInfo.sangme,
      });

      setIsModify(!isModify);
    }
  }

  function modifiableInfo(el: string) {
    if (el === 'email' || el === 'sex' || el === 'like') {
      return <p>{userInfo[el]}</p>;
    }

    if (isModify) {
      return <input onChange={(e)=>handleTextInput(el, e)} value={textInput[el]}></input>
    } else {
      return <p>{userInfo[el]}</p>
    }
  }

  async function handleSaveInfo() {
    // update
    await APIURL.patch("/account/modifyInfo", {
      id: userInfo.id,
      ...textInput,
    })
    .then(res => {
      console.log(res.data.data)
      const data = res.data.data;
      // bug
      dispatch(updateUserInfo(data));
      // handleModifyInfo();
      setIsModify(false);
      // token 추가
    })
    .catch(err => {
      console.log(err.response.data.message);
    });
  }

  function handleClickCancel() {
    setIsModify(false);
    setTextInput(initialTextInput);
  }

  return (
    <div>
      <div>
        {Object.keys(userInfo).map((el, idx) => {
          if (el === 'id') return;
          return (
            <div key={idx}>
              <p>{el}</p>
              {modifiableInfo(el)}
            </div>
          );
        })}
      </div>

      <p>{verifyAlert}</p>

      <div>
        {!isModify && <button onClick={handleModifyInfo}>정보 수정</button>}
        {isModify && <button onClick={handleSaveInfo} disabled={verifyAlert !== ''}>수정 완료</button>}
        <button onClick={()=>{nav('/modifyPw')}}>비밀번호 변경</button>
        <button onClick={handleClickCancel}>취소</button>
      </div>
    </div>
  );
}

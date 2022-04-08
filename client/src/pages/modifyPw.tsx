import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { APIURL } from "../App";
import { RootState } from "../modules";
import { isSignIn } from "../modules/sign";
import { updateAccessToken } from "../modules/token";
import { deleteUserInfo } from "../modules/userInfo";

export default function ModifyPw() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [ textInput, setTextInput ] = useState({
    oldPw: '',
    newPw: '',
    verifyNewPw: '',
  });
  const [ resultAlert, setResultAlert ] = useState('');
  const userInfo = useSelector((state: RootState) => state.userInfoReducer);
  
  function handleTextInput(target: string, e: React.ChangeEvent<HTMLInputElement>) {
    setTextInput({
      ...textInput,
      [target]: e.target.value,
    });
  }

  function handleClickModify() {
    APIURL.patch('/account/modifyPw', {
      id: userInfo.id,
      ...textInput,
    })
    .then(res => {
      alert(`${res.data.message}\n다시 로그인해 주세요`);
      dispatch(updateAccessToken(''));
      dispatch(isSignIn(false));
      dispatch(deleteUserInfo());
      nav("/intro");
    })
    .catch((err) => {
      setResultAlert(err.response.data.message);
    });
  }

  return (
    <div>
      <div>
        <div>
          <p>기존 비밀번호</p>
          <input onChange={(e)=>handleTextInput('oldPw', e)}></input>
        </div>

        <div>
          <p>새 비밀번호</p>
          <input onChange={(e)=>handleTextInput('newPw', e)}></input>
        </div>

        <div>
          <p>새 비밀번호 확인</p>
          <input onChange={(e)=>handleTextInput('verifyNewPw', e)}></input>
        </div>
      </div>

      <p>{resultAlert}</p>

      <div>
        <button onClick={handleClickModify}>변경하기</button>
        <button onClick={()=>nav('/mypage')}>취소</button>
      </div>
    </div>
    
  );
}
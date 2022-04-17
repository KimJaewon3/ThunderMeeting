import axios from "axios";
import { APIURL } from "../App";
import ConfirmMeeting from "../component/confirmMeeting";

export default function Intro() {
  function test() {
    console.log(process.env.REACT_APP_API_URL_DEV)
    APIURL.get('/')
    .then(res => console.log(res.data.message));
  }

  return (
    <div>
      <div>intro</div>
      <button onClick={test}>connection test</button>
    </div>
  );
}
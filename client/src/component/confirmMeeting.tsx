import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import moment from "moment";
import "moment/locale/ko";

type Props = {
  handleSetDatetime: (datetimestr: string) => void;
  handleSetDatatimeVerify: (val: boolean) => void
}

export default function ConfirmMeeting({ handleSetDatetime, handleSetDatatimeVerify }: Props) {
  function getDatetime(e: string | moment.Moment) {
    // console.log(moment(e).format("YYYY년 MM월 DD일 HH:mm"));
    const target = moment(e).format("YYYY-MM-DD HH:mm");
    const now = moment().format("YYYY-MM-DD HH:mm")
    handleSetDatetime(target);
    handleSetDatatimeVerify(moment(target).isSameOrAfter(now));
  }

  return (
    <div>
      <Datetime locale='ko' input={false} onChange={e=>getDatetime(e)}/>
    </div>
  );
}

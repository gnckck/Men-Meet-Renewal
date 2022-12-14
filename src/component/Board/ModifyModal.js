import  {FcSurvey} from 'react-icons/fc';
import  {FcCalendar} from 'react-icons/fc';
import './Modal.css';
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import { useState } from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { IdState, ModifyModalState, postState, userState,PostModalState } from '../State';
import moment from 'moment';
import 'moment/locale/ko';
import axios from 'axios';



function ModifyModal() {
    
    const setModalClose = useSetRecoilState(ModifyModalState);
    const setCloseModal = useSetRecoilState(PostModalState);
    const [startDate, setStartDate] = useState(new Date());
    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");
    const [category, setCategory] = useState("0");
    const [isMento, setIsMento] = useState("1");
    const [postEnable,setPostEnable] = useState("0");

    const postData = useRecoilValue(postState);
    const writeTime = moment().format('YYYY-MM-DD hh:mm:ss');
    const mentoringTime = moment(startDate).format('YYYY-MM-DD hh:mm:ss');
    

    const userId = useRecoilValue(IdState);
    const userName = useRecoilValue(userState);

    
    const closeModal = (e) => {
        e.preventDefault();
        setModalClose(false);
    }


    const handleTitle = (e) => {
        e.preventDefault();
        setTitle(e.target.value);
    
    }
  
  
      const handleContent = (e) => {
      e.preventDefault();
      setContent(e.target.value);
      
        }

    const onCategoryChange = (e) => {
        setCategory(e.target.value)
      }
  
      const onMentoChange = (e) => {
        setIsMento(e.target.value)
      }





      const handleModify =(e) =>{
        e.preventDefault();
        axios.post("http://52.79.209.184:8080/mentoringPost/updatePost", {
            postNum : postData.postNum,
            writerId : userId,
            writerName : userName,
            category : category,
            mentoringTarget : isMento,
            title : title,
            content : content,
            mentoringEnable : postEnable,
            postingTime : writeTime,
            mentoringTime : mentoringTime,
          },{
            headers : { "Content-Type": `application/json`, },
           }).then((res) => {
            setPostEnable("0");
            alert("???????????? ?????????????????????.")
            setModalClose(false);
            setCloseModal(false);
            window.location.replace("/mentoring");
           })
           
        }

    

return (
    <div className="Modal">
      <div className="modalBody" onClick={(e) => e.stopPropagation()}>
        <button id="modalCloseBtn" onClick={closeModal}>
          ???
        </button>
        <p className="modalWrite">< FcSurvey size="30" /> ????????? ???????????????</p><br />
        <select  className='modalCategory' defaultValue={postData.category} onChange={onCategoryChange} >
            <option value='0'>??????</option>
            <option value='1'>??????</option>
            <option value='2'>??????</option>
            <option value='3'>????????????</option>
            <option value='4'>??????</option>
        </select>
        <select className='modalMento' defaultValue={postData.postIsMentor === true ? '1' : '0'} onChange={onMentoChange}>
            <option value='1'>?????? ??????!</option>
            <option value='0'>?????? ??????!</option>
        </select>
        <textarea className='modalTitle' onChange={handleTitle}
        defaultValue={postData.title}
        >
        </textarea>
        <textarea className="modalContent"
            as="textarea"
            rows={12}
            onChange={handleContent}
            defaultValue={postData.content}
        >
        </textarea>
        <p className='modalP' style={{color:'red'}}> <FcCalendar size="27"/> ????????? ?????? ????????? ????????? ?????? ??????????????????.</p>
        <DatePicker
            className='modalDate'
            required
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            locale={ko}                   // ????????? ??????
            timeFormat="HH:mm" //?????? ?????? 
            dateFormat="yyyy-MM-dd (eee) hh:mm" // ?????? ?????? ??????
            showTimeSelect
            placeholderText="????????? ??????????????????."
            showPopperArrow={false}       // ????????? ??????
            minDate={new Date()}          // ?????? ?????? ?????? ?????? ?????????
            customInput={      // ?????? ?????? ?????? ?????????
            <input type="text" style={{width:"440px"}}/>
            } />
            <button className='modalSubmit' onClick={handleModify} >??????</button>
      </div>
    </div>
  );
}

 
export default ModifyModal;
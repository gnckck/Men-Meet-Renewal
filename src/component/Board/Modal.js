import { IdState, modalState, userState } from '../State';
import {  useRecoilValue, useSetRecoilState } from 'recoil';
import  {FcSurvey} from 'react-icons/fc';
import  {FcCalendar} from 'react-icons/fc';
import './Modal.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from 'react';
import { ko } from "date-fns/esm/locale";
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/ko';





function Modal() {
 
    const setCloseModal = useSetRecoilState(modalState);
    const [startDate, setStartDate] = useState(new Date());
    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");
    const [titleValid,setTitleValid] = useState(false);
    const [contentValid,setContentValid] = useState(false);
    const [allowPost, setAllowPost] = useState(false);
    const [postEnable,setPostEnable] = useState("0");
    const [category, setCategory] = useState("0");
    const [isMento, setIsMento] = useState("1");


    const userId = useRecoilValue(IdState);
    const userName = useRecoilValue(userState);
    const writeTime = moment().format('YYYY-MM-DD hh:mm:ss');
    const mentoringTime = moment(startDate).format('YYYY-MM-DD hh:mm:ss');
    
        
    const isModal = () => {
        setCloseModal(false);
    }


    const handleTitle = (e) => {
      e.preventDefault();
      setTitle(e.target.value);
      if(title !== null) {
          setTitleValid(true);
      }else{
          setTitleValid(false);
      }
  }


    const handleContent = (e) => {
    e.preventDefault();
    setContent(e.target.value);
    if(content !== null) {
        setContentValid(true);
    }else{
        setContentValid(false);
    }
  }

    const onCategoryChange = (e) => {
      const {value} = e.target
      setCategory(value)
    }

    const onMentoChange = (e) => {
      const {value} = e.target
      setIsMento(value)
    }


    
    

  useEffect((e) => {
    if(titleValid && contentValid)  {
        setAllowPost(false);
    }else{
    setAllowPost(true);

  }},[titleValid,contentValid]);  



    const handleSubmit =() =>{
    axios.post("http://52.79.209.184:8080/mentoringPost/createPost", {
        postNum : "",
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
        console.log(res);
        setPostEnable("0");
        setCloseModal(false);
       })
        alert("???????????? ?????????????????????.")
    }

  

      return (
        <div className="Modal">
          <div className="modalBody" onClick={(e) => e.stopPropagation()}>
            <button id="modalCloseBtn" onClick={isModal}>
              ???
            </button>
            <p className="modalWrite">< FcSurvey size="30" /> ????????? ???????????????</p><br />
            <select  className='modalCategory' value={category} onChange={onCategoryChange}>
                <option value='0'>??????</option>
                <option value='1'>??????</option>
                <option value='2'>??????</option>
                <option value='3'>????????????</option>
                <option value='4'>??????</option>
            </select>
            <select className='modalMento' value={isMento} onChange={onMentoChange}>
                <option value='1'>?????? ??????!</option>
                <option value='0'>?????? ??????!</option>
            </select>
            <input className='modalTitle'
                type="text"
                placeholder="????????? ??????????????????."
                onChange={handleTitle}
            >
            </input>
            <textarea className="modalContent"
                as="textarea"
                rows={12}
                placeholder="????????? ??????????????????."
                onChange={handleContent}
            >
            </textarea>
            <p className='modalP'> <FcCalendar size="27"/> ????????? ????????? ?????? ????????? ????????? ??????????????????.</p>
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
                <button className='modalSubmit' onClick={handleSubmit} disabled={allowPost} >??????</button>
          </div>
        </div>
      );
    }
     
    export default Modal;
    
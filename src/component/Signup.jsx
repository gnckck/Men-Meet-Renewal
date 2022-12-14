import './SignUp.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';




function Signup() {


    const [userId,setUserId] = useState("");
    const [userName,setUserName] = useState("");
    const [userPassword,setUserPassword] = useState("");
    const [userPasswordConfirm,setUserPasswordConfirm] = useState("");
    const [idVaild,setIdValid] = useState(false);
    const [nameVaild,setNameValid] = useState(false);
    const [pwVaild,setPwValid] = useState(false);
    const [pwConfirmVaild,setPwConfirmValid] = useState(false);
    const [allowSignUp,setAllowSignUp] = useState(true);
    const [allowDuplicateId,setAllowDuplicateId] = useState(true);
    const [allowDuplicateName,setAllowDuplicateName] = useState(true);
    const [isCheckIdFirst, setIsCheckIdFirst] = useState(false);
    const [isCheckNameFirst, setIsCheckNameFirst] = useState(false);
    const [isDuplicateId, setIsDuplicateId] = useState(true);
    const [isDuplicateName, setIsDuplicateName] = useState(true);



   
    const navigate = useNavigate();


        const handleOnKeyId = () => {
            setIsCheckIdFirst(false)
            setIsDuplicateId(true)
            
        }

        const handleOnKeyName = () => {
            setIsCheckNameFirst(false)
            setIsDuplicateName(true)

        }

        const handleOnKeyPw = (e) => {
            setUserPassword(e.target.value);
            if(e.target.value !== userPasswordConfirm){
                setPwConfirmValid(false);
            }else{
                setPwConfirmValid(true);
            }
        }

        const handleKeyDown = (e) => {
            if(e.code === "Enter")
            e.preventDefault();
        }




        const handleId = (e) => {
                e.preventDefault();
                setUserId(e.target.value);
                const idRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{5,20}$/;
                if(idRegex.test(e.target.value)) {
                    setIdValid(true);
                }else{
                    setIdValid(false);
                }
            }



            const handleName = (e) => {
                e.preventDefault();
                setUserName(e.target.value);
                const idRegex = /^().{2,10}$/;
                if(idRegex.test(e.target.value)) {
                    setNameValid(true);
                }else{
                    setNameValid(false);
                }
            }

        

        
        const handlePw = (e) => {
            e.preventDefault();
            setUserPassword(e.target.value);
            const pwRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/;
            if(pwRegex.test(e.target.value)) {
                setPwValid(true);
            
            }else{
                setPwValid(false);
            }
        }

        const handlePwConfirm = (e) => {
            e.preventDefault();
            setUserPasswordConfirm(e.target.value);
            if(e.target.value !== userPassword) {
                setPwConfirmValid(false);
            }else{
                setPwConfirmValid(true);
            }
        }

        

        useEffect((e) => {
            if(idVaild && pwVaild && pwConfirmVaild && nameVaild)  {
                setAllowSignUp(false);
                return;
            }
            setAllowSignUp(true);
    
        },[idVaild,pwVaild,pwConfirmVaild,nameVaild]);


        useEffect((e) => {
            if(idVaild) {
                setAllowDuplicateId(false);
                return;
            }
            setAllowDuplicateId(true);
        },[idVaild]);

        useEffect((e) => {
            if(nameVaild) {
                setAllowDuplicateName(false);
                return;
            }
            setAllowDuplicateName(true);
        },[nameVaild]);




        const checkDuplicateId = (e) => {
            e.preventDefault();
            axios.get('http://52.79.209.184:8080/signup/checkDuplicateId',  {
                params : {userId : userId}
            },{
                headers : {
                    "Content-Type": `application/json`,
                        },
            })
            .then((res) => {
                if(res.data.isDuplicated === true){ // ???????????? ????????????
                    setIsCheckIdFirst(false);
                    setIsDuplicateId(false);
                    
                } else {
                    setIsCheckIdFirst(true);
                    setIsDuplicateId(true);
                }
            })
        }


        



        const checkDuplicateName = (e) => {
            e.preventDefault();
            axios.get('http://52.79.209.184:8080/signup/checkDuplicateName',  {
                params : {userName : userName}
            },{
                headers : {
                    "Content-Type": `application/json`,
                        },
            })
            .then((res) => {
                if(res.data.isDuplicated === true){ // ???????????? ????????????
                    setIsCheckNameFirst(false); 
                    setIsDuplicateName(false);
                    
                } else {
                    setIsCheckNameFirst(true);
                    setIsDuplicateName(true);
                    
                }
                
            })
    }


    

       




        const submitHandler = (e) => {
            e.preventDefault();

            if (isCheckIdFirst && isCheckNameFirst){
            axios.post('http://52.79.209.184:8080/signup',{
                    userId : userId,
                    userPassword : userPassword,
                    userName : userName,
                }
            , {
                    headers : { "Content-Type": `application/json`,
                                },
            }
        )
            .then((res) => {
                    console.log(res);
                    console.log("??????????????? ??????????????????.");
                    alert("??????????????? ??????????????????.");
                    navigate("/login")
            }).catch((error) => {
                console.log('??????????????? ??????????????????.',error.res);
                alert("??????????????? ??????????????????. ?????? ??????????????????.");
            })
            }else if(isCheckIdFirst === false){
                alert('????????? ??????????????? ????????????.');
            }else if(isCheckNameFirst === false){
                alert('????????? ??????????????? ????????????.');
            }
        }
        


  return (

    <Form ounsubmit="return false" className="formSignUp" >
        <Form.Label className="titleSignUp">Sign Up</Form.Label>
      <Form.Group className="mb-4" controlId="formUserId">
        <Form.Label>?????????</Form.Label>
        <button className='btnDuplicateId' onClick={checkDuplicateId} disabled={allowDuplicateId}>????????????</button>
        


        <Form.Control className="inputSignUp"
            type="text"
            placeholder ="??????,?????? ?????? 5??? ?????? ??????????????????"
            value={userId}
            maxLength="19"
            onChange={handleId}
            onKeyUp={handleOnKeyId}
            onKeyDown={handleKeyDown}
            />

            
            <div className='errorSignUp'>
                {
                    !idVaild && userId.length > 0 ? <p>??????,?????? ?????? 5??? ?????? ??????????????????</p> : 
                    !isDuplicateId && !isCheckIdFirst ? <p> ?????? ???????????? ????????? ?????????.</p> :
                    isDuplicateId && isCheckIdFirst && userId !== null ? <p style={{color:'green'}}>?????? ????????? ????????? ?????????.</p> :
	                null
                }
            </div>

            
      </Form.Group>




      <Form.Group className="mb-4" controlId="formUserName">
        <Form.Label>?????????</Form.Label>
        <button className='btnDuplicateName' onClick={checkDuplicateName} disabled={allowDuplicateName} >????????????</button>
        <Form.Control className="inputSignUp"
            type="text"
            placeholder="???????????? ??????????????????."
            value={userName}
            maxLength="9"
            onChange={handleName}
            onKeyDown={handleKeyDown}
            onKeyUp={handleOnKeyName} />
            
            <div className='errorSignUp'>
                {
                    !nameVaild && ( userName.length > 0 ) ? <p>2??? ?????? ??????????????????.</p> :
                    !isCheckNameFirst && !isDuplicateName ? <p> ?????? ???????????? ????????? ?????????.</p> :
                    isCheckNameFirst && isDuplicateName && userName !== null ? <p style={{color:'green'}}>?????? ????????? ????????? ?????????.</p> :
	                null
                }
            </div>



      </Form.Group>

      <Form.Group className="mb-4" controlId="formUserPassword">
        <Form.Label>????????????</Form.Label>
        <Form.Control className="inputSignUp"
            type="password"
            placeholder="??????,??????,???????????? ?????? 8??? ?????? ??????????????????."
            value={userPassword}
            onKeyDown={handleKeyDown}
            onKeyUp={handleOnKeyPw}
            onChange={handlePw}/>
            <div className="errorSignUp">
                 {
                   !pwVaild && userPassword.length > 0 && (
                     <div>??????,??????,???????????? ?????? 8~20??? ????????? ??????????????????.</div>
                 )
                }
                        </div>
      </Form.Group>
      <Form.Group className="mb-4" controlId="SignUp">
        <Form.Label>???????????? ??????</Form.Label>
        <Form.Control className="inputSignUp"
            type="password"
            placeholder="???????????? ????????? ?????? ?????? ??? ??????????????????."
            value={userPasswordConfirm}
            
            onChange={handlePwConfirm}
            onKeyDown={handleKeyDown}/>
            <div className="errorSignUp">
                 {
                    !pwConfirmVaild && userPassword !== userPasswordConfirm && userPasswordConfirm.length > 0  && (
                     <div>??????????????? ??????????????????.</div>
                 )
                }
                        </div>
      </Form.Group>
      <Button className="btnSignUp" variant="primary" type="submit" disabled={allowSignUp}
            onClick={submitHandler}> Sign Up </Button>
    </Form>
  );
}

export default Signup;
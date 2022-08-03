import React, {useState } from 'react';
// import makeRoomAPI from '../API/makeRoomAPI';
import 'react-datepicker/dist/react-datepicker.css';
import MakeRoomStyle from '../css/MakeRoomStyle.css'
import DatePicker from "react-datepicker";
import axios from 'axios';
//import $ from 'jquery';


function MakeRoomPage( {token} ) {
    const [title, setTitle] = useState('');
    const [targetTime, setTargetTime] = useState(new Date());
    const [maxUserNum, setMaxUserNum] = useState(0);
    let [ruleNum, setRuleNum] = useState(0);

    let [roomId, setRoomId] = useState(0);
    let [roomCode, setRoomCode] = useState('');

    const makeRoom = ()  => {
        console.log('makeroom 함수 실행됐음');
        console.log(title);
        console.log(targetTime);
        console.log(maxUserNum);
        console.log(ruleNum);
        axios.post("http://localhost:8000/room/", 
          { 
                title: title,
                target_time: targetTime,
                max_user_num: maxUserNum,
                rule_num: ruleNum,
          })
          .then((response) => {
              console.log(response);
              console.log('makeroom');
              if (response !== '') {
                alert('방 만들기 성공');
                setTitle('');
                setMaxUserNum(0);
                setRuleNum(0);  
                setRoomId(roomId = response.data.room_id);
                setRoomCode(roomCode = response.data.room_code);
                console.log(roomId);
                console.log(roomCode);
            }
            else 
                alert('방 만들기 실패');
          })
          .catch(function (error) {
              console.log(error);
            //   console.error(error.response.data); 
              console.log('makeroom에러?');
          });
        }


    // const makeRoom = () => {
    //     makeRoomAPI(title, targetTime, maxUserNum,ruleNum)
    //     .then((response)=> {
    //         if (response !== '') {
    //             alert('방 만들기 성공');
    //             setTitle('');
    //             setMaxUserNum(0);
    //             setRuleNum(0);  
    //             setRoomId(response.data.room_id);
    //             setRoomCode(response.data.room_code);
    //             console.log(roomId);
    //             console.log(roomCode);
    //         }
    //         else 
    //             alert('방 만들기 실패');
    //     });
    // }

    const titleHandler = (e) =>  {
        setTitle(e.target.value);
    };
    // const targetTimeHandler = (e) =>  {
    //     setTargetTime(e.target.value);
    //  };
    const maxUserNumHandler = (e) => {
        let people = 0; 
        people = e.target.value;
        setMaxUserNum(people);
    }
    // const ruleNumHandler = () => {
    //     if(ruleNum == 1 ){

    //     }
    //     else if(ruleNum == 2){

    //     }
    // }

    return (
        <div className="RoomPageContainer">
            <h1>MakeRoomPage입니다.</h1>
            <h2>방 규칙 정하기</h2>
            <div class="field">
            <ul id="form">
                <li>
                    <label>스터디방 이름</label>
                    <input 
                        name="title" 
                        type="text"
                        placeholder = "방 이름"
                        value={title}
                        onChange={titleHandler}
                    />
                </li>
                <li>
                    <label>스터디방 인원</label>
                    <select 
                    onChange = {maxUserNumHandler}
                    >
                        <option value="1">1인</option>
                        <option value="2">2인</option>
                        <option value="3">3인</option>
                        <option value="4">4인</option>
                        <option value="5">5인</option>
                    </select>
                </li>
                <li>
                    <label>스터디방 마감일(일단 주 단위로 선택해주세요.)</label>
                    <DatePicker 
                    selected={targetTime}
                    dateFormat="yyyy-MM-dd"
                    minDate={new Date()} 
                    onChange={date => {
                        setTargetTime(date)
                    }}
                    
                    />
                </li>
                <li>
                    <label>룰을 선택하세요</label>
                        <button 
                        onClick={() => {setRuleNum(ruleNum=1)}}>
                            룰1
                        </button>
                        <button 
                        onClick={() => {setRuleNum(ruleNum=2)}}>
                            룰2
                        </button>
                </li>
                <button>
                    계속하기
                </button>
            </ul>
                <button 
                    className="mkRoomButton" 
                    onClick={makeRoom}> 방 만들기
                </button>
            </div>
        </div>

    );
}

export default MakeRoomPage;
// import React from 'react';
import React, { useContext, useEffect, useState, useRef, useCallback, memo } from "react";
import VideoContext from "../context/Video/VideoContext";
import "./video/Video.css";
import { socket } from "../context/Video/VideoState";
//import Codemirror from 'codemirror';
import CodeMirror from '@uiw/react-codemirror';
import { darcula, darculaInit } from '@uiw/codemirror-theme-darcula';
import { javascript } from '@codemirror/lang-javascript';
// import 'codemirror/lib/codemirror.css';
//import 'codemirror/mode/javascript/javascript';
// import 'codemirror/addon/edit/closetag';
// import 'codemirror/addon/edit/closebrackets';
// import 'codemirror/lib/codemirror.css'

// import 'codemirror/mode/javascript/javascript'
// import 'codemirror/mode/css/css'
// import { Controlled as ControlledEditor } from 'react-codemirror2'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCompressAlt, faExpandAlt } from '@fortawesome/free-solid-svg-icons'
// import 'codemirror/theme/material.css'
// import 'codemirror/mode/xml/xml'
//import 'codemirror/theme/dracula.css';
//import { fromTextArea } from "codemirror";
// import 'codemirror/lib/codemirror.css';
// import 'codemirror/theme/material.css';
// import { Controlled as CodeMirror } from 'react-codemirror2';


const Editor = () => {
  const {
    call,
    otherUser,
    callAccepted,
    myVideo,
    userVideo,
    stream,
    name,
    setName,
    callEnded,
    me,
    callUser,
    leaveCall,
    answerCall,
    sendMsg,
    msgRcv,
    chat,
    setChat,
    setMsgRcv,
    setOtherUser,
    leaveCall1,
    userName,
    myVdoStatus,
    setMyVdoStatus,
    userVdoStatus,
    setUserVdoStatus,
    updateVideo,
    myMicStatus,
    userMicStatus,
    updateMic,
    screenShare,
    handleScreenSharing,
    fullScreen,
    room,
    setRoom,
    joinRoom,
    message,
    // messageReceived,
    setMessage,
    // setMessageReceived,
    // sendMessage
  } = useContext(VideoContext);
  
//  const [message ,setMessage]=useState("") 
const [messageReceived, setMessageReceived] = useState("");
const codeM=useRef(null);
const sendMessage = () => {
  socket.emit("send_message", { message ,to:otherUser});
};
const timeoutRef2 = useRef(null);
const onChanges =(value) => {
  // const new1=value;
  // clearTimeout(timeoutRef2.current);
  // timeoutRef2.current = setTimeout(() => { 
  
setMessage(value)
//   console.log('bmessage:', message);
  // sendMessage();
//  console.log("a:",messageReceived)
// //  keyup(value)

//  },3) 
}
const keyup =(value1) => {
    value1.preventDefault();

  // setTimeout(() => {
  // if(message !== value1 && message.length!==1 && value1.key !=="Backspace"){
    // setMessage(value1);
    console.log('value1:', value1);
    console.log('message1:', message.length ,message); 
    sendMessage();
    // console.log("a:",messageReceived)}
    //  else{
    // sendMessage()
    console.log("nothing");
  // }
  // },1000);
 
}
const timeoutRef = useRef(null);
const timeoutRef1 = useRef(null);

function handleChange(event) {

  const newValue = event;
  clearTimeout(timeoutRef.current);
  timeoutRef.current = setTimeout(() => {
    setMessage(newValue);
    console.log('value1:', newValue);
    console.log('message1:', message.length ,message); 
  }, 3);
  clearTimeout(timeoutRef1.current);
  timeoutRef1.current = setTimeout(() => {
    if(typeof message==='string'){
sendMessage()

    }
  },3)
}

useEffect(() => {
 
  socket.on("receive_message", (data) => {
    setMessageReceived(data.message);
  });
}, [socket]);
 return(
      <div>
        {/* <h1> Message:</h1> */}
        <CodeMirror id="cod"
          value={messageReceived}
          // ref={codeM}
            // value={}
          // options={{
          //   mode: 'javascript',
          //   theme: 'material',
          //   lineNumbers: true,
          // }}
          theme={darcula}
          height="90.75vh"
          // width="70vw"
          // style={{width:"100vh"}}
          extensions={[javascript({ jsx: true })]}
           onChange={(value)=>{ onChanges(value)}}
           onKeyUp={(value1)=>{handleChange(value1)}}
       
        />
        {/* <CodeMirror
      // value={this.state.code}
      onBeforeChange={(editor, data, value) => {
        this.setState({ code: value });
      }}
      
    /> */}
      </div>
  );

  }
export default Editor;

// export default Editor;













// import React, { useState } from 'react'
// import 'codemirror/lib/codemirror.css'
// import 'codemirror/theme/material.css'
// import 'codemirror/mode/xml/xml'
// import 'codemirror/mode/javascript/javascript'
// import 'codemirror/mode/css/css'
// import { Controlled as ControlledEditor } from 'react-codemirror2'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCompressAlt, faExpandAlt } from '@fortawesome/free-solid-svg-icons'

//  const Editor=(props)=> {
//   const {
//     language,
//     displayName,
//     value,
//     onChange,
//     onKeyUp
//   } = props
//   const [open, setOpen] = useState(true)

//   function handleChange(editor, data, value) {
//     onChange(editor.getValue());
//     onKeyUp(value);
//   }

//   return (
//     <div className={`editor-container ${open ? '' : 'collapsed'}`}>
//       <div className="editor-title">
//         {displayName}
//         <button
//           type="button"
//           className="expand-collapse-btn"
//           onClick={() => setOpen(prevOpen => !prevOpen)}
//         >
//           <FontAwesomeIcon icon={open ? faCompressAlt : faExpandAlt} />
//         </button>
//       </div>
//       <ControlledEditor
//         onBeforeChange={handleChange}
//         value={value}
//         className="code-mirror-wrapper"
//         options={{
//           lineWrapping: true,
//           lint: true,
//           mode: language,
//           theme: 'material',
//           lineNumbers: true
//         }}
//       />
//     </div>
//   )
// }
// export default Editor;
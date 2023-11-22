import React, { useEffect, useReducer,useRef, useState } from 'react'


const inistialState={
    text:"",
    resulttext:"",
}

const reducer=(state,action)=>{

    switch(action.type){

        case "WRITTEN_TEXT":
          return {...state,text:action.payload,resulttext: action.payload};
         case "TO_UPPER_CASE":
          return {...state,resulttext:state.text.toUpperCase()} ;
          case "To_LOWER_CASE":
              return {...state,resulttext:state.text.toLowerCase()} ;
              case "CLEAR_TEXT":
                return {...state,text:"",resulttext:""} ;
                case "COPY":
                    navigator.clipboard.writeText(state.resulttext);
                    return state;
                    case "REMOVE_X_SPACE":
                        const ntext=state.text.replace(/\s+/g,"").trim();
                        return {...state,text:ntext,resulttext: ntext};
                        default:
                            return state;
                    }

}


export const TextNotes = () => {
    const [state,dispatch]=useReducer(reducer,inistialState);
    const[words,setwords]=useState(0);
    const[char,setchar]=useState(0);
    const[rtime,setrtime]=useState(0);
     const refval=useRef(null);
    
    const ClickHandle =()=>{

        const noOfWords=state.text.split(/\s+/).filter((el)=>el.length!=="").length;
        
        const noOfchar=state.text.length;
        const Rtime=Math.ceil(noOfWords/200);

setwords(noOfWords);

setchar(noOfchar);
setrtime(Rtime);
    }
  return (
    <div >
        <h1 className='text-center font-bold text-4xl text-black p-4'>📝Experimental Note📝</h1>
      <textarea ref={refval} rows={5} cols={50} className='shadow-xl w-32 border-2 border-black m-auto block rounded-xl p-2 md:w-96' value={state.text} onChange={(e)=>dispatch({type:"WRITTEN_TEXT",payload:e.target.value})}></textarea>
      <div className=' justify-center items-center flex flex-col md:flex md:flex-row'>
      <button className='border-2 bg-white border-black p-2 ml-1 mt-2 rounded-3xl font-mono font-bold'  onClick={()=>{dispatch({type:"TO_UPPER_CASE"})}}>Convert To Uppercase ⬆</button>
      <button className='border-2 bg-white border-black p-2 ml-1 mt-2 rounded-3xl font-mono font-bold' onClick={()=>{dispatch({type:"To_LOWER_CASE"})}}>Convert To Lowercase ⬇</button>
      <button className='border-2 bg-white border-black p-2 ml-1 mt-2 rounded-3xl font-mono font-bold' onClick={()=>{dispatch({type:"CLEAR_TEXT"})}}>Clear Text ❌</button>
      <button className='border-2 bg-white border-black p-2 ml-1 mt-2 rounded-3xl font-mono font-bold' onClick={()=>{dispatch({type:"COPY"})}}>Copy To Clipboard 📝</button>
      <button className='border-2 bg-white border-black p-2 ml-1 mt-2 rounded-3xl font-mono font-bold' onClick={()=>{dispatch({type:"REMOVE_X_SPACE"})}}>Remove Extra Space 🔧</button>
      </div>
    <div>

        <div className='flex items-center justify-center flex-col  p-4'>
        <button className='border-2 text-white bg-black border-black p-2 ml-1 mt-2 rounded-3xl font-serif font-bold ' onClick={ClickHandle}>Click Here To Know No of Words,Characters and Reading Time</button>
        <h2 className='text-xl font-bold font-sans'>No of Words:{words}</h2>
            <h2 className='text-xl font-bold font-sans'>No of Char:{char}</h2>
            <h2 className='text-xl font-bold font-sans'>Reading Time: {rtime}</h2>
        </div>
    <h1 className='text-center font-bold text-4xl'>Preview 👀</h1>
    <p className='text-center font-mono'>{state.resulttext}</p>
    </div>
    </div>
  )
}

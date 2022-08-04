import React, { useEffect, useRef, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux/es/exports';
import { add, deleted ,edit} from './questionSlice';
import Dragula from 'react-dragula';

export default function App() {
  const [data,setData] = useState([1,2,3,4]);
  const [question,setQuestion] = useState("");
  const [rule,setRule] = useState("may");
  const [answer,setAnswer] = useState("");
  const [indexx,setIndexx] = useState();
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);
  const item =useSelector(function(state){
    return state.question.list;
  })
  const [items,setItems] = useState(item);
  const handleSort = function(){
    let _data = [...items];
//remove and save the dragged item content
    const draggedItemContent = _data.splice(dragItem.current,1)[0];
// switch the position
    _data.splice(dragOverItem.current,0,draggedItemContent);
    //reset the position ref
    dragItem.current = null;
    dragOverItem.current = null;

    //update the actual array
    setItems(_data);
  }

  const dispatch = useDispatch();

function submit(){
  dispatch(add({
    question : question,
    rule : rule,
    answer : answer
  }))
  localStorage.setItem('Question', question);
}

function Delete(index){
  dispatch(deleted(index));
}

function Edit(index){
  setIndexx(index);
  setQuestion("");
  setRule("may");
  setAnswer("");
  document.getElementById("edit").classList.remove("hidden");
}

function Edit2(){
  dispatch(edit({
    index : indexx,
    question : question,
    rule : rule,
    answer : answer
  }))
  document.getElementById("edit").classList.add("hidden");
}
const dragulaDecorator = function(componentBackingInstance){
  if (componentBackingInstance) {
    let options = { };
    Dragula([componentBackingInstance], options);
  }
};
  return (
    <div className='p-4'>
      <p className='text-3xl font-bold'>Survey Questions</p>
      <p className='text-xl mt-3'>Question : </p>
      <input onChange={function(e){setQuestion(e.target.value)}} className='border-2 border-black rounded-lg mt-2 px-2 py-1'></input>
      <br></br>
      <p className='text-xl mt-3'>Rule </p>
      <select onChange={function(e){setRule(e.target.value)}} className='border-2 border-black rounded-lg mt-2 p-1'>
        <option value="may">May</option>
        <option value="must">Must</option>
      </select>
      <p className='text-xl mt-3'>Answer : </p>
      <input onChange={function(e){setAnswer(e.target.value)}} className='border-2 border-black rounded-lg mt-2 px-2 py-1'></input>
      <br></br>
      <button onClick={submit} class="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
        Submit
      </button>
      <div ref={dragulaDecorator}>
      {item.map(function(data,index){
        return (
          <div 
          className='w-80 border-2 border-black p-3 mt-4 shadow-lg'
          draggable 
          /*
          onDragStart={function(e){dragItem.current=index}}
          onDragEnter={function(e){dragOverItem.current=index}}
          onDragEnd={handleSort}
        */
          >
            <p>Question : {data.question}</p>
            <p>Rule : {data.rule}</p>
            <p>Answer : {data.answer}</p>
            <div className='flex items-center justify-center mt-2'>
            <button onClick={function(){Edit(index)}} class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
              Edit
            </button>
            <button onClick={function(){Delete(index)}} class="ml-5 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
              Delete
            </button>
            </div>
          </div>
        
        )
      })}
      </div>

      <div id="edit" style={{ transform: 'translate(-50%, -50%) '}} className='hidden w-4/5 border-2 border-blue-100 p-3 bg-blue-50 fixed left-1/2 top-1/2'>
      <p className='text-xl mt-3'>Question : </p>
      <input onChange={function(e){setQuestion(e.target.value)}} className='border-2 border-black rounded-lg mt-2 px-2 py-1'></input>
      <br></br>
      <p className='text-xl mt-3'>Rule </p>
      <select onChange={function(e){setRule(e.target.value)}} className='border-2 border-black rounded-lg mt-2 p-1'>
        <option value="may">May</option>
        <option value="must">Must</option>
      </select>
      <p className='text-xl mt-3'>Answer : </p>
      <input onChange={function(e){setAnswer(e.target.value)}} className='border-2 border-black rounded-lg mt-2 px-2 py-1'></input>
      <br></br>
      <button onClick={Edit2} class="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
        Edit
      </button>
      </div>
    </div>
  )
}

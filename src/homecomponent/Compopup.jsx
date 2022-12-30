import { forwardRef, useEffect, useState } from "react";
import { RxTrash } from "react-icons/rx";
import {AiOutlineFieldTime, AiOutlineSave} from "react-icons/ai";
import {HiOutlineBars3BottomLeft } from "react-icons/hi2";
import "./compopup.css";

const idb =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;

const database = ["todo", "doing", "done", "notes"];

const createCollection = () => {
    
    database.map((index)=>
    {
        if (!idb) {
            console.log("Error");
          }
          const request = idb.open(`${index}`, 1);
          request.onerror = (error) => {
            console.log(error);
          };
          request.onupgradeneeded = (event) => {
            const db = request.result;
            if(!db.objectStoreNames.contains(`${index}list`))
            {
                db.createObjectStore(`${index}list`,
                {
                    keyPath:"id",
                })
            }
          };
          request.onsuccess = () => {};
          return ""
    })
};

    const Compopup = forwardRef((props, ref) => {
    const [task,settask] = useState([]);
    const [desc,setdesc] = useState([]);
    const [todo, settodo] = useState({
        todoname:"",
        tododesc:"",
    });

    function dateOrdinal(d) {
        return d+(31===d||21===d||1===d?"st":22===d||2===d?"nd":23===d||3===d?"rd":"th")
    };
    
   const todocapture = (e)=>
   {
    settodo((todo) => ({
        ...todo,
        [e.target.name]: e.target.value,
      }));
      settask(todo.todoname);
      setdesc(todo.tododesc);
   }




const closer = ()=>
{
    props.trigger(false);
}

  useEffect(() => {
    createCollection();
  }, []);

  const datecaller = function()
  {
    let today = new Date();
    const formatter = new Intl.DateTimeFormat('en', { month: 'short' });
    let date= dateOrdinal(today.getDate())+"."+formatter.format(new Date())+"."+today.getFullYear();
    return date
  }

   function handleClick (event,name){
    event.preventDefault();
    const dbPromise = idb.open(`${name}`, 1);
    if(todo.todoname && todo.tododesc)
    {
        dbPromise.onsuccess = ()=>
        {
            const db = dbPromise.result;
            const tx = db.transaction(`${name}list`, "readwrite");
            const todolist = tx.objectStore(`${name}list`);
                const list = todolist.put({
                    id : Date.now(),
                    task:task,
                    desc:desc,
                    date: datecaller(),
                })
                list.onsuccess= ()=>
                {
                    tx.oncomplete = ()=>
                    {
                        db.close();
                    };
                }
                list.onerror =(error=>
                    {
                        console.log("Error", error);
                    })
        }
        settask("");
        setdesc("");
        event.target.reset();
        props.trigger(false);
    }
  };


  return (
    <>
      {props.send ? (
        <>
          <div className="main-popup-overlay">
            <div className="main-popup-task">
              <div className="main-popup-task-title-bar">
                <span>My Task</span>
                <div>
                    <span onClick={closer}><RxTrash className="pointer" /></span>
                </div>
              </div>
              {props.caller === "to-do" ? (
                <>
                    <div className="done-input">
                        <form  onSubmit={e=>
                        {
                            handleClick(e,"todo");
                        }} className="task-adder" >
                       <div className="task-adder-content-wraooer">
                       <div >       <AiOutlineFieldTime className="popup-icons-adder" />      {datecaller()}</div>

                       <div className="input-icon-adder">
                       <HiOutlineBars3BottomLeft className="popup-icons-adder" ></HiOutlineBars3BottomLeft>
                       <div className="adder-content-wrapper">
                        <input type="text" id="todoname" name="todoname" onChange={todocapture} placeholder="Task Heading" />
                        <textarea type="text" id="tododesc" name="tododesc" onChange={todocapture} placeholder="Task Description" />
                       </div>
                       </div>
                    <div className="input-icon-save">
                    <AiOutlineSave className="save-icon" /> <input className="adder-submit" type="submit" value="Save"/>
                    </div>
                       </div>
               
                        </form>
                    </div>
                </>
              ) : props.caller === "doing" ? (
                <>
                <div className="done-input">
                <form  onSubmit={e=>
                        {
                            handleClick(e,"doing");
                        }}
                        className="task-adder">
                         <div className="task-adder-content-wraooer">
                       <div >       <AiOutlineFieldTime className="popup-icons-adder" />      {datecaller()}</div>

                       <div className="input-icon-adder">
                       <HiOutlineBars3BottomLeft className="popup-icons-adder" ></HiOutlineBars3BottomLeft>
                       <div className="adder-content-wrapper">
                        <input type="text" id="todoname" name="todoname" onChange={todocapture} placeholder="Task Heading" />
                        <textarea type="text" id="tododesc" name="tododesc" onChange={todocapture} placeholder="Task Description" />
                       </div>
                       </div>
                    <div className="input-icon-save">
                    <AiOutlineSave className="save-icon" /> <input className="adder-submit" type="submit" value="Save"/>
                    </div>
                       </div>
                    </form>
                </div>
            </>
              ) : props.caller === "done" ? (
                <>
                <div className="done-input">
                <form  onSubmit={e=>
                        {
                            handleClick(e,"done");
                        }}
                        className="task-adder">
                       <div className="task-adder-content-wraooer">
                       <div >       <AiOutlineFieldTime className="popup-icons-adder" />      {datecaller()}</div>

                       <div className="input-icon-adder">
                       <HiOutlineBars3BottomLeft className="popup-icons-adder" ></HiOutlineBars3BottomLeft>
                       <div className="adder-content-wrapper">
                        <input type="text" id="todoname" name="todoname" onChange={todocapture} placeholder="Task Heading" />
                        <textarea type="text" id="tododesc" name="tododesc" onChange={todocapture} placeholder="Task Description" />
                       </div>
                       </div>
                    <div className="input-icon-save">
                    <AiOutlineSave className="save-icon" /> <input className="adder-submit" type="submit" value="Save"/>
                    </div>
                       </div>
                    </form>
                </div>
            </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
});
export default Compopup;

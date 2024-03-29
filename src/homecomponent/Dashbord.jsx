import todo from "./images/todo.svg";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { RxTrash } from "react-icons/rx";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useEffect, useState } from "react";
import Compopup from "./Compopup.jsx";
import "./dashboard.css";
import DOMPurify from "dompurify";

const idb =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;

function Home() {
  const [popup, setpopup] = useState(false);
  const [prop, setprop] = useState(false);
  const [change, setchange] = useState(false);
  const [listdata, setlistdata] = useState([]);
  const [doinglist, setdoinglist] = useState([]);
  const [donelist, setdonelist] = useState([]);

  const trigger = (title) => {
    setpopup(title);
  };

  function handletodo() {
    setpopup((popup) => !popup);
    setprop("to-do");
  }

  function handledoing() {
    setpopup((popup) => !popup);
    setprop("doing");
  }

  function handledone() {
    setpopup((popup) => !popup);
    setprop("done");
  }

  useEffect(() => {
    getallDate();
    doingdata();
    donedata();
    // eslint-disable-next-line
  }, []);

  const getallDate = () => {
    const dbPromise = idb.open("todo", 1);
    dbPromise.onsuccess = () => {
      const db = dbPromise.result;
      const tx = db.transaction("todolist", "readonly");
      const todolist = tx.objectStore("todolist");
      let list = todolist.getAll();

      list.onsuccess = (query) => {
        setlistdata(query.srcElement.result);
      };
      tx.oncomplete = () => {
        db.close();
      };
      list.onerror = () => {
        alert("error get data");
      };
    };
  };

  function doingdata() {
    const dbPromise = idb.open("doing", 1);
    dbPromise.onsuccess = () => {
      const db = dbPromise.result;
      const tx = db.transaction("doinglist", "readonly");
      const todolist = tx.objectStore("doinglist");
      let list = todolist.getAll();
      list.onsuccess = (query) => {
        setdoinglist(query.srcElement.result);
      };
      tx.oncomplete = () => {
        db.close();
      };
      list.onerror = () => {
        alert("error get data");
      };
    };
  }

  function donedata() {
    const dbPromise = idb.open("done", 1);
    dbPromise.onsuccess = () => {
      const db = dbPromise.result;
      const tx = db.transaction("donelist", "readonly");
      const todolist = tx.objectStore("donelist");
      let list = todolist.getAll();
      list.onsuccess = (query) => {
        setdonelist(query.srcElement.result);
      };
      tx.oncomplete = () => {
        db.close();
      };
      list.onerror = () => {
        alert("error get data");
      };
    };
  }

  function deletelist(e, name) {
    const dbPromise = idb.open(`${name}`, 1);
    dbPromise.onsuccess = () => {
      const db = dbPromise.result;
      const tx = db.transaction(`${name}list`, "readwrite");
      const todolist = tx.objectStore(`${name}list`);
      let deletelist = todolist.delete(e.id);

      deletelist.onsuccess = (query) => {
        name === "todo"
          ? getallDate()
          : name === "doing"
          ? doingdata()
          : donedata();
      };
      tx.oncomplete = () => {
        db.close();
      };

      deletelist.onerror = () => {
        alert("error get data");
      };
    };
  }

  function clearstore(name) {
    const dbPromise = idb.open(`${name}`, 1);
    dbPromise.onsuccess = () => {
      const db = dbPromise.result;
      const tx = db.transaction(`${name}list`, "readwrite");
      const todolist = tx.objectStore(`${name}list`);
      let clearlist = todolist.clear();
      clearlist.onsuccess = (query) => {
        name === "todo"
          ? getallDate()
          : name === "doing"
          ? doingdata()
          : donedata();
      };
      tx.oncomplete = () => {
        db.close();
      };
      clearlist.onerror = () => {
        alert("error get data");
      };
    };
  }





  function handleClick (event,name){
    const dbPromise = idb.open(`${name}`, 1);
        dbPromise.onsuccess = ()=>
        {
            const db = dbPromise.result;
            const tx = db.transaction(`${name}list`, "readwrite");
            const todolist = tx.objectStore(`${name}list`);
                const list = todolist.put({
                    id : event.id,
                    task:event.task,
                    desc:event.desc,
                    date: event.date,
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
  };






function changelist(index,sub,add)
  {
        handleClick(index,add);
        deletelist(index,sub);
        setchange(current => !current);
  }

  useEffect(() => {
    getallDate();
    doingdata();
    donedata();
    // eslint-disable-next-line
  }, [change]);
  
  useEffect(() => {
    getallDate();
    doingdata();
    donedata();
    // eslint-disable-next-line
  }, [popup]);

  return (
    <>
      <div className="right-div-alpha-wrapper">
        <div className="right-div-alpha-wrapper-box">
          <div className="right-alpha-todo">
            <span>To do <span className="numberoftodo">{listdata.length}</span></span>
            <IoIosCloseCircleOutline
              className="reset-list circular-rotation"
              onClick={(e) => {
                clearstore("todo");
              }}
            ></IoIosCloseCircleOutline>
          </div>

          {listdata.map((index, i) => {
            return (
              <div key={i} className="right-alpha-todo-content">
                <div className="right-alpha-todo-content-heading">
                  <img src={todo} alt="mytask" />
                  <h4 dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(index.task)}}></h4>
                </div>
                <p dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(index.desc)}}></p>
                <div className="right-alpha-todo-control">
                  <span>{index.date}</span>
                  <div>
                  <span className="doing-icon-bottom" onClick={e=>
                {
                    changelist(index,"todo","doing")
                }}/>
                    <span className="done-icon-bottom" onClick={e=>
                {
                    changelist(index,"todo","done")
                }}/>
                    <RxTrash
                      className="trash-icon circular-rotation"
                      onClick={(e) => {
                        deletelist(index, "todo");
                      }}
                    ></RxTrash>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="main-container-add-task" onClick={handletodo}>
            <AiOutlinePlusCircle></AiOutlinePlusCircle>&nbsp;&nbsp;Add Task
          </div>
          <Compopup trigger={trigger} send={popup} caller={prop}></Compopup>
        </div>

        <div className="right-div-alpha-wrapper-box">
          <div className="right-alpha-todo">
            <span>Doing <span className="numberofdoing">{doinglist.length}</span></span>
            <IoIosCloseCircleOutline
              className="reset-list circular-rotation"
              onClick={(e) => {
                clearstore("doing");
              }}
            ></IoIosCloseCircleOutline>
          </div>
          {doinglist.map((index, i) => {
            return (
              <div key={i} className="right-alpha-todo-content">
                <div className="right-alpha-todo-content-heading">
                  <img src={todo} alt="mytask" />
                  <h4 dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(index.task)}}></h4>
                </div>
                <p dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(index.desc)}}></p>
                <div className="right-alpha-todo-control">
                  <span>{index.date}</span>
                  <div>
                  <span className="todo-icon-bottom" onClick={e=>
                {
                    changelist(index,"doing","todo")
                }}/>
                  <span className="done-icon-bottom" onClick={e=>
                {
                    changelist(index,"doing","done")
                }}/>
                    <RxTrash
                      className="trash-icon circular-rotation"
                      onClick={(e) => {
                        deletelist(index, "doing");
                      }}
                    ></RxTrash>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="main-container-add-task" onClick={handledoing}>
            <AiOutlinePlusCircle></AiOutlinePlusCircle>&nbsp;&nbsp;Add Task
          </div>
          <Compopup trigger={trigger} send={popup} caller={prop}></Compopup>
        </div>

        <div className="right-div-alpha-wrapper-box">
          <div className="right-alpha-todo">
            <span>Done <span className="numberofdone">{donelist.length}</span></span>
            <IoIosCloseCircleOutline
              className="reset-list circular-rotation"
              onClick={(e) => {
                clearstore("done");
              }}
            ></IoIosCloseCircleOutline>
          </div>
          {donelist.map((index, i) => {
            return (
              <div key={i} className="right-alpha-todo-content">
                <div className="right-alpha-todo-content-heading">
                  <img src={todo} alt="mytask" />
                  <h4 dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(index.task)}}></h4>
                </div>
                <p dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(index.desc)}}></p>
                <div className="right-alpha-todo-control">
                  <span>{index.date}</span>
                  <div>
                  <span className="todo-icon-bottom" onClick={e=>
                {
                    changelist(index,"done","todo")
                }}/>
                    <span className="doing-icon-bottom" onClick={e=>
                {
                    changelist(index,"done","doing")
                }}/>
                    <RxTrash
                      className="trash-icon circular-rotation"
                      onClick={(e) => {
                        deletelist(index, "done");
                      }}
                    ></RxTrash>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="main-container-add-task" onClick={handledone}>
            <AiOutlinePlusCircle></AiOutlinePlusCircle>&nbsp;&nbsp;Add Task
          </div>
          <Compopup trigger={trigger} send={popup} caller={prop}></Compopup>
        </div>
      </div>
    </>
  );
}

export default Home;

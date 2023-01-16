import HomeRighttop from "./Homerighttop";
import "./notes-main-right.css"
import Editor from "./Contenteditor.jsx"
import { useEffect, useState } from "react";
import DOMPurify from "dompurify";


const idb =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;

function Notesright() {

    const [popup, setpopup] = useState(false);
    const [notesdata,setnotesdata] = useState([]);
    
    const getallDate = () => {
        const dbPromise = idb.open("notes", 1);
        dbPromise.onsuccess = () => {
          const db = dbPromise.result;
          const tx = db.transaction("noteslist", "readonly");
          const todolist = tx.objectStore("noteslist");
          let list = todolist.getAll();
          list.onsuccess = (query) => {
            setnotesdata(query.srcElement.result);
          };
          tx.oncomplete = () => {
            db.close();
          };
          list.onerror = () => {
            alert("error get data");
          };
        };
      };

      

function createnote(e)
{  
    setpopup(true);
}

useEffect(()=>
{
    getallDate();

},[popup]);


const trigger = (title) => {
    setpopup(title);
  };
  return (
    <>
        <HomeRighttop></HomeRighttop>
        <div className="notes-main-right">
            <h2>Daily Notes</h2>
                <div className="notes-create-button" onClick={e=>
                {
                    createnote(e);
                }}>
                   + Create
                </div>
        </div>
        <Editor trigger={trigger} send={popup}></Editor>
        <div className="notes-main-right-content">
          {notesdata.map((index,i)=>
            {
                return <>
               
            
              <div className="main-show-notes-wrapper">
                <div className="main-show-notes-logo">
                    {i+1}
                </div>
                <div className="main-show-notes-content"  dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(index.desc)}}></div>
                <div className="main-show-notes-button"></div>


                    
                    </div>
                </>
            })}
        </div>

    </>
  );
}

export default Notesright;

import HomeRighttop from "./Homerighttop";
import "./notes-main-right.css"
import Editor from "./Contenteditor.jsx"
import { useEffect, useState } from "react";



function Notesright() {

    const [popup, setpopup] = useState(false);
    


function createnote(e)
{  
    setpopup(true);
}

useEffect(()=>
{

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
          
        </div>

    </>
  );
}

export default Notesright;

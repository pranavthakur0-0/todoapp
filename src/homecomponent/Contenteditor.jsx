import "./main-editor.css";
import { BiUndo, BiRedo, BiUnlink, BiLink } from "react-icons/bi";
import {
  AiOutlineBold,
  AiOutlineUnderline,
  AiOutlineItalic,
  AiOutlineStrikethrough,
  AiOutlineCloseCircle
} from "react-icons/ai";
import {
  TfiAlignLeft,
  TfiAlignCenter,
  TfiAlignRight,
  TfiAlignJustify,
} from "react-icons/tfi";
import { useState } from "react";

const idb =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;

function formatDoc(cmd, value = null) {
  if (value) {
    document.execCommand(cmd, false, value);
  } else {
    document.execCommand(cmd);
  }
}

function createLink() {
  var linkURL = prompt("Enter a URL:", "http://");
  var sText = document.getSelection();
  document.execCommand(
    "insertHTML",
    false,
    '<a href="' + linkURL + '" target="_blank">' + sText + "</a>"
  );
}

function Contenteditor(props) {

  const [notesdata,setnotesdata]= useState("");
  const [bold, setbold] = useState(true);
  function popupsetter() {
    props.trigger(false);
  }

  const datecaller = function()
  {
    let today = new Date();
    const formatter = new Intl.DateTimeFormat('en', { month: 'short' });
    let date= dateOrdinal(today.getDate())+"."+formatter.format(new Date())+"."+today.getFullYear();
    return date
  }

  function dateOrdinal(d) {
    return d+(31===d||21===d||1===d?"st":22===d||2===d?"nd":23===d||3===d?"rd":"th")
};

  function caller(e) {
    var btns = document.getElementsByClassName("editor-color-1");
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function () {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
      });
    }
  }

  function color(cmd, value = null) {
    if (value) {
      document.execCommand(cmd, false, value);
    } else {
      document.execCommand(cmd);
    }
  }


  function handleClick (event,name){
    const dbPromise = idb.open(`${name}`, 1);
        dbPromise.onsuccess = ()=>
        {
            const db = dbPromise.result;
            const tx = db.transaction(`${name}list`, "readwrite");
            const todolist = tx.objectStore(`${name}list`);
                const list = todolist.put({
                    id : Date.now(),
                    desc:notesdata,
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
  };

  return (
    <>
      {props.send ? (
        <div
          className="editor-main-container"
        >
          <div className="return-notes" onClick={(e) => {
            popupsetter();
          }}>    <AiOutlineCloseCircle /> </div>
         <h1 className="my-notes">My Notes</h1>
          <div className="editor-main-left-wrapper">

          <div
            className="editor-main-left"
            id="content"
            contentEditable={true}
            spellCheck={false}
            data-text="Write your notes here !"
          >
        
          </div>

          <div className="editor-main-right">
            <div className="editor-titles-wrapper">
              <h3>Titles</h3>
              <div className="editor-titles">
                <div className="editor-titles-1" onClick={(e) => {   
                if(bold)
                {
                  document.execCommand( "bold", false, null );    
                  setbold(false);
                  document.execCommand( "fontSize", false, "7" );  
                }
                else
                {
                  document.execCommand( "fontSize", false, "7" );   
                }
                    
                  }}
                  onMouseDown={(event) => event.preventDefault()}
                >
                  Title
                </div>
                <div className="editor-titles-1"  onClick={(e) => {
                if(bold)
                {
                  document.execCommand( "bold", false, null );    
                  setbold(false);
                  document.execCommand( "fontSize", false, "6" );  
                }
                else
                {
                  document.execCommand( "fontSize", false, "6" );   
                }
                    
                  }}
                  onMouseDown={(event) => event.preventDefault()}
                >
                  Subtitle
                </div>
                <div className="editor-titles-1"  onClick={(e) => {      
                if(bold)
                {
                  document.execCommand( "bold", false, null );    
                  setbold(false);
                  document.execCommand( "fontSize", false, "5" );  
                }
                else
                {
                  document.execCommand( "fontSize", false, "5" );   
                }
                    
                  }}
                  onMouseDown={(event) => event.preventDefault()}
                >
                  Heading
                </div>
              </div>
            </div>
            <div className="editor-content-wrapper">
              <h3>Content</h3>
              <div className="editor-content">
                <div className="editor-content-1" onClick={(e) => {   
                
                  if(bold)
                  {
                    document.execCommand( "fontSize", false, "4" );  
                  }
                  else
                  {
                    setbold(true);
                    document.execCommand( "bold", false, null );   
                    document.execCommand( "fontSize", false, "4" );   
                  }
                  }}
                  onMouseDown={(event) => event.preventDefault()}
                >
                  Strong
                </div>
                <div className="editor-content-1" onClick={(e) => {
                    if(bold)
                    {
                      document.execCommand( "fontSize", false, "3" );  
                    }
                    else
                    {
                      setbold(true);
                      document.execCommand( "bold", false, null );   
                      document.execCommand( "fontSize", false, "3" );   
                    }
                    }}
                  onMouseDown={(event) => event.preventDefault()}
                >
                  Body
                </div>
                <div className="editor-content-1" onClick={(e) => {        
                  if(bold)
                  {
                    document.execCommand( "fontSize", false, "2" );  
                  }
                  else
                  {
                    setbold(true);
                    document.execCommand( "bold", false, null );   
                    document.execCommand( "fontSize", false, "2" );   
                  }
                  }}
                  onMouseDown={(event) => event.preventDefault()}
                >
                  Caption
                </div>
              </div>
            </div>
            <div className="editor-tags-wrapper">
              <h3>Tags</h3>
              <div className="editor-tags">
                <div
                  className="editor-tags-1"
                  onClick={(e) => {
                    formatDoc("bold");
                  }}
                  onMouseDown={(event) => event.preventDefault()}
                >
                  <AiOutlineBold />
                </div>
                <div
                  className="editor-tags-1"
                  onClick={(e) => {
                    formatDoc("italic");
                  }}
                  onMouseDown={(event) => event.preventDefault()}
                >
                  <AiOutlineItalic />
                </div>
                <div
                  className="editor-tags-1"
                  onClick={(e) => {
                    formatDoc("strikeThrough");
                  }}
                  onMouseDown={(event) => event.preventDefault()}
                >
                  <AiOutlineStrikethrough />
                </div>
                <div
                  className="editor-tags-1"
                  onClick={(e) => {
                    formatDoc("underline");
                  }}
                  onMouseDown={(event) => event.preventDefault()}
                >
                  <AiOutlineUnderline />
                </div>
              </div>

              <div className="editor-tags-2">
                <div
                  className="editor-tags-1"
                  onClick={(e) => {
                    formatDoc("justifyLeft");
                  }}
                  onMouseDown={(event) => event.preventDefault()}
                >
                  <TfiAlignLeft />
                </div>
                <div
                  className="editor-tags-1"
                  onClick={(e) => {
                    formatDoc("justifyCenter");
                  }}
                  onMouseDown={(event) => event.preventDefault()}
                >
                  <TfiAlignCenter />
                </div>
                <div
                  className="editor-tags-1"
                  onClick={(e) => {
                    formatDoc("justifyRight");
                  }}
                  onMouseDown={(event) => event.preventDefault()}
                >
                  <TfiAlignRight />
                </div>
                <div
                  className="editor-tags-1"
                  onClick={(e) => {
                    formatDoc("justifyFull");
                  }}
                  onMouseDown={(event) => event.preventDefault()}
                >
                  <TfiAlignJustify />
                </div>
              </div>
              <div className="editor-tags-2">
                <div
                  className="editor-tags-1"
                  onClick={(e) => {
                    formatDoc("undo");
                  }}
                >
                  <BiUndo />
                </div>
                <div
                  className="editor-tags-1"
                  onClick={(e) => {
                    formatDoc("redo");
                  }}
                >
                  <BiRedo />
                </div>
                <div
                  className="editor-tags-1"
                  onClick={(e) => {
                    createLink();
                  }}
                  onMouseDown={(event) => event.preventDefault()}
                >
                  <BiLink />
                </div>
                <div className="editor-tags-1">
                  <BiUnlink
                    onClick={(e) => {
                      formatDoc("unlink");
                    }}
                    onMouseDown={(event) => event.preventDefault()}
                  />
                </div>
              </div>
            </div>

            <div className="editor-tags-wrapper">
              <h3>Color</h3>
              <div className="editor-tags" id="editor-tags">
                <button
                  className="editor-color-1 active"
                  style={{ backgroundColor: "#ffffff" }}
                  onClick={(e) => {
                    caller(e);
                    color("foreColor", "#fffff");
                  }}
                  onMouseDown={(event) => event.preventDefault()}
                ></button>

                <button
                  className="editor-color-1"
                  style={{ backgroundColor: "#ABBCC8" }}
                  onClick={(e) => {
                    caller(e);
                    color("foreColor", "#ABBCC8");
                  }}
                  onMouseDown={(event) => event.preventDefault()}
                ></button>

                <button
                  className="editor-color-1"
                  style={{ backgroundColor: "#6F7478" }}
                  onClick={(e) => {
                    caller(e);
                    color("foreColor", "#6F7478");
                  }}
                  onMouseDown={(event) => event.preventDefault()}
                ></button>

                <button
                  className="editor-color-1"
                  style={{ backgroundColor: "#A9A9FF" }}
                  onClick={(e) => {
                    caller(e);
                    color("foreColor", "#A9A9FF");
                  }}
                  onMouseDown={(event) => event.preventDefault()}
                ></button>

                <button
                  className="editor-color-1"
                  style={{ backgroundColor: "#0094FF" }}
                  onClick={(e) => {
                    caller(e);
                    color("foreColor", "#0094FF");
                  }}
                  onMouseDown={(event) => event.preventDefault()}
                ></button>

                <button
                  className="editor-color-1"
                  style={{ backgroundColor: "#27D7FE" }}
                  onClick={(e) => {
                    caller(e);
                    color("foreColor", "#27D7FE");
                  }}
                  onMouseDown={(event) => event.preventDefault()}
                ></button>
                <br />
                
              </div>
              <div className="editor-tags color-tags" id="editor-tags">
                <button
                  className="editor-color-1"
                  style={{ backgroundColor: "#00FFB9" }}
                  onClick={(e) => {
                    caller(e);
                    color("foreColor", "#00FFB9");
                  }}
                  onMouseDown={(event) => event.preventDefault()}
                ></button>

                <button
                  className="editor-color-1"
                  style={{ backgroundColor: "#DF76FF" }}
                  onClick={(e) => {
                    caller(e);
                    color("foreColor", "#DF76FF");
                  }}
                  onMouseDown={(event) => event.preventDefault()}
                ></button>

                <button
                  className="editor-color-1"
                  style={{ backgroundColor: "#FE3F69" }}
                  onClick={(e) => {
                    caller(e);
                    color("foreColor", "#FE3F69");
                  }}
                  onMouseDown={(event) => event.preventDefault()}
                ></button>

                <button
                  className="editor-color-1"
                  style={{ backgroundColor: "#FE9200" }}
                  onClick={(e) => {
                    caller(e);
                    color("foreColor", "#FE9200");
                  }}
                  onMouseDown={(event) => event.preventDefault()}
                ></button>

                <button
                  className="editor-color-1"
                  style={{ backgroundColor: "#D7C019" }}
                  onClick={(e) => {
                    caller(e);
                    color("foreColor", "#D7C019");
                  }}
                  onMouseDown={(event) => event.preventDefault()}
                ></button>

                <button
                  className="editor-color-1"
                  style={{ backgroundColor: "#000000" }}
                  onClick={(e) => {
                    caller(e);
                    color("foreColor", "#000000");
                  }}
                  onMouseDown={(event) => event.preventDefault()}
                ></button>
                <br />
              </div>

              <div className="editor-save-button">
              <button className="save-button-notes" id ="showcode" data-active="false"
              onClick={e=>
              {
                const content = document.getElementById("content");
                setnotesdata(`${content.innerHTML}`);
                handleClick(e ,"notes")
                content.setAttribute("contentEditable", false);
                props.trigger(false);
              }} >Save
                 </button>
              </div>

            </div>
          </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Contenteditor;

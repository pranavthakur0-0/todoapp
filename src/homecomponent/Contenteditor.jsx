
import "./main-editor.css"

import {AiOutlineBold,AiOutlineUnderline ,AiOutlineItalic, AiOutlineStrikethrough, AiOutlineCheckSquare,AiOutlineUnorderedList, AiOutlineOrderedList} from "react-icons/ai";
import { MdRadioButtonChecked } from "react-icons/md";
import { TfiAlignLeft,TfiAlignCenter,TfiAlignRight,TfiAlignJustify } from "react-icons/tfi";
import { BiUndo, BiRedo, BiUnlink, BiLink } from "react-icons/bi";



function formatDoc(cmd, value=null)
{
  if(value)
  {
    document.execCommand(cmd, false, value);
    console.log(document.execCommand(cmd, false, value))
  }
  else
  {
    document.execCommand(cmd);
    console.log(document.execCommand(cmd));
  }
}

function createLink() 
{ 
	var szURL = prompt("Enter a URL:", "http://");
	if ((szURL !== null) && (szURL !== "")) {
		document.execCommand("createLink",false,szURL);
	}
}

function Contenteditor(props) {


    function popupsetter()
    {
     
    }
  return (
    <>
    {props.send ?     
          <div className="editor-main-container" onClick={e=>{
            popupsetter();
          }}>
            <div className="editor-main-left" contentEditable={true} spellCheck={false}>
              <div id = "content">
                asdfasdfasdf
              </div>

            </div>

          <div className="editor-main-right">
            <input type="text" placeholder="Filename" value="untitled"></input>
            <div className="editor-titles-wrapper">
            <h3>Titles</h3>
            <div className="editor-titles">
              <div className="editor-titles-1" value="h1">Title</div>
              <div className="editor-titles-1" value="h2" >Subtitle</div>
              <div className="editor-titles-1" value="h3">Heading</div>
            </div>
            </div>
            <div className="editor-content-wrapper">
            <h3>Content</h3>
            <div className="editor-content">
              <div className="editor-content-1" value="h4">Strong</div>
              <div className="editor-content-1" value="h5" >Body</div>
              <div className="editor-content-1" value="h6">Caption</div>
            </div>
            </div>
            <div className="editor-tags-wrapper">
            <h3>Tags</h3>
            <div className="editor-tags">
              <div className="editor-tags-1" onClick={e=>
              {
                formatDoc("bold")
              }} onMouseDown={(event) => 
                event.preventDefault()}><AiOutlineBold /></div>
              <div className="editor-tags-1" onClick={e=>
              {
                formatDoc("italic")
              }} onMouseDown={(event) => 
                event.preventDefault()}><AiOutlineItalic /></div>
              <div className="editor-tags-1"onClick={e=>
              {
                formatDoc("strikeThrough")
              }} onMouseDown={(event) => 
                event.preventDefault()}><AiOutlineStrikethrough /></div>
              <div className="editor-tags-1"onClick={e=>
              {
                formatDoc("underline")
              }} onMouseDown={(event) => 
                event.preventDefault()}><AiOutlineUnderline /></div>
            </div>
   
            <div className="editor-tags-2">
              <div className="editor-tags-1"><AiOutlineCheckSquare/></div>
              <div className="editor-tags-1"><MdRadioButtonChecked/></div>
              <div className="editor-tags-1" onClick={e=>
              {
                formatDoc("insertUnorderedList")
              }} onMouseDown={(event) => 
                event.preventDefault()}><AiOutlineUnorderedList /></div>
              <div className="editor-tags-1" onClick={e=>
              {
                formatDoc("insertOrderedList")
              }} onMouseDown={(event) => 
                event.preventDefault()}><AiOutlineOrderedList /></div>
            </div>
            <div className="editor-tags-2">
              <div className="editor-tags-1" onClick={e=>
              {
                formatDoc("justifyLeft")
              }} onMouseDown={(event) => 
                event.preventDefault()}><TfiAlignLeft/></div>
              <div className="editor-tags-1" onClick={e=>
              {
                formatDoc("justifyCenter")
              }} onMouseDown={(event) => 
                event.preventDefault()}><TfiAlignCenter/></div>
              <div className="editor-tags-1" onClick={e=>
              {
                formatDoc("justifyRight")
              }} onMouseDown={(event) => 
                event.preventDefault()}><TfiAlignRight /></div>
              <div className="editor-tags-1" onClick={e=>
              {
                formatDoc("justifyFull")
              }} onMouseDown={(event) => 
                event.preventDefault()}><TfiAlignJustify /></div>
            </div>
            <div className="editor-tags-2">
              <div className="editor-tags-1" onClick={e=>
              {
                formatDoc("undo")
              }}><BiUndo/></div>
              <div className="editor-tags-1" onClick={e=>
              {
                formatDoc("redo")
              }}><BiRedo/></div>
              <div className="editor-tags-1" onClick={e=>{createLink()}} onMouseDown={(event) => 
                event.preventDefault()}><BiLink /></div>
              <div className="editor-tags-1"><BiUnlink 
              onClick={e=>
                {
                  formatDoc("unlink")
                }} onMouseDown={(event) => 
                  event.preventDefault()}/></div>
            </div>
            </div>

            <div className="editor-tags-wrapper">
            <h3>Color</h3>
            <div className="editor-tags">
              <div className="editor-color-1"></div>
              <div className="editor-color-1"></div>
              <div className="editor-color-1"></div>
              <div className="editor-color-1"></div>
            </div>
   
            <div className="editor-tags-2">
              <div className="editor-color-1"></div>
              <div className="editor-color-1"></div>
              <div className="editor-color-1"></div>
              <div className="editor-color-1"></div>
            </div>
            </div>
          </div>

          </div> : ""}

    </>
  );
}

export default Contenteditor;


import "./main-editor.css"


function Contenteditor(props) {


    function popupsetter()
    {
        props.trigger(false);
    }
  return (
    <>
    {props.send ?     
          <div className="editor-main-container" onClick={e=>{
            popupsetter();
          }}>
            <div className="editor-main-left">

            </div>
          <div className="editor-main-right">
            
          </div>

          </div> : ""}

    </>
  );
}

export default Contenteditor;

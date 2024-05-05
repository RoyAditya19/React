import React,{useState} from 'react'


export default function Textform(props) {
                        const changetoupp = ()=>
                            {
                            // console.log("it was changed")
                            let newtxt = text.toUpperCase();
                            setText(newtxt)
                            if(newtxt.length>0)
                            {
                              props.showAlert("Converted to UpperCase", "success")
                            }
                            else
                            {
                              alert("Enter Something First!!")
                            }
                            
                        }

                        const changetolow = ()=>
                        {
                            // console.log("it was changed")
                            let newtxt = text.toLowerCase();
                            setText(newtxt)
                            if(newtxt.length>0)
                            { 
                              props.showAlert("Converted to LowerCase", "success")
                            }
                            else{
                              alert("Enter Something First!!")
                            }

                        }

                        const cleart = ()=>
                        {
                          let newtxt = " ";
                          setText(newtxt)
                          if(newtxt.length>0)
                          {
                            props.showAlert("Cleared", "success")
                          }
                          else
                          {
                            alert("Enter Something First!!")
                          }
                        }

                        const copyt = ()=>
                        {
                          navigator.clipboard.writeText(text);
                          props.showAlert("Copied to clipboard", "success")
                        }

                        const changing = (event)=>
                        {
                            // console.log("changing");
                            setText(event.target.value);
                        }
                        const [text, setText] = useState("")
  return (
    <>
    <div className="container">
    <div className=''>
      <div className="mb-3 container">
        {/* in the label below html and js have been used  */}
        <label htmlFor="" className='my-3' style={{fontSize:"25px", fontWeight : 'bolder', color : props.mode === 'dark'?'white':'black'}}>Text- Editor | Lowercase to Uppercase | Uppercase to Lowercase </label><br />
        <label htmlFor="exampleFormControlTextarea1" className="form-label text-align-center my-2" style={{color : props.mode === 'dark'?'white':'black'}}>{<b> {props.title}</b>}</label>  
        <textarea className="form-control  w-75" id="textarea1" rows="8" value={text} onChange={changing} style={{backgroundColor: props.mode === 'dark'?'#a69999':'white', color: props.mode ==='dark'?'white':'black'}}></textarea>
      </div>
    <button disabled = {text.length === 0} className='btn btn-primary mx-1 my-1' onClick={changetoupp}>ChangeToUpperCase</button>
    <button disabled = {text.length === 0} className='btn btn-primary mx-1 my-1' onClick={changetolow}>ChangeToLowerCase</button>
    <button disabled = {text.length === 0} className='btn btn-primary mx-1 my-1' onClick={cleart}>Clear Text</button>
    <button disabled = {text.length === 0} className='btn btn-primary mx-1 my-1' onClick={copyt}>Copy Text</button>
    </div>
    <div className="container2">
        <h1 style={{color : props.mode === 'dark'?'white':'black'}}>Summary Of Your Text</h1>
        <p style={{color : props.mode === 'dark'?'white':'black'}}>{text.split(/\s+/).filter((element)=>{return element.length!==0}).length} words and {text.length} characters</p> {/*here filter function(it returns true or false, if it's true then that element stays, else the element does not stays) was used to return an empty array when there is no word entered, for example when there is a space(using spacebar) present in the textbox it will create an empty array and return the size which is 0 */}
        <p style={{color : props.mode === 'dark'?'white':'black'}}>{0.008 * text.split(" ").filter((element)=>{return element.length!==0}).length} minutes will be taken to read</p>
        <h2 style={{color : props.mode === 'dark'?'white':'black'}}>Preview</h2>
        <p style={{color : props.mode === 'dark'?'white':'black'}}>{text.length>0?text:"Nothing to preview.."}</p>
        <p></p>
    </div>
    </div>
    </>
  )
}

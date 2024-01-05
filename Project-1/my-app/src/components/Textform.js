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
                          var text = document.getElementById("textarea1");
                          text.select();
                          navigator.clipboard.writeText(text.value);
                            props.showAlert("Copied to clipboard", "success")
                        }

                        const changing = (event)=>
                        {
                            // console.log("changing");
                            setText(event.target.value);
                        }
                        const [text, setText] = useState("Enter the Word Here...")
  return (
    <>
    <div className="container">

    <div className=''>
      <div className="mb-3 my-5">
        {/* in the label below html and js have been used  */}
        <label htmlFor="" style={{position: 'relative', left: '400px', fontWeight : 'bolder', color : props.mode === 'dark'?'white':'black'}}>A Basic React Page</label><br />
        <label htmlFor="exampleFormControlTextarea1" className="form-label text-align-center" style={{color : props.mode === 'dark'?'white':'black'}}>{<b> {props.title}</b>}</label>  
        <textarea className="form-control  w-75" id="textarea1" rows="8" value={text} onChange={changing} style={{backgroundColor: props.mode === 'dark'?'#a69999':'white', color: props.mode ==='dark'?'white':'black'}}></textarea>
      </div>
    <button disabled = {text.length === 0} className='btn btn-primary mx-1 my-1' onClick={changetoupp}>ChangeToUpperCase</button>
    <button disabled = {text.length === 0} className='btn btn-primary mx-1 my-1' onClick={changetolow}>ChangeToLowerCase</button>
    <button disabled = {text.length === 0} className='btn btn-primary mx-1 my-1' onClick={cleart}>Clear Text</button>
    <button disabled = {text.length === 0} className='btn btn-primary mx-1 my-1' onClick={copyt}>Copy Text</button>
    </div>
    <div className="container2">
        <h1 style={{color : props.mode === 'dark'?'white':'black'}}>Summary Of Your Text</h1>
        <p style={{color : props.mode === 'dark'?'white':'black'}}>{text.split(/\s+/).filter((element)=>{return element.length!==0}).length} words and {text.length} characters</p>
        <p style={{color : props.mode === 'dark'?'white':'black'}}>{0.008 * text.split(" ").filter((element)=>{return element.length!==0}).length} minutes will be taken to read</p>
        <h2 style={{color : props.mode === 'dark'?'white':'black'}}>Preview</h2>
        <p style={{color : props.mode === 'dark'?'white':'black'}}>{text.length>0?text:"Enter something in the box to preview it here.."}</p>
        <p></p>
    </div>
    </div>
    </>
  )
}

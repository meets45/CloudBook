import React from "react";

function Alert(props) {
    const capitalize = (word) =>{
      // Capitalizes first character of word
      if(word==="danger"){
        word="error";
      }
        let lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
  return (
    <div style={{height:"50px"}}>
    { /* It only displays alert if it is passed through props*/}
    {props.alert && <div> 
      <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
          <strong>{capitalize(props.alert.type)}: </strong> {props.alert.msg}
      </div>
    </div>}
    </div>
  );
}

export default Alert;

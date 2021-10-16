import React  from "react";
import './index.css';

const UICard = (props) => {


    const clasess = ["ui_card",...props.clasess]


    return (
        <div className = {clasess.join(' ')}>
            {props.children}

         </div>   
    )



}

UICard.defaultProps = {
    clasess:[]
}

export default UICard


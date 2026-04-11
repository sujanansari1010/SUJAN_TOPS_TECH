import React from 'react';
import "./style.css";

function Css() {

    let internal = {
        background: "blue",
        color: "red"
    }

    return (
        <div>
            {/* 1) inline css  */}
            {/* 2) internal css (react not use) */}
            {/* 3) external css  */}

            {/* inline css as object */}
            <h1 style={{ background: "red", color: "blue" }}>hello this css compo</h1>

            {/* inertanl css */}
            <h2 style={internal}>Hello this intenal css</h2>

            <div className="main">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, quibusdam dicta veniam numquam fugiat rem beatae aspernatur explicabo voluptatem repudiandae laboriosam fugit nostrum, eum illum aliquam tempore debitis? Voluptatem, ipsam.
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia illo nihil ab veritatis magnam, enim nemo non sunt odit cupiditate dolor, voluptatem totam incidunt? Nihil cupiditate dolores facilis molestiae laboriosam.
            </div>

            <h1 id='h1'>asdhk ,ajshdiakl </h1>


        </div>
    )
}

export default Css


// import "./style.css"

// function Cssapp()
// {
//     let internal = {
//         background:"Blue"
//     }
//     return(
//     <>
// <h1 style={{background : "red",padding:"20px"}}>Hello Inline css</h1>
// <h2 style={internal}> Internal css</h2>

// <div className="main"></div>
//     </>
//     )
// }

// export default Cssapp;
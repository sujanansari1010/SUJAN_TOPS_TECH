/*
What is JSX?
JSX stands for JavaScript XML.

JSX allows us to write HTML in React.

JSX makes it easier to write and add HTML in React.

document.write()  { }

JSX allows us to write HTML elements in JavaScript and place them in the DOM without any 
createElement()  and/or appendChild() methods.
JSX converts HTML tags into react elements.
You are not required to use JSX, but JSX makes it easier to write React applications.
*/


import React from 'react'

function Jsx_component() {

    var myelement = "Nagar Raj";
    var myelement1 = <h1>Hello i am html</h1>;
    var myelement2 = <h1>sum of a & b are : {5 + 5}</h1>;
    var myelement3 = (
        <ol>
            <li>Banana</li>
            <li>Apple</li>
            <li>Mango</li>
        </ol>
    );

    var myhead={ color: 'red' , backgroundColor:'yellow'}


    return (
        <div className='container'>
            {myelement}
            {myelement1}
            {myelement2}
            {myelement3}
            <hr />

            <h1 style={{ color: 'red' }}>Hello </h1>
            <h1 style={myhead}>Hello </h1>

            {
                // hello i am comment
                // <h1 style={{ color: 'red' }}>Hello </h1>
            }

            <div className="">Hello</div>

            
        </div>
    )
}

export default Jsx_component
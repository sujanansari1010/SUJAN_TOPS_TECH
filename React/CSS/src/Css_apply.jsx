import React from 'react'

import './External_css.css' // normal import

// Note : css conflict & class conflict problem


function Css_apply() {

    var myhead = { color: 'red', backgroundColor: 'yellow' }

    return (
        <div className='container'>
            <h1 style={{ color: 'red', backgroundColor: 'yellow' }}>In line css </h1>
            <h1 style={myhead}>Internal Css </h1>
            <h1 className='box'>External Css </h1>
        </div>
    )
}

export default Css_apply
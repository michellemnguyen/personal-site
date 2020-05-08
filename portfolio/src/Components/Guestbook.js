import React, { useEffect, useState } from 'react'
import config from '../config'
const firebase = require('firebase')

function Guestbook() {

    const [data, setData] = useState([]);
    const [shouldRender, setShouldRender] = useState(true);

    useEffect( () => {

        // init firebase if not yet init'd
        if (!firebase.apps.length) {
            firebase.initializeApp(config)
         } 

         // get reference to database
         let ref = firebase.database().ref('data')

         //retrieve its data
        ref.on('value', snapshot => {
            const state = snapshot.val() // state = JSON object
            setData(state)
        })

    }, [shouldRender])

    return (
        <div>

            <div className='title'>
                <h1>Guestbook</h1>
            </div>

            <div className='lowerBody'>
                {data}
            </div>

        </div>
    )

}

export default Guestbook;
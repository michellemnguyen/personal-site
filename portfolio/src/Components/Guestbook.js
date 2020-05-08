import React, { useEffect, useState } from 'react'
import { useInput } from '../Hooks/input-hook'
import config from '../config'
const firebase = require('firebase')

function Guestbook() {

    const [data, setData] = useState([]);
    const [shouldRender, setShouldRender] = useState(true);

    const { value, bind, reset } = useInput('');

    const sample = ['hello world', 'goodbye world'];

    const handleSubmit = (evt) => {
        evt.preventDefault();
        alert(`Submitting Name ${value}`);
        reset();
    }

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


            {/* NOTES
                - get data from firebase (using listener)
                - trigger re-render with new messages
                - map messsages to formatted
            */}

            <div className='lowerBody'>
                
                <div className='article2'>

                    <form onSubmit={handleSubmit}>
                        <label>
                            Name: 
                            <input type="text" {...bind} />
                        </label>
                        <input type="submit" value="Submit" />
                    </form>

                </div>

                <div className='article2'>

                    { sample.map((s, index) => (
                        <p>
                            {s}
                        </p>
                    ))}

                </div>


            </div>

        </div>
    )

}

export default Guestbook;
import React, { Component } from 'react';
import firebase from '../firebase'
import '../milligram.css'

class CreateList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            listName: '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        e.preventDefault();
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    handleSubmit(e) {

        // // prevent page from refreshing
        // e.preventDefault(); 

        // connect to firebase and create new list
        let listRef = firebase.database().ref('movieList/' + this.state.listName + '/');

        // create null object to push into db
        let emptyMovieObject = {
            title: '',
            director: '',
            rating: '',
            poster: '',
            imdbID: ''
        }
        
        // // push new list to firebase
        listRef.push(emptyMovieObject);

        // reset items in the form to empty
        this.setState({
            listName: ''
        });
    }

    render() {
        return (
            <div>
                <div className='title'>
                    <h1>Create Custom Movie Lists</h1>
                </div>

                <div className='lowerBody'>
                    <div className='article'>
                        Here you can create a custom movie list.

                        <form onSubmit={this.handleSubmit}>
                            <label>Enter your custom list name.</label>
                            <input type="text" name="listName" placeholder="New Custom List Name" 
                                onChange={this.handleChange} value={this.state.name} />
                            <button>Submit</button>
                        </form>

                    </div>
                </div>
            </div>
        );
    }
}

export default CreateList;
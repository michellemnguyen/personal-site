import React, { Component } from 'react';

const validateForm = (errors, imdbID) => {
    let valid = true;
    Object.values(errors).forEach(
        // if we have an error string set valid to false
        (val) => val.length > 0 && (valid = false)
    );
    if (imdbID.length === 0) {
        valid = false
    }
    return valid;
};

class AddMovies extends Component {

    constructor(props) {
        super(props);

        this.state = {
            imdbID: '',
            errors: {
                imdbID: ''
            }
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        e.preventDefault();
        const {name, value} = e.target;
        let errors = this.state.errors;

        switch (name) {

            case 'imdbID':
                errors.imdbID = value.length < 9
                                ? 'IMDB ID must be a valid, existing ID.'
                                : '';
                break;
            default:
                break;

        }

        this.setState({errors, [name]: value});

    }

    handleSubmit(e) {

        // prevent page from refreshing
        e.preventDefault(); 

        if(validateForm(this.state.errors, this.state.imdbID)) {
            console.info('Valid Form');
        } else {
            alert('There are errors with your submission. Please check to see if you have properly filled out the required sections.');
            return;
        }

        // // tell firebase where to store our form data
        // const itemsRef = firebase.database().ref('items');

        // // take what user inputted and package into object to send to firebase
        // const formData = {
        //   name: this.state.name,
        //   bio: this.state.bio,
        //   msg: this.state.msg,
        //   isPublic: this.state.isPublic,
        //   email: this.state.email,
        //   date: currDate
        // }

        // // send to firebase 
        // itemsRef.push(formData);

        // // reset items in the form to empty
        // this.setState({
        //     name: '',
        //     bio: '',
        //     msg: '',
        //     isPublic: false,
        //     email: '',
        //     date: ''
        // });

        alert('Your message has been submitted!');
    }

    render() {

        const {errors} = this.state;

        return (
            <div>
                <div className='title'>
                    <h1>Add New Movie</h1>
                </div>

                <div className='lowerBody'>
                    <div className='article'>
                        Here you can add a new movie.

                        <form>
                        <label>Enter the IMDB ID of the movie you would like to add.</label>
                        <input type="text" name="imdbID" placeholder="IMDB Movie ID" 
                            onChange={this.handleChange} value={this.state.name} />
                        {errors.imdbID.length > 0 && <div className='error'>{errors.imdbID}</div>}
                        </form>

                        <button>Submit</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddMovies;
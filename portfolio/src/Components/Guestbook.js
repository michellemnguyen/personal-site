import React, { Component } from 'react'
import firebase from '../firebase'

// resource for a lot of the code used: https://css-tricks.com/intro-firebase-react/
// another resource for form validation: https://www.telerik.com/blogs/up-and-running-with-react-form-validation

const validEmailRegex = 
  // eslint-disable-next-line no-useless-escape
  RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
        // if we have an error string set valid to false
        (val) => val.length > 0 && (valid = false)
    );
    return valid;
};

class Guestbook extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            bio: '',
            msg: '',
            isPublic: false,
            email: '',
            errors: {
                name: '',
                bio: '',
                msg: '',
                email: ''
            },
            items: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        e.preventDefault();
        const {name, value} = e.target;
        let errors = this.state.errors;

        switch (name) {

            case 'name':
                errors.name = value.length < 5 || value.length > 20
                                ? 'Name must be between 5 and 20 characters.'
                                : '';
                break;
            case 'bio':
                errors.bio = value.length > 100
                                ? 'Description must be less than 100 characters.'
                                : '';
                break;
            case 'msg':
                errors.msg = value.length < 15 || value.length > 500
                                ? 'Message must be between 15 and 500 characters.'
                                : '';
                break;
            case 'email': 
                errors.email = validEmailRegex.test(value)
                                ? ''
                                : 'Email is not valid!';
                break;
            default:
                break;

        }

        this.setState({errors, [name]: value});

    }

    handleSubmit(e) {

        // prevent page from refreshing
        e.preventDefault(); 

        if(validateForm(this.state.errors)) {
            console.info('Valid Form');
        } else {
            console.error('Invalid Form');
        }

        // tell firebase where to store our form data
        const itemsRef = firebase.database().ref('items');

        // take what user inputted and package into object to send to firebase
        const formData = {
          name: this.state.name,
          bio: this.state.bio,
          msg: this.state.msg,
          isPublic: this.state.isPublic,
          email: this.state.email
        }

        // send to firebase 
        itemsRef.push(formData);

        // reset items in the form to empty
        this.setState({
            name: '',
            bio: '',
            msg: '',
            isPublic: false,
            email: ''
        });
    }

    componentDidMount() {
        const itemsRef = firebase.database().ref('items');
        itemsRef.on('value', (snapshot) => {
          let items = snapshot.val();
          let newState = [];
          for (let item in items) {
            newState.push({
              id: item,
              name: items[item].name,
              bio: items[item].bio,
              msg: items[item].msg,
              isPublic: items[item].isPublic,
              email: items[item].email
            });
          }
          this.setState({
            items: newState
          });
        });
    }

    render() {
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

                    <form onSubmit={this.handleSubmit}>
                        <input type="text" name="name" placeholder="What's your name?" 
                            onChange={this.handleChange} value={this.state.name} />
                        <input type="text" name="bio" placeholder="Write a short description." 
                            onChange={this.handleChange} value={this.state.bio} />
                        <input type="text" name="msg" placeholder="What would you like to tell me?" 
                            onChange={this.handleChange} value={this.state.msg} />
                        <input type="text" name="isPublic" placeholder="Would you like your message public or private?" 
                            onChange={this.handleChange} value={this.state.isPublic} />
                        <input type="text" name="email" placeholder="What is your email?" 
                            onChange={this.handleChange} value={this.state.email} />
                        <button>Submit</button>
                    </form>

                    </div>

                    <div className='article2'>

                        {/* basically gonna use map function to grab data from firebase and map out */}

                        {this.state.items.map((item) => {
                            return (
                            <li key={item.id}>
                                <h3>{item.name}</h3>
                                <p>{item.bio}</p>
                                <p>{item.msg}</p>
                            </li>
                            )
                        })}

                    </div>


                </div>

            </div>
        );
    }

}

export default Guestbook;
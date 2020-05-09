import React, { Component } from 'react'
import firebase from '../firebase'
import date from 'date-and-time';
import { motion } from 'framer-motion';
import '../milligram.css'
// resource for a lot of the code used: https://css-tricks.com/intro-firebase-react/
// another resource for form validation: https://www.telerik.com/blogs/up-and-running-with-react-form-validation
// aesthetics: https://milligram.io/forms.html

const validEmailRegex = 
  // eslint-disable-next-line no-useless-escape
  RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

const validateForm = (errors, name, msg) => {
    let valid = true;
    Object.values(errors).forEach(
        // if we have an error string set valid to false
        (val) => val.length > 0 && (valid = false)
    );
    if (name.length === 0 || msg.length === 0) {
        valid = false
    }
    return valid;
};

const pattern = date.compile('MMM D YYYY hh:mm A');

class Guestbook extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            bio: '',
            msg: '',
            isPublic: false,
            email: '',
            date: '',
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

    /*  FUNCTIONAL TODO:
        - DONE! prevent form submission + don't actually submit if there are errors
            - no name, msg, or privacy setting
            - other fields don't have proper length
        - DONE! scroll message div when too many messages
        - DONE! only display public messages
        - DONE! apply formatting to public messages
            - name, bio, msg, DATE (figure out)
        - DONE! alert upon successful submission

        AESTHETIC TODO:
        - EXTRA CREDIT:
            - animate form arrival on loading
            - animate new message arrival
    */
    handleSubmit(e) {

        // prevent page from refreshing
        e.preventDefault(); 

        if(validateForm(this.state.errors, this.state.name, this.state.msg)) {
            console.info('Valid Form');
        } else {
            alert('There are errors with your submission. Please check to see if you have properly filled out the required sections.');
            return;
        }

        let currDate = date.format(new Date(), pattern).toString();

        console.log(currDate);

        // tell firebase where to store our form data
        const itemsRef = firebase.database().ref('items');

        // take what user inputted and package into object to send to firebase
        const formData = {
          name: this.state.name,
          bio: this.state.bio,
          msg: this.state.msg,
          isPublic: this.state.isPublic,
          email: this.state.email,
          date: currDate
        }

        // send to firebase 
        itemsRef.push(formData);

        // reset items in the form to empty
        this.setState({
            name: '',
            bio: '',
            msg: '',
            isPublic: false,
            email: '',
            date: ''
        });

        alert('Your message has been submitted!');
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
              email: items[item].email,
              date: items[item].date
            });
          }
          this.setState({
            items: newState
          });
        });
    }

    render() {

        const {errors} = this.state;
        
        return (
            <div>

                <div className='title'>
                    <h1>Say Hello!</h1>
                </div>


                {/* NOTES
                    - get data from firebase (using listener)
                    - trigger re-render with new messages
                    - map messsages to formatted
                */}

                <div className='messageContainer'>
                    
                    <div className='article2'>

                    <motion.form 
                        onSubmit={this.handleSubmit}
                        animate={{ x: 20 }}
                        transition={{ duration: 1 }}
                    >
                        <label>Name (Required)</label>
                        <input type="text" name="name" placeholder="What's your name?" 
                            onChange={this.handleChange} value={this.state.name} />
                        {errors.name.length > 0 && <div className='error'>{errors.name}</div>}

                        <label>Description</label>
                        <input type="text" name="bio" placeholder="Write a short description about yourself." 
                            onChange={this.handleChange} value={this.state.bio} />
                        {errors.bio.length > 0 && <div className='error'>{errors.bio}</div>}

                        
                        <label>Message (Required)</label>
                        <textarea type="text" name="msg" placeholder="What would you like to tell me?" 
                            onChange={this.handleChange} value={this.state.msg} />
                        {errors.msg.length > 0 && <div className='error'>{errors.msg}</div>}

                        <label>Would you like your message public or private? (Click to select)</label>
                        <select type="text" name="isPublic" placeholder="Would you like your message public or private?" 
                            onChange={this.handleChange} value={this.state.isPublic}>
                                <option value='true'>Public</option>
                                <option value='false'>Private</option>
                        </select>

                        <label>Email Address</label>
                        <input type="text" name="email" placeholder="What is your email?" 
                            onChange={this.handleChange} value={this.state.email} />
                        
                        <br/><br/><button>Submit</button>
                    </motion.form>

                    </div>

                    <div className='messages'>

                        {/* basically gonna use map function to grab data from firebase and map out */}

                        {/* eslint-disable-next-line array-callback-return */}
                        { this.state.items.map((item) => {
                             if (item.isPublic) {
                                return (
                                    <motion.div 
                                        key={item.id}
                                        animate={{ x: 20 }}
                                        transition={{ duration: 1 }}
                                    >
                                        <div className='date'> {item.date} </div>
                                        <div className='msgName'>{item.name}</div>
                                        <div className='bio'>{item.bio}</div>
                                        <div className='msg'>{item.msg}</div>
                                        <p></p>
                                    </motion.div>
                                )
                            } 
                            
                        }) 
                        }


                    </div>


                </div>

            </div>
        );
    }

}

export default Guestbook;
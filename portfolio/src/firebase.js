import firebase from 'firebase'
const config = {
    apiKey: "AIzaSyCKkfCtgNHWTWj8AqPlMCRgDhGSxDYkj0s",
    authDomain: "ucsb-cs1850-mn.firebaseapp.com",
    databaseURL: "https://ucsb-cs1850-mn.firebaseio.com"
};
firebase.initializeApp(config);
export default firebase;
// import React, { Component } from 'react';

// import API from '../../utils/API';
// // import "./Match.css";
// import Form from "../../components/Form";



// class Users extends Component {

//   state = {
//    users: [],
//    name: "",
//    newUser: "",
//   };

//   // componentDidMount() {
  
//   // };

//   handleInputChange = event => {
//     const { name, value } = event.target;
//     this.setState({
//       [name]: value
//     });
//   };

//   addUser = () => {

//     let data = {
//       name: this.state.newUser
//     }
    
//     API.addUser(data)
//     .then(res => {
//       console.log("new user added");
//       console.log(res.data);
      
//        })
//     .catch(err => console.log(err));
//   }
    
    

//   render = () => {
//     return (

//           <div>

//            <h1>This is the picture page</h1>

//             <div className="pictures-form-area">
            
//               <Form
//                 userName={this.state.userName}
//                 handleInputChange={this.handleInputChange}
//                 addUser={this.addUser}
//               />
//             </div>
//           </div>

//     );
//   };
// };



// export default Users;
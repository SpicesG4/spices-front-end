// // import React, { useContext, useState } from 'react';
// // import { AuthContext } from '../context/auth';
// // import { FormGroup, InputGroup, Button, Card, Label } from "@blueprintjs/core";

// function Signup(props) {

//   // const { signup } = useContext(AuthContext);


//   // const [username, setUsername] = useState('');
//   // const [password, setPassword] = useState('');
//   // const [email, setEmail] = useState('');
//   // const [role, setRole] = useState('user');
//   // const [IMG, setIMG] = useState('');
//   // const [coverPicture, setcoverPicture] = useState('');

//   // const handleChange = (e) => {
//   //   if (e.target.name === 'username') {
//   //     // console.log(e.target.value);
//   //     setUsername(e.target.value);
//   //   } else if (e.target.name === 'password') {
//   //     // console.log(e.target.value);
//   //     setPassword(e.target.value);
//   //   } else if (e.target.name === 'email') {
//   //     // console.log(e.target.value);
//   //     setEmail(e.target.value);
//   //   }

//   //      if (e.target.name === 'IMG') {
//   //     // console.log(e.target.value);
//   //     setIMG(e.target.value);
//   //   } 

//   //   if (e.target.name === 'coverPicture') {
//   //     // console.log(e.target.value);
//   //     setcoverPicture(e.target.value);
//   //   } 


//   //   else {
//   //     // console.log(e.target.value);
//   //     setRole(e.target.value);
//   //   }
//   // };

//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   signup(username, password, role, email,IMG,coverPicture);
//   // };

//   return (
//     <div

//       size="lg"
//       aria-labelledby="contained-modal-title-vcenter"
//       centered
//     >

//       <h1 id="contained-modal-title-vcenter">Signup</h1>

//       <card className='app' intent="danger" style={{
//         'margin-top': '0rem'
//       }}>
//         <FormGroup intent="danger">
//           <FormGroup controlId="formBasicUsername">
//             <label>Username</label>
//             <InputGroup
//               intent="danger"
//               onChange={handleChange}
//               name="username"
//               required
//               type="text"
//               placeholder="Enter username"
//             />
//           </FormGroup  >
//           <FormGroup controlId="formBasicUsername">
//             <label>email</label>
//             <InputGroup
//               intent="danger"
//               onChange={handleChange}
//               name="email"
//               required
//               type="text"
//               placeholder="Enter email"
//             />
//           </FormGroup  >
//           <FormGroup controlId="formBasicPassword" intent="danger">
//             <Label intent="danger">Password</Label>
//             <InputGroup
//               intent="danger"
//               onChange={handleChange}
//               name="password"
//               required
//               type="password"
//               placeholder="Password"
//             />
//           </FormGroup>


//           <FormGroup controlId="formBasicPassword" intent="danger">
//             <Label intent="danger">IMG URL</Label>
//             <InputGroup
//               intent="danger"
//               onChange={handleChange}
//               name="IMG"
//               required
//               placeholder="IMG URL "
//             />
//           </FormGroup>



//           <FormGroup controlId="formBasicPassword" intent="danger">
//             <Label intent="danger">coverPicture url</Label>
//             <InputGroup
//               intent="danger"
//               onChange={handleChange}
//               name="coverPicture"
//               required
//               placeholder="coverPicture "
//             />
//           </FormGroup>

//           <FormGroup intent="danger">
//             <Label intent="danger">Role</Label>
//             <select onChange={handleChange} name="role" as="select">
//               <option value="user">User</option>
//               <option value="chef">Chef</option>

//             </select>
//           </FormGroup>
//         </FormGroup>


//         <Button intent="danger" onClick={handleSubmit}>
//           Signup
//         </Button>
//       </card>
//     </div>
//   );
// }

// export default Signup;
import React from 'react';
import useSignUpForm from './CustomHooks';

const Signup = () => {
    const signup2 = () => {
        console.log("dfdf");
        alert(`User Created!
                Name: ${inputs.firstName} ${inputs.lastName}
                Email: ${inputs.email}`);
        }
  const {inputs, handleInputChange, handleSubmit} = useSignUpForm('' ,signup2);

   return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name</label>
        <input type="text" name="firstName" onChange={handleInputChange} value={inputs.firstName} required />
        <label>Last Name</label>
        <input type="text" name="lastName" onChange={handleInputChange} value={inputs.lastName} required />
        <label>Email</label>
        <input type="text" name="email" onChange={handleInputChange} value={inputs.email} required />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );

}
export default Signup;

import React from 'react';
import useSignUpForm from './CustomHooks';

const Fields = () => {
    // const signup2 = () => {
    //     console.log("dfdf");
    //     alert(`User Created!
    //             Name: ${inputs.firstName} ${inputs.lastName}
    //             Email: ${inputs.email}`);

    //     }
  const {inputs, handleInputChange, handleSubmit} = useSignUpForm('' ,signup2);
  const form = (<form onSubmit={handleSubmit}>
    <div className="row">
          <div className="col-md-6">
              <label>Nombre</label>
              <input type="text" className="form-control" name="nombre" value={inputs.nombre} onChange={handleInputChange}  required ></input>
          </div>
    </div>
  </form>);
   return {inputs,form};

}
export default Fields;

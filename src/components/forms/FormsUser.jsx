import Login_form from "./Login_form/Login_form";
import Register_form from "./Register_form/Register_form";
import { useState } from "react";
import { Navigate } from "react-router-dom";

const FormsUser = ({ setUsuarioLogeado, setUserName, usuarioLogeado }) => {
  if(usuarioLogeado){
    return <Navigate to="/user" replace={true} />
  }

  const [firstView, setFirstView] = useState(true);
  const toggleView = () => setFirstView(!firstView);


  return (
    <div className="w-full max-w-md p-6 dark:text-white flex flex-col items-center justify-between">
      {firstView ? (
        <Register_form
          label1="User"
          label2="Email"
          label3="Password"
          toggleView={toggleView}
        />
      ) : (
        <Login_form
          label1="User"
          label2="Password"
          toggleView={toggleView}
          setUsuarioLogeado={setUsuarioLogeado}
          setUserName={setUserName}
        />
      )}
    </div>
  );
};

export default FormsUser;
    
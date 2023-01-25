import React, { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { Form, Field } from "react-final-form";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { Password } from "primereact/password";
import useAuth,{logout } from "../firebase/useAuth";
//import firebase function
import { auth, google, facebook, github } from "../firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";



export const Login = () => {
  const currentUser = useAuth();
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    accept: true,
  });

  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);

  const validate = (data) => {
    let errors = {};

    if (!data.email) {
      errors.email = "Email is required.";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
      errors.email = "Invalid email address. E.g. example@email.com";
    }

    if (!data.password) {
      errors.password = "Password is required.";
    }
    return errors;
  };

  const onSubmit = (data, form) => {
    setFormData(data);
    setShowMessage(true);
    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userFormData) => {
        const user = userFormData.user;
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(formData);
    form.restart();
  };

 

  const login = async (provider) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const formData = GoogleAuthProvider.formDataFromResult(result);
        const token = formData.accessToken;
        // The signed-in user info.
        const user = result.formData;
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.formData.email;
        // The AuthFormformData type that was used.
        const formData = GoogleAuthProvider.formDataFromError(error);
        // ...
      });

    setUser(formData);
    setIsLogin(true);
  
    // console.log(result);
  };

  const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
  const getFormErrorMessage = (meta) => {
    return (
      isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>
    );
  };

  const dialogFooter = (
    <div className="flex justify-content-center">
      <Button
        label="OK"
        className="p-button-text"
        autoFocus
        onClick={() => setShowMessage(false)}
      />
    </div>
  );

  return (
    <div className="form-demo">
      <Dialog
        visible={showMessage}
        onHide={() => setShowMessage(false)}
        position="top"
        footer={dialogFooter}
        showHeader={false}
        breakpoints={{ "960px": "80vw" }}
        style={{ width: "30vw" }}
      >
        <div className="flex align-items-center flex-column pt-6 px-3">
          <i
            className="pi pi-check-circle"
            style={{ fontSize: "5rem", color: "var(--green-500)" }}
          ></i>
          <h5>Login Successful!</h5>
        </div>
      </Dialog>

      <div className="flex justify-content-center">
        <div className="card">
          <h5 className="text-center">Login</h5>
          <Form
            onSubmit={onSubmit}
            initialValues={{
              name: "",
              email: "",
              password: "",
              accept: true,
            }}
            validate={validate}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit} className="p-fluid">
                <Field
                  name="email"
                  render={({ input, meta }) => (
                    <div className="field">
                      <span className="p-float-label p-input-icon-right">
                        <i className="pi pi-envelope" />
                        <InputText
                          id="email"
                          value={formData.email}
                          {...input}
                          className={classNames({
                            "p-invalid": isFormFieldValid(meta),
                          })}
                        />
                        <label
                          htmlFor="email"
                          className={classNames({
                            "p-error": isFormFieldValid(meta),
                          })}
                        >
                          Email*
                        </label>
                      </span>
                      {getFormErrorMessage(meta)}
                    </div>
                  )}
                />
                <Field
                  name="password"
                  render={({ input, meta }) => (
                    <div className="field">
                      <span className="p-float-label">
                        <Password
                          id="password"
                          value={formData.password}
                          {...input}
                          toggleMask
                          className={classNames({
                            "p-invalid": isFormFieldValid(meta),
                          })}
                        />
                        <label
                          htmlFor="password"
                          className={classNames({
                            "p-error": isFormFieldValid(meta),
                          })}
                        >
                          Password*
                        </label>
                      </span>
                    </div>
                  )}
                />

                <Button type="submit" label="Submit" className="mt-2" />

                <br></br>
              </form>
            )}
          />
          <div className="flex align-items-center justify-content-center">
            <div className="col-3">
              <Button
                icon="pi pi-google"
                className="p-button-rounded"
                aria-label="Google"
                onClick={() => login(google)}
              />
            </div>
            <div className="col-3">
              <Button
                icon="pi pi-github"
                className="p-button-rounded"
                aria-label="Github"
                onClick={() => {login(github)}}
              />
            </div>
            <div className="col-3">
              <Button
                icon="pi pi-microsoft"
                className="p-button-rounded"
                aria-label="Microsoft"
              />
            </div>
            <div className="col-3">
              <Button
                icon="pi pi-facebook"
                className="p-button-rounded "
                aria-label="Facebook"
                onClick={() => login(facebook)}
              />
            </div>
          </div>
          <div className="forgot-password-div">
            <Link
              className="forgot-password-link"
              to="/forgot"
              path="./src/func/forgot"
            >
              Forgot password?
            </Link>
          </div>
          <div className="signup-link-div">
            Need an account?{" "}
            <Link className="signup-link" to="/register">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;

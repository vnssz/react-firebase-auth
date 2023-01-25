import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Field } from "react-final-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { Checkbox } from "primereact/checkbox";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";
import { classNames } from "primereact/utils";


import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, google, facebook, github } from "../firebase";

export const Register = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    accept: false,
  });



  const validate = (data) => {
    let errors = {};

    if (!data.name) {
      errors.name = "Name is required.";
    }

    if (!data.email) {
      errors.email = "Email is required.";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
      errors.email = "Invalid email address. E.g. example@email.com";
    }

    if (!data.password) {
      errors.password = "Password is required.";
    }

    if (!data.accept) {
      errors.accept = "You need to agree to the terms and conditions.";
    }

    return errors;
  };

  const onSubmit = (data, form) => {
    setFormData(data);
    setShowMessage(true);
   createUserWithEmailAndPassword(auth, formData.email,formData.password)
     .then((userformData) => {
         const user = userformData.user;
       console.log(formData);
     })
     .catch((error) => {
       console.log(error);
     });
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
      });}

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
  const passwordHeader = <h6>Pick a password</h6>;
  const passwordFooter = (
    <React.Fragment>
      <Divider />
      <p className="mt-2">Suggestions</p>
      <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: "1.5" }}>
        <li>At least one lowercase</li>
        <li>At least one uppercase</li>
        <li>At least one numeric</li>
        <li>Minimum 8 characters</li>
      </ul>
    </React.Fragment>
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
          <h5>Registration Successful!</h5>
          <p style={{ lineHeight: 1.5, textIndent: "1rem" }}>
            Your account is registered under name <b>{formData.name}</b> ; it'll
            be valid next 30 days without activation. Please check{" "}
            <b>{formData.email}</b> for activation instructions.
          </p>
        </div>
      </Dialog>

      <div className="flex justify-content-center">
        <div className="card">
          <h5 className="text-center">Register</h5>
          <Form
            onSubmit={onSubmit}
            initialValues={{
              name: "",
              email: "",
              password: "",
              accept: false,
            }}
            validate={validate}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit} className="p-fluid">
                <Field
                  name="name"
                  render={({ input, meta }) => (
                    <div className="field">
                      <span className="p-float-label">
                        <InputText
                          id="name"
                          {...input}
                          autoFocus
                          className={classNames({
                            "p-invalid": isFormFieldValid(meta),
                          })}
                        />
                        <label
                          htmlFor="name"
                          className={classNames({
                            "p-error": isFormFieldValid(meta),
                          })}
                        >
                          Name*
                        </label>
                      </span>
                      {getFormErrorMessage(meta)}
                    </div>
                  )}
                />
                <Field
                  name="email"
                  render={({ input, meta }) => (
                    <div className="field">
                      <span className="p-float-label p-input-icon-right">
                        <i className="pi pi-envelope" />
                        <InputText
                          id="email"
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
                          {...input}
                          toggleMask
                          className={classNames({
                            "p-invalid": isFormFieldValid(meta),
                          })}
                          header={passwordHeader}
                          footer={passwordFooter}
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
                      {getFormErrorMessage(meta)}
                    </div>
                  )}
                />

                <Field
                  name="accept"
                  type="checkbox"
                  render={({ input, meta }) => (
                    <div className="field-checkbox">
                      <Checkbox
                        inputId="accept"
                        {...input}
                        className={classNames({
                          "p-invalid": isFormFieldValid(meta),
                        })}
                      />
                      <label
                        htmlFor="accept"
                        className={classNames({
                          "p-error": isFormFieldValid(meta),
                        })}
                      >
                        I agree to the terms and conditions*
                      </label>
                    </div>
                  )}
                />

                <Button type="submit" label="Submit" className="mt-2" />
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
                onClick={() => {
                  login(github);
                }}
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
          <div className="signin-link-div">
            Already have an account?{" "}
            <Link className="signin-link" to="/login">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

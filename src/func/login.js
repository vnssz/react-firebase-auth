import React, { useState } from "react";
import { Link } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { Form, Field } from "react-final-form";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { Password } from "primereact/password";

export const Login = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({});

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
    console.log(formData);
    form.restart();
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
              date: null,
              country: null,
              accept: false,
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
                <div className="flex align-items-center justify-content-center">
                  <div className="col-3">
                    <Button
                      icon="pi pi-google"
                      className="p-button-rounded"
                      aria-label="Google"
                    />
                  </div>
                  <div className="col-3">
                    <Button
                      icon="pi pi-github"
                      className="p-button-rounded"
                      aria-label="Github"
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
                    />
                  </div>
                </div>
              </form>
            )}
          />
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

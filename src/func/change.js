import React, { useState } from "react";
import { Divider } from "primereact/divider";
import { Dialog } from "primereact/dialog";
import { Form, Field } from "react-final-form";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";

const Change = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({});

  const onSubmit = (data, form) => {
    setFormData(data);
    setShowMessage(true);

    form.restart();
  };

  const validate = (data) => {
    let errors = {};
    if (!data.password) {
      errors.password = "Password is required.";
    }

    if (!data.confirm_password) {
      errors.confirm_password = "Confirm Password is required.";
    }
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
          <h5>Change Password Successful!</h5>
        </div>
      </Dialog>

      <div className="flex justify-content-center">
        <div className="card">
          <h5 className="text-center">Change Password</h5>
          <Form
            onSubmit={onSubmit}
            initialValues={{
              password: "",
              confirm_password: "",
            }}
            validate={validate}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit} className="p-fluid">
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
                  name="confirm_password"
                  render={({ input, meta }) => (
                    <div className="field">
                      <span className="p-float-label">
                        <Password
                          id="confirm_password"
                          {...input}
                          toggleMask
                          className={classNames({
                            "p-invalid": isFormFieldValid(meta),
                          })}
                          header={passwordHeader}
                          footer={passwordFooter}
                        />
                        <label
                          htmlFor="confirm_password"
                          className={classNames({
                            "p-error": isFormFieldValid(meta),
                          })}
                        >
                        Confirm Password*
                        </label>
                      </span> 
                      {getFormErrorMessage(meta)}
                    </div>
                  )}
                />
                <Button type="submit" label="Submit" className="mt-2" />
              </form>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default Change;

import React, { useState, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import Card from "./Card";
import Input from "../FormElements/Input";
import Spinner from "react-bootstrap/Spinner";
import Button from "../FormElements/Button";

import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../validators";
import ErrorModal from "../Modal/ErrorModal";
import { useForm } from "../hooks/form-hook";
import { useHttpClient } from "../hooks/http-hook";
import { AuthContext } from "../context/auth";
import "./Auth.css";

const Auth = (props) => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { sendRequest, error, clearError, isLoading } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  
  //Handler for switching Login/Signup.
  const switchModeHandler = (e) => {
    e.preventDefault();
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  //Handler for Submitting Login/Signup form.
  const authSubmitHandler = async (event) => {
    event.preventDefault();
    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/login`,
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        auth.login({
          uid: responseData.userId,
          item: responseData.items,
          wishlist: responseData.wishlist,
        });
        props.onClear();
      } catch (err) {}
    } else {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/signup`,
          "POST",
          JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        auth.login({
          uid: responseData.userId,
          item: responseData.items,
          wishlist: responseData.wishlist,
        });
        props.onClear();
      } catch (err) {}
    }
  };
  return (
    <React.Fragment>
      <Modal show={props.show} onHide={props.onClear}>
        <Card className="authentication">
          <Modal.Header closeButton>
            <Modal.Title>
              <h3 style={{ "margin-top": "1rem" }}>
                Login to continue shopping
              </h3>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={authSubmitHandler}>
              {!isLoginMode && (
                <Input
                  element="input"
                  id="name"
                  type="text"
                  label="Username"
                  placeholder="Your Name"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Please enter your name."
                  onInput={inputHandler}
                />
              )}
              <Input
                element="input"
                id="email"
                type="email"
                label="E-Mail"
                placeholder="E-mail Address"
                validators={[VALIDATOR_EMAIL()]}
                errorText="Please enter a valid email address."
                onInput={inputHandler}
              />
              <Input
                element="input"
                id="password"
                type="password"
                label="Password"
                placeholder="Password"
                validators={[VALIDATOR_MINLENGTH(6)]}
                errorText="Please enter a valid password, at least 6 characters."
                onInput={inputHandler}
              />
              <Button
                style={{ "margin-right": "0rem" }}
                type="submit"
                disabled={!formState.isValid}
              >
                {isLoading && <Spinner animation="grow" size="sm" />}
                {!isLoading && (isLoginMode ? "LOG IN" : "SIGN UP")}
                {isLoading && (isLoginMode ? "Logging in..." : "Signing up...")}
              </Button>
              <br />
              <br />
              <Button inverse onClick={switchModeHandler}>
                {isLoginMode
                  ? "Don't have an account yet"
                  : "Already have an account"}
              </Button>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onClear}>Close</Button>
          </Modal.Footer>
        </Card>
      </Modal>
      <ErrorModal error={error} onClear={clearError} />
    </React.Fragment>
  );
};

export default Auth;

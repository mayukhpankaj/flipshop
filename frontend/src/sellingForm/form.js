import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import Input from "../FormElements/Input";
import Button from "../FormElements/Button";
import ErrorModal from "../Modal/ErrorModal";
import LoadingSpinner from "../Loader/Loader";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_CRYPTO,
  VALIDATOR_INTEGER,
} from "../validators";
import ImageUpload from "../FormElements/ImageUpload";
import { useForm } from "../hooks/form-hook";
import { useHttpClient } from "../hooks/http-hook";
import { AuthContext } from "../context/auth";
import "./form.css";

const Form = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      product: {
        value: "",
        isValid: false,
      },
      price: {
        value: "",
        isvalid: false,
      },
      metamask_add: {
        value: "",
        isvalid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
      warranty_period: {
        value: null,
        isValid: false,
      },
    },
    false
  );
  const history = useHistory();

  const placeSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", formState.inputs.product.value);
      formData.append("lPrice", formState.inputs.price.value);
      formData.append("hPrice", formState.inputs.price.value);
      formData.append("Metamask_add", formState.inputs.metamask_add.value.toString());
      formData.append("description", formState.inputs.description.value);
      formData.append("image", formState.inputs.image.value);
      formData.append("creator",auth.userId);
      formData.append("warranty_period",formState.inputs.warranty_period.value);
      await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/items/create`, "POST", formData);
      history.push("/");
    } catch (err) {}
  };
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <div className="header">List Your Items <b>Here</b></div>
        <Input
          id="product"
          element="input"
          type="text"
          label="Product Name"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
        />
        <Input
          id="price"
          element="input"
          type="number"
          label="Price (in microether/szabo)"
          validators={[VALIDATOR_INTEGER()]}
          errorText="Please enter a valid number(an integer)"
          onInput={inputHandler}
        />
        <Input
          id="metamask_add"
          element="input"
          type="text"
          label="Crypto Wallet Address"
          validators={[VALIDATOR_CRYPTO(),VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid address"
          onInput={inputHandler}
        />
        <Input
          id="description"
          element="textarea"
          label=" Product Description"
          validators={[VALIDATOR_MINLENGTH(10)]}
          errorText="Please enter a valid description (at least 10 characters)."
          onInput={inputHandler}
        />
        <Input
          id="warranty_period"
          element="input"
          type="number"
          label="Warranty period (in months)"
          validators={[VALIDATOR_INTEGER()]}
          errorText="Please enter a valid number(an integer)"
          onInput={inputHandler}
        />
        <ImageUpload
          id="image"
          onInput={inputHandler}
          errorText="Please provide an image"
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD ITEM
        </Button>
      </form>
    </React.Fragment>
  );
};

export default Form;

import React from "react";
import { Field, reduxForm } from "redux-form";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";

const validate = values => {
  const errors = {};
  const requiredFields = ["username", "password", "confirmPassword", "email"];

  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });
  if (!values.password) {
    errors.password = "Please enter your password";
  }

  if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Your password not same";
  }
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = "Invalid email address";
  }
  return errors;
};

const renderTextField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <TextField
    label={label}
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
  />
);

const renderFromHelper = ({ touched, error }) => {
  if (!(touched && error)) {
    return;
  } else {
    return <FormHelperText>{touched && error}</FormHelperText>;
  }
};

const Form = props => {
  const { handleSubmit, pristine, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field name="username" component={renderTextField} label="username" />
      </div>
      <div>
        <Field name="password" component={renderTextField} label="password" />
      </div>
      <div>
        <Field
          name="confirmPassword"
          component={renderTextField}
          label="confirmPassword"
        />
      </div>
      <div>
        <Field name="email" component={renderTextField} label="email" />
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting}>
          Sign Up
        </button>
      </div>
    </form>
  );
};

export default reduxForm({ form: "Form", validate })(Form);

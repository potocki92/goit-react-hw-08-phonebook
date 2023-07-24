import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logIn, register } from 'redux/auth/operations';
import { Form, Label, TextWrapper } from './InputsForm.styled';
import { FormsLink } from 'components/LoginForm/LoginForm.styled';

const InputsForm = ({ onSubmit, buttonText, formType }) => {
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const { email, password, name } = form.elements;

    // W zależności od formType (login lub register), odpowiednio wywołujemy akcję
    if (formType === 'login') {
      dispatch(logIn({ email: email.value, password: password.value }));
    } else if (formType === 'register') {
      dispatch(register({ name: name.value, email: email.value, password: password.value }));
    }

    form.reset();
  };

  return (
    <Form onSubmit={handleSubmit}>
      {formType === 'register' && (
        <Label>
          Username:
          <input type="text" name="name" />
        </Label>
      )}
      <Label>
        Email:
        <input type="email" name="email" />
      </Label>
      <Label>
        Password:
        <input type="password" name="password" />
      </Label>
      <button type="submit">{buttonText}</button>
      {formType === 'login' ? (
        <TextWrapper>Don't have an account? <FormsLink to="/register">SignUp</FormsLink></TextWrapper>
      ) : (
        <TextWrapper>Do you have an account? <FormsLink to="/login">Log In</FormsLink></TextWrapper>
      )}
    </Form>
  );
};

export default InputsForm;

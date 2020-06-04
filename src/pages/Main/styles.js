import styled, { keyframes, css } from 'styled-components';

export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: row;

  input {
    flex: 1;
    border: 1px solid #eee;
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 16px;
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;


export const SubmitButton = styled.button.attrs( props => ({
  type: 'submit',
  disabled: props.loading
}))`
  background-color: #7159c1;
  border: 0;
  padding: 0 15px;
  margin-left: 10px;
  border-radius: 4px;

  display: flex;
  justify-content: center;
  align-items: center;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
    svg {
      animation: ${rotate} 2s ease-out infinite;
    }
  }

  /* ${props =>
    props.loading &&
    css`
    svg {
      animation: ${rotate} 2s linear infinite;
    }
  `} */
`;

export const RepoList = styled.ul`
  list-style: none;
  margin-top: 20px;

  li {
    padding: 15px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & + li {
      border-top: 1px solid #eee;
    }
  }


  li a {
    color: #7159c1;
    text-decoration: none;
    font-weight: bold;
    margin-left: 8px;
  }


  span {
    display: flex;
    align-items: center;
  }

  button {
    border: 0;
    background: none;
    margin-left: 8px;
    color: #7159c1;
    padding: 3px 5px;
    border-radius: 5px;
    font-weight: bold;
  }
`;

import styled from "styled-components";

export const StyledJoinGame = styled.div`
    
  .login-form {
    background: #fff;
    width: 500px;
    margin: 65px auto;
    display: flex;
    flex-direction: column;
    border-radius: 4px;
    box-shadow: 0 2px 25px rgba(0, 0, 0, 0.2);

    h1 {
      padding: 35px 35px 0 35px;
      font-weight: 300;
    }

    .content {
      padding: 35px;
      text-align: center;
    }

    .input-field {
      padding: 12px 5px;
      input {
        font-size: 16px;
        display: block;
        font-family: "Rubik", sans-serif;
        width: 100%;
        padding: 10px 1px;
        border: 0;
        border-bottom: 1px solid #747474;
        outline: none;
        transition: all 0.2s;
        &::placeholder {
          text-transform: uppercase;
        }

        &:focus {
          border-color: #222;
        }
      }
    }

    a.link {
      text-decoration: none;
      color: #747474;
      letter-spacing: 0.2px;
      text-transform: uppercase;
      display: inline-block;
      margin-top: 20px;
    }

    .action {
      display: flex;
      flex-direction: row;
      button {
        background: #3c4d6d;
        font-family: "Rubik", sans-serif;
        width: 100%;
        border: none;
        padding: 18px;
        cursor: pointer;
        text-transform: uppercase;
        color: #fafafa;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 0;
        letter-spacing: 0.2px;
        outline: 0;
        transition: all 0.3s;

        &:hover {
          background: #2d3b55;

        }s
      }
    }
  }
`;

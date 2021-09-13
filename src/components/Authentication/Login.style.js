import styled from "styled-components";


export const Button = styled.button`
  width: 100%;
  padding: 10px 0px;
  border-radius: 4px;
  box-sizing: border-box;
  background-color: #ff8081;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: #fff;
  border: none;
  outline: none;
  &:active,
  &:focus {
    outline: none;
    border: none;
  }
`;

export const Input = styled.input`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  color: #656565;
  position: relative;
  iwidth: 100%;
  padding-left: 15px;
  padding-right: 15px;
  align-self: center;
  margin: auto;
  height: 38px;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  -ms-border-radius: 4px;
  border-radius: 4px;
  border: 1px solid #c5c5c5 ;
  background-color: #ffffff;
  font-weight: 400;
  box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  line-height: 1;
  color: #656565 ;
`
import styled from 'styled-components/native';

export const LoginViewer = styled.View`
    text-align: center;
    top: -3rem;
    
`;

export const LoginLogo = styled.Image`
    width: 200px;
    height: 200px;
    margin-left: auto;
    margin-right: auto;
`;
export const LoginInputViewer = styled.View`
  top: -1.25rem;
`;

export const LoginInput = styled.TextInput`
  height: 50px;
  border: 1px solid #ccc;
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 5px;
  background-color: #fff;
  bottom: -0.625rem;
`;


export const LoginButton = styled.TouchableOpacity`
  height: 50px;
  width: 100px;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid #ccc;
  border-radius: 7px;
  background-color: #007BFF;
  justify-content: center;
  align-items: center;
`;

export const RegisterButton = styled.TouchableOpacity`
  height: 50px;
  width: 200px;
  margin-left: auto;
  margin-right: auto;
`;

export const TextRegister = styled.Text`
    font-weight: bold;
    text-align: center;
    margin-top: 10px;
    fontFamily: 'Open_Sans_Light';
`;

export const LoginErrorText = styled.Text`
  color: red;
  text-align: center;
  margin-top: 10px;
`;

export const HorizontalLine = styled.View`
  height: 1px;
  background-color: #ccc;
  margin: 20px 0;
  width: 100%;
`;


import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

const GlobalStyle = createGlobalStyle`
${reset}
* {
  box-sizing: border-box;
}

input {
  all: unset;
  box-sizing: border-box;
  appearance: none;
}

body {
   //background-color: black; 
  
  font-size: 14px;
  font-family: 'Noto Sans KR', sans-serif;
  // color: white; 
}

button {
  border:none;
}

a {
  text-decoration: none;
  color: inherit;
}

form {
  width: 100%;
}

.nweet-input::placeholder {
  color: white;
  opacity: 0.9;
}

.container {
  width: 100%;
  max-width: 320px;
  display: flex;
  flex-direction: column;
}

.formInput {
  width: 100%;
  padding: 10px 20px;
  border-radius: 20px;
  border: 1px solid black;
  text-align: center;
  background-color: white;
  color: black;
}

.formBtn {
  cursor: pointer;
  width: 100%;
  padding: 7px 20px;
  text-align: center;
  color: white;
  border-radius: 20px;
  background-color: orange;
  cursor: pointer;
}

.cancelBtn {
  cursor: pointer;
  background-color: tomato;
}



/* Nwitter Factory */

.factoryForm {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.factoryInput__container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
  margin-bottom: 20px;
  width: 100%;
}

.factoryInput__input {
  flex-grow: 1;
  height: 40px;
  padding: 0px 20px;
  /* color: white; */
  border: 1px solid #04aaff;
  border-radius: 20px;
  font-weight: 500;
  font-size: 12px;
}

.factoryInput__arrow {
  position: absolute;
  right: 0;
  background-color: #04aaff;
  height: 40px;
  width: 40px;
  padding: 10px 0px;
  text-align: center;
  border-radius: 20px;
  color: white;
}

.factoryInput__label {
  color: #04aaff;
  cursor: pointer;
}

.factoryInput__label span {
  margin-right: 10px;
  font-size: 12px;
}

.factoryForm__attachment {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
}

.factoryForm__attachment img {
  height: 100%;
  width: 100%;
  border-radius: 5px;
  margin-bottom:10px;
}

.factoryForm__clear {
  color: orange;
  cursor: pointer;
  text-align: center;
  margin-bottom:20px;
  position: absolute;
    top: -15px;
    right: 0;
}

.factoryForm__clear span {
  margin-right: 10px;
  font-size: 12px;
}

/* Nweet */

.nweetEdit .formBtn {
  cursor: pointer;
  margin-top: 15px;
  margin-bottom: 5px;
}

/* .nweet {
  margin-bottom: 20px;
  background-color: white;
  width: 100%;
  max-width: 320px;
  padding: 20px;
  border-radius: 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  color: rgba(0, 0, 0, 0.8);
}

.nweet h4 {
  font-size: 14px;
} */

.tweetImg {
  border-radius: 5px;
  width: 100%;
  height: 100%;
  margin-top: 10px;
}
.profileImg {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin-top: 10px;
}

.nweet__actions {
  position: absolute;
  right: 10px;
  top: 19px;
}

.nweet__actions span {
  cursor: pointer;
}

.nweet__actions span:first-child {
  margin-right: 10px;
}



/* AuthForm */

.authInput {
  max-width: 320px;
  width: 100%;
  padding: 10px;
  border-radius: 30px;
  background-color: rgba(255, 255, 255, 1);
  margin-bottom: 10px;
  border: 1px solid orange;
  font-size: 12px;
  color: black;
}

.authSubmit {
  text-align: center;
  background: orange;
  color: white;
  margin-top: 10;

lhk3337 on 30 Sep
margin-top: 10px;

  cursor: pointer;
}

.authError {
  color: tomato;
  text-align: center;
  font-weight: 500;
  font-size: 12px;
}

.authSwitch {
  color: orange;
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 50px;
  display: block;
  font-size: 12px;
  text-decoration: underline;
}
`

export default GlobalStyle

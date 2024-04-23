import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  /* 버튼에 대한 기본 스타일 */
  padding: 10px 20px;
  background-color: ${props => props.backgroundColor};
  color: #000;
  border: ${props => (props.hasBorder ? "1px solid #e4e9f1" : "none")};
  border-radius: 6px;
  cursor: pointer;
  display: block;
  width: 100%;

  /* 배경 이미지 스타일 */
  background-image: url(${props => props.backgroundImage});
  background-size: 15px;
  background-position: center left;
  background-repeat: no-repeat;

  /* 버튼 텍스트 스타일 */
  font-size: 13px;
  font-weight: bold;
  text-align: center;

  /* hover 효과 스타일 */
  /* &:hover {
    background-color: #40a9ff;
  } */

  /* disabled 상태 스타일 */
  &:disabled {
    background-color: #d9d9d9;
    cursor: not-allowed;
  }
`;

const MyButton = ({ backgroundImage, text, ...rest }) => {
  return (
    <StyledButton {...rest} backgroundImage={backgroundImage}>
      {text}
    </StyledButton>
  );
};

export default MyButton;

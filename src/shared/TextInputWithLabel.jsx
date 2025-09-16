import React, { forwardRef } from "react";
import styled from "styled-components";

const StyledLabel = styled.label`
  font-weight: bold;
  margin-right: 0.5rem;
`;

const StyledInput = styled.input`
  padding: 0.25rem 0.5rem;
`;

const TextInputWithLabel = forwardRef(
  ({ label, elementId, value, onChange }, ref) => {
    return (
      <>
        <StyledLabel htmlFor={elementId}>{label}</StyledLabel>
        <StyledInput
          type="text"
          id={elementId}
          ref={ref}
          value={value}
          onChange={onChange}
        />
      </>
    );
  }
);

export default TextInputWithLabel;

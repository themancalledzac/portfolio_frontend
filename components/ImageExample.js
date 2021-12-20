import Image from "next/image";
import React from "react";
import styled from "styled-components";

const StyledImage = styled(Image)`
  border-radius: 7px;
`;

const ImageExample = ({ test }) => {
  if (!test) return null;
  return (
    <div>
      <StyledImage src={test} width='400px' height='400' />
    </div>
  );
};

export default ImageExample;

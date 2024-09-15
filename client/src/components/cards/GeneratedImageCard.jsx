import { CircularProgress } from "@mui/material";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  flex: 1;
  padding: 16px;
  border: 2px dashed ${({ theme }) => theme.white + 90};
  color: ${({ theme }) => theme.arrow + 80};
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;

  @media (max-width: 600px) {
    min-height: 350px; 
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.black + 50};
  border-radius: 18px;
  object-fit: cover;

  @media (max-width: 600px) {
    border-radius: 10px;
    object-fit: contain;
  }
`;

const GeneratedImageCard = ({ src, loading }) => {
  return (
    <Container>
      {loading ? (
        <>
          <CircularProgress
            sx={{ color: "inherit", width: "24px", height: "24px" }}
          />
          Generating Your Image . . .
        </>
      ) : src ? (
        <Image src={src} />
      ) : (
        <>Write a prompt to generate image</>
      )}
    </Container>
  );
};

export default GeneratedImageCard;

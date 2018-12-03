import React from "react";
import styled from "styled-components";
import BandSearch from "./components/BandSearch";
import { COLORS } from "./constants";
import "./App.css";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  width: 100%;
`;

export const Title = styled.h2`
  color: ${COLORS.BLUE};
`;

const App = () => (
  <Wrapper>
    <Title>Search your bands in town</Title>
    <BandSearch />
  </Wrapper>
);

export default App;

import React, { Component } from "react";
import styled from "styled-components";
import BandDetail from "./BandDetail";
import Loader from "./Loader";
import { fetchData } from "../utils/fetchData";
import { COLORS, DESKTOP } from "../constants";
import isEmpty from "lodash/isEmpty";

const InputSearchWrapper = styled.div`
  display: flex;
  width: 100%;

  @media ${DESKTOP} {
    width: 70%;
  }
`;

const Input = styled.input`
  width: 100%;
  margin: 0;
  padding: 20px 10px 20px;
  border: none;
  outline: none;
  color: ${COLORS.WHITE};
  background-color: ${COLORS.BLUE};
  font-size: 20px;

  ::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: ${COLORS.WHITE};
    opacity: 1; /* Firefox */
  }

  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: ${COLORS.WHITE};
  }

  ::-ms-input-placeholder {
    /* Microsoft Edge */
    color: ${COLORS.WHITE};
  }
`;

const Button = styled.button`
  outline: none;
  font-size: 18px;
  border: none;
  border-left: 2px solid ${COLORS.WHITE};
  color: ${COLORS.WHITE};
  background-color: ${props => (props.disabled ? COLORS.GREY : COLORS.BLUE)};
  box-shadow: none;
  cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
  transition: all 0.1s ease-in-out;

  &:hover {
    color: ${COLORS.WHITE};
    ${props => !props.disabled && `
      background-color: ${COLORS.YELLOW};
    `}
  }

  @media ${DESKTOP} {
    min-width: 150px;
  }
`;

class BandSearch extends Component {
  state = {
    inputValue: "",
    dataIsLoading: false,
    band: JSON.parse(sessionStorage.getItem('band'))
  };

  handleChange = event => {
    this.setState({ inputValue: event.target.value });
  };

  handleButtonClick = () => {
    const { inputValue } = this.state;

    this.setState({ dataIsLoading: true });
    this.getBandData(inputValue);
  };

  /**
   * Method to await multiple Promises concurrently
   * and get the artist data with the list of his events.
   * @param bandName
   * @returns {Promise<*>}
   */
  getBandData = async (bandName) => {
    try {
      const [artist, events] = await Promise.all([
        fetchData(`${bandName}?app_id=34`),
        fetchData(`${bandName}/events?app_id=34`)
      ]);

      const band = {artist, events};
      this.setState({ band, dataIsLoading: false });

      /* Save data to sessionStorage so they gets cleared only when the page session ends. */
      sessionStorage.setItem('band', JSON.stringify(band));
    } catch (e) { return e }
  };

  render() {
    const { inputValue, dataIsLoading, band } = this.state;

    return (
      <React.Fragment>
        <InputSearchWrapper>
          <Input
            placeholder="Search..."
            type="text"
            onChange={this.handleChange}
            value={inputValue}
          />
          <Button onClick={this.handleButtonClick} disabled={!inputValue.length}>
            Search
          </Button>
        </InputSearchWrapper>
        {dataIsLoading && <Loader/>}
        {!dataIsLoading && !isEmpty(band) && <BandDetail band={band} />}
      </React.Fragment>
    );
  }
}

export default BandSearch;

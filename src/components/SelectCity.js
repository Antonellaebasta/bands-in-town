import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { COLORS, DESKTOP } from "../constants";
import kebabCase from "lodash/kebabCase";

const SelectCityWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;

  @media ${DESKTOP} {
    flex-direction: row;
    align-items: center;
  }
`;

export const Select = styled.select`
  min-height: 34px;
  width: 100%;
  margin: 0;
  padding: 6px;
  border: none;
  outline: none;
  appearance: none;
  border-radius: 0;
  border-bottom: 3px solid ${COLORS.YELLOW};
  background-color: transparent;
  color: ${COLORS.DARK_GREY};
  font-size: 16px;
  cursor: pointer;

  @media ${DESKTOP} {
    margin-left: 20px;
    width: auto;
  }
`;

class SelectCity extends React.Component {
  /**
   * To get the list of the cities, without duplications,
   * from the array of events.
   * @param events
   * @returns {Array}
   */
  getCities = events => {
    return events.reduce(
      (acc, event) =>
        acc.includes(event.venue.city) ? acc : [...acc, event.venue.city],
      []
    );
  };

  onSelectChange = e => {
    this.props.handleSelectCity(e.target.value);
  };

  render() {
    const { events } = this.props;

    return (
      <SelectCityWrapper>
        <p>Filter by City:</p>
        <Select onChange={this.onSelectChange}>
          <option value="">All</option>
          {this.getCities(events).map(city => (
            <option key={kebabCase(city)} value={kebabCase(city)}>
              {city}
            </option>
          ))}
        </Select>
      </SelectCityWrapper>
    );
  }
}

SelectCity.propTypes = {
  events: PropTypes.array.isRequired,
  handleSelectCity: PropTypes.func
};

SelectCity.defaultProps = {
  handleSelectCity: () => {}
};

export default SelectCity;

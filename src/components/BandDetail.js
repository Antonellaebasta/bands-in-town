import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { COLORS, DESKTOP } from "../constants";
import facebookIcon from "./icons/facebook.svg";
import moment from "moment";
import kebabCase from "lodash/kebabCase";

const BandWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 30px;

  @media ${DESKTOP} {
    width: 70%;
  }
`;

const Message = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: ${COLORS.DARK_GREY};
`;

const Artist = styled.div`
  background-color: ${COLORS.YELLOW};
  color: ${COLORS.WHITE};

  @media ${DESKTOP} {
    display: inline-flex;
    width: 100%;
  }
`;

const Info = styled.div`
  display: block;
  padding: 0 20px 20px;
`;

const ArtistImage = styled.img`
  width: 100%;
  background-color: ${COLORS.GREY};

  @media ${DESKTOP} {
    max-width: 300px;
  }
`;

const Events = styled.div`
  display: block;
  width: 80%;
  margin-bottom: 30px;

  @media ${DESKTOP} {
    width: 100%;
  }
`;

const Event = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${COLORS.BLUE};
  padding: 5px 0;

  &:last-child {
    border-bottom: none;
  }
`;

const EventDate = styled.span`
  width: 40px;
  height: 40px;
  padding: 10px;
  text-align: center;
  color: ${COLORS.WHITE};
  background-color: ${COLORS.BLUE};
  font-weight: bold;
`;

const EventInfo = styled.div`
  display: block;
  margin-left: 20px;
  max-width: 80%;
`;

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

const SelectCity = styled.select`
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

class BandDetail extends Component {
  state = {
    citySelected: ""
  };

  handleChange = e => {
    this.setState({ citySelected: e.target.value });
  };

  render() {
    const { citySelected } = this.state;
    const {
      band: { artist, events }
    } = this.props;
    const cities =
      events.length &&
      events.reduce(
        (acc, event) =>
          acc.includes(event.venue.city) ? acc : [...acc, event.venue.city],
        []
      );
    const filteredEvents =
      events.length && citySelected.length
        ? events.filter(event => kebabCase(event.venue.city) === citySelected)
        : events;

    return (
      <BandWrapper>
        {artist.error ? (
          <Message>Ops, band not found.</Message>
        ) : (
          <React.Fragment>
            <Artist>
              <ArtistImage src={artist.thumb_url} alt={artist.name} />
              <Info>
                <h2>{artist.name}</h2>
                {artist.facebook_page_url && (
                  <a href={artist.facebook_page_url} target="_blank">
                    <img
                      src={facebookIcon}
                      alt={`Profile Facebook ${artist.name}`}
                    />
                  </a>
                )}
              </Info>
            </Artist>
            {filteredEvents.length ? (
              <Events>
                <Message>
                  {artist.name} has {artist.upcoming_event_count} events in
                  town
                </Message>
                {cities.length && (
                  <SelectCityWrapper>
                    <p>Filter by City:</p>
                    <SelectCity onChange={this.handleChange}>
                      <option value="">All</option>
                      {cities.map(city => (
                        <option key={kebabCase(city)} value={kebabCase(city)}>
                          {city}
                        </option>
                      ))}
                    </SelectCity>
                  </SelectCityWrapper>
                )}
                {filteredEvents.map(event => (
                  <Event key={event.id}>
                    <EventDate>
                      {moment(event.datetime).format(" DD MMM")}
                    </EventDate>
                    {event.venue && (
                      <EventInfo>
                        <h4>{event.venue.name}</h4>
                        <p>
                          {event.venue.city} - {event.venue.country}
                        </p>
                      </EventInfo>
                    )}
                  </Event>
                ))}
              </Events>
            ) : (
              <Message>{artist.name} has 0 events in town.</Message>
            )}
          </React.Fragment>
        )}
      </BandWrapper>
    );
  }
}
BandDetail.propTypes = {
  band: PropTypes.shape({
    artist: PropTypes.object,
    events: PropTypes.array
  }).isRequired
};

export default BandDetail;

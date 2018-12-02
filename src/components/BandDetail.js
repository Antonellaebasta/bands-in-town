import React from "react";
import styled from "styled-components";
import { COLORS, DESKTOP } from "../constants";
import facebookIcon from "./icons/facebook.svg";
import moment from "moment";

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
  
  > div {
    display: flex;
    align-items: center;
    border-bottom: 1px solid ${COLORS.BLUE};
    padding: 5px 0;
    
    &:last-child {
      border-bottom: none;
    }
  }
  
  @media ${DESKTOP} {
    width: 100%;
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
`;

const BandDetail = ({ band: { artist, events } }) => (
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
        {events.length ? (
          <Events>
            <Message>{artist.name} has {artist.upcoming_event_count} events in town:</Message>
            {events.map(event => (
              <div key={event.id}>
                <EventDate>{moment(event.datetime).format(" DD MMM")}</EventDate>
                {event.venue && (
                  <EventInfo>
                    <h4>{event.venue.name}</h4>
                    <p>{event.venue.city} - {event.venue.country}</p>
                  </EventInfo>
                )}
              </div>
            ))}
          </Events>
        ) : (
          <Message>{artist.name} has 0 events in town.</Message>
        )}
      </React.Fragment>
    )}
  </BandWrapper>
);

export default BandDetail;

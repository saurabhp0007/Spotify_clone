import React, { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from "../utils/Constants";

export default function CurrentTrack() {
  const [{ token, currentPlaying }, dispatch] = useStateProvider();

  useEffect(() => {
    const getCurrentTrack = async () => {
      try {
        const response = await axios.get(
          "https://api.spotify.com/v1/me/player/",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        // Check if the response has data
        if (response.data !== "") {
          const currentPlaying = {
            id: response.data.item.id,
            name: response.data.item.name,
            artists: response.data.item.artists.map((artist) => artist.name),
            image: response.data.item.album.images[2].url,
          };
          dispatch({ type: reducerCases.SET_PLAYING, currentPlaying });
        } else {
          // No data in the response
          dispatch({ type: reducerCases.SET_PLAYING, currentPlaying: null });
        }
      } catch (error) {
        console.error("Error fetching current track:", error.message);
        console.error("Response data:", error.response.data);
        console.error("Status code:", error.response.status);
        // Handle the error as needed
      }
    };

    // Ensure token is valid before making the request
    if (token) {
      getCurrentTrack();
    }
  }, [token, dispatch]);

  return (
    <Container>
      {currentPlaying && (
        <div className="track">
          <div className="track__image">
            <img src={currentPlaying.image} alt="currentPlaying" />
          </div>
          <div className="track__info">
            <h4 className="track__info__track__name">{currentPlaying.name}</h4>
            <h6 className="track__info__track__artists">
              {currentPlaying.artists.join(", ")}
            </h6>
          </div>
        </div>
      )}
    </Container>
  );
}

const Container = styled.div`
  .track {
    display: flex;
    align-items: center;
    gap: 1rem;

    &__image {
      // Add styling for track image if needed
    }

    &__info {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;

      &__track__name {
        color: white;
      }

      &__track__artists {
        color: #b3b3b3;
      }
    }
  }
`;
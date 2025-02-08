import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { SPACING } from "../constants";
import Card from "./Card";
import { BASE_FETCH_URL } from '../config.js';
axios.defaults.baseURL = BASE_FETCH_URL;

const Container = styled.div`
  flex: 2;
  @media only screen and (max-width: 700px) {
    display: block;
  margin-top: ${SPACING.l}px;
      }
`;

const Recommendation = ({ tags }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`/videos/tags?tags=${tags}`);
      setVideos(res.data);
    };
    fetchVideos();
  }, [tags]);

  return (
    <Container>
      {videos.map((video) => (
        <Card type="sm" key={video._id} video={video} />
      ))}
    </Container>
  );
};

export default Recommendation;
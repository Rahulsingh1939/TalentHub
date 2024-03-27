import React from "react";
import Title from "../../Components/Title";
import { useSelector } from "react-redux";
import VideoState from "../../context/Video/VideoState";
import Video from "../../Components/video/Video";

const UserInterview = () => {
  const { user } = useSelector((state) => state.users);
  return (
    <>
      <VideoState>
        <Title title={"Interview"}></Title>
        <Video />
      </VideoState>
    </>
  );
};

export default UserInterview;

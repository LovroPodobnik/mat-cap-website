import React from 'react'
import styled from 'styled-components'

const VideoContainer = styled.div`
  position: relative;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  height: 0;
  overflow: hidden;
  margin-bottom: 2rem;
`

const Video = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const VideoSection = ({ posterSrc, videoSrc }) => {
  return (
    <VideoContainer>
      <Video poster={posterSrc} controls>
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </Video>
    </VideoContainer>
  )
}

export default VideoSection
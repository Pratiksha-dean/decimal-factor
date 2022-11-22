import React from "react";
import LoadingOverlay from 'react-loading-overlay'
import Loaderspinnerinner from './loader-spinner-inner'
import styled, { css } from "styled-components";

const DarkBackground = styled.div`
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 999; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */

  ${props =>
    props.disappear &&
    css`
      display: block; /* show */
    `}
`;

export default function Loaderspinner({ active=true, size="60px", toDisappear=true }) {
    return (
      <>
       <DarkBackground disappear={toDisappear}>
       <LoadingOverlay
        active={active}
        styles={{}}
        className="loading-overlay-custom"
        // styles={{overlay: (base) => ({
        //   ...base,
        //   background: 'rgba(100, 100, 100, 100, 0.5)'
        // })}}
        spinner={<Loaderspinnerinner size={size} />}
      >
      </LoadingOverlay>
      </DarkBackground>
      </>
      
    )
  }
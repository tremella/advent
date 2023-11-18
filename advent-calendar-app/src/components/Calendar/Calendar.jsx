import React, { useState } from 'react';
import Day from './Day';
import Modal from 'react-modal';
import styled from 'styled-components';


const CalendarContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* Adjust the number of columns as needed */
  gap: 10px; /* Adjust the gap between squares */
`;
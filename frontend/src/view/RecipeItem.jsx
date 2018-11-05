import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import {
  BORDER_COLOUR,
  BACKGROUND_WHITE,
} from 'view/definitions';

import Header from 'view/basic/Header';

const Item = styled.div`
  padding: 1em;
  margin: 1em;
  border: 1px solid ${BORDER_COLOUR};
  background: ${BACKGROUND_WHITE};
`;

export default ({ href, name, servesFrom, servesTo }) => {
  return (
    <Link to={href}>
      <Item>
        <Header>{name}</Header>        
      </Item>
    </Link>
  );
};

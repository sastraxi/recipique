import React from 'react';
import styled from 'styled-components';
import { interpStep } from 'util/step';

import {
  BORDER_COLOUR,
  COLOURED_HEADER,
} from 'view/definitions';

const Numeral = styled.b`
  color: ${COLOURED_HEADER};
  font-size: 2em;
  width: 2em;
  float: left;
  font-weight: normal;

  &:after {
    content: '.';
  }
`;

const Item = styled.div`
  & + & {
    padding-top: 1em;
    border-top: 1px dashed ${BORDER_COLOUR};
    margin-top: 1em;
  }
`;

export default (props) => {
  const { optional, ordinal, ...step } = props;
  return (
    <Item>
      <Numeral>{ordinal}</Numeral>
      <p>{interpStep(step)}</p>
      { optional && <i>This step is optional</i> }
    </Item>
  );
};

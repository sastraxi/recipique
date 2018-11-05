import styled from 'styled-components';

import {
  BORDER_COLOUR,
  BACKGROUND_WHITE,
} from 'view/definitions';

const Card = styled.div`
  margin: 0;
  padding: 2em;
  box-shadow: 0.1em 0.1em 1.5em rgba(0, 0, 0, 0.2);
  border: 1px solid ${BORDER_COLOUR};
  background: ${BACKGROUND_WHITE};
`;

export default Card;

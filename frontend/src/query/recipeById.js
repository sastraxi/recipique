import gql from 'graphql-tag';

export default gql`
  query($id: Int!) {
    recipeById(id: $id) {
      name
      servesFrom
      servesTo
      steps {
        ordinal
        text
        optional
        local {
          key
          value
        }
      }
    }
  }
`;


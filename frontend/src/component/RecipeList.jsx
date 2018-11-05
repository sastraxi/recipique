import React from 'react';
import gql from 'graphql-tag';

import client from 'util/apollo';
import LoadingIndicator from 'view/LoadingIndicator';
import RecipeItem from 'view/RecipeItem';

class RecipeList extends React.Component {
  state = {
    recipes: null,
  };

  async componentDidMount() {
    const response = await client.query({
      query: gql`
        query {
          recipes {
            id
            name
            servesFrom
            servesTo
          }
        }
      `,
    });
    if (response.data) {
      const { recipes } = response.data;
      this.setState({ recipes });
    }
  }

  render() {
    const { recipes } = this.state;
    return (
      <div>
        { !recipes && <LoadingIndicator /> }
        { recipes && recipes.map(r => (
            <RecipeItem {...r} href={`/${r.id}`} key={r.id} />
          )) }
      </div>
    );
  }
}

export default RecipeList;

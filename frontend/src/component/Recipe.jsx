import React from 'react';
import gql from 'graphql-tag';

import client from 'util/apollo';

import LoadingIndicator from 'view/LoadingIndicator';
import RecipeStep from 'view/RecipeStep';

import Container from 'view/basic/Container';
import Card from 'view/basic/Card';
import Header from 'view/basic/Header';

class Recipe extends React.Component {
  state = {
    recipe: null,
  };

  async componentDidMount() {
    const response = await client.query({
      query: gql`
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
      `,
      variables: {
        id: +this.props.match.params.id,
      }
    });
    if (response.data) {
      const { recipeById } = response.data;
      this.setState({ recipe: recipeById });
    }
  }

  render() {
    const { recipe } = this.state;
    if (!recipe) {
      return <LoadingIndicator />;
    }
    return (
      <Container>
        <Card>
          <Header>{recipe.name}</Header>
          { recipe.steps.map((s, i) => <RecipeStep key={i} {...s} /> ) }
        </Card>
      </Container>
    );
  }
}

export default Recipe;

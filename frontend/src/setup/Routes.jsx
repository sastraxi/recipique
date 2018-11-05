import React from 'react';
import { Switch, Route } from 'react-router-dom';

import RecipeList from 'component/RecipeList';
import Recipe from 'component/Recipe';

export default () => (
  <Switch>
    <Route path="/" exact component={RecipeList} />
    <Route path="/:id" exact component={Recipe} />
  </Switch>
);

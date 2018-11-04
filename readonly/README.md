A read-only backend variant for testing recipique.

No transactions may be committed against the database. Task queue and gql (apollo) server available.

Any library methods marked `@sideEffect(identifier)` in "backend" will not be executed, and will instead return a Promise that resolves to null (by default; can be overridden).

The same holds through for tasks popped off the "Task Queue". By default all tasks will be executed; if we wish to prevent a task from being executed, we can use `task.intercept`:

```js
test('signup flow'): async (done) => {
  let capturedEmail = false;
  let preventedGeoip = false;
  const checkDone = () => {
    if (capturedEmail && preventedGeoip) {
      done();
    }
  }

  const email = fake.email();
  const password = fake.password();
  const { data: signupData } = graphql(`
    mutation signup(
      $email: String!,
      $password: String!,
      $confirm: String!
    ) {
      signup(
        email: $email,
        password: $password,
        confirm: $confirm
      ) {
        id
      }
    }
  `, { email, password, confirm: password });

  sideEffect('geoip', (args) => {
    preventedGeoip = true;
    checkDone();
  })

  task.intercept('email', {
    /**
     * Receives the task's arguments as its own;
     * return true iff you would like to intercept this task.
     */
    selector: template => template === 'signup-confirm',
  }, (
    template,
    recipient,
    userId,
    ...rest
  ) => {
    expect(recipient).toBe(email);
    expect(userId).toBe(signupData.id);
    capturedEmail = true;
    checkDone();

    // task return value; returning undefined will return
    // either the real task's return value, or undefined if
    // options.executeTask (above) resolved to false for this task.
    return true;
  });
}
```

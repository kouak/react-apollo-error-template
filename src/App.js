import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import Repro from './Repro';

class App extends Component {
  render() {
    return (
      <main>
        <header>
          <h1>Apollo Client Error Template</h1>
          <p>
            This is a template that you can use to demonstrate an error in Apollo Client.
            Edit the source code and watch your browser window reload with the changes.
          </p>
          <p style={{
            backgroundColor: 'powderblue',
            padding: 16,
          }}>
            First, I added a 500ms delay to the resolver to simulate a slow GQL backend.<br />
            Then, we have 2 gql component with a 5 seconds poll interval<br />
            Keep hitting the <b>Generate random props</b> button until the first component goes red.<br />
          </p>
        </header>
        <Repro />
      </main>
    );
  }
}

export default App;

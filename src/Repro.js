import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose } from 'recompose';
import R from 'ramda';

const VisualWrapper = ({ children, backgroundColor = 'aquamarine' }) => (
  <div
    style={{
      padding: 20,
      display: 'inline-block',
      backgroundColor,
    }}
  >
    {children}
  </div>
);

class Repro extends React.Component {
  render() {
    const {
      data,
      loading,
      viewer,
      externalProp,
    } = this.props;

    return (
      <VisualWrapper backgroundColor={data.loading ? 'indianred' : undefined}>
        ExternalProp: {externalProp}<br />
        data:<br />
        <pre>
          {JSON.stringify(data, null, 2)}
        </pre>
      </VisualWrapper>
    );
  }
}

const IrrelevantQuery = gql`
  query IrrelevantQuery {
    people {
      name
    }
  }
`;

const withGqlQuery = graphql(IrrelevantQuery, {
  props: ({ data }) => ({
    data,
    loading: R.propOr(false, 'loading', data),
    viewer: R.pathOr(null, ['people', 'name'], data),
  }),
  options: {
    pollInterval: 5000,
  },
});

const GqlRepro = withGqlQuery(Repro);


class PropChanger extends React.Component {
  state = {
    randomInt: 1,
  };

  generateRandomInt = () => {
    this.setState({
      randomInt: Math.floor(Math.random() * 1000),
    });
  };

  triggerForceUpdate = () => {
    this.forceUpdate();
  };


  render() {
    const {
      randomInt,
    } = this.state;

    return (
      <div style={{padding: 50, backgroundColor: '#FFF'}}>
        <div>
          <button onClick={this.generateRandomInt}>
            Generate random props
          </button>
          <button onClick={this.triggerForceUpdate}>
            Force update
          </button>
        </div>
        <div>
          <h3>With external prop</h3>
          <GqlRepro externalProp={randomInt} />
        </div>
        <div>
          <h3>Without external prop</h3>
          <GqlRepro />
        </div>
      </div>
    );
  }
}

export default PropChanger;

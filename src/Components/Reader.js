import React, { Component } from 'react';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import styles from './Reader.module.css';
import items from './publications.json';
import Publication from './Publication/Publication';
import Counter from './Counter/Counter';
import Controls from './Controls/Controls';

const getItemsFromLocation = location =>
  queryString.parse(location.search).item;

const type = {
  TRUE: true,
  FALSE: false,
};

export default class Reader extends Component {
  // eslint-disable-next-line no-shadow
  constructor(items) {
    super(items);
    this.state = {
      counter: 1,
      backBtnDisabled: true,
      forvardBtnDisabled: false,
    };
  }

  componentDidMount() {
    // eslint-disable-next-line react/destructuring-assignment
    const parse = Number(getItemsFromLocation(this.props.location));
    this.setState({
      counter: parse,
      backBtnDisabled: parse === 1 ? type.TRUE : type.FALSE,
      forvardBtnDisabled: parse === items.length ? type.TRUE : type.FALSE,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { counter } = this.state;
    const { history, location } = this.props;
    if (prevState.counter !== counter) {
      history.push({
        ...location,
        search: `item=${counter}`,
      });
    }
  }

  handleIncrement = () => {
    this.setState(prevState => ({
      counter: prevState.counter + 1,
      backBtnDisabled: prevState.counter === 1 && !prevState.backBtnDisabled,
      forvardBtnDisabled:
        prevState.counter === items.length - 1 && !prevState.forvardBtnDisabled,
    }));
  };

  handleDecrement = () => {
    this.setState(prevState => ({
      counter: prevState.counter - 1,
      backBtnDisabled: prevState.counter === 2 && !prevState.backBtnDisabled,
      forvardBtnDisabled:
        prevState.counter === items.length && !prevState.forvardBtnDisabled,
    }));
  };

  render() {
    const { counter } = this.state;
    const { backBtnDisabled, forvardBtnDisabled } = this.state;
    return (
      <div className={styles.reader}>
        <Publication currentItem={counter} items={items} />
        <Counter currentItem={counter} items={items} />
        <Controls
          onIncrement={this.handleIncrement}
          onDecrement={this.handleDecrement}
          backBtnDisabled={backBtnDisabled}
          forvardBtnDisabled={forvardBtnDisabled}
        />
      </div>
    );
  }
}
Reader.propTypes = {
  location: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
};

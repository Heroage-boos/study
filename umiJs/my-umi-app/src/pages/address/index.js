/**
 * title 这是个标题
 */
import React, { Component } from 'react';
import { connect } from 'dva';

class Address extends Component {
  state = {
    addressList: [],
    queryList: [],
  };
  componentDidMount() {
    // console.log(connect, this);
    this.props.dispatch({
      type: 'pageAddress/testEffect',
      payload: {
        a: 'a',
        b: 'b',
      },
      strUrl: 'getHomeAddress',
      onSuccess: res => {
        const {
          data: { list },
        } = res;
        this.setState({
          addressList: list,
        });
        console.log(list);
      },
      onFailure: error => {
        console.log(error);
      },
    });
  }

  render() {
    const { addressList, queryList } = this.state;

    addressList.forEach(item => {
      queryList.push(
        <div>
          <h3>{item.title}</h3>
          <ul>
            <li>{item.address}</li>
            <li>{item.id}</li>
            <li>{item.name}</li>
            <li>{item.price}</li>
          </ul>
        </div>,
      );
    });

    return <div>{queryList}</div>;
  }
}
// 这里的 pageModel 是对应 model 的 namespace
const mapStateToProps = ({ pageAddress }) => {
  return { ...pageAddress };
};

export default connect(mapStateToProps)(Address);

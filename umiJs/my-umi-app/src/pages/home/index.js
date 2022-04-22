import React, { Component } from 'react';
import { connect } from 'dva';

class PageView extends Component {
  state = {
    name: '',
    title: '',
  };
  handlerTitle = () => {
    this.props
      .dispatch({
        type: 'pageModel/testEffect',
        payload: '',
        // onSuccess: res => {
        //   console.log(res);
        // },
        // onFailure: error => {
        //   console.log(error);
        // },
      })
      .then(
        res => {
          this.setState({
            ...this.props.title,
          });
        },
        error => {
          console.log(error);
        },
      );
  };
  componentDidMount() {
    console.log(this);
    console.log(
      '查看params路由参数this.props.location.state.参数名' + this.props.location.state.params,
    );
    console.log('查看query路由参数this.props.location.query.参数名');
  }
  render() {
    const { name, title } = this.state;
    return (
      <div>
        <h1 onClick={this.handlerTitle}>{title || 'PageView for Dva.Model' + name}</h1>
      </div>
    );
  }
}
// 这里的 pageModel 是对应 model 的 namespace
const mapStateToProps = ({ pageModel }) => {
  return { ...pageModel };
};

export default connect(mapStateToProps)(PageView);

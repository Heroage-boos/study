import React, { Component } from 'react';
import router from 'umi/router';

class Index extends Component {
  handlerHome = () => {
    router.push(`/home`, { params: 'params' });
  };
  handlerAddress = () => {
    router.replace(`/home?id=${1}`);
  };
  handlerAbout = () => {
    router.go(+1);
  };
  render() {
    return (
      <div>
        <h1>index</h1>
        <h2 onClick={this.handlerHome}>跳转到home</h2>
        <h2 onClick={this.handlerAddress}>跳转到home</h2>
        <h2 onClick={this.handlerAbout}>跳转到about</h2>
      </div>
    );
  }
}
export default Index;

import React from 'react';
import AbsoluteCenterLayout from '../layouts/AbsoluteCenterLayout';

const style = {
  marginLeft: '15%'
};

const Component = () => (
  <AbsoluteCenterLayout>
    <div>
      <h1>We can not seem to find the page you're looking for.</h1><br/><br/>
      <img style={style} src="error-img.png" />
    </div>
  </AbsoluteCenterLayout>
);

export default Component;

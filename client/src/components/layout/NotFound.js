import React from 'react';
import { Helmet } from 'react-helmet';

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>{`Health Community | Not found`}</title>
      </Helmet>
      <section className="container">
        <div style={{ height: '200px' }}></div>
        <div className="text-center">
          <h1 className="x-large text-primary">
            <i className="fas fa-exclamation-triangle"></i> Page not found
          </h1>
          <p className="large">We are sorry, the page doesn't exists </p>
        </div>
      </section>
    </>
  );
};

export default NotFound;

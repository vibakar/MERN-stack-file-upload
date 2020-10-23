import React, { Suspense, lazy }  from 'react';
import { Route } from 'react-router-dom';

const Login = lazy(() => import('./Login'));
const Dashboard = lazy(() => import('./Dashboard'));

function App() {
  return (
    <>
      <Suspense fallback={<h3>Loading...</h3>}>
          <Route path="/" exact component={Login} />
          <Route path="/dashboard" component={Dashboard} />
      </Suspense>
    </>
  );
}

export default App;

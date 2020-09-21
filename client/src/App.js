import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
	cache: new InMemoryCache(),
	uri: "http://localhost:4000"
});
//Components 
const Home = lazy(() => import('./components/Home'));
const Login = lazy(() => import('./components/Login'));
const Register = lazy(() => import('./components/Register'));
const NotFound = lazy(() => import('./components/NotFound'));

function App() {
	return (
		<ApolloProvider client={client}>
			<div className="App">
					<Router>
						<Suspense fallback={<div className="smallFont">Loading...</div>}>
							<Switch>
								<Route exact path="/" component={Home}/>
								<Route exact path="/login" component={Login}/>
								<Route exact path="/register" component={Register}/>
								<Route component={NotFound}/>
							</Switch>
					</Suspense>
				</Router>
			</div>
		</ApolloProvider>
	);
}

export default App;
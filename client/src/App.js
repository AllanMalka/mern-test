import React, {Component} from 'react';

import AppNavbar from './components/AppNavbar';
import PostList from './components/PostListComponents/Postlist';
import Store from './store';
import AddModal from './components/PostListComponents/addModal';
import {loadUser} from './actions/authActions';

import { Provider } from 'react-redux';
import { Container } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component{
    componentDidMount(){
        Store.dispatch(loadUser());
    };
    render() {
        return (
            <Provider store={Store}>
                <div className="App">
                    <AppNavbar/>
                    <Container>
                        <AddModal/>
                        <PostList/>
                    </Container>
                </div>
            </Provider>
        );
    }
}

export default App;

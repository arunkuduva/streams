import React from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';

const PageOne =() => {
    return <div>PageOne
        <Link to="/PageTwo"> Nav to page2</Link>
    </div>;
};

const PageTwo =() => {
    return <div>PageTwo
        <Link to="/"> Nav to 1</Link>
        <button>click me </button>
    </div>;
};

export const App = ()=> {
    return (
        <div>this will stay there
            <BrowserRouter>
            <div>
                <Route path ="/"  exact={true} component = {PageOne} />
                <Route path ="/PageTwo" component = {PageTwo} />    
            </div>
            </BrowserRouter>
        </div>
    );
    
};
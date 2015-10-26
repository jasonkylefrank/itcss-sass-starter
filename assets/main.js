'use strict';

import React from 'react';
import ReactDOM from 'react-dom';


class Group extends React.Component {
    displayName: 'Group'

    render() {
        return (

            <div className='container'>
                <h1> Hello Again, Sup dfgdg</h1>
      
                <input placeholder='dsfdst'/>
                <p>Test d ffAnother Onedfdf</p>
            </div>

        )

    }

}


ReactDOM.render(<Group/>, document.getElementById('react'));


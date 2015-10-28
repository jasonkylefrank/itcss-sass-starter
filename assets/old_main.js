'use strict';

import React from 'react';
import ReactDOM from 'react-dom';


class Group extends React.Component {
    displayName: 'Group'

    getFakeStuff(fakeCount) {
        var fakeStuff = [];

        for (var i = 0; i < fakeCount; i++) {
          fakeStuff.push(<div>This is fake stuff - pretty cool, huh???</div>);
        }

        return fakeStuff;
    }

    render() {
        var stuff = this.getFakeStuff(5);

        return (

            <div className='container'>
                <h1> Hello Again, Sup dfgdgzzzzzz</h1>

                <input placeholder='dsfdst'/>
                <p>Test d ffAnother Onedfdf</p>

                {stuff}
            </div>

        )

    }

}


ReactDOM.render(<Group/>, document.getElementById('react'));

/**
 * Copyright 2017, Sourcepole AG.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');
const PropTypes = require('prop-types');
const {connect} = require('react-redux');
const {Glyphicon} = require('react-bootstrap');
const {zoomToExtent} = require('../actions/map');
require('./style/Buttons.css');

class HomeButton extends React.Component {
    static propTypes = {
        currentTheme: PropTypes.object,
        position: PropTypes.number,
        zoomToExtent: PropTypes.func
    }
    static defaultProps = {
        position: 5
    }
    render() {
        return (
            <button className="Button" onClick={this.resetExtent} style={{bottom: (5 + 4 * this.props.position) + 'em'}}>
                <Glyphicon glyph="home"/>
            </button>
        );
    }
    resetExtent = () => {
        if(this.props.currentTheme) {
            let bbox = this.props.currentTheme.initialBbox;
            this.props.zoomToExtent(bbox.bounds, bbox.crs);
        }
    }
};

module.exports = {
    HomeButtonPlugin: connect((state) => ({
        currentTheme: state.theme ? state.theme.current : null
    }), {
        zoomToExtent: zoomToExtent
    })(HomeButton),
    reducers: {
        map: require("../reducers/map")
    }
};

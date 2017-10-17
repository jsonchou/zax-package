import React, { Component } from 'react'
import PropTypes from 'prop-types'

const tag = "backtotop"

class BackToTop extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false
        }
        //this.goTop = this.goTop.bind(this)
    }
    goTop() {
        $('html,body').animate({
            scrollTop: 0
        }, 800, () => {
            this.setState({ show: false })
        });
    }
    render() {
        console.log(tag + ' tmpl render log')
        return (
            <div className="template-backtotop" >
                <span className={`md-backtotop ${this.state.show ? 'on' : ''}`} onClick={console.log('backtotop2', this.name)}></span>
            </div >
        )
    }
    componentDidMount() {
        $(window).on('scroll', () => {
            if ($(window).scrollTop() > 200) {
                this.setState({ show: true })
            } else {
                this.setState({ show: false })
            }
        }).trigger('scroll');
    }
    shouldComponentUpdate(nextProps, nextState) {
        return nextState.show != this.state.show
    }
}

export default BackToTop
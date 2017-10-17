import React, { Component } from 'react'
import PropTypes from 'prop-types';

class Item extends Component {
    constructor(props) {
        super(props)
        console.log(props)
    }
    render() {
        let { list } = this.props;
        return (
            <div className="cms-list">
                {
                    list.map((item, index) => {
                        return (
                            <li className="list-item" >
                                <a href={item.adsUrl} className="block">
                                    <p className="item-pic">
                                        <img src={item.filePath} alt="" className="g10 vm" />
                                    </p>
                                    <dl className="item-info">
                                        <dt className="info-hd f28">{item.title}</dt>
                                        <dd className="info-bd f18" >{item.summaryList}</dd>
                                    </dl>
                                    <p className="item-btn tc">
                                        <span className="btn-buy f30 b">¥<em>{item.startingPrice}</em>立即购买</span>
                                    </p>
                                </a>
                            </li >
                        )
                    })
                }
            </div>
        )
    }
}

class CMS extends Component {
    constructor(props) {
        super(props)
        console.log(props)
    }
    render() {
        let { dataSource } = this.props;
        return (
            <Item list={dataSource} />
        )
    }
}

CMS.defaultProps = {
    dataSource: [],
}

CMS.propTyps = {
    dataSource: PropTypes.array.isRequired
}

export default CMS
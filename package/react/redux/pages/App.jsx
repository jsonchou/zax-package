import React, { PureComponent, Fragment } from 'react';
import Base from '../components/Base';
import Popup from '../components/Popup';
import connect from '../components/Connect';

class AppPage extends PureComponent {

    componentWillMount() {
        console.log('AppPage will mount');
    }

    componentDidMount() {
        console.log('AppPage did mount');
        // 初始化微信分享
        this.initShare.call(this);
        // 显示前端免责声明
        this.showFdTips();
    }

    showFdTips() {
        if (!this.cfg.bizOrigin) {
            if (this.cfg.debug && (location.href.indexOf('-uat') > -1 || location.href.indexOf('-test') > -1)) {
                _zax.ui.confirm(
                    `
                        <h1 class="f35 lh2 mb10">前端免责声明</h1>
                        <p class="tl">1、请自行添加bizOrigin参数，注意参数大小写，有问题，请联系后端活动盒子配置。</p>
                        <p class="tl">2、因参数配置错误（参数大小写，apk包丢失，后台配置code不一致）产生的问题，由事故当事人负责。</p>
                    `
                )
            }
        }
    }

    render() {
        const { pageName } = this.props;

        return (
            <Fragment>
                <Base />
                <Popup />
                <div className={`page page-${ pageName }`}>
                    { this.props.children }
                </div>
            </Fragment>
        );
    }
}

export default connect(AppPage, [ 'pageName' ]);

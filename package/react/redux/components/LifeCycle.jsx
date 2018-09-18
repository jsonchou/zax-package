import React , { Component } from 'react';
import SDK from "../../../_base/sdk";
import Share from "../../../_base/share";
import config from '../api/config';
import store from '../redux/store';
import actions from '../redux/actions';

export default class LifeCycleComponent extends Component {

    componentWillMount() {
        const { Item } = this.props;

        // 设置页面名称
        store.dispatch(actions.setPageName(Item.page));

        //scroll to top
        window.scrollTo(0, 0);

        document.title = Item.meta.title || config.biz.title || '众安保险'; //动态设置标题

        Share.hideIcon();
        // store._vm.shareInfo.success = null;

        try {
            _zax.device.app && SDK('setNavigationBarTitle', {
                "title": document.title,
            }, res => {
                console.log('title res', res)
            });
        } catch (err) {
            throw err;
        }
    }

    componentDidMount() {
        const { Item } = this.props;
        window._za && window._za.pushData(); //ilog pv uv 统计
        if (Item.meta.share) {
            util.event.lazyAntifraud(config, () => {
                setTimeout(() => {
                    Share.showIcon({}, store.getState().shareInfo)
                }, 2000);
            });
        }
    }

    render() {
        const { history, Item } = this.props;

        return (
            <Item.component history={history} page={Item.page} meta={Item.meta} />
        );
    }
}
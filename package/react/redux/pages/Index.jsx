import React, { PureComponent } from 'react';
import connect from '../components/connect';

class IndexPage extends PureComponent {

    handleLogin = () => {
        this.props.setPopStatus({
            login: true
        });
    }

    render() {
        return (
            <div>
                <button
                    style={{
                        display: 'block',
                        fontSize: '.28rem',
                        margin: '3rem auto'
                    }}
                    onClick={this.handleLogin}
                >一键登陆</button>
            </div>
        );
    }
}

export default connect(IndexPage);
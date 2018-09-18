import { combineReducers } from "redux";

let reducers = {};
 
const rq = require.context('./', false, /\.js/);

rq.keys().forEach( key => {
    // const file = key.split('/')[1].split('.')[0];
    // 排除当前文件
    if(key !== './combine.js') {
        const v = rq(key);
       if( v && v.default ) {
            //  educers[file] = v.default;
            reducers = v.default;
       }  
    }
});

export default combineReducers( { ...reducers } );

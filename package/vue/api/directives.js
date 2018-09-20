// ilog 指令
// window._za.pushAsm 是17年新增的语法
// 目前不支持 a.b.c|.item 用法，仅支持单个元素ilog事件追踪，不适用于父块级

const pushAsm = (e) => {
    let me = e.target || e.currentTarget;
    let done = me.getAttribute('ilogbinded');
    let asm = me.getAttribute('data-ilog');
    if (done || !asm) {
        return;
    }
    let meta = {
        href: encodeURIComponent(location.href),
        txt: me.textContent || me.innerText,
        asm
    };
    window._za && window._za.pushAsm && window._za.pushAsm(meta);
};

export default {
    'ilog': {
        bind(el, binding, vnode, oldVnode) {
            el.setAttribute('data-ilog', binding.value);
            el.addEventListener('click', pushAsm, false);
            // console.log('directive ilog bind')
        },
        inserted(el, binding, vnode) {
            // console.log('directive ilog inserted')
        },
        update(el, binding, vnode, oldVnode) {
            el.addEventListener('click', pushAsm, false);
            // console.log('directive ilog update')
        },
        componentUpdated(el, binding, vnode, oldVnode) {
            // console.log('directive ilog componentUpdated')
        },
        unbind(el, binding, vnode, oldVnode) {
            el.removeEventListener('click', pushAsm, false);
            // console.log('directive ilog unbind')
        },
    }
}
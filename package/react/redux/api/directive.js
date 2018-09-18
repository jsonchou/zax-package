const pushAsm = (e) => {
    let me = e.target || e.currentTarget;
    let asm = me.getAttribute('data-ilog');
    if (!asm) {
        return;
    }
    let meta = {
        href: encodeURIComponent(location.href),
        txt: me.textContent || me.innerText,
        asm
    };
    window._za && window._za.pushAsm && window._za.pushAsm(meta);
};

document.body.addEventListener('click', pushAsm, false);
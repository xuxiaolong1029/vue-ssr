function getHead(vm) {
    // 组件可以提供一个 `title` 选项
    // 此选项可以是一个字符串或函数
    const { head } = vm.$options;
    if (head) {
        return typeof head  === 'function' ? head.call(vm) : head;
    }
}

const serverTitleMixin = {
    created() {
        const head = getHead(this)
        if (head) {
            if(head.title) this.$ssrContext.title = `${head.title}-可爱王`;
            if(head.author) this.$ssrContext.author = `${head.author}-可爱王`;
            if(head.keywords) this.$ssrContext.keywords = head.keywords;
            if(head.description) this.$ssrContext.description = head.description;
        }
    }
}

const clientTitleMixin = {
    mounted () {
        const head = getHead(this);
        if (head) {
            if(head.title) document.title = `${head.title}-可爱王`;
            if(head.author) document.querySelector('meta[name="author"]').setAttribute('content', `${head.author}-可爱王`);
            if(head.keywords) document.querySelector('meta[name="keywords"]').setAttribute('content', head.keywords);
            if(head.description) document.querySelector('meta[name="description"]').setAttribute('content', head.description);
        }
    }
}
// 可以通过 `webpack.DefinePlugin` 注入 `VUE_ENV`
export default process.env.VUE_ENV === 'server' ? serverTitleMixin : clientTitleMixin

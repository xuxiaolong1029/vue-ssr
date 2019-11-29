<template>
    <div>
        首页
    </div>
</template>

<script>
    import {titleMixin} from '../title.mixin'
    export default {
        mixins: [titleMixin],
        title () {
            return this.item.title
        },
        name: "home"
    }
</script>

<style scoped lang="less">

</style>

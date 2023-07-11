<template>
    <div>
        <button @click="showTitle">Click</button>
        <span>{{ title }}</span>
    </div>
</template>
  
<script>
export default {
    name: 'UserLogin',
    data() {
        return {
            title: void 0
        }
    },
    methods: {
        showTitle() {
            this.title = 'Global Component!!'
        }
    }
}
</script>
  
<style scoped>
div {
    padding: 20px
}

div span {
    margin: 20px
}
</style>
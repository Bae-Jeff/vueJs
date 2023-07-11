<template>
    <div class="search-from">
        <ProductDetail :product="product"></ProductDetail>
    </div>
</template>
<script>
import ProductDetail from '../components/product/ProductDetail.vue';
export default {
    name: 'Search',
    props: {
        product: Array
    },
    data() {
        return {

        }
    },
    components: {
        ProductDetail
    },
    methods: {

    },
}
</script>
<style scoped></style>

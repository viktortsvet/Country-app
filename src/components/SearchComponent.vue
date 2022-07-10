<template>
    <div>
        <div class="search-component-header">Search form</div>
        <div>
            <input class="search-input"
        v-model="inputValue"
        @input="doSearch(inputValue)"
        >
        </div>

    </div>
</template>

<script>

export default {
    name: 'search-component',

    props: {
        searchItems: Function,
        showMoreItem: Function
    },

    methods: {
        doSearch(value) {
            this.searchItems(value);
            this.showMoreItem(value);
        }
    },

    data() {
        return {
            inputValue: ''
        }
    },
}

</script>

<style lang="scss">
    .search-component-header {
        text-align: center;
    }
    .search-input {
        margin-top: 10px;
        width: 100%;
        padding: 15px;
        border-radius: 15px;
        height: 20px;
        border: 1px solid lightblue;
        outline-color: #87B8E6;
    }
</style>
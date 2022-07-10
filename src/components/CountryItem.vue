<template>
    <div class="country_item">
        <div class="country_name">
            {{itemData.name.official}}
        </div>

        <button @click="showMoreItem(itemData.name.official)">Show more</button>
        
    </div>
</template>

<script>

export default {
    name: 'country-item',

    props: {
        itemData: Object,
        showMoreItem: Function
    },

}

</script>

<style lang="scss">

    .country_item {
        width: 100%;
        height: 100%;
        border: 1px solid gray;
        border-radius: 6px;
        padding: 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .country_name {
        width: 50%;
    }

</style>
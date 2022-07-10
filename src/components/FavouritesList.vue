<template>
    <div>
        <ul class="country_list">
            <li class="country_item" :key="index" v-for="(item, index) in favourites">
                <div>
                    {{item.name.official}}
                </div>

                <button class="remove_btn" @click="deleteFromFavourites(item)" type="primary">
                    Remove from favourites
                </button>
            </li>
        </ul>
    </div>
</template>

<script>
import Bus from './Bus';

export default {
    name: 'favourites-list',

    props: {
        removeFromFavourite: Function,
        favourites: Array
    },

    methods: {
        deleteFromFavourites(item) {
            this.removeFromFavourite(item);
            Bus.$emit('removeItemFromFavourite');
        }
    }
}
</script>

<template>
    <div class="detailed_info">
        
        <div class="detailed_info__item">
            <div>
            {{countryData.name.official}}
            </div>

            <div>
                <img style="width: 60px; height: 60px" :src="countryData.flags.svg" alt="flag">
            </div>

            <div>
                <p>Border countries:</p>
                <ul class="border_countries">
                    <li @click="openBorderCountry(border)" :key="index" v-for="(border, index) in countryData.borders">
                        {{border}}
                    </li>
                </ul>
            </div>

            <div>
                <p>Languages:</p>
                <ul class="border_countries">
                    <li :key="index" v-for="(language, index) in countryData.languages">
                        {{language}}
                    </li>
                </ul>
            </div>
        </div>

        <button :class="btnClass" @click="addOrRemove(countryData)" type="primary">
            {{btnName}}
        </button>
    </div>
</template>

<script>
import Bus from './Bus';

const addToFavourite = 'Add to favourites';
const removeFromFavourite = 'Remove from favourites';
const addBtnClass = 'add_btn';
const removeBtnClass = 'remove_btn';

export default {
    name: 'country-information',

    props: {
        itemData: Object,
        addOrRemoveFavourites: Function,
    },
    
    data() {
        return {
            btnName: '',
            btnClass: null,
            countryData: null
        }
    },

    watch: {
        itemData(value) {
            this.countryData = value;
            this.checkIfItemIsFavourite(this.countryData);
        }
    },

    methods: {
        addOrRemove(country) {
            const boolean = this.addOrRemoveFavourites(country);
            this.btnName = boolean ? addToFavourite : removeFromFavourite;
            this.btnClass = boolean ? addBtnClass : removeBtnClass;
        },
        checkIfItemIsFavourite(itemData) {
            const boolean = this.$store.getters['CountriesStorage/favourites'].some(item => item.name.official === itemData.name.official);
            this.btnName = boolean ? removeFromFavourite : addToFavourite;
            this.btnClass = boolean ? removeBtnClass : addBtnClass;
        },

        openBorderCountry(countryName) {
            const countries = this.$store.getters['CountriesStorage/countries'];
            this.countryData = countries.find(item => item.cca3 === countryName);
            this.checkIfItemIsFavourite(this.countryData);
            this.$store.dispatch('CountriesStorage/setSearchCountries', []);
            this.$emit('openBorderCountry');
        }
    },

    created() {
        this.countryData = this.itemData;
        this.checkIfItemIsFavourite(this.countryData);

        Bus.$on('removeItemFromFavourite', () => {
            this.checkIfItemIsFavourite(this.countryData);
        });
    }
}
</script>

<style lang="scss">

    .detailed_info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        &__item {
            width: 30%;
        }
    }

    .border_countries {
        display: grid;
        grid-template-columns: repeat(2, 45%);
        justify-content: space-between;
    }

</style>
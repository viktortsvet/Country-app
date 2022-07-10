<template>
    <div class="container">

        <search-component
        :searchItems="searchItems"
        :showMoreItem="showMoreItem"
        >
        </search-component>

        <div style="margin-top: 10px" class="main_content">

            <div>
                <div v-if="showDetailedItem">
                    <country-information
                        :itemData="showDetailedItem"
                        :addOrRemoveFavourites="addOrRemoveFavourites"
                        @openBorderCountry="openBorderCountry"
                    >
                    </country-information>
                </div>

                <div>
                    <ul class="country_list">
                        <li :key="index" v-for="(item, index) in countriesList">
                            <country-item
                            :itemData="item"
                            :showMoreItem="showMoreItem"
                            >
                            </country-item>
                        </li>
                    </ul>
                </div>

            </div>


            <div>
                <div>Favourite countries:</div>
                <favourites-list
                :favourites="favourites"
                :removeFromFavourite="removeFromFavourite"
                >
                </favourites-list>
            </div>

        </div>

        

    </div>
</template>

<script>
import CountryInformation from './components/CountryInformation.vue';
import CountryItem from './components/CountryItem.vue';
import SearchComponent from './components/SearchComponent.vue';

import axios from 'axios';
import FavouritesList from './components/FavouritesList.vue';

export default {
    components: {
        SearchComponent, 
        CountryItem,
        CountryInformation,
        FavouritesList
    },

    name: 'app-component',

    data() {
        return {
            countriesList: [],
            showDetailedItem: null,
            favourites: []
        }
    },

    created() {
        this.favourites = this.$store.getters['CountriesStorage/favourites'];
        if (this.$store.getters['CountriesStorage/countries'].length === 0) {
            axios.get('https://restcountries.com/v3.1/all')
            .then(result => {
                this.$store.dispatch('CountriesStorage/setCountries', result.data);
            }).catch(e =>console.error(e));
        }        
    },

    methods: {
        searchItems(value) {
            this.$store.dispatch('CountriesStorage/searchCountry', value);
            this.countriesList = this.$store.getters['CountriesStorage/searchCountries'];
        },

        removeFromFavourite(country) {
            this.$store.dispatch('CountriesStorage/removeCountryFromFavourite', country);
            this.favourites = this.$store.getters['CountriesStorage/favourites'];
        },

        openBorderCountry() {
            this.countriesList = this.$store.getters['CountriesStorage/searchCountries'];
        },

        showMoreItem(countryName) {

            if (this.countriesList.length === 1) {
                this.showDetailedItem = this.countriesList[0];
            } else if (this.countriesList.length > 1) {
                const country = this.countriesList.find(item => item.name.official === countryName);
                this.showDetailedItem = country ? country : null;
            } else {
                this.showDetailedItem = null;
            }

        },

        addOrRemoveFavourites(country) {
            const boolean = this.$store.getters['CountriesStorage/favourites'].some(item => item.name.official === country.name.official);
            if (boolean) {
                this.$store.dispatch('CountriesStorage/removeCountryFromFavourite', country);
            } else {
                this.$store.dispatch('CountriesStorage/addCountryToFavourite', country);
            }
            this.favourites = this.$store.getters['CountriesStorage/favourites'];
            return boolean;
        }
    },
}
</script>

<style lang="scss">

    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    .container {
        display: block;
        width: 65%;
        margin: 0 auto;
    }

    .main_content {
        display: grid;
        grid-template-columns: 40% 50%;
        justify-content: space-between;
    }

    ul {
        list-style-type: none;
        margin-top: 10px;
    }

    .country_list {
        display: grid;
        grid-template: minmax(70px, auto) / 100%;
        grid-auto-rows: minmax(70px, auto);
        row-gap: 9px;
    }

    button {
        border: 1px solid #87B8E6;
        cursor: pointer;
        width: 35%;
        height: 30px;
        border-radius: 6px;
        background-color: inherit;
        transition: 0.4s all;
        &:hover {
            background-color: #87B8E6;
            color: #ffffff;
        }
    }

    p {
        margin-top: 10px;
    }

    .remove_btn {
        border: 1px solid #E6685F;
        &:hover {
            background-color: #E64C44;
        }
    }

    .add_btn {
        border: 1px solid #0EE66F;
        &:hover {
            background-color: #0EE66F;
        }
    }


</style>
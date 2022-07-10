const state = {
    countries: localStorage.getItem('countries') !== null ? JSON.parse(localStorage.getItem('countries')) : [],
    favourites: localStorage.getItem('favourites') !== null ? JSON.parse(localStorage.getItem('favourites')) : [],
    searchCountries: []
};

const getters = {
    countries: state => state.countries,
    favourites: state => state.favourites,
    searchCountries: state => state.searchCountries
};

const mutations = {

    setCountries: (state, countries) => {
        state.countries = countries;
    },

    addCountryToFavourite: (state, country) => {
        state.favourites = [...state.favourites, country];
        localStorage.setItem('favourites', JSON.stringify(state.favourites));
    },

    removeCountryFromFavourite: (state, country) => {
        const index = state.favourites.findIndex(item => item.name.official === country.name.official);
        state.favourites = [...state.favourites.slice(0, index), ...state.favourites.slice(index + 1)];
        localStorage.setItem('favourites', JSON.stringify(state.favourites));
    },

    setSearchCountries: (state, arrCountries) => {
        state.searchCountries = arrCountries;
    },

    searchCountry: (state, countryName) => {
        if (countryName !== null && countryName.trim() !== '') {
            state.searchCountries = state.countries.filter(country => {
                return country.name.official.toLowerCase().indexOf(countryName.toLowerCase()) > -1;
            });
        } else {
            state.searchCountries = [];
        }
    }
};

const actions = {

    setSearchCountries: (context, arrCountries) => {
        context.commit('setSearchCountries', arrCountries);
    },

    setCountries: (context, countries) => {
        context.commit('setCountries', countries);
    },

    addCountryToFavourite: (context, countryName) => {
        context.commit('addCountryToFavourite', countryName);
    },

    removeCountryFromFavourite: (context, countryName) => {
        context.commit('removeCountryFromFavourite', countryName);
    },

    searchCountry: (context, countryName) => {
        context.commit('searchCountry', countryName);
    }
};

const namespaced = true;

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced
}
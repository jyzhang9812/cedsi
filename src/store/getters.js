const getters = {
    isAuthenticated(state) {
        return state.idToken !== null
    },
}
export default getters
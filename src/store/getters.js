const getters = {
    isAuthenticated(state) {
        return state.idToken !== null && !(state.idToken === undefined)
    },
}
export default getters
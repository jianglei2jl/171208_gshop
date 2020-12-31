//包含多个计算属性的对象
export default {
    totalCount(state) {
        return state.cartFoods.reduce((preTotal, food) => preTotal + food.count, 0)
    },
    totalPrice(state) {
        return state.cartFoods.reduce((preTotal, food) => preTotal + food.count * food.price, 0)
    },
    totalSatisfied(state) {
        return state.ratings.reduce((preTotal, rate) => preTotal + (rate.rateType === 0 ? 1 : 0), 0)
    },
    totalDissatisfied(state) {
        return state.ratings.reduce((preTotal, rate) => preTotal + (rate.rateType === 1 ? 1 : 0), 0)
    }

}
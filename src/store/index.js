import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // 所有任务列表,只有mutations中方法才能修改state中的值
        list: [],
        inputValue: '',
        id: 5,
        viewKey: 'all'
    },
    // 只有mutations才能修改state中的值
    mutations: {
        initList(state, list) {
            state.list = list
        },
        changeInputVal(state, val) {
            state.inputValue = val
        },
        addItem(state) {
            if (!state.inputValue.trim()) return
            let obj = {
                id: state.id,
                info: state.inputValue,
                done: false
            }
            state.list.push(obj)
            state.inputValue = ''
            state.id++
        },
        changeInputState(state, obj) {
            console.log(obj)
            const i = state.list.findIndex(x => x.id === obj.id)
            state.list[i].done = obj.status
        },
        removeItem(state, id) {
            const i = state.list.findIndex(x => x.id === id)
            state.list.splice(i, 1)
        },
        clearALL(state) {
            state.list = state.list.filter(item => !item.done)
        },
        changeViewKey(state, key) {
            state.viewKey = key
        }

    },
    // 将state中的值包装一下返回，不会改变state中的值
    getters: {
        undoneList(state) {
            return state.list.filter(item => !item.done).length
        },
        infoList(state, status) {
            if (state.viewKey === 'all') {
                return state.list
            }
            if (state.viewKey === 'undone') {
                return state.list.filter(item => !item.done)
            }
            if (state.viewKey === 'done') {
                return state.list.filter(item => item.done)
            }
        }
    },
    actions: {
        getList(context) {
            axios.get('list.json').then(({ data }) => {
                // context只能触发mutations中方法传值
                context.commit('initList', data)
            })
        }
    },
    modules: {}
})
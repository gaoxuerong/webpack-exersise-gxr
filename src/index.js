import { sync } from './components/sync'
import(/* webpackChunkName: "async-test" */ './components/async/index').then(_=>{
    _.default.init()
})
sync()
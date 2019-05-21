import { sync } from './components/sync'
import('./components/async/index').then(_=>{
    _.default.init()
})
sync()
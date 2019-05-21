
import item from "./sync.css"
import help from '../ common/help.js'


class Test{
    toString(){
        console.log(help.version)
    }
}
let test = new Test()
function * gen(){
    yield 1;
}
//因为生成器转换为es5的时候，有regeneratorRuntime生成；
//记得安装"@babel/runtime";"@babel/plugin-transform-runtime";

(()=>{console.log(`gaoxuerong`)})()
const sync = function(){
   console.log(item)
   test.toString()
   console.log(gen().next())
}
export {
    sync
}
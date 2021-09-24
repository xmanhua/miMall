/**
 * Storage 封装
 *  */ 
const STORAGE_KEY = 'mall';
export default {    
    setItem(key,value,module_name) {//存储值
        if(module_name) {
            let val = this.getItem(module_name);
            val[key] = value;//存新的key值到val
            this.setItem(module_name,val);//复盖原来的module_name值
        } else {
            let val = this.getStorage();
            val[key] = value;//存新的key值到val
            window.sessionStorage.setItem(STORAGE_KEY,JSON.stringify(val));//JSON.stringify():JSON对象转成自符串,复盖原来的STORAGE_KEY值 
        }

    },
    getItem(key,module_name) {//获取值,获取某一个模块下面的属性user下面的userName
        if(module_name) {
            let val = this.getItem(module_name);
            if(val) return val[key];
        }
        return this.getStorage()[key];
    },
    getStorage(){//获取整个浏览器的缓存信息数据
        return JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || '{ }');
    },
    clear(key,module_name) {//清空值
        let val = this.getStorage();
        if(module_name) {
            if(!val[module_name]) return;//没有找到时不报错
            delete val[module_name][key];//删除模块下面的val属性
        } else {
            delete val[key];//如果没有模块，直接删除val属性
        }
        window.sessionStorage.setItem(STORAGE_KEY,JSON.stringify(val));//必须把删除后的Storage重新写进去
    }
}
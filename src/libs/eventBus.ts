import _ from 'lodash';
import mitt from 'mitt';

export const eventBus: any = {
  install(Vue: any, _options: any) {
    const bus = mitt();
    // 全局发布（在Vue全局方法中自定义$pub发布方法）
    // 这里做了$pub方法能够携带多个参数的处理，方便我们再业务中触发事件时带多个参数
    Vue.config.globalProperties.$pub = (...args: any[]) => {
      bus.emit(_.head(args), args.slice(1));
    };

    // 全局订阅（在Vue全局方法中自定义$sub订阅方法）
    Vue.config.globalProperties.$sub = function () {
       
      Reflect.apply(bus.on, bus, _.toArray(arguments));
    };

    // 取消订阅
    Vue.config.globalProperties.$unsub = function () {
       
      Reflect.apply(bus.off, bus, _.toArray(arguments));
    };
  },
};

/**
 * 使用
 * proxy.$sub('key', (data) => {}); data为数组，可以传递多个参数
 */
// const { proxy: { $pub, $sub, $unsub } } = getCurrentInstance() as any;
// $pub('key', data);
// proxy.$sub('key', (data) => {});
// proxy.$unsub('key');
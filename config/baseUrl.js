let baseUrl ='';  //这里是一个默认的url，可以没有
let imgurl=''
// baseUrl = "https://hicar.haier.net/hipassjava"  //开发的线上环境
// baseUrl = "http://2t3xv5.natappfree.cc"  //开发的线上环境
// baseUrl = "http://103.120.225.186:9003/hipassjava"  //开发的线上环境
switch (process.env.NODE_ENV) {
    case 'development':
        // baseUrl = "http://103.120.225.186:9003/hipassjava"//开发本地环境
        // baseUrl = "https://hicar.haier.net/hipassjava"   //生产环境
        baseUrl = "https://hrssc.haier.net/"   //生产环境
        // baseUrl = "http://192.168.137.1:8080/"   //生产环境
        // baseUrl = "http://zwvbuw.natappfree.cc/hipassjava"   //生产环境
        imgurl='http://minio.paas-test.haier.net/hrzone'
        break
    case 'dev':
        baseUrl = "https://hrssc.haier.net/"  //开发的线上环境
        break
    case 'try':   // 注意这里的名字要和步骤二中设置的环境名字对应起来
        baseUrl = "http://www.cnblogs.com/XHappyness/"  //开发的测试环境
        break
    case 'production':
        baseUrl = "https://hrssc.haier.net/"   //生产环境
        imgurl='http://minio.paas-test.haier.net/hrzone'
        break
}
export default {
    baseUrl,
    imgurl
};

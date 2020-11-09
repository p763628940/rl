<template>
  <div class="about">
    <vue-qr class="ewm"
            :text="downloadData.url"
            :margin="0" colorDark="#1bc10a"
            colorLight="#fff"
            :logoScale="0.3"
            :size="200">
    </vue-qr>
  </div>
</template>

<script>
    import vueQr from 'vue-qr'
    export default {
        name: 'about',
        components: {
            vueQr
        },
        data() {
            return {
                id: -1,
                downloadData: {
                    url: 'wwww.baidu.com',
                    icon: '//n.sinaimg.cn/news/crawl/200/w1080h720/20200615/f946-iuzasxs3724871.jpg',
                }

            };
        },
        created() {

        },
        mounted() {
            // this.getData();
        },
        methods: {
            // 获取 easy-mock 的模拟数据
            //A0038335 单单
            //A0037835 大成哥
            //A0000206 chengzhi
            getData() {
                this.loading = true
                const myData = {
                }
                this.$api.robList(myData).then((res) => {
                    console.log(res)
                    this.tableData = res.records //[1,2,3]
                    this.pageTotal = parseInt(res.totalCount)
                    this.loading = false
                }).catch((err) => {
                    console.log(err)
                    this.loading = false
                })
            },
        }
    };
</script>
<style scoped>
  .ewm{
    width: 300px;
    height: 300px;
    margin: 0 auto !important;
    display: block;
  }
  .about{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
</style>

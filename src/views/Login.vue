<template>
    <div class="content">
        <div class="top"></div>
        <div class="login_box">
            <div class="login_box_item">
                <div class="login_box_iteml">手机号</div>
                <div class="line"></div>
                <div class="login_box_itemr">
                    <input type="text"  class="input1" placeholder="请输入您的手机号" maxlength="11">
                    <div class="yzm">发送验证码</div>
                </div>
            </div>
            <div class="login_box_item">
                <div class="login_box_iteml">验证码</div>
                <div class="line"></div>
                <div class="login_box_itemr">
                    <input type="text" placeholder="请输入验证码" maxlength="4">
                </div>
            </div>
        </div>

        <div class="loginbtn">
            登录
        </div>

    </div>
</template>
<script>
    // @ is an alias to /src
    export default {
        name: 'login',
        data() {
            return {
                id: -1
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
   .content{
       width: 750px;
   }
    .top{
        width: 750px;
        background: url("../assets/img/loginbg.jpg") no-repeat;
        background-size:100% auto ;
        height: 500px;
    }
    .login_box{
        width: 620px;
        margin: 0 auto;
        margin-top: 90px;
    }
    .login_box_item{
        width:620px;
        display: flex;
        height: 80px;
        box-sizing: border-box;
        align-items: center;
        line-height: 80px;
        border-bottom: 1px solid #b8b8b8;
        color: #4a4a4a;
        margin-bottom: 60px;
        padding-top: 4px;
    }
    .login_box_iteml{
        font-size: 28px;
        font-weight: bold;
    }
    .line{
        width: 2px;
        height: 30px;
        background: #bbbbbb;
        margin-left: 25px;
        margin-right: 25px;
    }
   ::-webkit-input-placeholder {
       color: #bbbbbb;
   }
    .input1{
        width: 322px;
    }
    input{
        border: none;
        outline: none;
    }
    .yzm{
        font-size: 24px;
        position: absolute;
        right: 20px;
        top: 20px;
        line-height: 24px;
    }
    .login_box_itemr{
        width: 480px;
        position: relative;
    }
    .loginbtn{
        width: 624px;
        height: 90px;
        text-align: center;
        color: #fff;
        font-size: 28px;
        font-weight: bold;
        line-height: 90px;
        box-shadow: 4px 5px 20px #1349a7;
        background: #195ed7;
        margin: 0 auto;
        margin-top: 150px;
        border-radius: 45px;
        -webkit-tap-highlight-color:#0F3B86;
    }
</style>

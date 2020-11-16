<template>
    <div id="app">
        <router-view/>
    </div>
</template>
<script>
    export default {
        name: 'app',
        data() {
            return{

            }
        },
        created() {
            this.fresh()
        },
        computed:{

        },
        mounted() {
            // this.getData();
        },
        methods: {
            fresh(){
                let tag = sessionStorage.getItem("fresh")
                if(!tag){
                    sessionStorage.setItem("fresh",'istrue')
                    let datestr =new Date()
                    window.location.href='index.html?t='+datestr.getTime()
                }
            }
        }
    };
</script>
<style>
    *{
        -webkit-touch-callout:none;
        -webkit-user-select:none;
        -khtml-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none;
    }
    input , textarea{
        -webkit-user-select:auto !important;
        user-select:auto !important;
    }
    .mint-tabbar>.mint-tab-item.is-selected{
        background: #fff !important;
    }

    html {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        width: 100vw;
    }

    body {
        margin: 0;
        padding: 0;
        background-color: #ffffff;
    }

    * {
        box-sizing: inherit;

    &
    :before,

    &
    :after {
        box-sizing: inherit;
    }

    }
    img {
        width: 100%;
        height: auto;
        vertical-align: top;
        content: normal !important;
    }

    [aspectratio] {
        position: relative;
    }

    [aspectratio]::before {
        content: '';
        display: block;
        width: 1px;
        margin-left: -1px;
        height: 0;
    }

    [aspectratio-content] {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
    }

    [flexContainer] {
        display: flex;
        width: 375px;
    }

    .block {
        margin-top: 15px;
    }

    ul, li {
        list-style: none outside none;
        margin: 0;
        padding: 0;
    }

    figure {
        display: block;
        margin: 0;
    }

    .tabitem span{
        margin-top: 4px;
    }
    .tabitem img{
        width: 20px;
        height: 20px;
        margin-bottom: 5px;

    }
</style>

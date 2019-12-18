<template>
    <div class="page-home">
        <div class="page-left" :class="isCollapse?'':'page-left-false'">
            <h1>CITEX <span v-if="!isCollapse">OTC商户后台</span></h1>
            <el-menu
                    class="el-menu-vertical-demo"
                    :collapse="isCollapse"
                    style="border-right:none;"
                    :default-active="active"
                    background-color="#001529"
                    text-color="#fff"
                    active-text-color="#409EFF">
                <el-menu-item @click="goToRoute(item)" :index="item.index" v-for="item in routers" :key="item.index">
                    <i :class="item.icon"></i><span slot="title">{{item.name}}</span>
                </el-menu-item>
            </el-menu>
        </div>
        <div class="page-content" :class="isCollapse?'page-content-true':'page-content-false'">
            <div class="content-top">
                <p @click="isCollapse=!isCollapse" class="is-collapse-icon">
                    <i style="color:#777;" :class="!isCollapse?'el-icon-s-fold':'el-icon-s-unfold'"></i>
                </p>
                <p>
                    <i class="el-icon-search"></i>
                    <i class="el-icon-bell"></i>
                    <!--<el-badge is-dot style="margin-right: 20px;"></el-badge>-->
                    <el-dropdown trigger="hover" v-if="userName">
                        <span class="el-dropdown-link user-info-inner"><img alt="" src="../assets/img/user.png" /> &nbsp;{{userName}}</span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <router-link tag="span" to="/login" v-else>登录</router-link>
                </p>
            </div>
            <p class="breadcrumb">
                当前位置：<span>{{routers[Number(active)-1].name}}</span>
            </p>
            <div class="page-router">
                <transition name="fade" mode="out-in">
                    <router-view></router-view>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return{
                active:'1',
                isCollapse:false,
                routers:this.$router.options.routes[0].children,
                userName:''
            }
        },
        mounted(){
            this.getActive(this.$route.path)
        },
        methods:{
            getActive(val){
                let obj = this.routers.find(v=>v.path===val);
                this.active = obj.index;
            },
            logout(){

            },
            goToRoute(item){
                this.active = item.index;
                this.$router.push({path:item.path})
            }
        }
    }
</script>

<style lang="less" scoped>
    .page-home{
        width: 100%;height: 100%;display: flex;min-width: 1200px;
        .page-left{
            height: 100%;background-color: #001529;
            h1{
                height:65px;line-height:65px;text-align: center;
                color: #fff;font-size:20px;background-color: #00284D;
            }
        }
        .page-left-false{
            width: 250px;
        }
        .page-content{
            .content-top{
                height:65px;line-height:65px;border-bottom: 1px solid #eee;
                display: flex;justify-content: space-between;
                p{
                    color: #777;height: 35px;line-height:35px;
                    padding: 15px 0;
                    i{
                        cursor: pointer;
                    }
                    &:nth-of-type(1){
                        margin-left:12px;width: 60px;text-align: center;
                    }
                    &:nth-of-type(2){
                        margin-right:20px;cursor: pointer;
                        span:hover{
                            color:#409EFF;
                        }
                        .el-icon-search{
                            margin-right: 15px;
                        }
                        .el-icon-bell{
                            margin-right: 15px;
                        }
                        .user-info-inner{
                            display: inline-block;cursor: pointer;font-size: 16px;
                            img{
                                width: 30px;height: 30px;border-radius: 50%;vertical-align: middle;
                            }
                        }
                    }
                }
            }
            .breadcrumb{
                height:60px;line-height: 60px;font-size: 14px;
                margin-left: 35px;color:#777;border-bottom: 1px solid #eee;
                span{
                    font-size: 16px;color:#333;
                }
            }
            .page-router{
                background-color: #F0F2F5;height: calc(100% - 128px);width: 100%
            }
        }
        .page-content-false{
            width:calc(100% - 250px);
        }
        .page-content-true{
            width:calc(100% - 64px);
        }
    }
</style>

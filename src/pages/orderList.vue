<template>
  <div class="order-list">
    <order-header title="订单列表">
      <template v-slot:tip>
        <span>请谨防钓鱼链接或诈骗电话，了解更多></span>
      </template>
    </order-header>
    <div class="wrapper">
      <div class="container">
        <div class="order-box">
          <loading v-if="loading"></loading>
          <div class="order" v-for="(order, index) in list" :key="index">
            <div class="order-title">
              <div class="item-info fl">
                {{ order.createTime }}
                <span>|</span>
                {{ order.receiverName }}
                <span>|</span>
                订单号：{{ order.orderNo }}
                <span>|</span>
                {{ order.paymentTypeDesc }}
              </div>
              <div class="item-money fr">
                <span>应付金额：</span>
                <span class="money">{{ order.payment }}</span>
                <span>元</span>
              </div>
            </div>
            <div class="order-content clearfix">
              <div class="good-box fl">
                <div
                  class="good-list"
                  v-for="(item, i) in order.orderItemVoList"
                  :key="i"
                >
                  <div class="good-img">
                    <img v-lazy="item.productImage" alt="" />
                  </div>
                  <div class="good-name">
                    <div class="p-name">{{ item.productName }}</div>
                    <div class="p-money">
                      {{ item.totalPrice + "X" + item.quantity }}元
                    </div>
                  </div>
                </div>
              </div>
              <div class="good-state fr" v-if="order.status == 20">
                <a href="javascript:;">{{ order.statusDesc }}</a>
              </div>
              <div class="good-state fr" v-else>
                <a href="javascript:;" @click="goPay(order.orderNo)">{{
                  order.statusDesc
                }}</a>
              </div>
            </div>
          </div>
          <el-pagination
            v-if="true"
            class="pagination"
            background
            layout="prev, pager, next"
            :pageSize="pageSize"
            :total="total"
            @current-change="handleChange"
          >
          </el-pagination>
          <div class="load-more" v-if="false"><!--  v-if="showNextPage" -->
            <el-button type="primary" :loading="loading" @click="loadMore"
              >加载更多</el-button
            >
          </div>
          <div
            class="scroll-more"
            v-infinite-scroll="scrollMore"
            infinite-scroll-disabled="true"
            infinite-scroll-distance="410"
            v-if="false" 
          ><!--  infinite-scroll-disabled="busy" -->
            <img
              src="/miMall/dist/imgs/loading-svg/loading-spinning-bubbles.svg"
              alt=""
              v-show="loading"
            />
          </div>
          <no-data v-if="!loading && list.length == 0"></no-data>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import OrderHeader from "./../components/OrderHeader";
import Loading from "./../components/Loading";
import NoData from "./../components/NoData";
import { Pagination, Button } from "element-ui";
import infiniteScroll from 'vue-infinite-scroll';

export default {
  name: "order-list",
  components: {
    OrderHeader,
    Loading,
    NoData,
    [Pagination.name]: Pagination,//动态el-pagination组件
    [Button.name]: Button,//动态el-button组件
  },
  directives: {
    infiniteScroll//在directives里面引入指令
  },
  data() {
    return {
      loading: false,
      list: [],
      pageSize: 10,
      pageNum: 1,
      total: 0,
      showNextPage: true, //加载更多：是否显示按钮
      busy: true, //滚动加载，是否触发
    };
  },
  mounted() {
    this.getOrderList();
  },
  methods: {
    getOrderList() {
      this.loading = true;
      this.busy = true;
      this.axios
        .get("/orders", {
          //get要用到params，post不需要
          params: {
            pageSize: 10,
            pageNum: this.pageNum,
          },
        })
        .then((res) => {
          this.loading = false;
          this.list = this.list.concat(res.list);// this.list.concat()数据累加,+=list
          this.total = res.total;
          this.showNextPage = res.hasNextPage;
          this.busy = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    goPay(orderNo) {
      // 三种路由跳转方式
      // this.$router.push('/order/pay')
      /*this.$router.push({
          name:'order-pay',
          query:{
            orderNo
          }
        })*/
      this.$router.push({
        path: "/order/pay",
        query: {
          orderNo,
        },
      });
    },
    // 第一种方法：分页器
    handleChange(pageNum) {
      this.pageNum = pageNum;
      this.getOrderList();
    },
    // 第二种方法：加载更多按钮
    loadMore() {
      this.pageNum++;
      this.getOrderList();
    },
    // 第三种方法：滚动加载，通过npm插件vue-infinite-scroll实现
    scrollMore(){
      this.busy = true;
      setTimeout(()=>{
        this.pageNum++;
        this.getList();
      },500);
    },
    // 专门给scrollMore使用
    getList(){
      this.loading = true;
      this.axios.get('/orders',{
        params:{
          pageSize:10,
          pageNum:this.pageNum
        }
      }).then((res)=>{
        this.list = this.list.concat(res.list);
        this.loading = false;
        if(res.hasNextPage){
          this.busy=false;
        }else{
          this.busy=true;
        }
      });
    },
  }
};
</script>
<style lang="scss">
@import "./../assets/scss/config.scss";
@import "./../assets/scss/mixin.scss";
.order-list {
  .wrapper {
    background-color: $colorJ;
    padding-top: 33px;
    padding-bottom: 110px;
    .order-box {
      .order {
        @include border();
        background-color: $colorG;
        margin-bottom: 31px;
        &:last-child {
          margin-bottom: 0;
        }
        .order-title {
          @include height(74px);
          background-color: $colorK;
          padding: 0 43px;
          font-size: 16px;
          color: $colorC;
          .item-info {
            span {
              margin: 0 9px;
            }
          }
          .money {
            font-size: 26px;
            color: $colorB;
          }
        }
        .order-content {
          padding: 0 43px;
          .good-box {
            width: 88%;
            .good-list {
              display: flex;
              align-items: center;
              height: 145px;
              .good-img {
                width: 112px;
                img {
                  width: 100%;
                }
              }
              .good-name {
                font-size: 20px;
                color: $colorB;
              }
            }
          }
          .good-state {
            @include height(145px);
            font-size: 20px;
            color: $colorA;
            a {
              color: $colorA;
            }
          }
        }
      }
      .pagination {
        text-align: right;
      }
      .el-pagination.is-background .el-pager li:not(.disabled).active {
        background-color: #ff6600;
      }
      .el-button--primary {
        background-color: #ff6600;
        border-color: #ff6600;
      }
      .load-more,
      .scroll-more {
        text-align: center;
      }
    }
  }
}
</style>

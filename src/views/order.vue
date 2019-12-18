<template>
  <div>
     <el-table
      :data="tableData"
      style="width: 100%;">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    head () {
      return{
        title:'订单',
        author:'徐小笼',
        keywords:'citex交易所,citex exchange',
        description:'支持比特币（BTC）/莱特币（LTC）/以太坊（ETH）等多种数字货币交易，高速撮合引擎、全方位资金安全保障及极速充提体验，为您的交易保驾护航.'
      }
    },
    data(){
      return{
         tableData: []
      }
    },
    created(){
      this.tableData = [
        {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }
      ]
    },
    methods: {
    
    }
    
  }
</script>
<style>
.el-table__header{
  width: 100%;
}
.el-table__body{
  width: 100%;
}
.el-table-column--selection{
  width: 48px;
}
</style>

<style scoped lang="less">

</style>

<template>
  <div style="text-align: left">
    <el-container>
      <el-header style="padding-inline: 0;">
        <el-form :inline="true" class="demo-form-inline">
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
          >
            <el-menu-item index="1" @click="indexAdministration">数据列表</el-menu-item>
            <el-menu-item index="2">数据分析</el-menu-item>
          </el-menu>
        </el-form>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-col :span="24">
            <h5 style="margin-left:20px">账单分析</h5>
            <el-menu default-active="asideIndex" @open="handleOpen" @close="handleClose">
              <el-menu-item index="1">
                <span slot="title">月账单</span>
              </el-menu-item>
              <el-menu-item index="2" @click="yearAna">
                <span slot="title">年账单</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-aside>
        <el-main style="padding-bottom:0 ;">
          <el-row>
            <el-col :span="16" >
              <div >
              <el-card>
              <div id="type" class="echarts"></div>
              </el-card>
              <el-card >
              <div id="method" class="echarts"></div>
              </el-card>
              <el-card>
              <div id="people" class="echarts"></div>
              </el-card>
              </div>
            </el-col>
            <el-col :span="6" :offset="1">
                <el-card style="margin-top: 0px; width: 300px; text-align: center; height: 220px;">
                  <el-form
                    ref="tableData"
                    :model="tableData"
                    label-position="right"
                    label-width="70px"
                  >
                    <el-form-item label="年份" prop="title">
                      <el-col :span="16">
                        <el-input v-model="tableData.year" />
                      </el-col>
                    </el-form-item>
                    <el-form-item label="月份" prop="title">
                      <el-col :span="16">
                        <el-input v-model="tableData.month" />
                      </el-col>
                    </el-form-item>
                  </el-form>
                    <el-button type="primary" @click="check">查询</el-button>
                </el-card>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<!-- <template>
  <div style="text-align: left">
    <el-container>
      <el-header>
        <el-form :inline="true" class="demo-form-inline">
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
          >
            <el-menu-item index="1" @click="indexAdministration">数据列表</el-menu-item>
            <el-menu-item index="2">数据分析</el-menu-item>
          </el-menu>
        </el-form>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-col :span="12">
            <h5>账单分析</h5>
            <el-menu default-active="asideIndex" @open="handleOpen" @close="handleClose">
              <el-menu-item index="1">
                <span slot="title">月账单</span>
              </el-menu-item>
              <el-menu-item index="2" @click="yearAna">
                <span slot="title">年账单</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-aside>
        <el-main>
          <el-container>
            <el-aside width="800px">
              <div id="type" class="echarts"></div>
              <div id="method" class="echarts"></div>
              <div id="people" class="echarts"></div>
            </el-aside>
            <el-main style="height: 700px">
              <div>
                <el-card style="margin-top: 10px; width: 300px; text-align: center; height: 220px;">
                  <el-form
                    ref="tableData"
                    :model="tableData"
                    label-position="right"
                    label-width="70px"
                  >
                    <el-form-item label="年份" prop="title">
                      <el-col :span="16">
                        <el-input v-model="tableData.year" />
                      </el-col>
                    </el-form-item>
                    <el-form-item label="月份" prop="title">
                      <el-col :span="16">
                        <el-input v-model="tableData.month" />
                      </el-col>
                    </el-form-item>
                  </el-form>
                    <el-button type="primary" @click="check">查询</el-button>
                </el-card>
              </div>
            </el-main>
          </el-container>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template> -->

<script>
import api from "../api/index"
export default {
  name: "analyse",
  data() {
    return {
      tableData:{
        month:7,
        year:2022
      },
      asideIndex: "1",
      activeIndex: "2",
      opt1: {
        title: {
          text: "开支类型结构",
          // subtext: "Fake Data",
          left: "center"
        },
        tooltip: {
          trigger: "item"
        },
        legend: {
          orient: "vertical",
          left: "left"
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "50%",
            data: [],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      },
      opt2: {
        title: {
          text: "支付方式结构",
          // subtext: "Fake Data",
          left: "center"
        },
        tooltip: {
          trigger: "item"
        },
        legend: {
          orient: "vertical",
          left: "left"
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "50%",
            data: [],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      },
      opt3: {
        title: {
          text: "消费人员结构",
          // subtext: "Fake Data",
          left: "center"
        },
        tooltip: {
          trigger: "item"
        },
        legend: {
          orient: "vertical",
          left: "left"
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "50%",
            data: [],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      }
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    indexAdministration() {
      this.$router.push("/index");
    },
    yearAna() {
      this.$router.push("/analyseYear");
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    check(){
      if(this.tableData.month>0&&this.tableData.month<13){
      api.analyseMonth(this.tableData.month,this.tableData.year).then(response =>{
      this.opt1.series[0].data = response.data.data.type
      this.opt2.series[0].data = response.data.data.method
      this.opt3.series[0].data = response.data.data.people
      this.initCharts1();
      this.initCharts2();
      this.initCharts3();
      this.$message.success("查询成功")
    })}else{
      this.$message.error("月份错误")
    }
    },
    initCharts1() {
      let myChart1 = this.$echarts.init(document.getElementById("type"));
      myChart1.setOption(this.opt1);
    },
    initCharts2() {
      let myChart2 = this.$echarts.init(document.getElementById("method"));
      myChart2.setOption(this.opt2);
    },
    initCharts3() {
      let myChart3 = this.$echarts.init(document.getElementById("people"));
      myChart3.setOption(this.opt3);
    }
  },
  mounted() {
    api.analyseMonth(this.tableData.month,this.tableData.year).then(response =>{
      this.opt1.series[0].data = response.data.data.type
      this.opt2.series[0].data = response.data.data.method
      this.opt3.series[0].data = response.data.data.people
      this.initCharts1();
      this.initCharts2();
      this.initCharts3();
    })
  }
};
</script>

<style scoped>
.el-aside::-webkit-scrollbar {
  display: none;
}
.echarts {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

</style>
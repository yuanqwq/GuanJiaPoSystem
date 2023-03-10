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
              <el-menu-item index="1" @click="monthAna">
                <span slot="title">月账单</span>
              </el-menu-item>
              <el-menu-item index="2">
                <span slot="title">年账单</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-aside>

        <el-main style="padding-bottom:0 ;">

            <el-row>
              <el-col :span="16">
              <el-card style="height:620px;width:100%;">
                <div id="amount" class="echarts"></div>
                </el-card>
              </el-col>
              
              <el-col :span="4" :offset="1">

                <el-card style="margin-top: 0px; width: 300px; text-align: center; height: 150px;">
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
              <el-menu-item index="1" @click="monthAna">
                <span slot="title">月账单</span>
              </el-menu-item>
              <el-menu-item index="2">
                <span slot="title">年账单</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-aside>

        <el-main>
          <el-container>
            <el-container>
              <el-aside width="800px">
                <div id="amount" class="echarts"></div>
              </el-aside>

              <el-main>
                <div style="margin-left:80px">
                <el-card style="margin-top: 10px; width: 300px; text-align: center; height: 150px;">
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
                  </el-form>
                    <el-button type="primary" @click="check">查询</el-button>
                </el-card>
              </div>
              </el-main>
            </el-container>
          </el-container>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template> -->

<script>
import api from "../api/index"
export default {
  name: "analyseYear",
  data() {
    return {
      tableData: {
        year:2022
      },
      asideIndex: "2",
      activeIndex: "2",
      option: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999"
            }
          }
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: true },
            magicType: { show: true, type: ["line"] },
            restore: { show: true },
          }
        },
        legend: {
          data: ["金额", "开支", " "]
        },
        xAxis: [
          {
            type: "category",
            data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
            axisPointer: {
              type: "shadow"
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "开支",
            min: 0,
            max: 8000,
            interval: 1000,
            axisLabel: {
              formatter: "{value} 元"
            }
          }
        ],
        series: [
          {
            name: "金额",
            type: "bar",
            tooltip: {
              valueFormatter: function(value) {
                return value + "元";
              }
            },
            data: []
          },
          {
            name: " ",
            type: "line",
            // yAxisIndex: 1,
            tooltip: {
              valueFormatter: function(value) {
                return value + " 元";
              }
            },
            data: []
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
    monthAna() {
      this.$router.push("/analyse");
    },
    check(){
      api.analyseYear(this.tableData.year).then(response =>{
      this.option.series[0].data = response.data.data
      this.option.series[1].data = response.data.data
      this.initCharts();
      this.$message.success("查询成功")
    })
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    initCharts() {
      var myChart = this.$echarts.init(document.getElementById("amount"));
      myChart.setOption(this.option);
    }
  },
  mounted() {
    api.analyseYear(this.tableData.year).then(response =>{
      this.option.series[0].data = response.data.data
      this.option.series[1].data = response.data.data
      console.log(response.data.data)
      this.initCharts();
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
  height: 600px;
  overflow: hidden;
}
</style>
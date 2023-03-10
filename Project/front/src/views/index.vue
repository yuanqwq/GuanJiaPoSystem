

<template>
  <div>
    <el-container>
      <el-header style="padding-inline: 0;">
        <index-header />
      </el-header>

      <el-main>
        <el-card>
          <el-row>
            <el-col :span="2">
              <div id="search_all">
                <el-button type="primary" @click="handleGet" style="width:100px">获取记录</el-button>
              </div>
            </el-col>
            <el-col :span="2">
              <div id="search_all">
                <el-button type="primary" @click="addDataVisible = true" style="width:100px">新增记录</el-button>
              </div>
            </el-col>
            <el-col :span="2">
              <div id="search_all">
                <el-button type="primary" @click="checkVisible = true" style="width:100px">查询</el-button>
              </div>
            </el-col>
          </el-row>
        </el-card>


        <el-row style="height:10px;"></el-row>
        <el-card class="box-card" style="height:510px;">
          <el-table :data="tableData" height="490" style="width: 100%">
            <el-table-column prop="date" label="日期" width="110" />
            <el-table-column prop="type" label="类别" width="110" />
            <el-table-column prop="amount" label="金额" width="100" />
            <el-table-column prop="people" label="人员" width="80" />
            <el-table-column prop="method" label="支付方式" width="100" />
            <el-table-column prop="Cname" label="银行信息" width="130" />
            <el-table-column prop="balance" label="余额" width="100" />
            <el-table-column prop="province" label="省份" width="80" />
            <el-table-column prop="city" label="城市" width="80" />
            <el-table-column prop="area" label="地区" width="80" />
            <el-table-column prop="note" label="备注" />
            <el-table-column fixed="right" label="操作" width="140">
              <template slot-scope="scope">
                <el-button link type="danger" size="small" @click="handleDelete(scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-main>
    </el-container>

    <!-- 新增记录的表单部分 -->
    <el-dialog title="添加记录" width="50%"  :close-on-click-modal="false" :close-on-press-escape="false"
      :visible.sync="addDataVisible" >
      <el-form ref="form" :model="addData" label-width="80px" label-position="left" :inline="true">
      <el-row >
        <el-col :span="12" style="display:flex;">
        <el-form-item label="日期">
          <el-date-picker v-model="addData.date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date"
            placeholder="选择日期"></el-date-picker>
        </el-form-item>
        </el-col>
        <el-col :span="12" style="display:flex;">
        <el-form-item label="类别">
          <el-cascader :options="opt_type" :show-all-levels="false" v-model="addData.type" clearable></el-cascader>
        </el-form-item>
        </el-col>
        </el-row>
        <el-row >
          <el-col :span="12 " style="display:flex;">
        <el-form-item label="金额">
          <el-input v-model="addData.amount" size="mini" type="text" style="width:220px;"></el-input>
        </el-form-item>
        </el-col>
        <el-col :span="12" style="display:flex;">
        <el-form-item label="人员">
          <el-cascader :options="opt_people" :show-all-levels="false" v-model="addData.people" clearable></el-cascader>
        </el-form-item>
        </el-col>
        </el-row>
        <el-row >
          <el-col :span="12" style="display:flex;">
        <el-form-item label="支付方式">
          <el-cascader :options="opt_method" :show-all-levels="false" v-model="addData.method" clearable></el-cascader>
        </el-form-item>
        </el-col>
        <el-col :span="12" style="display:flex;">
        <el-form-item label="银行信息" v-if="addData.method == 'pos机'">
          <el-cascader :options="opt_Cname" :show-all-levels="false" v-model="addData.Cname" clearable></el-cascader>
        </el-form-item>
        </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" style="display:flex;">
        <el-form-item label="省份">
          <el-input v-model="addData.province" size="mini" type="text" style="width:220px;"></el-input>
        </el-form-item>
        </el-col>
        <el-col :span="12" style="display:flex;">
        <el-form-item label="城市">
          <el-input v-model="addData.city" size="mini" type="text" style="width:220px;"></el-input>
        </el-form-item>
        </el-col>
        </el-row>
        <el-row>
        <el-col :span="24" style="display:flex;">
        <el-form-item label="地区">
          <el-input v-model="addData.area" size="mini" type="text" style="width:220px;"></el-input>
        </el-form-item>
        </el-col>
        </el-row>
        <el-row>
        <el-col :span="24" style="display:flex;">
        <el-form-item label="备注">
          <el-input v-model="addData.note" size="mini" type="text" style="width:400px;"></el-input>
        </el-form-item>
        </el-col>
        </el-row>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelAdd">取 消</el-button>
        <el-button type="primary" @click="saveAdd">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 查询记录的表单部分 -->
    <el-dialog title="查询记录" width="50%" :close-on-click-modal="false" :close-on-press-escape="false"
      :visible.sync="checkVisible">
      <el-form ref="form" :model="form" label-width="100px" label-position="left" :inline="true">
      <el-row >
        <el-col :span="12" style="display:flex;">
        <el-form-item label="开始日期">
          <el-date-picker v-model="form.date1" format="yyyy-MM-dd" value-format="yyyyMMdd" type="date"
            placeholder="选择日期"></el-date-picker>
        </el-form-item>
        </el-col>
        <el-col :span="12" style="display:flex;">
        <el-form-item label="结束日期">
          <el-date-picker v-model="form.date2" format="yyyy-MM-dd" value-format="yyyyMMdd" type="date"
            placeholder="选择日期"></el-date-picker>
        </el-form-item>
        </el-col>
        </el-row>
        <el-row >
        <el-col :span="12" style="display:flex;">
        <el-form-item label="金额上限">
          <el-input v-model="form.amount2" size="mini" type="text" style="width:220px;"></el-input>
        </el-form-item>
        </el-col>
        <el-col :span="12" style="display:flex;">
        <el-form-item label="金额下限">
          <el-input v-model="form.amount1" size="mini" type="text" style="width:220px;"></el-input>
        </el-form-item>
        </el-col>
        </el-row>
        <el-row >
        <el-col :span="12" style="display:flex;">
        <el-form-item label="类别">
          <el-cascader :options="opt_type" :show-all-levels="false" v-model="form.type" clearable></el-cascader>
        </el-form-item>
        </el-col>
        <el-col :span="12" style="display:flex;">
        <el-form-item label="支付方式">
          <el-cascader :options="opt_method" :show-all-levels="false" v-model="form.method" clearable></el-cascader>
        </el-form-item>
        </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" style="display:flex;">
        <el-form-item label="人员">
          <el-cascader :options="opt_people" :show-all-levels="false" v-model="form.people" clearable></el-cascader>
        </el-form-item>
        </el-col>
        </el-row>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelCheck">取 消</el-button>
        <el-button type="primary" @click="check">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
// @ is an alias to /src
import indexHeader from "../components/indexHeader.vue";
import api from "../api/index"
export default {
  name: "index",
  components: { indexHeader },
  methods: {
    handleGet() {
      api.getAllItems({}).then(response => {
        this.tableData = response.data.data
        this.$message.success("获取成功")
      })
    },
    async handleDelete(index) {
      await api.delItem(this.tableData[index].RID)
      const { data: { data } } = await api.getAllItems({})
      this.tableData = data
      this.$message.success("删除成功")
      this.check()
    },
    cancelCheck() {
      this.checkVisible = false;
      this.form = {};
    },
    check() {
      this.checkVisible = false;
      api.getAllItems(this.form).then(response => {
        this.tableData = response.data.data
        this.$message.success("查询成功")
        //this.form = {};
      })
    },
    cancelAdd() {
      this.addData = {};
      this.addDataVisible = false;
    },
    async saveAdd() {
      this.addDataVisible = false;
      await api.addItem(this.addData)
      //console.log(this.addData)
      const { data: { data } } = await api.getAllItems({})
      this.tableData = data
      this.$message.success("新建成功")
      this.addData = {};
      
    }
  },
  mounted() {
    api.getAllItems({}).then(response => {
      this.tableData = response.data.data
      console.log(response.data.data)
    })
  },
  data() {
    return {
      amount1: "",
      amount2: "",
      date1: "",
      date2: "",
      type: "",
      method: "",
      people: "",
      checkVisible: false,
      addDataVisible: false,
      form: {},
      addData: {},
      tableData: [],
      opt_type: [
        {
          value: "交通出行",
          label: "交通出行"
        },
        {
          value: "投资理财",
          label: "投资理财"
        },
        {
          value: "日用百货",
          label: "日用百货"
        },
        {
          value: "文化休闲",
          label: "文化休闲"
        },
        {
          value: "生活服务",
          label: "生活服务"
        },
        {
          value: "服饰装扮",
          label: "服饰装扮"
        },
        {
          value: "教育培训",
          label: "教育培训"
        },
        {
          value: "餐饮美食",
          label: "餐饮美食"
        },
        {
          value: "其他",
          label: "其他"
        }
      ],
      opt_method: [
        {
          value: "微信",
          label: "微信"
        },
        {
          value: "支付宝",
          label: "支付宝"
        },
        {
          value: "pos机",
          label: "pos机"
        },
        {
          value: "现金",
          label: "现金"
        },
        {
          value: "其他",
          label: "其他"
        }
      ],
      opt_people: [
        {
          value: "家人",
          label: "家人"
        },
        {
          value: "朋友",
          label: "朋友"
        },
        {
          value: "同学",
          label: "同学"
        },
        {
          value: "室友",
          label: "室友"
        },
        {
          value: "同事",
          label: "同事"
        },
        {
          value: "老师",
          label: "老师"
        },
        {
          value: "自己",
          label: "自己"
        },
        {
          value: "其他",
          label: "其他"
        }
      ],
      opt_Cname: [
        {
          value: "中国银行",
          label: "中国银行"
        },
        {
          value: "中国建设银行",
          label: "中国建设银行"
        },
        {
          value: "中国农业银行",
          label: "中国农业银行"
        },
        {
          value: "中国工商银行",
          label: "中国工商银行"
        }
      ]
    };
  }
};
</script>

<style>
#app {
  text-align: center;
  color: var(--ep-text-color-primary);
}

.element-plus-logo {
  width: 50%;
}

.choose li {
  display: inline;
  margin: 5px;
  padding: 0;
}

.choose li el-input {
  margin: 0;
  color: red;
}
</style>
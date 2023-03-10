<template>
  <div>
    <!-- <div style="display: flex; justify-content: center; margin-top: 50px">
      <el-card style="width: 400px">
        <h2>登录</h2>
        <el-form ref="loginFormRef"
                 :model="form"
                 :rules="formRules"
                 label-width="80px">
          <el-form-item prop="username"
                        label="用户名">
            <el-input v-model="form.username"
                      autocomplete="off"
                      placeholder="请输入用户名">
            </el-input>
          </el-form-item>
          <el-form-item  prop="password"
                         label="密码">
            <el-input v-model="form.password"
                      autocomplete="off"
                      placeholder="请输入密码"
                      show-password
                      @keyup.enter.native="onSubmit">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       round
                       @click="onSubmit">登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>-->
    <div id="login_wrap">
      <div id="login">
        <div id="status">
          <i style="top: 0">欢迎</i>

        </div>
        <span>
          <el-form :model="form" ref="login" label-width="0px" class="ms-content">
            <el-form-item prop="username">
              <el-input v-model="form.username" placeholder="username"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                type="password"
                placeholder="password"
                v-model="form.password"
                @keyup.enter.native="onSubmit"
              ></el-input>
            </el-form-item>
            <div class="login-btn">
              <el-button @click="onSubmit">登录</el-button>
            </div>
          </el-form>
        </span>
      </div>
      <div id="login_img">
        <!-- 图片绘制框 -->
        <!-- <img src="../assets/login-bg.jpg" alt=""/> -->
        <p id="title">
          <i>管家婆系统</i>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "login",
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      formRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    onSubmit() {
      if (this.form.username === "guanjiapo" && this.form.password === "123") {
        this.$router.push("/index");
      }
    }
  }
};
</script>
<style scoped>
/* .el-form-item {
  margin-bottom: 30px;
} */
html,
body {
  height: 100%;
}
#login_wrap {
  width: 980px;
  min-height: 500px;
  border-radius: 10px;
  font-family: "neo";
  overflow: hidden;
  box-shadow: 0px 0px 120px rgba(0, 0, 0, 0.25);
  position: fixed;
  top: 50%;
  right: 50%;
  margin-top: -250px;
  margin-right: -490px;
}
#login {
  width: 50%;
  height: 100%;
  min-height: 500px;
  /* background: linear-gradient(45deg, #1677b3, #93b5cf); */
  background: #1781b5;
  opacity: 1;
  position: relative;
  float: right;
}
#login #status {
  width: 90px;
  height: 35px;
  margin: 40px auto;
  color: #fff;
  font-size: 30px;
  font-weight: 600;
  position: relative;
  overflow: hidden;
}
#login span {
  text-align: center;
}
#login span a {
  text-decoration: none;
  color: #fff;
  display: block;
  font-size: 18px;
}
#login_img {
  width: 50%;
  min-height: 500px;
  /* background: linear-gradient(45deg, #1677b3, #93b5cf); */
  float: left;
  position: relative;
  opacity: 0.7;
  background: linear-gradient(45deg, #1677b3, #93b5cf);
}
#login_img img {
  width: 50%;
}
#login_img span {
  position: absolute;
  display: block;
}

#login_img p {
  text-align: center;
  color: #fff;
  font-weight: 600;
  margin-top: 365px;
  font-size: 25px;
}
#login_img p i {
  font-style: normal;
  margin-right: 45px;
}
#login_img p i:nth-last-child(1) {
  margin-right: 0;
}
#login_wrap .login-btn {
  width: 50%;
  margin: auto;
  display: flex;
}
#login_wrap .login-btn button {
  width: 100%;
  height: 36px;
  text-align: center;
  margin-bottom: 10px;
  background: #1a94bc;
  color: #fff;
}
#login_wrap .login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}
#login_wrap .el-input__inner {
  width: 300px;
  height: 30px;
  font-size: 18px;
  background: none;
  border: none;
  border-radius: 0px;
  border-bottom: 1px solid #fff;
  color: #fff;
  margin-bottom: 20px;
}
.ms-content .el-input__inner:focus {
  border-color: #fff;
}
.ms-content {
  padding: 10px 30px 30px 30px;
  width: 75%;
  margin: 0 auto;
}
.ms-content input::placeholder {
  color: rgba(255, 255, 255, 0.8);
  font-size: 18px;
  font-family: "neo";
}
</style>

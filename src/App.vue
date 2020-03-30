<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <message ref="msgSuccess" class="success">
      <!-- 命名为title插槽内容 -->
      <template v-slot:title="slotProps">
        <strong>{{slotProps.title}}</strong>
      </template>
      <!-- 默认插槽内容 -->
      <template v-slot:default>新增课程成功！</template>
    </message>

    <message ref="msgWarning" class="warning">
      <!-- 命名为title插槽内容 -->
      <template v-slot:title>
        <strong>警告</strong>
      </template>
      <!-- 默认插槽内容 -->
      <template v-slot：default>请输入课程名称！</template>
    </message>
    <!-- toolbar -->
        <div class="toolar">
            <button @click="$bus.$emit('message-close')">清空提示框</button>
        </div> 
        <p>
            <input type="text" v-model.number="price">
            <button @click="batchUpdate">批量更新价格</button></p>
    <!-- 新增课程 -->
    <course-add v-model="course" @add-course="addCourse"></course-add>
    <!-- 列表组件 -->
    <course-list :courses="courses"></course-list>
    <p>课程总数：{{totalCount}}</p>
  </div>
</template>
<script>
import CourseList from "./components/CourseList";
import CourseAdd from "./components/CourseAdd";
import Message from "./components/Message";
import { getCourses } from "./api/course";
export default {
  name: "App",
  components: {
    CourseList,
    CourseAdd,
    Message
  },
  data() {
    return {
      title: "哈天达的技能车",
      course: "",
      courses: [],
      totalCount: 0,
      price: 0

    };
  },
  async created() {
    //组件实例已创建 由于未挂在，所以dom元素还不存在
    const courses = await getCourses();
    this.courses = courses;
  },
  methods: {
    addCourse() {
      if (this.course) {
        //1.添加course到数组
        this.courses.push({ name: this.course });
        this.course = "";

        //显示提示信息
        this.show = true;
        this.$refs.msgSuccess.toggle();
      } else {
        //显示错误信息
        this.$refs.msgWarning.toggle();
      }
    },
    batchUpdate() {
      this.courses.forEach(c => {
        this.$set(c, "price", this.price); //ok
      });
    }
  },
  computed: {
    //计算属性有缓存性，如果值没有变化，页面就不会重新渲染
    total() {
      return this.courses.length + "门";
    }
  },
  watch: {
    courses: {
      immediate: true, //立即执行一次
      handler(newValue) {
        this.totalCount = newValue.length + "门";
      }
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.message-box {
  padding: 10px 20px;
}

.success {
  background: #4fc08d;
  border: 1px solid #fff;
}

.warning {
  background: #b81193;
  border: 1px solid #fff;
}

.message-box-close {
  float: right;
}
</style>

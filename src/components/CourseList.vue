<template>
  <!-- 条件渲染-->
  <div>
    <p v-if="courses.length == 0">没有任何课程信息</p>
    <!-- 列表渲染 -->
    <!-- <div v-for="c in courses" :key="c" :class="{active: selectedCourse === c}"
                @click="selectedCourse = c">
                    {{ c }} 
    </div>-->

    <div class="cours-list" v-else>
      <!-- style ？如果成立则 ：否则没有颜色灯透明色 -->
      <div
        v-for="c in courses"
        :key="c.name"
        :style="{backgroundColor: (selectedCourse === c ? '#ddd' : 'transparent')}"
        @click="selectedCourse = c"
      >{{ c.name }} - ¥{{ c.price }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedCourse: "",
    };
  },
  props: {
    courses: {
      type: Array,
      default: function () {
          return []
      }
    }
  },
};
</script>

<style scoped>
.active {
            background-color: #ddd;
        }
</style>
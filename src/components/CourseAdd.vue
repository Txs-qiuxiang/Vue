<template>
    <div>
         <!-- 用户输入-->
                <p>
                    <input type="text" :value="val" 
                    @change="onChange"
                    v-on:keydown.enter="addCourse"
                    ref='inp'>
                    <button @click="addCourse">新增</button>
                </p>

    </div>
</template>

<script>
    export default {
        props: ['val'],
            model: {
                value: 'val',
                event: 'change'

            },
            methods: {
                addCourse() {
                    //派发事件，通知伏组件新增
                    this.$emit('add-course')
                },
                //target事件
                onChange(e) {
                    this.$emit('change', e.target.value)
                }
            },
            mounted () {
                this.$refs.inp.focus();
            }
    }
</script>

<style scoped>

</style>
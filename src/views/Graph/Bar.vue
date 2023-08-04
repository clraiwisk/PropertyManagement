<template>
    <div>
        <h2>小区内各类人员数量</h2>
        <div class="right">
            <p>
            <pre>{{ items }}</pre>
            </p>
        </div>

        <div class="left">
            <!-- echarts图表绘制在这里 -->
            <div ref="bar" style="width: 100%; height:600px;"></div>
        </div>
    </div>
</template>
  
<script>
import * as echarts from 'echarts'

export default {
    name: 'bar-graph',
    data() {
        return {
            items: '',
            time: new Date().toDateString()
        }
    },
    created(){
        this.time = '数据更新时间：' + this.time;
    },
    async mounted() {
        // 根据准备好的dom初始化echarts实例
        var myBar = echarts.init(this.$refs.bar);

        // 使用刚才指定的配置项和数据显示图表
        myBar.setOption({
            title: {
                text: this.time,

            },
            tooltip: {},
            legend: {
                data: ['人数（个）'],    // 要和series.name一致
                x: 'right',
                y: '80px'
            },
            xAxis: {
                type: 'category',
                data: ['业主', '租户', '物业人员', '公职人员', '快递']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '人数（个）',
                    type: 'bar',
                    data: await this.$api.homeMain.barTotal()
                }
            ]
        });
    }
}
</script>
  
  <!-- 添加"scoped"属性来限制CSS仅作用于这个组件 -->
<style lang="scss" scoped>
.left {
    width:100%;
}

.right {
    float: right;
    padding-right: 30px;
}
</style>
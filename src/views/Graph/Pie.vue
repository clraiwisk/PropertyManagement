<template>
    <div>
        <h2>各区域中的房屋数量</h2>
        <div class="right">
            <p>
            <pre>{{ items }}</pre>
            </p>
        </div>

        <div class="left">
            <!-- echarts图表绘制在这里 -->
            <div ref="pie" style="width: 100%; height:600px;"></div>
        </div>
    </div>
</template>
  
<script>
import * as echarts from 'echarts'

export default {
    name: 'pie-graph',
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
        var myPie = echarts.init(this.$refs.pie);

        // 使用刚才指定的配置项和数据显示图表
        myPie.setOption({
            title: {
                text: this.time,
                // subtext: '2016年11月',
                // left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                // orient: 'vertical',
                // data: ['销售额'],    // 要和series.name一致
                x: 'right',
                y: 'top'
            },
            series: [{
                // name: '销售额',
                type: 'pie',
                radius: '50%',
                data: await this.$api.homeMain.pieTotal(),
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
            ]
        });
    }
}
</script>
  
  <!-- 添加"scoped"属性来限制CSS仅作用于这个组件 -->
<style lang="scss" scoped>
.left {
    text-align: center;
    width: 100%;
}

.right {
    float: right;
    padding-right: 30px;
}
</style>
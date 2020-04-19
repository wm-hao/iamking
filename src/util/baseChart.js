import echarts from 'echarts'

export function createBaseBar(category, data, id, config, vertical) {
    let myChart = echarts.init(document.getElementById(id));
    let options = {
        title: {
            text: config.title || '标题',
            textStyle: {
                fontSize: 16,
                fontWeight: 'normal',
            },
            left: '45%',
            top: '1%'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        xAxis: {
            axisLabel: {
                interval: config.xInterval || 0
            },
            axisLine: {
                lineStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: 'red'
                        }, {
                            offset: 1, color: 'blue'
                        }],
                        global: false
                    }
                }
            }
        },
        yAxis: {
            axisLabel: {
                interval: config.yInterval || 0,
                align: config.yLabelAlign || 'right'
            },
            axisLine: {
                lineStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: 'red'
                        }, {
                            offset: 1, color: 'blue'
                        }],
                        global: false
                    }
                }
            }
        },
        series: {
            barWidth: config.barWidth || '10px',
            type: 'bar',
            name: config.dataName || '名称',
            data: data,
            markLine: {
                data: [
                    {
                        type: 'average',
                        name: '平均数',
                        label: {
                            normal: {
                                position: 'end',
                                formatter: '{b}: {c}'
                            }
                        }
                    }
                ]

            },
            itemStyle: {
                normal: {
                    barBorderRadius: 6,
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: '#f45c3d'
                        }, {
                            offset: 1, color: '#f9bf6b'
                        }],
                    },
                    label: {
                        show: true,
                        position: 'top',
                        textStyle: {
                            color: '#222222'
                        },
                        formatter: function (params) {
                            if (params.value == 0) {
                                return '';
                            } else {
                                return params.value;
                            }
                        }
                    },
                },
            },
        }

    };
    if (config.zoom) {
        options.dataZoom = [
            {
                id: 'dataZoomX',
                type: 'slider',
                xAxisIndex: [0],
                filterMode: 'filter',
                start: config.zoomStart || 80,
                end: config.zoomEnd || 100
            }
        ]
    }
    if (vertical) {
        options.yAxis.data = category;
    } else {
        options.xAxis.data = category;
    }
    myChart.setOption(options);
}
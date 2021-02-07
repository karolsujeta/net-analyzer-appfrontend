import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

export class ChartParams {

    constructor(private chartData: ChartDataSets[], private chartLabel: Label[]) { }

    lineChartData: ChartDataSets[] = [
        { data: this.chartData, label: 'Wartości pingów dla kolejnych pomiarów' },
    ];

    lineChartLabels: Label[] = this.chartLabel;


    lineChartOptions = {
        responsive: true,
    };

    lineChartColors: Color[] = [
        {
            borderColor: 'black',
            backgroundColor: '#ff9900',
        },
    ];

    lineChartLegend = true;
    lineChartType = 'line';
}
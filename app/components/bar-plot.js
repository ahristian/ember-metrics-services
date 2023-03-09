import Component from '@glimmer/component';
import d3 from 'd3';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class BarChartComponent extends Component {
  @tracked metrics = this.args.metrics;

  @action async onDrawBar() {
    const metrics = Object.entries(this.metrics);
    const groups = metrics.reduce((groups, metric) => {
      const date = metric[0].split('T')[0];
      if (!groups[date]) {
        groups[date] = 0;
      }
      groups[date] += metric[1];
      return groups;
    }, {});

    const groupArrays = Object.keys(groups).map((date) => {
      return {
        date,
        metricsGrouped: groups[date],
      };
    });

    let metricCounts = groupArrays.map((metric) => metric.metricsGrouped);

    let yScale = d3
      .scaleLinear()
      .domain([0, Math.max(...metricCounts)])
      .range([0, 100]);

    let svg = d3.select(document.querySelectorAll('svg')[0]);

    let xScale = d3
      .scaleBand()
      .domain(groupArrays.map((metric) => metric.date))
      .range([0, 100])
      .paddingInner(0.12);

    svg
      .selectAll('rect')
      .data(groupArrays)
      .enter()
      .append('rect')
      .attr('width', `${xScale.bandwidth()}%`)
      .attr('height', (metric) => `${yScale(metric.metricsGrouped)}%`)
      .attr('x', (metric) => `${xScale(metric.date)}%`)
      .attr('y', (metric) => `${100 - yScale(metric.metricsGrouped)}%`);
  }
}

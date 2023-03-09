import Route from '@ember/routing/route';

export default class IndexRoute extends Route {
  async model() {
    const headers = { Authorization: '4f981c43-bf28-404c-ba22-461b5979b359' };
    const readingsUrl = 'https://snapmeter.com/api/public/meters/2080448990211/readings?start=2022-08-01&end=2023-02-01';
    const readingsResponse = await fetch(readingsUrl, { headers });
    const readings = await readingsResponse.json();

    const servicesUrl = 'https://snapmeter.com/api/public/services/2080448990210/bills?start=2022-01-01&end=2023-02-01';
    const servicesResponse = await fetch(servicesUrl, { headers });
    const services = await servicesResponse.json();

    return {
      readings,
      services,
    };
  }
}

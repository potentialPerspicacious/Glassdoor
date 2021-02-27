import React, { Component } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';
import backendServer from '../../../webConfig';
import Loader from 'react-loader-spinner';

class TopVisits extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
    this.getData();
  }

  getData() {
    axios.get(`${backendServer}admin/topvisits`).then((response) => {
      console.log(response);
      if (response.status === 200) {
        this.setState({
          loading: false,
          // loading: true,
          options: {
            chart: {
              id: 'basic-bar',
            },
            xaxis: {
              categories: response.data.name,
            },
          },
          series: [
            {
              name: 'Rating',
              data: response.data.number,
            },
          ],
        });
        // this.forceUpdate();
      }
    });
  }

  render() {
    return (
      <div className='app'>
        <div className='row'>
          <div className='mixed-chart'>
            {this.state.loading ? (
              <div
                style={{
                  width: 500,
                  height: 300,
                  position: 'relative',
                  left: '50%',
                  top: '50%',

                  // transform: 'translate(-50%, -50%)',
                }}
              >
                <Loader type='Puff' color='#00b32d' height={70} width={100} />
              </div>
            ) : (
              <Chart
                options={this.state.options}
                series={this.state.series}
                type='bar'
                width='500'
                height='300'
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default TopVisits;

import React, {Component} from 'react';
import {Card, Button} from 'react-bootstrap'


class SalaryList extends Component {
  constructor(props){
      super(props)
      this.state ={
      }
  }
  render(){
      return(
      <div className='container'>
      <p style={{marginLeft: '10px', fontSize: '20px',color: '#1355a9',fontWeight: 'bold'}}>
        {' '}
        { this.props.salary_items._id.job_title}
      </p>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <p style={{ marginLeft: '10px', fontWeight: 'bold' }}>
            {' '}
            ${ this.props.salary_items.base_salary +  this.props.salary_items.bonus}/yr
          </p>
          <p
            style={{
              fontWeight: 'light',
              fontSize: '15px',
              marginLeft: '10px',
              padding: '0px',
            }}
          >
            Avg. Total Pay
          </p>
        </div>
        <div>
          <Button
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: 'grey',
              fontSize: '25px',
            }}
          >
            <i class='fa fa-angle-right'></i>
          </Button>
        </div>
        <div>
          <p style={{ marginLeft: '15px', fontWeight: 'bold' }}>
            {' '}
            ${ this.props.salary_items.base_salary}/yr
          </p>
          <p
            style={{
              fontWeight: 'light',
              fontSize: '15px',
              marginLeft: '10px',
              padding: '0px',
            }}
          >
            Base Pay
          </p>
        </div>
        <div>
          <p style={{ marginLeft: '15px', fontWeight: 'bold' }}>
            ${ this.props.salary_items.bonus}/yr
          </p>
          <p
            style={{
              fontWeight: 'light',
              fontSize: '15px',
              marginLeft: '10px',
              padding: '0px',
            }}
          >
            Additional Pay
          </p>
        </div>
      </div>
</div>

  )
 }
};

export default SalaryList;
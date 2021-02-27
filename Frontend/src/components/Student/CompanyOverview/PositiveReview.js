import React from 'react';
import { Card, Button, Modal, Form, Alert, Badge } from 'react-bootstrap';

export const PositiveReview = (props) => {
  let positive = props.company_positiveReview;
  console.log('Inside positive review');
  console.log(positive);
  if (positive) {
    const createElements = (n) => {
      var elements = [];
      for (let i = 0; i < n; i++) {
        elements.push(
          <i
            className='fa fa-star'
            aria-hidden='true'
            style={{ color: 'green' }}
          ></i>
        );
      }
      return elements;
    };
    const creatCards=(n) => {
      var elements = [];
      if(n=== 1) {
        elements.push(
          <i className='fa fa-square' aria-hidden='true' style={{ color: 'green' }}></i>,
        );
      }
      if(n=== 0){
        elements.push(
          <i className='fa fa-square' aria-hidden='true' style={{ color: 'red' }}></i>,
        );
      }
      return elements;
    }
    const list = (
      <div>
        <Button
          class='button button1'
          style={{
            backgroundColor: '#0caa41',
            bordercolor: '#0caa41',
            color: 'white',
            fontSize: '13px',
          }}
        >
          Positive Review
        </Button>
        <p
          style={{
            marginLeft: '10px',
            fontSize: '20px',
            color: '#1355a9',
            fontWeight: 'bold',
          }}
        >
          "{positive.headline}"
        </p>
        <div style={{display: "flex", justifyContent: "space-between"}}>
                    <p style={{marginLeft: "10px"}}>{positive.rating}.0 {createElements(positive.rating)}</p>
                    <p style={{marginLeft: "10px"}}>Recommends {creatCards(positive.ceo_rating)}</p>
                    <p style={{marginLeft: "10px"}}>Approves of CEO {creatCards(positive.recommended)}</p>
                    </div>
        <p style={{ marginLeft: '10px' }}> {positive.description}</p>
        <p style={{ fontWeight: 'bold', marginLeft: '10px', padding: '0px' }}>
          Pros
        </p>
        <p style={{ marginLeft: '10px' }}>{positive.pros}</p>
        <p style={{ fontWeight: 'bold', marginLeft: '10px' }}>Cons</p>
        <p style={{ marginLeft: '10px' }}>{positive.cons}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div></div>
          <div>
            <Button
              style={{
                backgroundColor: 'transparent',
                bordercolor: 'DodgerBlue',
                hoverbackground: 'DodgerBlue',
                color: '#1355a9',
                fontSize: '15px',
              }}
            >
              Helpful({positive.helpful})
            </Button>
          </div>
        </div>
      </div>
    );
    return <div>{list}</div>;
  } else {
    return (
      <div>
        <p></p>
      </div>
    );
  }
};

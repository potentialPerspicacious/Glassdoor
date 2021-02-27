import React from 'react';
import { Card, Button, Modal, Form, Alert, Badge } from 'react-bootstrap';

export const NegativeReview = (props) => {
  let negative = props.company_negativeReview;
  console.log('Inside negative review');
  console.log(negative);
  if (negative) {
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
            backgroundColor: '#eb4133',
            bordercolor: '#eb4133',
            color: 'white',
            fontSize: '13px',
          }}
        >
          Negative Review
        </Button>
        <p
          style={{
            marginLeft: '10px',
            fontSize: '20px',
            color: '#1355a9',
            fontWeight: 'bold',
          }}
        >
          "{negative.headline}"
        </p>
        <div style={{display: "flex", justifyContent: "space-between"}}>
                    <p style={{marginLeft: "10px"}}>{negative.rating}.0 {createElements(negative.rating)}</p>
                    <p style={{marginLeft: "10px"}}>Recommends {creatCards(negative.ceo_rating)}</p>
                    <p style={{marginLeft: "10px"}}>Approves of CEO {creatCards(negative.recommended)}</p>
                    </div>
        <p style={{ marginLeft: '10px' }}> {negative.description}</p>
        <p style={{ fontWeight: 'bold', marginLeft: '10px', padding: '0px' }}>
          Pros
        </p>
        <p style={{ marginLeft: '10px' }}>{negative.pros}</p>
        <p style={{ fontWeight: 'bold', marginLeft: '10px' }}>Cons</p>
        <p style={{ marginLeft: '10px' }}>{negative.cons}</p>
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
              Helpful({negative.helpful})
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

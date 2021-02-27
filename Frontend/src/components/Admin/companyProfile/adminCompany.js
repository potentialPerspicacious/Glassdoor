import Navbar from '../../Student/Navbar/navbar_admin';
import React, { Component } from 'react';
import axios from 'axios';
import backendServer from '../../../webConfig';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AdminLoginCheck from '../adminLoginCheck';

class adminCompany extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyRating: [],
    };
  }

  componentWillMount() {
    axios.get(`${backendServer}admin/company/fetchCompanies`).then((res) => {
      //console.log(res.data );
      this.setState({ companyList: res.data.data });
      this.setState({ companyRating: res.data.avgRating });
    });
  }

  render() {
    //console.log(this.state.companyRating);
    let renderCompanyList;
    if (this.state.companyList) {
      renderCompanyList = this.state.companyList.map((company) => {
        let rating = this.state.companyRating;
        var averageRating;
        for (let i = 0; i < rating.length; i++) {
          if (rating[i]._id === company.name) {
            averageRating = rating[i].rating.toFixed(1);
          }
        }
        return (
          <div class='container'>
            <br />
            <div
              class='card bg-light p-3'
              style={{ width: '60rem', paddingLeft: '10%' }}
            >
              <Card>
                <div class='continer'>
                  <Card.Body>
                    <div class='d-flex'>
                      <div class='pull-left'>
                        <Card.Img
                          variant='top'
                          class='building-icon'
                          src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAclBMVEX///8AAACmpqZFRUVCQkLa2totLS3y8vJlZWUfHx9xcXHIyMgpKSnx8fE/Pz+Pj49VVVUJCQnCwsLq6uoUFBSurq7R0dH4+PhRUVFfX1+VlZWBgYEyMjKIiIhra2t5eXmgoKAZGRm2trbZ2dk3Nzfj4+M48jMoAAAEBklEQVR4nO3d6XqiMBSAYW1r3RcUt45t1er93+JMRwkawulRJI34fT95Auk7TF0wxVqNiIiIiIh+ve2Tp8a/JRzUPbX8LeGzL2ELIUKEPwijqgsHjfKa9UIQvpQ4w/y16sImwpJDWDyEZZcRzvcTof08GSeN+ld6wOCE3XokVH9Kxo2kcfVe3xwwQKHYiVCqjdBfCBHer7D1ZvXpFMZDe9zLvQi39sCGU9jLHLBzL8KpPXDmFLbn9jiE3kNoQpiE0HsITQiTEHoPoQlhEkLvqd89fbmFmQPejfC9Oz6r++QWju1xoxzhYnx13VKEeV19FaNAu8oLnxEiRHjW+nzH3AIW9uVHbvOx2Uz7AH8UjmZXtCtDePOKPOM/V174glARwuIhlEKoKStsipl3vHN53MnxMkL1ruUIu3FPaGPe+7fa0rhd+nNmhduNtGt88mqhHKH8Ckr5unQjvcefylOc/N1CwELxKgZChAh1wsWnVcspjDr2uJVauLR3HXkVXr3a5FMtnNm7dr0Ky7zmfRRmLoOOEV4VQhPCJIQ1hAgvDaEJYRLCGkKEl1Z0tcn9Ct/21p9kb93CL2vYvqUWTu1dn7wK86rOVQyECBGGK1wn4xbyuICFE/l2T41k3FgcNk2fJ7PChjzFvmThzQvvE9Jbh1AKoSaExUMohVBTRjhbDYRW5p1xZyeNW4irTcQpXkNZbSK/amO1CUKECBXC3Whx1ujZKYwWVqO2Wjiwpxh4FbLa5P6vCCNEiBDhIYSaEJoQJiGsIUR4aY8rrP5qk7V9c+exW2jfObr/oRZu7SmmXoWO+zu7hPXYGhVHamHeFFynQYjw4YXrZJz8uUUUsHD/PhR6N5cAp9Kw4Zu02mQmT8FqkwtDWDyEUgg1ISweQqlyhOvFSCp5Pu63llJDczyHcChOsUxXqpQj/CO/pkqW0E7kYSnIIWzJ+6av+H5XGJcljBEiRHgUvq6sNk5hvLPHqYWRvecq9imMJvbId6ewYw9rtrXC18y11g+v5/BaYV8vbNr7IrwqhGkIjyH8DqHZgFATwjSExxB+h9BsQKjpcYVRw7pj8/zPzYUT+z7TfoWZN+DtWwvzpgjsOk0BYV4IESL0IVzKU5QtnHbEkufJIsK1OMNn2Z89KSsiVIdQU1nCD7OhqkLOoa6QhdU/hwh1IdTEI01unEOzoarC6p9DhLpCFvJ7qAuhJoS5PbyQRxpdIQs5h7oQauJ/aW6Pew6b9jmc+xfOT74X5Otwr8JB4+K6m8MPbn+XyewgXKYbetaGCzr+dKdfhJJZHO5ocrw7w2mOTT+Ut0fu9suncB0ru8LeJbx8qoBSCa/41wwm3TlEGHL8Hv6vKX9FSOBlFsMREREREZGX/gIAA/VAN9vp3wAAAABJRU5ErkJggg=='
                        ></Card.Img>
                      </div>
                      <div class='col-md-5'>
                        <Card.Title>
                          <Link to={`/admin/companyReview/${company.name}`}>
                            <h4 className='ml-3' style={{ color: 'green' }}>
                              <b>{company.name}</b>
                            </h4>
                          </Link>

                          <h6 className='ml-3'>
                            {<span>{averageRating} </span>}
                            <img
                              alt='rating'
                              height='16'
                              width='16'
                              src='https://upload.wikimedia.org/wikipedia/commons/1/1f/Green_star_41-108-41.svg'
                            ></img>
                          </h6>
                        </Card.Title>
                        <h5 className='ml-3'>
                          {company.city && <span>{company.city},</span>}
                          {company.state && <span> {company.state}</span>}
                        </h5>
                        <h6 className='ml-3' style={{ color: 'grey' }}>
                          {company.website && <span>{company.website}</span>}
                        </h6>
                      </div>
                      <div class='col-md-2'>
                        <h4>
                          {company.reviews && (
                            <span>
                              <b>{company.reviews}</b>
                            </span>
                          )}
                        </h4>
                        <Link to={`/admin/statistics/${company.name}`}>
                          View Statictics
                        </Link>
                      </div>
                    </div>
                  </Card.Body>
                </div>
              </Card>
            </div>
          </div>
        );
      });
    }
    console.log(this.state.companyList);
    return (
      <React.Fragment>
        <AdminLoginCheck />
        <Navbar />
        <br />
        {renderCompanyList}
      </React.Fragment>
    );
  }
}

export default adminCompany;

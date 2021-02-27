import React, { Component } from 'react';
import { Button, Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/navbar_student';
import backendServer from '../../../webConfig';
import axios from 'axios';
import Loader from 'react-loader-spinner';

class SearchSalary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      pager: {},
      pageOfItems: [],
    };
  }

  componentDidMount() {
    this.loadPage(this.props.match.params.keyword, this.props.location.search);
  }

  loadPage = (param, pageParam) => {
    const data = {
      company_name: param,
    };
    const params = new URLSearchParams(pageParam);
    const page = parseInt(params.get('page')) || 1;
    axios
      .post(`${backendServer}company/search/salary?page=${page}`, data, {
        headers: { Authorization: `${localStorage.getItem('token')}` },
      })
      .then((response) => {
        console.log(response);
        this.setState({
          loading: false,
          pager: response.data.pager,
          pageOfItems: response.data.items,
        });
      })
      .catch((error) => {
        console.log('error');
        console.log(error);
      });
  };
  componentWillReceiveProps(nextProp) {
    console.log('next:', nextProp);
    this.loadPage(nextProp.match.params.keyword, nextProp.location.search);
  }
  render() {
    const { pager, pageOfItems } = this.state;
    let renderOutput = <div></div>;
    if (this.state.loading) {
      renderOutput = (
        <div
          style={{
            width: 500,
            position: 'relative',
            left: '50%',
            top: '50%',
            // transform: 'translate(-50%, -50%)',
          }}
        >
          <Loader type='Puff' color='#00b32d' height={70} width={100} />
        </div>
      );
    } else if (!pageOfItems || pageOfItems.length < 1) {
      renderOutput = (
        <h3>
          <b>No results found</b>
        </h3>
      );
    }
    if (pageOfItems && pageOfItems.length > 0) {
      renderOutput = [];
      for (var i = 0; i < pageOfItems.length; i++) {
        console.log('i value:', pageOfItems[i]);
        let value = pageOfItems[i];
        var imgSrc =
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAclBMVEX///8AAACmpqZFRUVCQkLa2totLS3y8vJlZWUfHx9xcXHIyMgpKSnx8fE/Pz+Pj49VVVUJCQnCwsLq6uoUFBSurq7R0dH4+PhRUVFfX1+VlZWBgYEyMjKIiIhra2t5eXmgoKAZGRm2trbZ2dk3Nzfj4+M48jMoAAAEBklEQVR4nO3d6XqiMBSAYW1r3RcUt45t1er93+JMRwkawulRJI34fT95Auk7TF0wxVqNiIiIiIh+ve2Tp8a/JRzUPbX8LeGzL2ELIUKEPwijqgsHjfKa9UIQvpQ4w/y16sImwpJDWDyEZZcRzvcTof08GSeN+ld6wOCE3XokVH9Kxo2kcfVe3xwwQKHYiVCqjdBfCBHer7D1ZvXpFMZDe9zLvQi39sCGU9jLHLBzL8KpPXDmFLbn9jiE3kNoQpiE0HsITQiTEHoPoQlhEkLvqd89fbmFmQPejfC9Oz6r++QWju1xoxzhYnx13VKEeV19FaNAu8oLnxEiRHjW+nzH3AIW9uVHbvOx2Uz7AH8UjmZXtCtDePOKPOM/V174glARwuIhlEKoKStsipl3vHN53MnxMkL1ruUIu3FPaGPe+7fa0rhd+nNmhduNtGt88mqhHKH8Ckr5unQjvcefylOc/N1CwELxKgZChAh1wsWnVcspjDr2uJVauLR3HXkVXr3a5FMtnNm7dr0Ky7zmfRRmLoOOEV4VQhPCJIQ1hAgvDaEJYRLCGkKEl1Z0tcn9Ct/21p9kb93CL2vYvqUWTu1dn7wK86rOVQyECBGGK1wn4xbyuICFE/l2T41k3FgcNk2fJ7PChjzFvmThzQvvE9Jbh1AKoSaExUMohVBTRjhbDYRW5p1xZyeNW4irTcQpXkNZbSK/amO1CUKECBXC3Whx1ujZKYwWVqO2Wjiwpxh4FbLa5P6vCCNEiBDhIYSaEJoQJiGsIUR4aY8rrP5qk7V9c+exW2jfObr/oRZu7SmmXoWO+zu7hPXYGhVHamHeFFynQYjw4YXrZJz8uUUUsHD/PhR6N5cAp9Kw4Zu02mQmT8FqkwtDWDyEUgg1ISweQqlyhOvFSCp5Pu63llJDczyHcChOsUxXqpQj/CO/pkqW0E7kYSnIIWzJ+6av+H5XGJcljBEiRHgUvq6sNk5hvLPHqYWRvecq9imMJvbId6ewYw9rtrXC18y11g+v5/BaYV8vbNr7IrwqhGkIjyH8DqHZgFATwjSExxB+h9BsQKjpcYVRw7pj8/zPzYUT+z7TfoWZN+DtWwvzpgjsOk0BYV4IESL0IVzKU5QtnHbEkufJIsK1OMNn2Z89KSsiVIdQU1nCD7OhqkLOoa6QhdU/hwh1IdTEI01unEOzoarC6p9DhLpCFvJ7qAuhJoS5PbyQRxpdIQs5h7oQauJ/aW6Pew6b9jmc+xfOT74X5Otwr8JB4+K6m8MPbn+XyewgXKYbetaGCzr+dKdfhJJZHO5ocrw7w2mOTT+Ut0fu9suncB0ru8LeJbx8qoBSCa/41wwm3TlEGHL8Hv6vKX9FSOBlFsMREREREZGX/gIAA/VAN9vp3wAAAABJRU5ErkJggg==';
        if (pageOfItems[i].cphoto_file_name) {
          imgSrc = `${backendServer}company/imageUpload/${pageOfItems[i].cphoto_file_name}`;
        }
        renderOutput.push(
          <div className='container'>
            <Card border-width='10px' style={{ width: '100%', color: 'black' }}>
              <Card.Body>
                <div class='d-flex'>
                  <div class='pull-left'>
                    <Card.Img
                      variant='top'
                      class='building-icon'
                      src={imgSrc}
                    ></Card.Img>
                  </div>
                  <div class='col-md-9'>
                    <Card.Title>
                      <Link
                        to={{
                          pathname: '/student/tabs',
                          companyName: value.name,
                          companyID: value.id,
                          filename: value.cphoto_file_name,
                          category: 'overview',
                        }}
                      >
                        <h4 className='ml-3' style={{ color: 'green' }}>
                          <b>{value.name}</b>
                        </h4>
                      </Link>
                    </Card.Title>

                    <h5 className='ml-3' style={{ color: 'grey' }}>
                      {value.website && <span>{value.website}</span>}
                    </h5>
                  </div>

                  <div class='col-sm-2'>
                    <h4>
                      {value.salaries && (
                        <span>
                          <b>{value.salaries}</b>
                        </span>
                      )}
                    </h4>
                    <Link
                      to={{
                        pathname: '/student/tabs',
                        companyName: value.name,
                        companyID: value.id,
                        filename: value.cphoto_file_name,
                        category: 'salaries',
                      }}
                    >
                      Salaries
                    </Link>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
        );
      }
    }

    return (
      <React.Fragment>
        <Navbar />
        <div className='container'>
          <div className='row'>
            <div className='col-md-12 mt-5'>
              <h4
                style={{ color: '#028A0F', textAlign: 'center' }}
                className='pl-3'
              >
                Showing Results for "{this.props.match.params.keyword}"
              </h4>
            </div>
            {renderOutput}
            <div className='card text-center m-3'>
              <div className='card-footer pb-0 pt-3'>
                {pager.pages && pager.pages.length && (
                  <ul className='pagination'>
                    <li
                      className={`page-item first-item ${
                        pager.currentPage === 1 ? 'disabled' : ''
                      }`}
                    >
                      <Link to={{ search: `?page=1` }} className='page-link'>
                        First
                      </Link>
                    </li>
                    <li
                      className={`page-item previous-item ${
                        pager.currentPage === 1 ? 'disabled' : ''
                      }`}
                    >
                      <Link
                        to={{ search: `?page=${pager.currentPage - 1}` }}
                        className='page-link'
                      >
                        Previous
                      </Link>
                    </li>
                    {pager.pages.map((page) => (
                      <li
                        key={page}
                        className={`page-item number-item ${
                          pager.currentPage === page ? 'active' : ''
                        }`}
                      >
                        <Link
                          to={{ search: `?page=${page}` }}
                          className='page-link'
                        >
                          {page}
                        </Link>
                      </li>
                    ))}
                    <li
                      className={`page-item next-item ${
                        pager.currentPage === pager.totalPages ? 'disabled' : ''
                      }`}
                    >
                      <Link
                        to={{ search: `?page=${pager.currentPage + 1}` }}
                        className='page-link'
                      >
                        Next
                      </Link>
                    </li>
                    <li
                      className={`page-item last-item ${
                        pager.currentPage === pager.totalPages ? 'disabled' : ''
                      }`}
                    >
                      <Link
                        to={{ search: `?page=${pager.totalPages}` }}
                        className='page-link'
                      >
                        Last
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SearchSalary;

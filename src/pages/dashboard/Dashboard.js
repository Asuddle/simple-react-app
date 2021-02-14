import React from "react";
import {
  Row,
  Col,
  Table,
  CardTitle,
  CardBody,
  CardText,
  Button,
} from "reactstrap";
import Card from "reactstrap/lib/Card";
import getData from "../../components/getData";

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      children: 0,
      family: 0,
      staff: 0,
      class: [],
    };
    this.forceUpdate = this.forceUpdate.bind(this);
  }

  componentDidMount() {
    getData(
      "get",
      `Children`,
      (data) => {
        let dt = data.data;
        console.log(dt);
        this.setState({ children: dt.length });
      },
      (error) => {
        console.log(error);
      }
    );

    getData(
      "get",
      `Staff`,
      (data) => {
        let dt = data.data;
        this.setState({ staff: dt.length });
      },
      (error) => {
        console.log(error);
      }
    );
    getData(
      "get",
      `Family`,
      (data) => {
        let dt = data.data;
        this.setState({ family: dt.length });
      },
      (error) => {
        console.log(error);
      }
    );

    getData(
      "get",
      `Class`,
      (data) => {
        let dt = data.data;
        this.setState({ class: dt });
      },
      (error) => {
        console.log(error);
      }
    );

    window.addEventListener("resize", this.forceUpdate.bind(this));
  }

  forceUpdate() {
    return this.setState({});
  }

  render() {
    console.log(this.state.class);
    return (
      <div>
        <Row md={4}>
          <Col md={4}>
            <Card body>
              <CardTitle tag="h5">No. of Children Signed In</CardTitle>
              <CardText>
                {this.state.children}
                <br />
              </CardText>
            </Card>
          </Col>
          <Col>
            <Card body>
              <br />
              <CardTitle tag="h5">No. of Staff Signed in</CardTitle>
              <CardText>{this.state.staff}</CardText>
            </Card>
          </Col>
          <Col md={4}>
            <Card body>
              <CardTitle tag="h5">Number of Families</CardTitle>
              <CardText>
                {this.state.family}
                <br />
              </CardText>
            </Card>
          </Col>
        </Row>
        <Row>
          <hr />
        </Row>
        <Row>
          <Col md={4}>
            <Card body>
              <CardTitle tag="h5">Classroom Ratios</CardTitle>
              <CardText>
                <Table>
                  <thead>
                    <tr>
                      <th>Class</th>
                      <th>Ratio</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.class.length > 0 &&
                      this.state.class.map((item) => (
                        <tr>
                          <td>{item.name}</td>
                          <td>1:2</td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </CardText>
            </Card>
          </Col>
          <Col md={8}>
            <Card body md={8}>
              <CardTitle tag="h5">Upcoming Birthdays</CardTitle>
              <CardText>
                <Table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Date</th>
                      <th>Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>ABC</td>
                      <td>12/12/12</td>
                      <td>Staff</td>
                    </tr>
                    <tr>
                      <td>DEF</td>
                      <td>20/12/20</td>
                      <td>Family</td>
                    </tr>
                  </tbody>
                </Table>
                <br />
              </CardText>
              <br />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;

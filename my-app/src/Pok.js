import React from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

class Pok extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      url: "",
      pokFlag: false,
    };
  }

  getTheBoke = async (event) => {
    event.preventDefault();
    const name = event.target.poke.value;
    const url = `${process.env.REACT_APP_URL}getPokemonNames?name=${name}`;

    try {
      const sendReq = await axios.get(url);
      console.log(sendReq.data);
      this.setState({
        name: sendReq.data.name,
        url: sendReq.data.url,
        pokFlag: true,
      });
    } catch {
      this.setState({
        pokFlag: false,
      });
    }
  };

  render() {
    return (
      <div>
        <h1>Welcome to the Pokemon Website</h1>
        <Form onSubmit={this.getTheBoke}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Pokemon Name</Form.Label>
            <Form.Control
              type="text"
              name="poke"
              placeholder="please enter pokemon name"
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>

        {this.state.pokFlag && (
          <Card style={{ width: "100rem" }}>
            <Card.Body>
              <Card.Text>
                {this.state.pokFlag && <h4>Name of pok: {this.state.name}</h4>}
                {this.state.pokFlag && (
                  <h5>the URL for pok: {this.state.url}</h5>
                )}
              </Card.Text>
            </Card.Body>
          </Card>
        )}
      </div>
    );
  }
}
export default Pok;

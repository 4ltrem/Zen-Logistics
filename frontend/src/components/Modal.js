import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
    };
  }

  handleChange = (e) => {
    let { name, value } = e.target;
  
    const activeItem = { ...this.state.activeItem, [e.target.name]: e.target.value };

    this.setState({ activeItem });
  };

  render() {
    const { toggle, onSave } = this.props;
    
    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>Item</ModalHeader>
        <ModalBody>
          <Form>

            <FormGroup>
              <Label for="item-title">Title</Label>
              <Input
                type="text"
                id="item-title"
                name="title"
                value={this.state.activeItem.title}
                onChange={this.handleChange}
                placeholder="Enter Item name"
              />
            </FormGroup>

            <FormGroup>
              <Label for="item-description">Description</Label>
              <Input
                type="text"
                id="item-description"
                name="description"
                value={this.state.activeItem.description}
                onChange={this.handleChange}
                placeholder="Enter Item description"
              />
            </FormGroup>

            <FormGroup>
              <Label for="item-typeProduit">Type</Label>
              <Input
                type="text"
                id="item-typeProduit"
                name="typeProduit"
                value={this.state.activeItem.typeProduit}
                onChange={this.handleChange}
                placeholder="Enter Item type"
              />
            </FormGroup>

            <FormGroup>
              <Label for="item-stock">Quantity in stock</Label>
                <Input
                  type="number"
                  id="item-stock"
                  name="stock"
                  value={this.state.activeItem.stock}
                  onChange={this.handleChange}
                  placeholder="0"
                />
            </FormGroup>

            {/* No idea why input above starts with 0 and input below starts with undefined */}

            <FormGroup>
              <Label for="item-minimumStock">Minimum quantity in stock</Label>
                <Input
                  type="number"
                  id="item-minimumStock"
                  name="minimumStock"
                  value={this.state.activeItem.minimumStock}
                  onChange={this.handleChange}
                  placeholder="0"
                />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => onSave(this.state.activeItem)}
          >
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

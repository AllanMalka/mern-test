import React, {Component} from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import {connect} from "react-redux";
import {updateItem} from "../../actions/itemActions";
import PropTypes from 'prop-types';

class UpdateModal extends Component {
    state = {
      modal: false,
      name: ''
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        itemId: PropTypes.string,
        itemName: PropTypes.string,
        isUser: PropTypes.bool,
    };

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };
    onChange = e =>{
        this.setState({[e.target.name]: e.target.value});
    };
    onSubmit = e => {
        e.preventDefault();
        if(this.state.name !== ''){
            const newItem = {
                id: this.props.itemId,
                name: this.state.name,
            };
            if(this.props.itemName !== this.state.name){
                this.props.updateItem(newItem);
            }
        }
        this.toggle();
    };
    
    render(){
        return(
            <div>
                <Button className="btnUpdate" color={this.props.isUser ? 'warning' : 'secondary'} size="sm" onClick={this.toggle} disabled={!this.props.isUser} >&loz;</Button>

                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                        Update selected item
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="item">Item</Label>
                                <Input type="text" name="name" id="item" placeholder={this.props.itemName} onChange={this.onChange}/>
                                <Button color="dark" style={{marginTop: '2rem'}} block  >
                                    Update Item
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {updateItem})(UpdateModal);
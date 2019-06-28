import React, {Component} from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input, Alert
} from 'reactstrap';
import {connect} from "react-redux";
import {addItem} from "../../actions/itemActions";
import PropTypes from 'prop-types';

class AddModal extends Component {
    state = {
      modal: false,
      name: '',
      warning: false
    };

    static propTypes = {
        auth: PropTypes.object.isRequired
    };
    
    toggle = () => {
        this.setState({
            modal: !this.state.modal,
            warning: false
        });
    };
    showWarning = () => {
        this.setState({
            warning: !this.state.warning
        })
    };
    onChange = (e) =>{
        this.setState({[e.target.name]: e.target.value});
    };
    onSubmit = e => {
        e.preventDefault();
        if(this.state.name !== ''){
            const newItem = {
                name: this.state.name,
                user: this.props.auth.user
            };

            this.props.addItem(newItem);
            this.toggle();
        } else {
            this.showWarning();
        }
    };
    
    render(){
        const {isAuthenticated} = this.props.auth;
        return(
            <div>
                { isAuthenticated ? <Button color="dark" style={{marginBottom: '2rem'}} onClick={this.toggle}>
                    Add Item
                </Button> : null}

                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                        Add to list
                    </ModalHeader>
                    <ModalBody>
                        {this.state.warning ? <Alert color="danger">Cant be empty!</Alert> : null}
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="item">Item</Label>
                                <Input type="text" name="name" id="item" placeholder="Add to list" onChange={this.onChange}/>
                                <Button color="dark" style={{marginTop: '2rem'}} block>
                                    Add Item
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
    auth: state.auth
});

export default connect(mapStateToProps, {addItem})(AddModal);
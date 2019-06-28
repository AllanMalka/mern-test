import React, {Component} from 'react';
import {
    Modal,
    Button,
    ModalHeader,
    ModalBody,
    ModalFooter,
    NavLink
} from 'reactstrap';

class popupModal extends Component {
    state = {
        modal: false
    };

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    render() {
        return (
            <div>
                <NavLink onClick={this.toggle} href="#">
                    Positive surpise
                </NavLink>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className="happyPopupModal">
                    <ModalHeader toggle={this.toggle}>
                        You happy?
                    </ModalHeader>

                    <ModalBody className="popupModalBg">
                        <img className="img-fluid" src="https://media.giphy.com/media/KzWAhzWD3HrJyAcLEM/source.gif" alt="Gif of witcher 3" />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="dark" onClick={this.toggle}>
                            Close
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default popupModal;
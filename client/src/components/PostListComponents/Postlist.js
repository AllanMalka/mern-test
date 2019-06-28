import React, {Component, Fragment} from 'react';
import { Container,  Button, Table } from 'reactstrap';
import { CSSTransition } from "react-transition-group";
import { connect } from "react-redux";
import { getItems, deleteItem, updateItem } from "../../actions/itemActions";
import UpdateModal from './updateModal';
import PropTypes from 'prop-types'

class Postlist extends Component{
    static propTypes = {
        getItems: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired,
        viewer: PropTypes.object.isRequired
    };
    componentWillMount() {
        if(this.props.item) {
            this.props.getItems();
        }
    }

    componentDidMount() {
        if(this.props.item) {
            this.props.getItems();
        }
    }
    componentDidUpdate(prevProp){
        if(prevProp.viewer.token === null)
            if(this.props.viewer.isAuthenticated && !prevProp.viewer.isAuthenticated){
                console.log('prev: ', prevProp.viewer.isAuthenticated);
                console.log('props: ', this.props.viewer.isAuthenticated);
            }
    }

    onDeleteClick = id => {
        this.props.deleteItem(id);
    };

    formatDate = (inputdate, format) => {
        const date = new Date(inputdate);
        const currentMonth = date.getMonth();
        const monthString = currentMonth >= 10 ? currentMonth : `0${currentMonth}`;
        const currentDate = date.getDate();
        const dateString = currentDate >= 10 ? currentDate : `0${currentDate}`;

        format = format.replace('y', date.getFullYear());
        format = format.replace('m', monthString);
        format = format.replace('d', dateString);

        return format;
    };
    render() {
        const { items } = this.props.item;
        return renderTable(items, this);
    }
}
const renderTable = (items, $this) => {
    const {isAuthenticated, user} = $this.props.viewer;
    const $user = user;
    const numItems = items.length;
    let count = 1;
    let content = (
        <Fragment>
            <h1>No objects has been added.</h1>
        </Fragment>
    );
    if(numItems > 0) {
        content = (
            <Fragment>
                <h1>Number of items: {numItems}</h1>
                <Table className="table-striped table-hover table-dark">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Created by</th>
                        <th scope="col" >Created at</th>
                        {isAuthenticated ? <th scope="col">Update</th> : null}
                        {isAuthenticated ? <th scope="col">Delete</th> : null}
                    </tr>
                    </thead>
                    <tbody>
                    {items.map(({_id,name,date,user}) => (
                        <CSSTransition key={_id} timeout={500} classNames="fade" >
                            <tr>
                                <td>{count++}</td>
                                <td>{name}</td>
                                <td>{user.name}</td>
                                <td>
                                    <time dateTime={date}>{$this.formatDate(date, 'd/m-y')}</time>
                                </td>
                                {isAuthenticated ?
                                    <td><UpdateModal itemId={_id} itemName={name} isUser={$user._id === user._id} /></td>
                                    :  null}
                                {isAuthenticated ?
                                    <td><Button className="btnRemove" color={$user._id === user._id ? "danger" : "secondary"} disabled={$user._id !== user._id} size="sm" onClick={$this.onDeleteClick.bind($this, _id)}>&times;</Button></td>
                                    : null}
                            </tr>
                        </CSSTransition>
                    ))}
                    </tbody>
                </Table>
            </Fragment>
        );
    }


    return (
        <Container>
            {content}
        </Container>
    )
};
const mapStateToProps = (state) =>({
     item: state.item,
     viewer: state.auth,

});

export default connect(mapStateToProps, {getItems, deleteItem, updateItem})(Postlist);
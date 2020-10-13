import React from "react";
import {
    Navbar, Nav, Form
} from 'react-bootstrap';

const Header = (props) => {
    return (
        <Navbar bg="dark" expand="lg">
            <Navbar.Brand href="/" style={{"color": "#33f577"}}>Covid-19</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto"></Nav>
                <Form inline></Form>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Header;

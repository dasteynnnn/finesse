import React, {useState, useEffect} from "react";

import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/Stack'
import Modal from 'react-bootstrap/Modal'

import axios from 'axios'

function Lives() {
    //handle table API data
    const [apiData, setApiData] = useState([])
    useEffect(() => {
        const config = {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
        }
        axios('https://natalie-odnu.onrender.com/api/v1/budget/tracker/group', config)
        .then(res => {
            setApiData(res.data.data) 
            console.log(res.data.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, []);
    //handle delete live API
    const [idToDelete, setIdToDelete] = useState('')
    const deleteLive = () => {
        if(idToDelete){
            const requestOptions = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            };
            fetch(`/barbies/api/lives/delete/${idToDelete}`, requestOptions)
                .then(res => { handleClose(); console.log(`Succesfully deleted live : ${idToDelete}`)})
                .catch(err => {
                    console.log(err)
                })
        }
    }
    //handle modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    //render table data
    const renderData = (data, index) => {
        return (
            <tr key={index}>
                <td>{data.name}</td>
            </tr>
        )
    }
    return(
        <Stack gap={2} className="col-md-6 mx-auto">
            <h1>Tracker Groups</h1>
            <div className='col-md-3'><Button className='btn btn-success btn-sm' href='/lives/add'>Add</Button></div>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {apiData.map(renderData)}
                </tbody>
            </Table>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Delete Tracker Group</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this group?</Modal.Body>
                <Modal.Footer>
                <Button variant="success" onClick={deleteLive}>
                    Yes
                </Button>
                <Button variant="danger" onClick={handleClose}>
                    No
                </Button>
                </Modal.Footer>
            </Modal>
        </Stack>
    )
}

export default Lives;
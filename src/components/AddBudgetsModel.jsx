import React, { useRef } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useBudgets } from "../contexts/BudgetContext";

//useRef can be used to add input and add on submit simply collect the values referenced to it

const AddBudgetsModel = ({ show, handleClose }) => {
  //to get the inputs and reference it with the form
  const nameRef = useRef();
  const maxRef = useRef();
  const { addBudget } = useBudgets();

  function handleSubmit(e) {
    e.preventDefault();
    const budget = {
      name: nameRef.current.value,
      max: parseFloat(maxRef.current.value),
    };
    addBudget(budget);
    handleClose();
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Budget</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="name" className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control ref={nameRef} type="text" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Maximum Spending</Form.Label>
            <Form.Control
              ref={maxRef}
              type="number"
              required
              min={0}
              step={1}
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button type="submit" variant="primary">
              Add
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
};

export default AddBudgetsModel;

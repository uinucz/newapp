import React from "react";
import { Form, Button } from "react-bootstrap";

export default function HomeInput({ text, handleChange, handleTransform }) {
    return (
        <>
            <Form onSubmit={handleTransform} >
                <Form.Group className="mb-3">
                    <Form.Label><h4>Вставьте текст в форму</h4></Form.Label>
                    <Form.Control as="textarea" rows={10} onChange={handleChange} />
                    <br />
                    <Button type="submit">далее</Button>
                </Form.Group>
            </Form>
        </>
    )
}
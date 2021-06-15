import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import _ from "lodash";
import MarkdownIt from "markdown-it";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import MdEditor from "react-markdown-editor-lite";
const mdParser = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

class MyForm extends Component {
  render() {
    return null;
  }
  Schema = {};

  validate = (fields) => {
    if (this.state.loading) return;
    const data = _.pick(this.state.data, fields);
    this.Schema.validate(data, { abortEarly: false })
      .then(() => {
        this.setState({ errors: {} });
        this.submit(data);
      })
      .catch((ex) => {
        const errors = {};
        ex.inner.forEach((error) => {
          errors[error.path] = error.errors[0];
        });
        this.setState({ errors });
      });
  };

  renderInput(name, label, options = { type: "text" }) {
    const data = this.state.data;
    const value = data[name];

    return (
      <Form.Group controlId={name}>
        <Form.Label>{label}</Form.Label>
        <Form.Control
          value={value}
          onChange={(e) => this.onChange(name, e)}
          {...options}
          placeholder={label}
        />
        {this.renderError(name)}
      </Form.Group>
    );
  }
  renderFile(name, label) {
    const data = this.state.data;
    return (
      <Form.Group controlId={name}>
        <Form.File
          id={name}
          label={label}
          onChange={(e) => this.setState({ [name]: e.currentTarget.files[0] })}
        />
        {this.renderError(name)}
      </Form.Group>
    );
  }
  renderError(name) {
    const error = this.state.errors[name];
    if (!error) return null;
    return <Form.Text className="text-danger">{error}</Form.Text>;
  }

  renderButton(title) {
    return (
      <Button
        onClick={(e) => {
          e.preventDefault();
          this.validate(Object.keys(this.Schema.fields));
        }}
        className="mt-3"
        variant="primary"
        type="submit"
      >
        {this.state.loading && (
          <Spinner animation={"border"} variant="dark" size="sm" />
        )}
        {!this.state.loading && title}
      </Button>
    );
  }
  onChange = (name, { currentTarget }) => {
    const data = this.state.data;
    this.setState({ data: { ...data, [name]: currentTarget.value } });
  };
  renderCheckbox(name, label) {
    const data = this.state.data;
    const value = data[name];
    return (
      <Form.Group controlId={name}>
        <Form.Check
          checked={value}
          onChange={(e) =>
            this.onChange(name, { currentTarget: { value: !value } })
          }
          type="checkbox"
          label={label}
        />
        {this.renderError(name)}
      </Form.Group>
    );
  }
  handleEditorChange(name, { html, text }) {
    this.onChange(name, { currentTarget: { value: text } });
    this.setState({ html });
  }
  renderMarkDown(name) {
    const data = this.state.data;
    const value = data[name];
    return (
      <MdEditor
        value={value}
        style={{ height: "auto" }}
        renderHTML={(text) => mdParser.render(text)}
        onChange={(data) => this.handleEditorChange(name, data)}
      />
    );
  }
}

export default MyForm;

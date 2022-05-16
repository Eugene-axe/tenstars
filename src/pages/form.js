import React from 'react';

const Form = props => {
  const onSubmit = event => {
    event.preventDefault();
    console.log(event);
  };
  const onChange = async event => {
    event.preventDefault();
    const fileImage = event.target.files[0];
    let fd = new FormData();
    fd.append('image', fileImage);
    fd.append('secret_key', '3GaxMgINs32ZGLZvJTgwk9uvVSJnrt0c35t');
    const response = await fetch('https://api.imageban.ru/v1', {
      headers: {
        Authorization: 'TOKEN DPMq9qeswiAznWzRz3a1'
      },
      method: 'POST',
      body: fd
    });
    const data = await response.json();
    console.log(data);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" name="text" />
        <hr />
        <input type="file" name="image" onChange={onChange} />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;


import React from 'react';


import "./profilePicForm.css"



function ProfilePicForm({ profilePicture, setProfilePicture, coverPicture, setCoverPicture, editBic, handleClose }) {




  const handleChange = (e) => {
    if (e.target.name === 'profilePicture') {
      setProfilePicture(e.target.value);
    } else if (e.target.name === 'coverPicture') {
      setCoverPicture(e.target.value);
    }
  };

  const handleSubmit = () => {

    editBic(profilePicture, coverPicture)
    handleClose();
  }

  return (


    <div className="form-box">
      <div className="header-text" style={{ color: "wheat" }}>
        Edit picture form
      </div>
      <input placeholder="Yor profile Picture URL" value={profilePicture} onChange={handleChange}
        name="profilePicture"
        required type="text" />
      <input placeholder="Yor cover Picture URL" value={coverPicture} onChange={handleChange}
        name="coverPicture"
        required
        type="text" />

      <button onClick={handleSubmit} >submit</button>

    </div>


  )
}

export default ProfilePicForm

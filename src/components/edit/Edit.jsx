import "./edit.css";
import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
} from "@material-ui/icons";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/auth";
import axios from "axios";

export default function Edit({ idx, recipes, getid }) {

  // console.log(idx,"hhh",recipes)
  const { user, token } = useContext(AuthContext);

  const description = useRef();
  const [file, setFile] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log(recipes)
    const newPost = {
      userId: user._id,
      description: description.current.value,
    };
    if (file) {
      // console.log("file")
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      // console.log(newPost);
      try {
        await axios.post("https://spice-g4.herokuapp.com/upload", data, {
          headers: {
            Authorization: token
          }
        })
      } catch (err) { }
    }
    getid(idx)
    try {
      await axios.put("https://spice-g4.herokuapp.com/updatefood/" + recipes._id, newPost, {
        headers: {
          Authorization: token
        }
      });
      window.location.reload();
    } catch (err) { }
  };

  return (
    <>
      {
        user.role == "chef" &&

        <div className="share">
          <div className="shareWrapper">
            <div className="shareTop">
              <img
                className="shareProfileImg"
                src={
                  user.profilePicture
                    ? user.profilePicture
                    : "https://t3.ftcdn.net/jpg/03/60/23/04/240_F_360230408_OQdxPfi8pbDjqC7leeOAd312Ccmff84u.jpg"
                }
                alt=""
              />
              <input
                placeholder={"What's in your mind " + user.username + "?"}
                className="shareInput"
                ref={description}
              />
            </div>
            <hr className="shareHr" />
            {file && (
              <div className="shareImgContainer">
                <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
                <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
              </div>
            )}
            <form className="shareBottom" onSubmit={submitHandler}>
              <div className="shareOptions">
                <label htmlFor="file" className="shareOption">
                  <PermMedia htmlColor="tomato" className="shareIcon" />
                  <span className="shareOptionText">Photo or Video</span>
                  <input
                    style={{ display: "none" }}
                    type="file"
                    id="file"
                    accept=".png,.jpeg,.jpg"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </label>
                {/* <div className="shareOption">
                  <Label htmlColor="blue" className="shareIcon" />
                  <span className="shareOptionText">Tag</span>
                </div> */}
                {/* <div className="shareOption">
                  <Room htmlColor="green" className="shareIcon" />
                  <span className="shareOptionText">Location</span>
                </div> */}
                {/* <div className="shareOption">
                  <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
                  <span className="shareOptionText">Feelings</span>
                </div> */}
              </div>
              <button className="shareButton" type="submit">
                Share
              </button>
            </form>

          </div>

        </div>
      }
    </>

  );
}

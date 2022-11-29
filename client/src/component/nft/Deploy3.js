import React from "react";
// import axios from "axios";
import { imgUpload } from "../../api/nft";
import { useSelector } from "react-redux";

const Deploy3 = () => {
  const clubId = useSelector((state) => {
    return state.club.clubId;
  });
  const upload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    console.log(e.target.file.files);
    const fileList = Object.values(e.target.file.files);
    fileList.forEach((img) => {
      formData.append("img", img);
    });
    formData.append("club_id", clubId);
    formData.append("dir", 3);
    formData.append("total", 5);
    try {
      imgUpload(formData).then(function (res) {
        if (res.status === 200) {
          const token_url = res.data;
          console.log(token_url, "1번");
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <form encType="multipart/form-data" onSubmit={upload}>
        <div className="w-full text-center mt-4 font-bold">
          <span className="text-4xl text-red-700">
            background를 업로드하세요!
          </span>
        </div>
        <input type="file" name="file" multiple webkitdirectory="true" />
        {/* <button type='submit'>업로드</button> */}
        <button type="submit">업로드</button>
      </form>
    </div>
  );
};
export default Deploy3;

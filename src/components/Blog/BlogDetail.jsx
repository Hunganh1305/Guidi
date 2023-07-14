import React, { useEffect, useState } from "react";
import "./BlogDetail.scss";
import { blogs } from "./blogData";
import { useNavigate, useParams } from "react-router";

const BlogDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState(
    blogs.filter((item) => item.id === parseInt(id))[0]
  );

  return (
    <div className="blogdetail__container">
      <div className="blogdetail__content">
        <div className="blogdetail__content-header">
          <h1 className="blogdetail__content-header-title">{item.Title1}</h1>
          <h3 className="blogdetail__content-header-username">
            {item.username}
          </h3>
          <p className="blogdetail__content-header-desc">{item.desc1}</p>
        </div>
        <div className="blogdetail__content-body">
          {item.body.map((data, index) => (
            <>
              {" "}
              <h2 className="blogdetail__content-body-para1-title">
                {data.title}
              </h2>
              <div className="blogdetail__content-body-para1-img">
                <img src={data.img} alt="" />
              </div>
              <p className="blogdetail__content-body-para1-desc">{data.desc}</p>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;

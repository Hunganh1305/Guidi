import React from "react";
import "./Blog.scss";
import { blogs } from "./blogData";
import { useNavigate } from "react-router";

const Blog = () => {
  const navigate = useNavigate();
  return (
    <div className="blog__container">
      {blogs.map((item) => (
        <div
          onClick={() => {
            navigate(`/blog/${item.id}`);
          }}
          className="blog__item"
        >
          <div className="blog__item-header">
            <div className="blog__item-header-avatar">
              <img src={item.avatar} alt="" />
            </div>
            <h3 className="blog__item-header-name">{item.username}</h3>
          </div>
          <div className="blog__item-img">
            <img src={item.Img1} alt="" />
          </div>
          <div className="blog__item-content">
            <h1 className="blog__item-content-title">{item.Title1}</h1>
            <p className="blog__item-content-desc">{item.desc1}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Blog;

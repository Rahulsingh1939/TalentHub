import { Col, message, Row } from "antd";
import "../../stylesheets/layout.css";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Title from "../../Components/Title";
import { getAllExams } from "../../api/exams";
import { useNavigate } from "react-router-dom";
function Home() {
  const [exams, setExams] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const getExams = async () => {
    try {
      const response = await getAllExams();
      if (response.success) {
        setExams(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    getExams();
  }, []);

  return (
    user && (
      <div>
        <Title title={`Hi ${user.name}, Welcome to TalentHub`} />
        <div className="divider"></div>
        <Row gutter={[16, 16]}>
          {exams.map((exam, index) => (
            <Col span={6} key={index} className="m-6">
              <div className="card card-lg rounded-lg hover:border-2 transition duration-300 flex flex-col gap-1 p-4 text-slate-950">
                <h1 className="text-2xl">{exam?.name}</h1>

                <h1 className="text-md">Category : {exam.category}</h1>

                <h1 className="text-md">Total Marks : {exam.totalMarks}</h1>
                <h1 className="text-md">Passing Marks : {exam.passingMarks}</h1>
                <h1 className="text-md">Duration : {exam.duration}</h1>

                <button
                  className="primary-outlined-btn"
                  onClick={() => navigate(`/user/write-exam/${exam._id}`)}
                >
                  Start Exam
                </button>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    )
  );
}

export default Home;

import { message, Table } from "antd";
import React, { useEffect,useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteExamById, getAllExams } from "../../api/exams";
import Title from "../../Components/Title";

function Exams() {
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);
  const dispatch = useDispatch();

  const getExamsData = async () => {
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

  const deleteExam = async (examId) => {
    try {
      const response = await deleteExamById({
        examId,
      });
      if (response.success) {
        message.success(response.message);
        getExamsData();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  const columns = [
    {
      title: "Exam Name",
      dataIndex: "name",
    },
    {
      title: "Duration",
      dataIndex: "duration",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Total Marks",
      dataIndex: "totalMarks",
    },
    {
      title: "Passing Marks",
      dataIndex: "passingMarks",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div className="flex gap-2">
          <i
            className="ri-pencil-line"
            onClick={() => navigate(`/admin/exams/edit/${record._id}`)}
          ></i>
          <i
            className="ri-delete-bin-line"
            onClick={() => deleteExam(record._id)}
          ></i>
        </div>
      ),
    },
  ];
  useEffect(() => {
    getExamsData();
  }, []);
  return (
    <div>
      <div className="flex justify-between mt-2 items-end">
        <Title title="Exams" />

        <button
          className="primary-outlined-btn w-24 rounded-lg flex items-center"
          onClick={() => navigate("/admin/exams/add")}
        >
          <i className="ri-add-line"></i>
          Add Exam
        </button>
      </div>
      <div className="divider"></div>

      <Table
        rowKey={(record, index) => index}
        columns={columns}
        dataSource={exams}
      />
    </div>
  );
}

export default Exams;

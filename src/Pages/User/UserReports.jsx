import React, { useState } from "react";
import Title from "../../Components/Title";
import { message, Modal, Table } from "antd";
import { useDispatch } from "react-redux";
import { getAllReportsByUser } from "../../api/reports";
import { useEffect } from "react";
import moment from "moment";

function UserReports() {
  const [reportsData, setReportsData] = useState([]);
  const dispatch = useDispatch();
  const columns = [
    {
      title: "Exam Name",
      dataIndex: "examName",
      render: (text, record) => <>{record.exam.name}</>,
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (text, record) => (
        <>{moment(record.createdAt).format("DD-MM-YYYY hh:mm:ss")}</>
      ),
    },
    {
      title: "Total Marks",
      dataIndex: "totalQuestions",
      render: (text, record) => <>{record.exam.totalMarks}</>,
    },
    {
      title: "Passing Marks",
      dataIndex: "correctAnswers",
      render: (text, record) => <>{record.exam.passingMarks}</>,
    },
    {
      title: "Obtained Marks",
      dataIndex: "correctAnswers",
      render: (text, record) => <>{record.result.correctAnswers.length}</>,
    },
    {
      title: "Verdict",
      dataIndex: "verdict",
      render: (text, record) => <>{record.result.verdict}</>,
    },
  ];

  const getData = async () => {
    try {
      const response = await getAllReportsByUser();
      if (response.success) {
        setReportsData(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Title title="Reports" />
      <div className="divider"></div>
      <Table rowKey={(record, index) => index} columns={columns} dataSource={reportsData} />
    </div>
  );
}

export default UserReports;

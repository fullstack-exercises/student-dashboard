import { useParams } from "react-router-dom";

function StudentDetail() {
  // Access the studentName parameter from the route
  const { studentName } = useParams();

  return <div>Student Name: {studentName}</div>;
}

export default StudentDetail;

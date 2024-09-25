// import axios from 'axios';

const studentService = {
    getAssignedSubjects: () => axios.get('/api/student/get-assigned-subjects').then(res => res.data),
    getClassMaterial: (data) => axios.get(`/api/student/get-class-material?subjectId=${data.subjectId}`).then(res => res.data),
    getAttendenceInSubject: (data) => axios.get(`/api/student/get-attendence-in-subject?subjectId=${data.subjectId}`).then(res => res.data),
};

export default studentService;

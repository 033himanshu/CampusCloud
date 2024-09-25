// import axios from 'axios';

const teacherService = {
    getAllCoursesInDepartment: () => axios.get('/api/teacher/get-all-course-in-department').then(res => res.data),
    getAllSubjectInCourse: () => axios.get('/api/teacher/get-all-subject-in-course').then(res => res.data),
    getAllMaterial: () => axios.get('/api/teacher/get-all-material').then(res => res.data),
    assignSubjectToCourse: (data) => axios.post('/api/teacher/assign-subject-to-course', data).then(res => res.data),
    uploadMaterial: (formData) => axios.post('/api/teacher/upload-material', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }).then(res => res.data),
    getAllTeachersInDepartment: () => axios.get('/api/teacher/get-all-teachers-in-department').then(res => res.data),
};

export default teacherService;

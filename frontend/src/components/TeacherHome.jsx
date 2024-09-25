import React, { useEffect, useState } from 'react';
import teacherService from '../database/teacherService'; // Create a similar service like adminService
import { useForm } from 'react-hook-form';
import { Button, Input, Select } from './index'; // Assuming these components are already made

const TeacherDashboard = () => {
    const { register, handleSubmit, reset } = useForm();
    const [courses, setCourses] = useState([]);
    const [students, setStudents] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    // useEffect(() => {
    //     fetchCourses();
    //     fetchSubjects();
    //     fetchMaterials();
    //     fetchTeachers();
    // }, []);

    const fetchCourses = async () => {
        try {
            const response = await teacherService.getAllCoursesInDepartment();
            setCourses(response);
        } catch (error) {
            setError('Error fetching courses');
        }
    };

    const fetchSubjects = async () => {
        try {
            const response = await teacherService.getAllSubjectInCourse();
            setSubjects(response);
        } catch (error) {
            setError('Error fetching subjects');
        }
    };

    const fetchMaterials = async () => {
        try {
            const response = await teacherService.getAllMaterial();
            setMaterials(response);
        } catch (error) {
            setError('Error fetching materials');
        }
    };

    const fetchTeachers = async () => {
        try {
            const response = await teacherService.getAllTeachersInDepartment();
            setTeachers(response);
        } catch (error) {
            setError('Error fetching teachers');
        }
    };

    const handleAssignSubjectSubmit = async (data) => {
        try {
            const response = await teacherService.assignSubjectToCourse({
                subjectId: data.selectedSubject,
                courseId: data.selectedCourse,
            });
            setSuccess(response.message);
            reset();
        } catch (error) {
            setError('Error assigning subject to course');
        }
    };

    const handleUploadMaterialSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append('material', data.material[0]);
            const response = await teacherService.uploadMaterial(formData);
            setSuccess(response.message);
            fetchMaterials();
        } catch (error) {
            setError('Error uploading material');
        }
    };

    return (
        <div className='flex flex-col items-center justify-center w-full'>
            <h2 className="text-center text-2xl font-bold leading-tight">Teacher Dashboard</h2>
            <div className={`mx-auto w-full bg-gray-100 rounded-xl p-10 border border-black/10`}>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                {success && <p className="text-green-600 mt-8 text-center">{success}</p>}
                
                {/* Assign Subject Form */}
                <form onSubmit={handleSubmit(handleAssignSubjectSubmit)} className="p-3 m-5 bg-white rounded-xl p-10 border border-black/10">
                    <h1 className="font-bold w-full text-center m-4">Assign Subject to Course</h1>
                    <div className="flex justify-center">
                        <Select
                            {...register('selectedCourse')}
                            label="Select Course"
                            options={courses}
                            required
                        />
                        <Select
                            {...register('selectedSubject')}
                            label="Select Subject"
                            options={subjects}
                            required
                        />
                    </div>
                    <div className="flex justify-center">
                        <Button type="submit" className="m-5">Assign Subject</Button>
                    </div>
                </form>

                {/* Upload Material Form */}
                <form onSubmit={handleSubmit(handleUploadMaterialSubmit)} className="p-3 m-5 bg-white rounded-xl p-10 border border-black/10">
                    <h1 className="font-bold w-full text-center m-4">Upload Material</h1>
                    <div className="flex justify-center">
                        <Input
                            {...register('material')}
                            type="file"
                            label="Select Material"
                            required
                        />
                    </div>
                    <div className="flex justify-center">
                        <Button type="submit" className="m-5">Upload Material</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TeacherDashboard;

import React, { useEffect, useState } from 'react';
import adminService from '../database/adminService';
import { useForm } from 'react-hook-form';
import {Button, Input, Select} from "./index"
const AdminPage = () => {
    const { register, handleSubmit, reset, setValue } = useForm();
    const [departments, setDepartments] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const fetchDepartments = async () => {
        const response = await adminService.getAllDepartment()
        setDepartments(response);
    }
    const fetchTeachers = async () => {
        const response = await adminService.getAllTeachers()
        setTeachers(response);
    }
    const fetchCourses = async () => {
        const response = await adminService.getAllCourses()
        setCourses(response);
    }
    useEffect(()=>{
        fetchDepartments()
        fetchTeachers()
        fetchCourses()
    },[])

    const handleDepartmentSubmit = async (data) => {
        try {
            const response = await adminService.makeDepartment({
                name : data.departmentName
            });
            setSuccess(response.message)
            fetchDepartments()
            reset()
        } catch (error) {
            setError(error.response?.data?.message || 'Error creating department');
        }
    };

    const handleTeacherSubmit = async (data) => {
        console.log(data)
        try {
            const response = await adminService.registerTeacher({
                fullName: data.teacherFullName,
                username: data.teacherUsername,
                deptId: data.selectedDepartment,
            });
            setSuccess(response.message);
            fetchTeachers()
            reset()
        } catch (error) {
            setError(error.response?.data?.message || 'Error registering teacher');
        }
    };

    const handleStudentSubmit = async (data) => {
        try {
            const response = await adminService.registerStudent({
                fullName: data.studentFullName,
                rollno: data.studentRollNo,
                courseId: data.selectedCourse,
            });
            setSuccess(response.message);
            reset();
        } catch (error) {
            setError(error.response?.data?.message || 'Error registering student');
        }
    };

    const handleCourseSubmit = async (data) => {
        
        try {
            const response = await adminService.assignCourseToDepartment({
                name: data.courseName,
                maximumSemester: data.maximumSemester,
                deptId: data.selectedDepartment,
            });
            setSuccess(response.message)
            fetchCourses()
            reset()
        } catch (error) {
            setError(error.response?.data?.message || 'Error assigning course');
        }
    };
    const handleChangeHoDSubmit = async (data) => {
        try {
            const response = await adminService.changeHod({
                teacherId: data.selectedTeacher,
                deptId: data.selectedDepartment,
            });
            setSuccess(response.message)
            reset()
        } catch (error) {
            setError(error.response?.data?.message || 'Error assigning course');
        }
    }

    return (
        <div className='flex flex-col items-center justify-center w-full'>
            <h2 className="text-center text-2xl font-bold leading-tight">Admin Dashboard</h2>
            <div className={`mx-auto w-full bg-gray-100 rounded-xl p-10 border border-black/10`}>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                {success && <p className="text-green-600 mt-8 text-center">{success}</p>}
                
                {/* Department Form */}
                <form onSubmit={handleSubmit(handleDepartmentSubmit)} className="p-3 m-5 bg-white rounded-xl p-10 border border-black/10">
                    <h1 className="font-bold w-full text-center m-4">Create new Department</h1>
                    <div className="flex justify-center">
                        <Input
                            {...register("departmentName")}
                            type="text"
                            placeholder="Department Name"
                            label="Enter New Department :"
                            required
                        />
                    </div>
                    <div className="flex justify-center">
                        <Button type="submit" className="m-5">Create Department</Button>
                    </div>
                </form>

                {/* Teacher Form */}
                <form onSubmit={handleSubmit(handleTeacherSubmit)} className="p-3 m-5 bg-white rounded-xl p-10 border border-black/10">
                    <h1 className="font-bold w-full text-center m-4">Register Teacher</h1>
                    <div className="flex justify-center">
                        <Input
                            {...register("teacherFullName")}
                            type="text"
                            placeholder="Full Name"
                            label="Teacher's Full Name"
                            required
                        />
                        <Input
                            {...register("teacherUsername")}
                            type="text"
                            placeholder="Username"
                            label="Teacher's Username"
                            required
                        />
                        <Select
                            {...register("selectedDepartment")}
                            label="Select Department"
                            options={departments}
                            required
                        />
                    </div>
                    <div className="flex justify-center">
                        <Button type="submit" className="m-5">Register Teacher</Button>
                    </div>
                </form>

            
                {/* Course Form */}
                <form onSubmit={handleSubmit(handleCourseSubmit)} className="p-3 m-5 bg-white rounded-xl p-10 border border-black/10">
                    <h1 className="font-bold w-full text-center m-4">Assign Course to Department</h1>
                    <div className="flex justify-center">
                        <Input
                            {...register("courseName")}
                            type="text"
                            placeholder="Course Name"
                            label="Course Name"
                            required
                        />
                        <Input
                            {...register("maximumSemester")}
                            type="number"
                            placeholder="Maximum Semester"
                            label="Maximum Semester in Course"
                            required
                        />
                        <Select
                            {...register("selectedDepartment")}
                            label="Select Department"
                            options={departments}
                            required
                        />
                    </div>
                    <div className="flex justify-center">
                        <Button type="submit" className="m-5">Assign Course</Button>
                    </div>
                </form>

                {/* Student Form */}
                <form onSubmit={handleSubmit(handleStudentSubmit)} className="p-3 m-5 bg-white rounded-xl p-10 border border-black/10">
                    <h1 className="font-bold w-full text-center m-4">Register Student</h1>
                    <div className="flex justify-center">
                        <Input
                            {...register("studentFullName")}
                            type="text"
                            label="Student Name"
                            placeholder="Full Name"
                            required
                        />
                        <Input
                            {...register("studentRollNo")}
                            type="text"
                            placeholder="Roll Number"
                            label="Roll Number"
                            required
                        />
                        <Select
                            {...register("selectedCourse")}
                            label="Select Course"
                            options={courses}
                            required
                        />
                    </div>
                    <div className="flex justify-center">
                        <Button type="submit" className="m-5">Register Student</Button>
                    </div>
                </form>

                {/* Change HoD */}
                <form onSubmit={handleSubmit(handleChangeHoDSubmit)} className="p-3 m-5 bg-white rounded-xl p-10 border border-black/10">
                    <h1 className="font-bold w-full text-center m-4">Change Head of Department</h1>
                    <div className="flex justify-center">
                        <Select
                            {...register("selectedTeacher")}
                            label="Select Teacher"
                            options={teachers}
                            required
                        />
                        <Select
                            {...register("selectedDepartment")}
                            label="Select Department"
                            options={departments}
                            required
                        />
                    </div>
                    <div className="flex justify-center">
                        <Button type="submit" className="m-5">Change HoD</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminPage;




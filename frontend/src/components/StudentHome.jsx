import React, { useEffect, useState } from 'react';
import studentService from '../database/studentService'; // Create a similar service like adminService
import { Button, Select } from './index'; // Assuming you have these reusable components

const StudentDashboard = () => {
    const [subjects, setSubjects] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [attendance, setAttendance] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchAssignedSubjects();
    }, []);

    const fetchAssignedSubjects = async () => {
        try {
            const response = await studentService.getAssignedSubjects();
            setSubjects(response);
        } catch (error) {
            setError('Error fetching subjects');
        }
    };

    const fetchClassMaterial = async () => {
        if (!selectedSubject) return;
        try {
            const response = await studentService.getClassMaterial({ subjectId: selectedSubject });
            setMaterials(response);
        } catch (error) {
            setError('Error fetching class materials');
        }
    };

    const fetchAttendanceInSubject = async () => {
        if (!selectedSubject) return;
        try {
            const response = await studentService.getAttendenceInSubject({ subjectId: selectedSubject });
            setAttendance(response);
        } catch (error) {
            setError('Error fetching attendance');
        }
    };

    const handleSubjectChange = (event) => {
        setSelectedSubject(event.target.value);
        setMaterials([]);  // Clear materials when switching subjects
        setAttendance([]);  // Clear attendance when switching subjects
        fetchClassMaterial();
        fetchAttendanceInSubject();
    };

    return (
        <div className="flex flex-col items-center justify-center w-full">
            <h2 className="text-center text-2xl font-bold leading-tight">Student Dashboard</h2>
            <div className="mx-auto w-full bg-gray-100 rounded-xl p-10 border border-black/10">
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                {success && <p className="text-green-600 mt-8 text-center">{success}</p>}

                {/* Subject Selection */}
                <div className="p-3 m-5 bg-white rounded-xl p-10 border border-black/10">
                    <h1 className="font-bold w-full text-center m-4">Select Subject</h1>
                    <div className="flex justify-center">
                        <Select
                            value={selectedSubject}
                            onChange={handleSubjectChange}
                            label="Select Subject"
                            options={subjects}
                            required
                        />
                    </div>
                </div>

                {/* Display Class Material */}
                {materials.length > 0 && (
                    <div className="p-3 m-5 bg-white rounded-xl p-10 border border-black/10">
                        <h1 className="font-bold w-full text-center m-4">Class Materials</h1>
                        <ul>
                            {materials.map((material) => (
                                <li key={material._id}>
                                    <a href={material.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                                        {material.fileName}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Display Attendance */}
                {attendance.length > 0 && (
                    <div className="p-3 m-5 bg-white rounded-xl p-10 border border-black/10">
                        <h1 className="font-bold w-full text-center m-4">Attendance</h1>
                        <table className="w-full table-auto border-collapse">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2">Date</th>
                                    <th className="px-4 py-2">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {attendance.map((record) => (
                                    <tr key={record.date}>
                                        <td className="border px-4 py-2">{record.date}</td>
                                        <td className="border px-4 py-2">{record.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentDashboard;

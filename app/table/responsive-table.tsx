'use client'

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const EmployeeTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Dummy data - 25 employees
  const employees = [
    { id: '001', name: 'John Smith', email: 'john.smith@company.com', department: 'Engineering', position: 'Senior Developer', location: 'New York, NY', status: 'Active', joined: '2022-03-15' },
    { id: '002', name: 'Sarah Johnson', email: 'sarah.j@company.com', department: 'Marketing', position: 'Marketing Manager', location: 'Los Angeles, CA', status: 'Active', joined: '2021-07-22' },
    { id: '003', name: 'Michael Chen', email: 'm.chen@company.com', department: 'Design', position: 'UX Designer', location: 'San Francisco, CA', status: 'Pending', joined: '2023-01-10' },
    { id: '004', name: 'Emily Davis', email: 'emily.davis@company.com', department: 'Sales', position: 'Sales Director', location: 'Chicago, IL', status: 'Active', joined: '2020-11-05' },
    { id: '005', name: 'David Wilson', email: 'd.wilson@company.com', department: 'HR', position: 'HR Specialist', location: 'Boston, MA', status: 'Inactive', joined: '2019-08-18' },
    { id: '006', name: 'Lisa Anderson', email: 'l.anderson@company.com', department: 'Finance', position: 'Financial Analyst', location: 'Seattle, WA', status: 'Active', joined: '2022-09-30' },
    { id: '007', name: 'Robert Taylor', email: 'r.taylor@company.com', department: 'Engineering', position: 'Backend Developer', location: 'Austin, TX', status: 'Active', joined: '2023-02-14' },
    { id: '008', name: 'Jennifer White', email: 'j.white@company.com', department: 'Marketing', position: 'Content Strategist', location: 'Miami, FL', status: 'Active', joined: '2021-12-01' },
    { id: '009', name: 'James Brown', email: 'j.brown@company.com', department: 'Design', position: 'UI Designer', location: 'Portland, OR', status: 'Pending', joined: '2023-04-20' },
    { id: '010', name: 'Patricia Martinez', email: 'p.martinez@company.com', department: 'Sales', position: 'Account Executive', location: 'Denver, CO', status: 'Active', joined: '2022-06-18' },
    { id: '011', name: 'Christopher Lee', email: 'c.lee@company.com', department: 'Engineering', position: 'Frontend Developer', location: 'San Diego, CA', status: 'Active', joined: '2021-09-05' },
    { id: '012', name: 'Mary Garcia', email: 'm.garcia@company.com', department: 'HR', position: 'Recruiter', location: 'Phoenix, AZ', status: 'Active', joined: '2020-03-22' },
    { id: '013', name: 'Daniel Rodriguez', email: 'd.rodriguez@company.com', department: 'Finance', position: 'Accountant', location: 'Dallas, TX', status: 'Inactive', joined: '2019-11-30' },
    { id: '014', name: 'Jessica Hernandez', email: 'j.hernandez@company.com', department: 'Marketing', position: 'Social Media Manager', location: 'Atlanta, GA', status: 'Active', joined: '2022-01-15' },
    { id: '015', name: 'Matthew Lopez', email: 'm.lopez@company.com', department: 'Design', position: 'Graphic Designer', location: 'Nashville, TN', status: 'Active', joined: '2023-03-08' },
    { id: '016', name: 'Ashley Gonzalez', email: 'a.gonzalez@company.com', department: 'Sales', position: 'Sales Representative', location: 'Minneapolis, MN', status: 'Pending', joined: '2023-05-12' },
    { id: '017', name: 'Andrew Wilson', email: 'a.wilson@company.com', department: 'Engineering', position: 'DevOps Engineer', location: 'Charlotte, NC', status: 'Active', joined: '2021-04-25' },
    { id: '018', name: 'Melissa Moore', email: 'm.moore@company.com', department: 'HR', position: 'HR Manager', location: 'Philadelphia, PA', status: 'Active', joined: '2020-07-19' },
    { id: '019', name: 'Joshua Thomas', email: 'j.thomas@company.com', department: 'Finance', position: 'Finance Manager', location: 'Detroit, MI', status: 'Active', joined: '2021-10-03' },
    { id: '020', name: 'Amanda Jackson', email: 'a.jackson@company.com', department: 'Marketing', position: 'Brand Manager', location: 'San Jose, CA', status: 'Active', joined: '2022-08-27' },
    { id: '021', name: 'Justin Harris', email: 'j.harris@company.com', department: 'Design', position: 'Product Designer', location: 'Columbus, OH', status: 'Pending', joined: '2023-06-14' },
    { id: '022', name: 'Stephanie Martin', email: 's.martin@company.com', department: 'Sales', position: 'Regional Manager', location: 'Indianapolis, IN', status: 'Active', joined: '2020-12-09' },
    { id: '023', name: 'Ryan Thompson', email: 'r.thompson@company.com', department: 'Engineering', position: 'Full Stack Developer', location: 'Jacksonville, FL', status: 'Active', joined: '2022-02-28' },
    { id: '024', name: 'Nicole Garcia', email: 'n.garcia@company.com', department: 'HR', position: 'Benefits Coordinator', location: 'Fort Worth, TX', status: 'Inactive', joined: '2019-05-17' },
    { id: '025', name: 'Brandon Martinez', email: 'b.martinez@company.com', department: 'Finance', position: 'Tax Specialist', location: 'San Antonio, TX', status: 'Active', joined: '2021-11-22' },
  ];

  const totalPages = Math.ceil(employees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEmployees = employees.slice(startIndex, endIndex);

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const goToPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Employee Directory</h1>
        
        {/* Table Container */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Department</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Position</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Location</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentEmployees.map((employee) => (
                  <tr key={employee.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-900">{employee.id}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">{employee.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{employee.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{employee.department}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{employee.position}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{employee.location}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(employee.status)}`}>
                        {employee.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">{employee.joined}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                <span className="font-medium">{Math.min(endIndex, employees.length)}</span> of{' '}
                <span className="font-medium">{employees.length}</span> results
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={goToPrevious}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                
                <div className="flex gap-1">
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => goToPage(index + 1)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        currentPage === index + 1
                          ? 'bg-gray-800 text-white'
                          : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={goToNext}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeTable;
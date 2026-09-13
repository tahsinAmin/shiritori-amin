'use client'

import React, { useState, useRef, useEffect } from 'react';
import { Filter } from 'lucide-react';

const FilterableTable = () => {
  const [data] = useState([
    { firstName: 'Jon', lastName: 'Snow', age: 35, fullName: 'Jon Snow' },
    { firstName: 'Cersei', lastName: 'Lannister', age: 42, fullName: 'Cersei Lannister' },
    { firstName: 'Jaime', lastName: 'Lannister', age: 45, fullName: 'Jaime Lannister' },
    { firstName: 'Arya', lastName: 'Stark', age: 18, fullName: 'Arya Stark' },
    { firstName: 'Daenerys', lastName: 'Targaryen', age: 28, fullName: 'Daenerys Targaryen' }
  ]);

  const [activeFilter, setActiveFilter] = useState(null);
  const [filters, setFilters] = useState({});
  const headerRefs = useRef({});
  const popupRef = useRef(null);

  const columns = [
    { key: 'firstName', label: 'First name', filterable: true },
    { key: 'lastName', label: 'Last name', filterable: true },
    { key: 'age', label: 'Age', filterable: false },
    { key: 'fullName', label: 'Full name', filterable: true }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        const clickedHeader = Object.values(headerRefs.current).some(ref => 
          ref && ref.contains(event.target)
        );
        if (!clickedHeader) {
          setActiveFilter(null);
        }
      }
    };

    if (activeFilter) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeFilter]);

  const handleHeaderClick = (columnKey, filterable) => {
    if (!filterable) return;
    
    if (activeFilter === columnKey) {
      setActiveFilter(null);
    } else {
      setActiveFilter(columnKey);
    }
  };

  const handleOperatorChange = (operator) => {
    setFilters(prev => ({
      ...prev,
      [activeFilter]: {
        ...prev[activeFilter],
        operator,
        value: '',
        value2: ''
      }
    }));
  };

  const handleValueChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [activeFilter]: {
        ...prev[activeFilter],
        [field]: value
      }
    }));
  };

  const handleClose = () => {
    setActiveFilter(null);
  };

  const getFilterPosition = () => {
    if (!activeFilter || !headerRefs.current[activeFilter]) return {};
    
    const rect = headerRefs.current[activeFilter].getBoundingClientRect();
    const tableRect = headerRefs.current[activeFilter].closest('table').getBoundingClientRect();
    
    return {
      left: `${rect.left - tableRect.left}px`,
      top: `${rect.bottom - tableRect.top + 5}px`
    };
  };

  const renderValueInput = () => {
    const currentFilter = filters[activeFilter] || { operator: 'equals', value: '', value2: '' };
    
    if (currentFilter.operator === 'equals' || currentFilter.operator === 'sameAs') {
      return (
        <select
          className="w-full px-3 py-2 border border-gray-300 rounded"
          value={currentFilter.value}
          onChange={(e) => handleValueChange('value', e.target.value)}
        >
          <option value="">Select...</option>
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
      );
    }

    if (currentFilter.operator === 'before') {
      return (
        <input
          type="date"
          className="w-full px-3 py-2 border border-gray-300 rounded"
          value={currentFilter.value}
          onChange={(e) => handleValueChange('value', e.target.value)}
        />
      );
    }

    if (currentFilter.operator === 'within') {
      return (
        <div className="space-y-2">
          <input
            type="date"
            className="w-full px-3 py-2 border border-gray-300 rounded"
            value={currentFilter.value}
            onChange={(e) => handleValueChange('value', e.target.value)}
            placeholder="Start date"
          />
          <input
            type="date"
            className="w-full px-3 py-2 border border-gray-300 rounded"
            value={currentFilter.value2}
            onChange={(e) => handleValueChange('value2', e.target.value)}
            placeholder="End date"
          />
        </div>
      );
    }
  };

  const getOperatorOptions = () => {
    if (activeFilter === 'fullName') {
      return (
        <>
          <option value="equals">equals</option>
          <option value="before">before</option>
          <option value="within">within</option>
          <option value="sameAs">Same as First and last name</option>
        </>
      );
    }
    return (
      <>
        <option value="equals">equals</option>
        <option value="before">before</option>
        <option value="within">within</option>
      </>
    );
  };

  const hasFilter = (columnKey) => {
    return filters[columnKey] && filters[columnKey].value;
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="relative">
        <table className="w-full border-collapse bg-white shadow-sm">
          <thead>
            <tr className="bg-gray-50">
              {columns.map(col => (
                <th
                  key={col.key}
                  ref={el => headerRefs.current[col.key] = el}
                  className={`text-left px-4 py-3 border-b border-gray-200 font-medium text-gray-700 ${col.filterable ? 'cursor-pointer hover:bg-gray-100' : ''} transition-colors`}
                  onClick={() => handleHeaderClick(col.key, col.filterable)}
                >
                  <div className="flex items-center gap-2">
                    {col.label}
                    {hasFilter(col.key) && (
                      <Filter className="w-4 h-4 text-blue-600" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3">{row.firstName}</td>
                <td className="px-4 py-3">{row.lastName}</td>
                <td className="px-4 py-3">{row.age}</td>
                <td className="px-4 py-3">{row.fullName}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {activeFilter && (
          <div 
            ref={popupRef}
            className="absolute bg-white border border-gray-300 rounded-lg shadow-lg p-4 w-96 z-10"
            style={getFilterPosition()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-900">Filter</h3>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Columns</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  value={activeFilter}
                  onChange={(e) => setActiveFilter(e.target.value)}
                >
                  {columns.filter(col => col.filterable).map(col => (
                    <option key={col.key} value={col.key}>{col.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Operator</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  value={filters[activeFilter]?.operator || 'equals'}
                  onChange={(e) => handleOperatorChange(e.target.value)}
                >
                  {getOperatorOptions()}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Value</label>
                {renderValueInput()}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterableTable;
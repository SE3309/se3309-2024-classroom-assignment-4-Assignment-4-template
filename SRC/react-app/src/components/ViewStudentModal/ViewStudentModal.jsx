import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/modal.css";

const ViewStudentModal = ({
  isOpen,
  onClose,
  onSave,
  initialData = {},
  isEditing,
}) => {
  const [student, setStudent] = useState({
    fullName: "",
    email: "",
    yearInProgram: "",
    graduationYear: "",
    program: "",
  });

  // Update state whenever initialData changes
  useEffect(() => {
    setStudent({
      fullName: initialData.fullName || "",
      email: initialData.email || "",
      yearInProgram: initialData.yearInProgram || "",
      graduationYear: initialData.graduationYear || "",
      program: initialData.program || "",
    });
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleSave = () => {
    onSave(student); // Pass data back to parent
    onClose(); // Close the modal
  };

  if (!isOpen) return null; // Do not render if modal is closed

  return (
    <>
      {/* Backdrop styled to blur using custom css*/}
      <div className="modal-backdrop"></div>

      <div className="modal show d-block" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {isEditing ? "Edit Student" : "Create Student"}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="fullName" className="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="fullName"
                    name="fullName"
                    value={student.fullName}
                    onChange={handleChange}
                    placeholder="Enter full name"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={student.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="yearInProgram" className="form-label">
                    Year in Program
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="yearInProgram"
                    name="yearInProgram"
                    value={student.yearInProgram}
                    onChange={handleChange}
                    placeholder="Enter year in program"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="graduationYear" className="form-label">
                    Graduation Year
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="graduationYear"
                    name="graduationYear"
                    value={student.graduationYear}
                    onChange={handleChange}
                    placeholder="Enter graduation year"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="program" className="form-label">
                    Program
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="program"
                    name="program"
                    value={student.program}
                    onChange={handleChange}
                    placeholder="Enter program"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSave}
              >
                {isEditing ? "Save Changes" : "Create Student"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewStudentModal;

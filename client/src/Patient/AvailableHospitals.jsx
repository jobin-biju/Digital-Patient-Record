// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Navbar from './Navbar'; // Import the navbar component
// import './AvailableHospitals.css';

// function AvailableHospitals() {
//     const [hospitals, setHospitals] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [sortOption, setSortOption] = useState('name');
//     const navigate = useNavigate();

//     useEffect(() => {
//         fetchHospitals();
//     }, []);

//     const fetchHospitals = async () => {
//         try {
//             const response = await fetch('http://localhost:4000/DPR/hospitalview');
//             if (!response.ok) throw new Error('Failed to fetch hospitals');
//             const data = await response.json();
//             setHospitals(data);
//             setLoading(false);
//         } catch (err) {
//             setError(err.message);
//             setLoading(false);
//         }
//     };

//     const handleHospitalClick = (hospital) => {
//         navigate(`/hospital/${hospital._id}`, { state: { hospital } });
//     };

//     // Filter and sort hospitals
//     const filteredHospitals = hospitals
//         .filter(hospital =>
//             hospital.hospitalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             hospital.address.toLowerCase().includes(searchTerm.toLowerCase())
//         )
//         .sort((a, b) => {
//             switch(sortOption) {
//                 case 'name':
//                     return a.hospitalName.localeCompare(b.hospitalName);
//                 case 'location':
//                     return a.address.localeCompare(b.address);
//                 default:
//                     return 0;
//             }
//         });

//     if (loading) return (
//         <>
//             <Navbar />
//             <div className="loading-container">Loading hospitals...</div>
//         </>
//     );
    
//     if (error) return (
//         <>
//             <Navbar />
//             <div className="error-container">Error: {error}</div>
//         </>
//     );

//     return (
//         <>
//             <Navbar /> {/* Add the navbar component */}
//             <div className="hospitals-page">
//                 <header className="page-header">
//                     <div className="header-content">
//                         <h1>Find the Best Healthcare</h1>
//                         <p>Discover our network of trusted hospitals and healthcare providers</p>
//                     </div>
//                 </header>

//                 <div className="content-container">
//                     <div className="search-section">
//                         <div className="search-header">
//                             <h2>Available Hospitals</h2>
//                             <div className="controls">
//                                 <div className="search-box">
//                                     <span className="search-icon">🔍</span>
//                                     <input
//                                         type="text"
//                                         placeholder="Search by hospital name or location..."
//                                         value={searchTerm}
//                                         onChange={(e) => setSearchTerm(e.target.value)}
//                                     />
//                                 </div>
//                                 <div className="sort-filter">
//                                     <label>Sort by:</label>
//                                     <select 
//                                         value={sortOption} 
//                                         onChange={(e) => setSortOption(e.target.value)}
//                                     >
//                                         <option value="name">Name</option>
//                                         <option value="location">Location</option>
//                                     </select>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="results-section">
//                         <div className="results-header">
//                             <p>{filteredHospitals.length} hospitals available</p>
//                         </div>

//                         {filteredHospitals.length === 0 ? (
//                             <div className="no-results">
//                                 <div className="no-results-icon">🏥</div>
//                                 <h3>No hospitals found</h3>
//                                 <p>Try adjusting your search criteria</p>
//                             </div>
//                         ) : (
//                             <div className="hospitals-grid">
//                                 {filteredHospitals.map((hospital) => (
//                                     <div 
//                                         key={hospital._id} 
//                                         className="hospital-item"
//                                         onClick={() => handleHospitalClick(hospital)}
//                                     >
//                                         <div className="hospital-main">
//                                             <div className="hospital-image">
//                                                 <img 
//                                                     src={`http://localhost:4000/${hospital.hospitalLogo}`}
//                                                     alt={hospital.hospitalName}
//                                                     onError={(e) => {
//                                                         e.target.src = '/assets/images/default-hospital.png';
//                                                     }}
//                                                 />
//                                             </div>
                                            
//                                             <div className="hospital-info">
//                                                 <h3>{hospital.hospitalName}</h3>
//                                                 <div className="hospital-details">
//                                                     <div className="detail-item">
//                                                         <span className="icon">📍</span>
//                                                         <span>{hospital.address}</span>
//                                                     </div>
//                                                     <div className="detail-item">
//                                                         <span className="icon">📞</span>
//                                                         <span>{hospital.Phone}</span>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>

//                                         <div className="hospital-departments">
//                                             <h4>Specialties</h4>
//                                             <div className="departments-list">
//                                                 {hospital.department.split(',').slice(0, 4).map((dept, index) => (
//                                                     <span key={index} className="department-tag">
//                                                         {dept.trim()}
//                                                     </span>
//                                                 ))}
//                                                 {hospital.department.split(',').length > 4 && (
//                                                     <span className="department-tag more">
//                                                         +{hospital.department.split(',').length - 4} more
//                                                     </span>
//                                                 )}
//                                             </div>
//                                         </div>

//                                         <div className="hospital-actions">
//                                             <button className="action-btn primary">
//                                                 View Departments
//                                             </button>
//                                             <button className="action-btn secondary">
//                                                 Book Appointment
//                                             </button>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default AvailableHospitals;




import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import './AvailableHospitals.css';

function AvailableHospitals() {
    const [hospitals, setHospitals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('name');
    const navigate = useNavigate();

    useEffect(() => {
        fetchHospitals();
    }, []);

    const fetchHospitals = async () => {
        try {
            const response = await fetch('http://localhost:4000/DPR/hospitalview');
            if (!response.ok) throw new Error('Failed to fetch hospitals');
            const data = await response.json();
            setHospitals(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const handleHospitalClick = (hospital) => {
        navigate(`/hospital/${hospital._id}`, { state: { hospital } });
    };

    // Filter and sort hospitals
    const filteredHospitals = hospitals
        .filter(hospital =>
            hospital.hospitalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            hospital.address.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            switch(sortOption) {
                case 'name':
                    return a.hospitalName.localeCompare(b.hospitalName);
                case 'location':
                    return a.address.localeCompare(b.address);
                default:
                    return 0;
            }
        });

    if (loading) return (
        <>
            <Navbar />
            <div className="available-hospitals__loading">Loading hospitals...</div>
        </>
    );
    
    if (error) return (
        <>
            <Navbar />
            <div className="available-hospitals__error">Error: {error}</div>
        </>
    );

    return (
        <>
            <Navbar /> <br></br><br></br>
            <div className="available-hospitals">
                <div className="available-hospitals__hero">
                    <div className="available-hospitals__hero-content">
                        <h1 className="available-hospitals__title">Find the Best Healthcare</h1>
                        <p className="available-hospitals__subtitle">
                            Discover our network of trusted hospitals and healthcare providers
                        </p>
                    </div>
                </div>

                <div className="available-hospitals__container">
                    <div className="available-hospitals__controls">
                        <div className="available-hospitals__controls-header">
                            <h2 className="available-hospitals__section-title">Healthcare Directory</h2>
                            <div className="available-hospitals__controls-wrapper">
                                <div className="available-hospitals__search-container">
                                    <div className="available-hospitals__search-box">
                                        <span className="available-hospitals__search-icon">🔍</span>
                                        <input
                                            type="text"
                                            className="available-hospitals__search-input"
                                            placeholder="Search by hospital name or location..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                    <div className="available-hospitals__sort-container">
                                        <label className="available-hospitals__sort-label">Sort by:</label>
                                        <select 
                                            className="available-hospitals__sort-select"
                                            value={sortOption} 
                                            onChange={(e) => setSortOption(e.target.value)}
                                        >
                                            <option value="name">Hospital Name</option>
                                            <option value="location">Location</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="available-hospitals__results-info">
                            <span className="available-hospitals__results-count">
                                {filteredHospitals.length} healthcare facilities available
                            </span>
                        </div>
                    </div>

                    <div className="available-hospitals__content">
                        {filteredHospitals.length === 0 ? (
                            <div className="available-hospitals__no-results">
                                <div className="available-hospitals__no-results-icon">🏥</div>
                                <h3 className="available-hospitals__no-results-title">No hospitals found</h3>
                                <p className="available-hospitals__no-results-text">
                                    Try adjusting your search criteria to find the healthcare facility you're looking for
                                </p>
                            </div>
                        ) : (
                            <div className="available-hospitals__list">
                                <div className="available-hospitals__list-header">
                                    <div className="available-hospitals__header-hospital">Hospital Details</div>
                                    <div className="available-hospitals__header-specialties">Medical Specialties</div>
                                    <div className="available-hospitals__header-actions">Actions</div>
                                </div>
                                
                                {filteredHospitals.map((hospital) => (
                                    <div 
                                        key={hospital._id} 
                                        className="available-hospitals__item"
                                        onClick={() => handleHospitalClick(hospital)}
                                    >
                                        <div className="available-hospitals__hospital-section">
                                            <div className="available-hospitals__hospital-image">
                                                <img 
                                                    src={`http://localhost:4000/${hospital.hospitalLogo}`}
                                                    alt={hospital.hospitalName}
                                                    className="available-hospitals__logo"
                                                    onError={(e) => {
                                                        e.target.src = '/assets/images/default-hospital.png';
                                                    }}
                                                />
                                            </div>
                                            
                                            <div className="available-hospitals__hospital-details">
                                                <h3 className="available-hospitals__hospital-name">
                                                    {hospital.hospitalName}
                                                </h3>
                                                <div className="available-hospitals__contact-info">
                                                    <div className="available-hospitals__contact-item">
                                                        <span className="available-hospitals__contact-icon">📍</span>
                                                        <span className="available-hospitals__contact-text">
                                                            {hospital.address}
                                                        </span>
                                                    </div>
                                                    <div className="available-hospitals__contact-item">
                                                        <span className="available-hospitals__contact-icon">📞</span>
                                                        <span className="available-hospitals__contact-text">
                                                            {hospital.Phone}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="available-hospitals__specialties-section">
                                            <div className="available-hospitals__specialties-list">
                                                {hospital.department.split(',').slice(0, 4).map((dept, index) => (
                                                    <span key={index} className="available-hospitals__specialty-tag">
                                                        {dept.trim()}
                                                    </span>
                                                ))}
                                                {hospital.department.split(',').length > 4 && (
                                                    <span className="available-hospitals__specialty-tag available-hospitals__specialty-tag--more">
                                                        +{hospital.department.split(',').length - 4} more
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="available-hospitals__actions-section">
                                            <button 
                                                className="available-hospitals__action-btn available-hospitals__action-btn--primary"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleHospitalClick(hospital);
                                                }}
                                            >
                                                View Departments
                                            </button>
                                            <button 
                                                className="available-hospitals__action-btn available-hospitals__action-btn--secondary"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    // Add appointment booking logic here
                                                }}
                                            >
                                                Book Appointment
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default AvailableHospitals;

// import React, { useEffect, useState } from 'react'
// import HospitalSidebar from './HospitalSidebar'
// import { useNavigate } from 'react-router-dom'
// import './pharmacyView.css'

// function PharmacyView() {
//     const [pharmacies, setPharmacies] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [auth] = useState(JSON.parse(localStorage.getItem("yourstorage")));
//     const navigate = useNavigate();
    
//     useEffect(() => {
//         fetchPharmacies();
//     }, [])

//     const fetchPharmacies = () => {
//         let hospital = {
//             hospitalId: auth.loginId
//         }
//         fetch('http://localhost:4000/DPR/pharmaciesView', {
//             method: 'POST',
//             headers: {
//                 Accept: "application/json",
//                 'Content-Type': "application/json"
//             }, 
//             body: JSON.stringify(hospital)
//         })
//         .then((res) => res.json())
//         .then((result) => {
//             console.log(result);
//             setPharmacies(result || []);
//             setLoading(false);
//         })
//         .catch((error) => {
//             console.error('Error fetching pharmacies:', error);
//             setPharmacies([]);
//             setLoading(false);
//         });
//     }

//     const handleDeletePharmacy = (pharmacyId) => {
//         if (window.confirm('Are you sure you want to delete this pharmacy?')) {
//             // Add delete logic here
//             console.log('Delete pharmacy:', pharmacyId);
//         }
//     }

//     const formatTime = (time) => {
//         if (!time) return 'Not set';
//         return new Date(`1970-01-01T${time}`).toLocaleTimeString('en-US', {
//             hour: '2-digit',
//             minute: '2-digit',
//             hour12: true
//         });
//     };

//     const filteredPharmacies = pharmacies.filter(pharmacy =>
//         pharmacy.pharmacyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         pharmacy.drugLicenseNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         pharmacy.number?.includes(searchTerm)
//     );

//     return (
//         <div className="pharmacy-view-layout">
//             <HospitalSidebar />
//             <div className="pharmacy-view-main">
                
//                 {/* Header Section */}
//                 <div className="pharmacy-view-header">
//                     <div className="pharmacy-header-left">
//                         <h1 className="pharmacy-view-title">Pharmacy Management</h1>
//                         <p className="pharmacy-view-subtitle">Manage and monitor all pharmacies in your hospital</p>
//                     </div>
//                     <div className="pharmacy-header-actions">
//                         <button 
//                             className="pharmacy-add-btn"
//                             onClick={() => navigate('/addpharmacy')}
//                         >
//                             <span className="btn-icon">+</span>
//                             Add New Pharmacy
//                         </button>
//                     </div>
//                 </div>

//                 {/* Search and Stats */}
//                 <div className="pharmacy-controls">
//                     <div className="search-section">
//                         <div className="search-wrapper">
//                             <span className="search-icon">🔍</span>
//                             <input
//                                 type="text"
//                                 placeholder="Search pharmacies by name, license, or phone..."
//                                 value={searchTerm}
//                                 onChange={(e) => setSearchTerm(e.target.value)}
//                                 className="search-input"
//                             />
//                         </div>
//                     </div>
//                     <div className="stats-section">
//                         <div className="stat-item">
//                             <div className="stat-number">{pharmacies.length}</div>
//                             <div className="stat-label">Total Pharmacies</div>
//                         </div>
//                         <div className="stat-item">
//                             <div className="stat-number">{filteredPharmacies.length}</div>
//                             <div className="stat-label">Showing</div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Content Area */}
//                 <div className="pharmacy-content">
//                     {loading ? (
//                         <div className="loading-container">
//                             <div className="loading-spinner"></div>
//                             <p>Loading pharmacies...</p>
//                         </div>
//                     ) : filteredPharmacies.length === 0 ? (
//                         <div className="empty-state">
//                             <div className="empty-icon">🏪</div>
//                             <h3>No Pharmacies Found</h3>
//                             <p>
//                                 {searchTerm 
//                                     ? `No pharmacies match "${searchTerm}"` 
//                                     : 'No pharmacies have been added yet'
//                                 }
//                             </p>
//                             {!searchTerm && (
//                                 <button 
//                                     className="pharmacy-add-btn"
//                                     onClick={() => navigate('/addpharmacy')}
//                                 >
//                                     Add First Pharmacy
//                                 </button>
//                             )}
//                         </div>
//                     ) : (
//                         <div className="pharmacies-grid">
//                             {filteredPharmacies.map((pharmacy, index) => (
//                                 <div key={pharmacy._id || index} className="pharmacy-card">
//                                     <div className="pharmacy-card-header">
//                                         <div className="pharmacy-icon">
//                                             <span>🏪</span>
//                                         </div>
//                                         <div className="pharmacy-status active">
//                                             Active
//                                         </div>
//                                     </div>
                                    
//                                     <div className="pharmacy-card-body">
//                                         <h3 className="pharmacy-name">{pharmacy.pharmacyName}</h3>
//                                         <p className="pharmacy-license">
//                                             License: <span>{pharmacy.drugLicenseNumber}</span>
//                                         </p>
                                        
//                                         <div className="pharmacy-info">
//                                             <div className="info-item">
//                                                 <span className="info-icon">📞</span>
//                                                 <span className="info-text">{pharmacy.number}</span>
//                                             </div>
                                            
//                                             <div className="info-item">
//                                                 <span className="info-icon">🏥</span>
//                                                 <span className="info-text">
//                                                     {pharmacy.hospitalId?.hospitalName || 'Hospital'}
//                                                 </span>
//                                             </div>
                                            
//                                             <div className="info-item">
//                                                 <span className="info-icon">⏰</span>
//                                                 <span className="info-text">
//                                                     {formatTime(pharmacy.openingTime)} - {formatTime(pharmacy.closingTime)}
//                                                 </span>
//                                             </div>
//                                         </div>
//                                     </div>
                                    
//                                     <div className="pharmacy-card-actions">
//                                         <button className="action-btn view-btn">
//                                             <span className="action-icon">👁️</span>
//                                             View
//                                         </button>
//                                         <button className="action-btn edit-btn">
//                                             <span className="action-icon">✏️</span>
//                                             Edit
//                                         </button>
//                                         <button 
//                                             className="action-btn delete-btn"
//                                             onClick={() => handleDeletePharmacy(pharmacy._id)}
//                                         >
//                                             <span className="action-icon">🗑️</span>
//                                             Delete
//                                         </button>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default PharmacyView



import React, { useEffect, useState } from 'react'
import HospitalSidebar from './HospitalSidebar'
import { useNavigate } from 'react-router-dom'
import { Search, Plus, Filter, Download, Eye, Edit, Trash2, Pill, Clock, Phone, Building, MapPin, Activity, TrendingUp, BarChart3, ShoppingBag } from 'lucide-react';

function PharmacyView() {
    const [pharmacies, setPharmacies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [hoveredCard, setHoveredCard] = useState(null);
    const [auth] = useState(JSON.parse(localStorage.getItem("yourstorage")));
    const navigate = useNavigate();
    
    useEffect(() => {
        fetchPharmacies();
    }, [])

    const fetchPharmacies = () => {
        let hospital = {
            hospitalId: auth.loginId
        }
        fetch('http://localhost:4000/DPR/pharmaciesView', {
            method: 'POST',
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json"
            }, 
            body: JSON.stringify(hospital)
        })
        .then((res) => res.json())
        .then((result) => {
            console.log(result);
            setPharmacies(result || []);
            setLoading(false);
        })
        .catch((error) => {
            console.error('Error fetching pharmacies:', error);
            setPharmacies([]);
            setLoading(false);
        });
    }

    const handleDeletePharmacy = (pharmacyId) => {
        if (window.confirm('Are you sure you want to delete this pharmacy?')) {
            // Add delete logic here
            console.log('Delete pharmacy:', pharmacyId);
        }
    }

    const formatTime = (time) => {
        if (!time) return 'Not set';
        return new Date(`1970-01-01T${time}`).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    const filteredPharmacies = pharmacies.filter(pharmacy =>
        pharmacy.pharmacyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pharmacy.drugLicenseNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pharmacy.number?.includes(searchTerm)
    );

    // Professional Hospital Pharmacy Theme Styles
    const layoutContainerStyles = {
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: '#f8fafc',
        fontFamily: '"Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    };

    const mainContentStyles = {
        marginLeft: '280px',
        width: 'calc(100% - 280px)',
        minHeight: '100vh',
        padding: '0',
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'
    };

    const headerStyles = {
        background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)',
        padding: '2.5rem 3rem',
        color: 'white',
        boxShadow: '0 4px 20px rgba(30, 64, 175, 0.2)'
    };

    const headerContentStyles = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1400px',
        margin: '0 auto'
    };

    const headerLeftStyles = {
        flex: 1
    };

    const pageTitleStyles = {
        fontSize: '2.5rem',
        fontWeight: '700',
        margin: '0 0 0.5rem 0',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
    };

    const pageSubtitleStyles = {
        fontSize: '1.1rem',
        opacity: 0.9,
        margin: 0
    };

    const statsGridStyles = {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1.5rem',
        padding: '2rem 3rem',
        backgroundColor: 'white',
        borderBottom: '1px solid #e2e8f0'
    };

    const statCardStyles = {
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '1.5rem',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        border: '2px solid #f1f5f9',
        transition: 'all 0.3s ease'
    };

    const statIconContainerStyles = (bgColor) => ({
        width: '48px',
        height: '48px',
        borderRadius: '12px',
        backgroundColor: bgColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1rem'
    });

    const statNumberStyles = {
        fontSize: '2rem',
        fontWeight: '800',
        color: '#1e293b',
        marginBottom: '0.25rem',
        lineHeight: 1
    };

    const statLabelStyles = {
        fontSize: '0.875rem',
        color: '#64748b',
        fontWeight: '500',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
    };

    const toolbarStyles = {
        padding: '2rem 3rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1rem',
        flexWrap: 'wrap',
        backgroundColor: 'white',
        borderBottom: '1px solid #e2e8f0'
    };

    const searchContainerStyles = {
        position: 'relative',
        flex: '1',
        maxWidth: '400px',
        minWidth: '200px'
    };

    const searchInputStyles = {
        width: '100%',
        padding: '12px 16px 12px 48px',
        fontSize: '0.95rem',
        border: '2px solid #e2e8f0',
        borderRadius: '12px',
        outline: 'none',
        transition: 'all 0.3s ease',
        backgroundColor: 'white',
        boxSizing: 'border-box',
        fontFamily: 'inherit'
    };

    const searchIconStyles = {
        position: 'absolute',
        left: '16px',
        top: '50%',
        transform: 'translateY(-50%)',
        color: '#1e40af'
    };

    const actionButtonStyles = {
        padding: '12px 24px',
        borderRadius: '12px',
        border: 'none',
        fontWeight: '600',
        fontSize: '0.9rem',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        whiteSpace: 'nowrap'
    };

    const filterButtonStyles = {
        ...actionButtonStyles,
        backgroundColor: 'white',
        color: '#1e40af',
        border: '2px solid #e2e8f0'
    };

    const addButtonStyles = {
        ...actionButtonStyles,
        background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)',
        color: 'white',
        boxShadow: '0 4px 15px rgba(30, 64, 175, 0.3)'
    };

    const exportButtonStyles = {
        ...actionButtonStyles,
        backgroundColor: '#f8fafc',
        color: '#475569',
        border: '2px solid #e2e8f0'
    };

    const pharmaciesGridStyles = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '2rem',
        padding: '3rem',
        maxWidth: '1400px',
        margin: '0 auto'
    };

    const pharmacyCardStyles = {
        backgroundColor: 'white',
        borderRadius: '20px',
        padding: '2rem',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
        border: '1px solid #e2e8f0',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden'
    };

    const pharmacyCardHeaderStyles = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '1.5rem'
    };

    const pharmacyIconContainerStyles = {
        width: '60px',
        height: '60px',
        borderRadius: '16px',
        backgroundColor: '#eff6ff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px solid #bfdbfe'
    };

    const statusBadgeStyles = {
        padding: '6px 12px',
        borderRadius: '20px',
        fontSize: '0.75rem',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        backgroundColor: '#dcfce7',
        color: '#166534',
        border: '1px solid #bbf7d0'
    };

    const pharmacyNameStyles = {
        fontSize: '1.5rem',
        fontWeight: '700',
        color: '#1e293b',
        margin: '0 0 0.5rem 0',
        lineHeight: 1.2
    };

    const licenseStyles = {
        fontSize: '0.9rem',
        color: '#64748b',
        margin: '0 0 1.5rem 0',
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
    };

    const infoGridStyles = {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        marginBottom: '2rem'
    };

    const infoItemStyles = {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '0.75rem',
        backgroundColor: '#f8fafc',
        borderRadius: '10px',
        border: '1px solid #f1f5f9'
    };

    const infoIconStyles = {
        width: '20px',
        height: '20px',
        color: '#1e40af',
        flexShrink: 0
    };

    const infoTextStyles = {
        fontSize: '0.9rem',
        color: '#374151',
        fontWeight: '500',
        flex: 1
    };

    const cardActionsStyles = {
        display: 'flex',
        gap: '8px',
        justifyContent: 'flex-end'
    };

    const actionBtnStyles = {
        width: '40px',
        height: '40px',
        borderRadius: '10px',
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    };

    const viewBtnStyles = {
        ...actionBtnStyles,
        backgroundColor: '#e0f2fe',
        color: '#0369a1'
    };

    const editBtnStyles = {
        ...actionBtnStyles,
        backgroundColor: '#f0fdf4',
        color: '#166534'
    };

    const deleteBtnStyles = {
        ...actionBtnStyles,
        backgroundColor: '#fef2f2',
        color: '#dc2626'
    };

    const loadingContainerStyles = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '60vh',
        flexDirection: 'column',
        gap: '1rem'
    };

    const spinnerStyles = {
        width: '60px',
        height: '60px',
        border: '4px solid #e2e8f0',
        borderTop: '4px solid #1e40af',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
    };

    const emptyStateStyles = {
        textAlign: 'center',
        padding: '4rem 2rem',
        color: '#64748b',
        maxWidth: '600px',
        margin: '0 auto'
    };

    const keyframesStyles = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .search-input:focus {
            border-color: #1e40af !important;
            box-shadow: 0 0 0 3px rgba(30, 64, 175, 0.1) !important;
        }
        
        .filter-btn:hover {
            background-color: #f8fafc !important;
            border-color: #1e40af !important;
        }
        
        .add-btn:hover {
            transform: translateY(-2px) !important;
            box-shadow: 0 8px 25px rgba(30, 64, 175, 0.4) !important;
        }
        
        .export-btn:hover {
            background-color: #f1f5f9 !important;
            border-color: #cbd5e1 !important;
        }
        
        .stat-card:hover {
            transform: translateY(-2px) !important;
            box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15) !important;
            border-color: #1e40af !important;
        }
        
        .pharmacy-card:hover {
            transform: translateY(-4px) !important;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15) !important;
            border-color: #1e40af !important;
        }
        
        .view-btn:hover {
            background-color: #bae6fd !important;
            transform: scale(1.1) !important;
        }
        
        .edit-btn:hover {
            background-color: #dcfce7 !important;
            transform: scale(1.1) !important;
        }
        
        .delete-btn:hover {
            background-color: #fee2e2 !important;
            transform: scale(1.1) !important;
        }
    `;

    if (loading) {
        return (
            <>
                <style>{keyframesStyles}</style>
                <div style={layoutContainerStyles}>
                    <HospitalSidebar />
                    <div style={mainContentStyles}>
                        <div style={loadingContainerStyles}>
                            <div style={spinnerStyles}></div>
                            <p style={{ fontSize: '1.1rem', color: '#1e40af', fontWeight: '500' }}>
                                Loading pharmacy directory...
                            </p>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <style>{keyframesStyles}</style>
            <div style={layoutContainerStyles}>
                <HospitalSidebar />
                <div style={mainContentStyles}>
                    {/* Modern Header */}
                    <div style={headerStyles}>
                        <div style={headerContentStyles}>
                            <div style={headerLeftStyles}>
                                <h1 style={pageTitleStyles}>
                                    <Pill size={36} />
                                    Pharmacy Management
                                </h1>
                                <p style={pageSubtitleStyles}>
                                    Comprehensive pharmaceutical services and medication management system
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Enhanced Statistics Grid */}
                    <div style={statsGridStyles}>
                        <div className="stat-card" style={statCardStyles}>
                            <div style={statIconContainerStyles('#eff6ff')}>
                                <Pill size={24} style={{ color: '#1e40af' }} />
                            </div>
                            <div style={statNumberStyles}>{pharmacies.length}</div>
                            <div style={statLabelStyles}>Total Pharmacies</div>
                        </div>
                        
                        <div className="stat-card" style={statCardStyles}>
                            <div style={statIconContainerStyles('#ecfdf5')}>
                                <Activity size={24} style={{ color: '#059669' }} />
                            </div>
                            <div style={statNumberStyles}>{pharmacies.filter(p => p.openingTime && p.closingTime).length}</div>
                            <div style={statLabelStyles}>Active Pharmacies</div>
                        </div>
                        
                        <div className="stat-card" style={statCardStyles}>
                            <div style={statIconContainerStyles('#fef3e2')}>
                                <BarChart3 size={24} style={{ color: '#d97706' }} />
                            </div>
                            <div style={statNumberStyles}>{filteredPharmacies.length}</div>
                            <div style={statLabelStyles}>Search Results</div>
                        </div>
                    </div>

                    {/* Enhanced Toolbar */}
                    <div style={toolbarStyles}>
                        <div style={searchContainerStyles}>
                            <div style={searchIconStyles}>
                                <Search size={20} />
                            </div>
                            <input
                                type="text"
                                placeholder="Search pharmacies by name, license, or contact..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={searchInputStyles}
                                className="search-input"
                                onFocus={(e) => {
                                    e.target.style.borderColor = '#1e40af';
                                    e.target.style.boxShadow = '0 0 0 3px rgba(30, 64, 175, 0.1)';
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = '#e2e8f0';
                                    e.target.style.boxShadow = 'none';
                                }}
                            />
                        </div>
                        
                        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                            <button 
                                className="filter-btn"
                                style={filterButtonStyles}
                                onMouseOver={(e) => {
                                    e.target.style.backgroundColor = '#f8fafc';
                                    e.target.style.borderColor = '#1e40af';
                                }}
                                onMouseOut={(e) => {
                                    e.target.style.backgroundColor = 'white';
                                    e.target.style.borderColor = '#e2e8f0';
                                }}
                            >
                                <Filter size={16} />
                                Filter
                            </button>

                            <button 
                                className="export-btn"
                                style={exportButtonStyles}
                                onMouseOver={(e) => {
                                    e.target.style.backgroundColor = '#f1f5f9';
                                    e.target.style.borderColor = '#cbd5e1';
                                }}
                                onMouseOut={(e) => {
                                    e.target.style.backgroundColor = '#f8fafc';
                                    e.target.style.borderColor = '#e2e8f0';
                                }}
                            >
                                <Download size={16} />
                                Export Data
                            </button>
                            
                            <button 
                                className="add-btn"
                                style={addButtonStyles}
                                onClick={() => navigate('/addpharmacy')}
                                onMouseOver={(e) => {
                                    e.target.style.transform = 'translateY(-2px)';
                                    e.target.style.boxShadow = '0 8px 25px rgba(30, 64, 175, 0.4)';
                                }}
                                onMouseOut={(e) => {
                                    e.target.style.transform = 'translateY(0px)';
                                    e.target.style.boxShadow = '0 4px 15px rgba(30, 64, 175, 0.3)';
                                }}
                            >
                                <Plus size={16} />
                                Add Pharmacy
                            </button>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div>
                        {filteredPharmacies.length === 0 ? (
                            <div style={emptyStateStyles}>
                                <Pill size={64} style={{ color: '#cbd5e1', marginBottom: '1rem' }} />
                                <h3 style={{ color: '#64748b', marginBottom: '0.5rem' }}>
                                    {searchTerm ? 'No pharmacies found' : 'No pharmacies registered'}
                                </h3>
                                <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
                                    {searchTerm 
                                        ? `No pharmacies match "${searchTerm}"` 
                                        : 'Pharmaceutical services will appear here once registered'
                                    }
                                </p>
                                {!searchTerm && (
                                    <button 
                                        style={addButtonStyles}
                                        onClick={() => navigate('/addpharmacy')}
                                    >
                                        <Plus size={16} />
                                        Add First Pharmacy
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div style={pharmaciesGridStyles}>
                                {filteredPharmacies.map((pharmacy, index) => (
                                    <div 
                                        key={pharmacy._id || index} 
                                        className="pharmacy-card"
                                        style={pharmacyCardStyles}
                                        onMouseEnter={() => setHoveredCard(index)}
                                        onMouseLeave={() => setHoveredCard(null)}
                                    >
                                        {/* Card Header */}
                                        <div style={pharmacyCardHeaderStyles}>
                                            <div style={pharmacyIconContainerStyles}>
                                                <Pill size={28} style={{ color: '#1e40af' }} />
                                            </div>
                                            <div style={statusBadgeStyles}>
                                                Active
                                            </div>
                                        </div>
                                        
                                        {/* Card Body */}
                                        <div>
                                            <h3 style={pharmacyNameStyles}>
                                                {pharmacy.pharmacyName || 'Unnamed Pharmacy'}
                                            </h3>
                                            <p style={licenseStyles}>
                                                <ShoppingBag size={14} />
                                                License: {pharmacy.drugLicenseNumber || 'Not provided'}
                                            </p>
                                            
                                            <div style={infoGridStyles}>
                                                <div style={infoItemStyles}>
                                                    <Phone style={infoIconStyles} />
                                                    <span style={infoTextStyles}>
                                                        {pharmacy.number || 'No contact number'}
                                                    </span>
                                                </div>
                                                
                                                <div style={infoItemStyles}>
                                                    <Building style={infoIconStyles} />
                                                    <span style={infoTextStyles}>
                                                        {pharmacy.hospitalId?.hospitalName || 'Hospital Pharmacy'}
                                                    </span>
                                                </div>
                                                
                                                <div style={infoItemStyles}>
                                                    <Clock style={infoIconStyles} />
                                                    <span style={infoTextStyles}>
                                                        {formatTime(pharmacy.openingTime)} - {formatTime(pharmacy.closingTime)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* Card Actions */}
                                        <div style={cardActionsStyles}>
                                            <button 
                                                className="view-btn"
                                                style={viewBtnStyles}
                                                title="View Details"
                                            >
                                                <Eye size={16} />
                                            </button>
                                            <button 
                                                className="edit-btn"
                                                style={editBtnStyles}
                                                title="Edit Pharmacy"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button 
                                                className="delete-btn"
                                                style={deleteBtnStyles}
                                                onClick={() => handleDeletePharmacy(pharmacy._id)}
                                                title="Delete Pharmacy"
                                            >
                                                <Trash2 size={16} />
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
    )
}

export default PharmacyView

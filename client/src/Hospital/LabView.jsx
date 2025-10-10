// import React, { useEffect, useState } from 'react'
// import HospitalSidebar from './HospitalSidebar'
// import { Link } from 'react-router-dom'
// import './labView.css'

// function LabView() {
//     const [labs, setLabs] = useState([]);
//     const [resfresh, setRefresh] = useState(false);
//     const [auth] = useState(JSON.parse(localStorage.getItem("yourstorage")))
//     useEffect(() => {
//         let hospital = { hospitalId: auth.loginId };

//         fetch("http://localhost:4000/DPR/labView", {
//             method: 'POST',
//             headers: {
//                 Accept: "application/json",
//                 'Content-Type': "application/json"
//             },
//             body: JSON.stringify(hospital)
//         })
//             .then((res) => res.json())
//             .then((result) => {
//                 setLabs(result);
//             })
//             .catch((err) => {
//                 console.error("Error fetching labs:", err);
//             });
//     }, []);

//     const handleDelete =(id) => {
//         alert("Delete functionality to be implemented")
//         let ids = {
//             id: id
//         }
//         fetch('http://localhost:4000/DPR/labDelete', {
//             method: 'POST',
//             headers: {
//                 Accept: "application/josn",
//                 'Content-Type': "application/json"
//             }, body: JSON.stringify(ids)
//         }).then((res)=> res.json())
//         .then((result)=>{
//             console.log(result);
//            window.location.reload();
//         })
//     }

//     return (
//         <div className="hospital-layout">
//             <HospitalSidebar />
//             <div className="main-content">
//                 <div className="content-header">
//                     <h1 className="page-title">Laboratory Management</h1>
//                     <Link to='/hospitallabadd'>
//                         <button className="btn btn-primary add-lab-btn">
//                             <span className="btn-icon">+</span>
//                             Add Laboratory
//                         </button>
//                     </Link>
//                 </div>

//                 <div className="table-container">
//                     <div className="table-wrapper">
//                         <table className="labs-table">
//                             <thead>
//                                 <tr>
//                                     <th>Lab Name</th>
//                                     <th>Registration Number</th>
//                                     <th>Lab Type</th>
//                                     <th>Contact Email</th>
//                                     <th>Phone</th>
//                                     <th>Address</th>
//                                     <th>In-charge Name</th>
//                                     <th>Action</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {labs.map((lab, index) => (
//                                     <tr key={lab._id || index}>
//                                         <td className="lab-name">
//                                             <div className="lab-info">
//                                                 <div className="lab-avatar">
//                                                     <span className="lab-initial">
//                                                         {lab.labname ? lab.labname.charAt(0).toUpperCase() : 'L'}
//                                                     </span>
//                                                 </div>
//                                                 <span className="name">{lab.labname}</span>
//                                             </div>
//                                         </td>
//                                         <td>{lab.registernumber}</td>
//                                         <td>
//                                             <span className="lab-type-badge">
//                                                 {lab.labtype}
//                                             </span>
//                                         </td>
//                                         <td className="email-cell">{lab.contactemail}</td>
//                                         <td>{lab.phone}</td>
//                                         <td className="address-cell" title={lab.address}>
//                                             {lab.address}
//                                         </td>
//                                         <td>{lab.inchargename}</td>
//                                         <td className="action-buttons">
//                                             <Link to='/hospitallabedit' state={{ id:lab._id }}>
//                                             <button
//                                                 type="button"
//                                                 className="btn btn-edit"
//                                                 title="Edit Lab"
//                                             >
//                                                 Edit
//                                             </button>
//                                             </Link>
//                                             <button
//                                                 className="btn btn-delete"
//                                                 title="Delete Lab"
//                                                 onClick={() => handleDelete(lab._id)}
//                                             >
//                                                 Delete
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default LabView

import React, { useEffect, useState } from 'react'
import HospitalSidebar from './HospitalSidebar'
import { Link } from 'react-router-dom'
import { Search, Plus, Filter, Download, Eye, Edit, Trash2, FlaskConical, Building, Phone, Mail, MapPin, User, Activity, TrendingUp, BarChart3, AlertCircle } from 'lucide-react';

function LabView() {
    const [labs, setLabs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [hoveredRow, setHoveredRow] = useState(null);
    const [auth] = useState(JSON.parse(localStorage.getItem("yourstorage")))

    useEffect(() => {
        setLoading(true);
        let hospital = { hospitalId: auth.loginId };

        fetch("http://localhost:4000/DPR/labView", {
            method: 'POST',
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify(hospital)
        })
            .then((res) => res.json())
            .then((result) => {
                setLabs(result);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching labs:", err);
                setLoading(false);
            });
    }, []);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this laboratory?')) {
            let ids = {
                id: id
            }
            fetch('http://localhost:4000/DPR/labDelete', {
                method: 'POST',
                headers: {
                    Accept: "application/json",
                    'Content-Type': "application/json"
                }, body: JSON.stringify(ids)
            }).then((res) => res.json())
                .then((result) => {
                    console.log(result);
                    setLabs(labs.filter(lab => lab._id !== id));
                })
        }
    }

    // Filter labs based on search term
    const filteredLabs = labs.filter(lab =>
        lab.labname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lab.labtype?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lab.contactemail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lab.phone?.includes(searchTerm) ||
        lab.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lab.inchargename?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Professional Hospital Laboratory Theme Styles
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

    const statsContainerStyles = {
        display: 'flex',
        gap: '2rem',
        alignItems: 'center'
    };

    const statCardStyles = {
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        borderRadius: '16px',
        padding: '1.5rem',
        textAlign: 'center',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)'
    };

    const statNumberStyles = {
        fontSize: '2.5rem',
        fontWeight: '800',
        display: 'block',
        lineHeight: 1
    };

    const statLabelStyles = {
        fontSize: '0.875rem',
        opacity: 0.8,
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        marginTop: '0.5rem'
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
        whiteSpace: 'nowrap',
        textDecoration: 'none'
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

    const tableContainerStyles = {
        margin: '0 3rem 3rem 3rem',
        backgroundColor: 'white',
        borderRadius: '20px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
        overflow: 'hidden',
        border: '1px solid #e2e8f0'
    };

    const tableHeaderStyles = {
        backgroundColor: '#f8fafc',
        borderBottom: '2px solid #e2e8f0',
        padding: '1.5rem 2rem'
    };

    const tableHeaderTitleStyles = {
        fontSize: '1.25rem',
        fontWeight: '600',
        color: '#1e293b',
        margin: 0,
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
    };

    const tableWrapperStyles = {
        overflowX: 'auto'
    };

    const tableStyles = {
        width: '100%',
        borderCollapse: 'separate',
        borderSpacing: 0
    };

    const thStyles = {
        padding: '1.25rem 1.5rem',
        backgroundColor: '#f1f5f9',
        color: '#1e293b',
        fontWeight: '600',
        fontSize: '0.875rem',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        borderBottom: '2px solid #e2e8f0',
        whiteSpace: 'nowrap'
    };

    const tdStyles = {
        padding: '1.5rem',
        borderBottom: '1px solid #f1f5f9',
        verticalAlign: 'middle'
    };

    const labRowStyles = {
        transition: 'all 0.3s ease',
        cursor: 'pointer'
    };

    const labCardStyles = {
        display: 'flex',
        alignItems: 'center',
        gap: '15px'
    };

    const labAvatarStyles = {
        width: '50px',
        height: '50px',
        borderRadius: '12px',
        backgroundColor: '#1e40af',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '1.25rem',
        fontWeight: '700',
        flexShrink: 0
    };

    const labInfoStyles = {
        flex: 1
    };

    const labNameStyles = {
        fontSize: '1.1rem',
        fontWeight: '700',
        color: '#1e293b',
        margin: '0 0 4px 0'
    };

    const labSubtextStyles = {
        fontSize: '0.875rem',
        color: '#64748b',
        margin: 0
    };

    const badgeStyles = {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        padding: '6px 12px',
        borderRadius: '20px',
        fontSize: '0.75rem',
        fontWeight: '600',
        textTransform: 'capitalize'
    };

    const labTypeBadgeStyles = {
        ...badgeStyles,
        backgroundColor: '#eff6ff',
        color: '#1e40af'
    };

    const contactInfoStyles = {
        fontSize: '0.875rem',
        color: '#475569',
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
    };

    const addressTextStyles = {
        fontSize: '0.875rem',
        color: '#64748b',
        maxWidth: '200px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
    };

    const actionButtonGroupStyles = {
        display: 'flex',
        gap: '8px',
        alignItems: 'center'
    };

    const smallButtonStyles = {
        width: '36px',
        height: '36px',
        borderRadius: '10px',
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none'
    };

    const editButtonStyles = {
        ...smallButtonStyles,
        backgroundColor: '#f0fdf4',
        color: '#166534'
    };

    const deleteButtonStyles = {
        ...smallButtonStyles,
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
        color: '#64748b'
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
                                Loading laboratory directory...
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
                                    <FlaskConical size={36} />
                                    Laboratory Management
                                </h1>
                                <p style={pageSubtitleStyles}>
                                    Comprehensive laboratory information system and diagnostics management
                                </p>
                            </div>
                            <div style={statsContainerStyles}>
                                <div style={statCardStyles}>
                                    <span style={statNumberStyles}>{labs.length}</span>
                                    <span style={statLabelStyles}>Total Labs</span>
                                </div>
                                <div style={statCardStyles}>
                                    <span style={statNumberStyles}>
                                        {new Set(labs.map(l => l.labtype)).size}
                                    </span>
                                    <span style={statLabelStyles}>Lab Types</span>
                                </div>
                            </div>
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
                                placeholder="Search laboratories, types, contacts, addresses..."
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
                                Export
                            </button>
                            
                            <Link 
                                to='/hospitallabadd'
                                className="add-btn"
                                style={addButtonStyles}
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
                                Add Laboratory
                            </Link>
                        </div>
                    </div>

                    {/* Modern Table Container */}
                    <div style={tableContainerStyles}>
                        <div style={tableHeaderStyles}>
                            <h3 style={tableHeaderTitleStyles}>
                                <FlaskConical size={20} />
                                Laboratory Directory ({filteredLabs.length} laboratories)
                            </h3>
                        </div>

                        {filteredLabs.length === 0 ? (
                            <div style={emptyStateStyles}>
                                <FlaskConical size={64} style={{ color: '#cbd5e1', marginBottom: '1rem' }} />
                                <h3 style={{ color: '#64748b', marginBottom: '0.5rem' }}>
                                    {searchTerm ? 'No laboratories found' : 'No laboratories registered'}
                                </h3>
                                <p style={{ color: '#94a3b8' }}>
                                    {searchTerm 
                                        ? `Try adjusting your search for "${searchTerm}"` 
                                        : 'Laboratory facilities will appear here once registered'
                                    }
                                </p>
                            </div>
                        ) : (
                            <div style={tableWrapperStyles}>
                                <table style={tableStyles}>
                                    <thead>
                                        <tr>
                                            <th style={thStyles}>Laboratory Details</th>
                                            <th style={thStyles}>Registration & Type</th>
                                            <th style={thStyles}>Contact Information</th>
                                            <th style={thStyles}>Location</th>
                                            <th style={thStyles}>Lab In-Charge</th>
                                            <th style={thStyles}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredLabs.map((lab, index) => (
                                            <tr
                                                key={lab._id || index}
                                                style={labRowStyles}
                                                onMouseEnter={() => setHoveredRow(index)}
                                                onMouseLeave={() => setHoveredRow(null)}
                                                onMouseOver={(e) => {
                                                    e.currentTarget.style.backgroundColor = '#f8fafc';
                                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(30, 64, 175, 0.1)';
                                                }}
                                                onMouseOut={(e) => {
                                                    e.currentTarget.style.backgroundColor = 'transparent';
                                                    e.currentTarget.style.transform = 'translateY(0px)';
                                                    e.currentTarget.style.boxShadow = 'none';
                                                }}
                                            >
                                                <td style={tdStyles}>
                                                    <div style={labCardStyles}>
                                                        <div style={labAvatarStyles}>
                                                            {lab.labname ? lab.labname.charAt(0).toUpperCase() : 'L'}
                                                        </div>
                                                        <div style={labInfoStyles}>
                                                            <h4 style={labNameStyles}>{lab.labname || 'Unnamed Laboratory'}</h4>
                                                            <p style={labSubtextStyles}>Medical Laboratory</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                
                                                <td style={tdStyles}>
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                        <div style={{ ...contactInfoStyles, fontWeight: '600' }}>
                                                            <Building size={14} />
                                                            {lab.registernumber || 'N/A'}
                                                        </div>
                                                        <div style={labTypeBadgeStyles}>
                                                            <Activity size={12} />
                                                            {lab.labtype || 'General'}
                                                        </div>
                                                    </div>
                                                </td>
                                                
                                                <td style={tdStyles}>
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                        <div style={contactInfoStyles}>
                                                            <Mail size={14} />
                                                            {lab.contactemail || 'N/A'}
                                                        </div>
                                                        <div style={contactInfoStyles}>
                                                            <Phone size={14} />
                                                            {lab.phone || 'N/A'}
                                                        </div>
                                                    </div>
                                                </td>
                                                
                                                <td style={tdStyles}>
                                                    <div style={contactInfoStyles}>
                                                        <MapPin size={14} />
                                                        <span style={addressTextStyles} title={lab.address}>
                                                            {lab.address || 'Address not provided'}
                                                        </span>
                                                    </div>
                                                </td>
                                                
                                                <td style={tdStyles}>
                                                    <div style={contactInfoStyles}>
                                                        <User size={14} />
                                                        {lab.inchargename || 'N/A'}
                                                    </div>
                                                </td>
                                                
                                                <td style={tdStyles}>
                                                    <div style={actionButtonGroupStyles}>
                                                        <Link 
                                                            to='/hospitallabedit' 
                                                            state={{ id: lab._id }}
                                                            className="edit-btn"
                                                            style={editButtonStyles}
                                                            title="Edit Laboratory"
                                                        >
                                                            <Edit size={16} />
                                                        </Link>
                                                        <button 
                                                            className="delete-btn"
                                                            style={deleteButtonStyles}
                                                            onClick={() => handleDelete(lab._id)}
                                                            title="Delete Laboratory"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default LabView

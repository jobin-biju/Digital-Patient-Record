import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Shield, ArrowRight, AlertCircle, Heart } from 'lucide-react';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const login = async () => {
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        setIsLoading(true);
        setError('');

        const userLogin = {
            email,
            password
        };

        try {
            const response = await fetch('http://localhost:4000/DPR/login', {
                method: 'POST',
                headers: {
                    Accept: "application/json",
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(userLogin)
            });

            const result = await response.json();

            if (result && response.ok) {
                localStorage.setItem("yourstorage", JSON.stringify(result));
                window.location.href = '/';
            } else {
                setError(result.message || 'Login failed. Please check your credentials.');
            }
        } catch (err) {
            console.log("error", err);
            setError('Network error. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            login();
        }
    };

    // MediGrids color scheme and styling
    const containerStyles = {
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #2d5730 0%, #4a7c59 50%, #6ba46c 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        fontFamily: '"Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        position: 'relative'
    };

    const decorativeElementStyles = {
        position: 'absolute',
        top: '10%',
        right: '15%',
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.1)',
        animation: 'float 6s ease-in-out infinite'
    };

    const decorativeElement2Styles = {
        position: 'absolute',
        bottom: '20%',
        left: '10%',
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.08)',
        animation: 'float 4s ease-in-out infinite reverse'
    };

    const formContainerStyles = {
        width: '100%',
        maxWidth: '450px',
        margin: '0 auto',
        zIndex: 10
    };

    const brandSectionStyles = {
        textAlign: 'center',
        marginBottom: '2.5rem'
    };

    const brandLogoStyles = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '1.5rem'
    };

    const brandIconStyles = {
        padding: '15px',
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        marginRight: '15px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    };

    const brandTitleStyles = {
        fontSize: '2.5rem',
        fontWeight: '700',
        color: '#ffffff',
        margin: '0',
        letterSpacing: '-0.5px'
    };

    const formTitleStyles = {
        fontSize: '2rem',
        fontWeight: '600',
        color: '#ffffff',
        margin: '0 0 10px 0',
        textAlign: 'center'
    };

    const formSubtitleStyles = {
        fontSize: '1.1rem',
        color: 'rgba(255, 255, 255, 0.9)',
        textAlign: 'center',
        margin: '0',
        lineHeight: '1.5'
    };

    const formCardStyles = {
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        padding: '3rem 2.5rem',
        boxShadow: '0 30px 60px rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        position: 'relative'
    };

    const errorStyles = {
        backgroundColor: '#fef2f2',
        border: '1px solid #fca5a5',
        borderRadius: '12px',
        padding: '1rem',
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center'
    };

    const errorTextStyles = {
        fontSize: '0.875rem',
        color: '#dc2626',
        margin: '0',
        marginLeft: '0.75rem'
    };

    const inputGroupStyles = {
        marginBottom: '1.75rem'
    };

    const labelStyles = {
        display: 'block',
        fontSize: '0.9rem',
        fontWeight: '600',
        color: '#2d5730',
        marginBottom: '0.75rem'
    };

    const inputContainerStyles = {
        position: 'relative'
    };

    const inputIconStyles = {
        position: 'absolute',
        left: '16px',
        top: '50%',
        transform: 'translateY(-50%)',
        color: '#6ba46c',
        pointerEvents: 'none'
    };

    const inputStyles = {
        width: '100%',
        padding: '14px 16px 14px 48px',
        fontSize: '1rem',
        border: '2px solid #e5f3e7',
        borderRadius: '12px',
        outline: 'none',
        transition: 'all 0.3s ease',
        backgroundColor: '#fafffe',
        boxSizing: 'border-box',
        fontFamily: 'inherit'
    };

    const inputFocusStyles = {
        ...inputStyles,
        borderColor: '#6ba46c',
        backgroundColor: '#ffffff',
        boxShadow: '0 0 0 4px rgba(107, 164, 108, 0.1)'
    };

    const passwordInputStyles = {
        ...inputStyles,
        paddingRight: '48px'
    };

    const eyeIconStyles = {
        position: 'absolute',
        right: '16px',
        top: '50%',
        transform: 'translateY(-50%)',
        color: '#6ba46c',
        cursor: 'pointer',
        transition: 'color 0.2s ease'
    };

    const optionsRowStyles = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem'
    };

    const checkboxContainerStyles = {
        display: 'flex',
        alignItems: 'center'
    };

    const checkboxStyles = {
        width: '18px',
        height: '18px',
        accentColor: '#6ba46c',
        marginRight: '10px',
        cursor: 'pointer'
    };

    const checkboxLabelStyles = {
        fontSize: '0.9rem',
        color: '#2d5730',
        margin: '0',
        cursor: 'pointer'
    };

    const forgotLinkStyles = {
        fontSize: '0.9rem',
        color: '#6ba46c',
        textDecoration: 'none',
        fontWeight: '500',
        transition: 'color 0.2s ease'
    };

    const buttonStyles = {
        width: '100%',
        padding: '16px 20px',
        fontSize: '1rem',
        fontWeight: '600',
        borderRadius: '12px',
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '56px',
        fontFamily: 'inherit'
    };

    const buttonActiveStyles = {
        ...buttonStyles,
        background: 'linear-gradient(135deg, #6ba46c 0%, #2d5730 100%)',
        color: '#ffffff',
        boxShadow: '0 8px 25px rgba(107, 164, 108, 0.4)',
        transform: 'translateY(0px)'
    };

    const buttonDisabledStyles = {
        ...buttonStyles,
        backgroundColor: '#d1d5db',
        color: '#9ca3af',
        cursor: 'not-allowed'
    };

    const spinnerStyles = {
        width: '22px',
        height: '22px',
        border: '2px solid #ffffff',
        borderTop: '2px solid transparent',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        marginRight: '10px'
    };

    const dividerStyles = {
        margin: '2rem 0',
        textAlign: 'center',
        position: 'relative'
    };

    const dividerLineStyles = {
        height: '1px',
        backgroundColor: '#e5f3e7',
        margin: '0'
    };

    const dividerTextStyles = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#ffffff',
        padding: '0 20px',
        fontSize: '0.875rem',
        color: '#6ba46c',
        fontWeight: '500'
    };

    const helpSectionStyles = {
        textAlign: 'center',
        marginTop: '1.5rem'
    };

    const helpTextStyles = {
        fontSize: '0.9rem',
        color: '#2d5730',
        margin: '0'
    };

    const helpLinkStyles = {
        color: '#6ba46c',
        textDecoration: 'none',
        fontWeight: '600',
        transition: 'color 0.2s ease'
    };

    const securityNoticeStyles = {
        marginTop: '2rem',
        padding: '1.25rem',
        backgroundColor: '#f0f9f1',
        border: '1px solid #d1fae5',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'flex-start'
    };

    const securityTextStyles = {
        fontSize: '0.875rem',
        color: '#2d5730',
        margin: '0',
        marginLeft: '12px'
    };

    const securityTitleStyles = {
        fontWeight: '600',
        marginBottom: '4px'
    };

    const footerStyles = {
        marginTop: '3rem',
        textAlign: 'center'
    };

    const footerTextStyles = {
        fontSize: '0.8rem',
        color: 'rgba(255, 255, 255, 0.8)',
        margin: '0'
    };

    const keyframesStyles = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
        }
    `;

    return (
        <>
            <style>{keyframesStyles}</style>
            <div style={containerStyles}>
                <div style={decorativeElementStyles}></div>
                <div style={decorativeElement2Styles}></div>
                
                <div style={formContainerStyles}>
                    <div style={brandSectionStyles}>
                        <div style={brandLogoStyles}>
                            <div style={brandIconStyles}>
                                <Heart style={{ width: '36px', height: '36px', color: '#6ba46c' }} />
                            </div>
                            <h1 style={brandTitleStyles}>MediGrids</h1>
                        </div>
                        <h2 style={formTitleStyles}>Healthcare Portal</h2>
                        <p style={formSubtitleStyles}>Secure access to your medical dashboard</p>
                    </div>

                    <div style={formCardStyles}>
                        {error && (
                            <div style={errorStyles}>
                                <AlertCircle style={{ width: '20px', height: '20px', color: '#dc2626' }} />
                                <p style={errorTextStyles}>{error}</p>
                            </div>
                        )}

                        <div>
                            <div style={inputGroupStyles}>
                                <label htmlFor="email" style={labelStyles}>
                                    Email Address
                                </label>
                                <div style={inputContainerStyles}>
                                    <div style={inputIconStyles}>
                                        <Mail style={{ width: '20px', height: '20px' }} />
                                    </div>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        onFocus={(e) => Object.assign(e.target.style, inputFocusStyles)}
                                        onBlur={(e) => Object.assign(e.target.style, inputStyles)}
                                        style={inputStyles}
                                        placeholder="doctor@medigrids.com"
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>

                            <div style={inputGroupStyles}>
                                <label htmlFor="password" style={labelStyles}>
                                    Password
                                </label>
                                <div style={inputContainerStyles}>
                                    <div style={inputIconStyles}>
                                        <Lock style={{ width: '20px', height: '20px' }} />
                                    </div>
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="current-password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        onFocus={(e) => Object.assign(e.target.style, { ...passwordInputStyles, ...inputFocusStyles })}
                                        onBlur={(e) => Object.assign(e.target.style, passwordInputStyles)}
                                        style={passwordInputStyles}
                                        placeholder="Enter your secure password"
                                        disabled={isLoading}
                                    />
                                    <div 
                                        style={eyeIconStyles}
                                        onClick={() => setShowPassword(!showPassword)}
                                        onMouseOver={(e) => e.target.style.color = '#2d5730'}
                                        onMouseOut={(e) => e.target.style.color = '#6ba46c'}
                                    >
                                        {showPassword ? (
                                            <EyeOff style={{ width: '20px', height: '20px' }} />
                                        ) : (
                                            <Eye style={{ width: '20px', height: '20px' }} />
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div style={optionsRowStyles}>
                                <div style={checkboxContainerStyles}>
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        style={checkboxStyles}
                                    />
                                    <label htmlFor="remember-me" style={checkboxLabelStyles}>
                                        Keep me signed in
                                    </label>
                                </div>
                                <div>
                                    <a 
                                        href="#" 
                                        style={forgotLinkStyles}
                                        onMouseOver={(e) => e.target.style.color = '#2d5730'}
                                        onMouseOut={(e) => e.target.style.color = '#6ba46c'}
                                    >
                                        Forgot password?
                                    </a>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="button"
                                    onClick={login}
                                    disabled={isLoading || !email || !password}
                                    style={isLoading || !email || !password ? buttonDisabledStyles : buttonActiveStyles}
                                    onMouseOver={(e) => {
                                        if (!isLoading && email && password) {
                                            e.target.style.transform = 'translateY(-2px)';
                                            e.target.style.boxShadow = '0 12px 35px rgba(107, 164, 108, 0.5)';
                                        }
                                    }}
                                    onMouseOut={(e) => {
                                        if (!isLoading && email && password) {
                                            e.target.style.transform = 'translateY(0px)';
                                            e.target.style.boxShadow = '0 8px 25px rgba(107, 164, 108, 0.4)';
                                        }
                                    }}
                                >
                                    {isLoading ? (
                                        <>
                                            <div style={spinnerStyles}></div>
                                            Authenticating...
                                        </>
                                    ) : (
                                        <>
                                            <span>Access Dashboard</span>
                                            <ArrowRight style={{ marginLeft: '10px', width: '18px', height: '18px' }} />
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        <div style={dividerStyles}>
                            <hr style={dividerLineStyles} />
                            <span style={dividerTextStyles}>Need Assistance?</span>
                        </div>

                        <div style={helpSectionStyles}>
                            <p style={helpTextStyles}>
                                New to MediGrids?{' '}
                                <a 
                                    href="#" 
                                    style={helpLinkStyles}
                                    onMouseOver={(e) => e.target.style.color = '#2d5730'}
                                    onMouseOut={(e) => e.target.style.color = '#6ba46c'}
                                >
                                    Contact IT Support
                                </a>
                            </p>
                        </div>

                        <div style={securityNoticeStyles}>
                            <Shield style={{ width: '22px', height: '22px', color: '#6ba46c', marginTop: '2px' }} />
                            <div style={securityTextStyles}>
                                <p style={securityTitleStyles}>HIPAA Compliant Access</p>
                                <p style={{ margin: '0' }}>Your medical data is encrypted and secured with industry-standard protocols.</p>
                            </div>
                        </div>
                    </div>

                    <div style={footerStyles}>
                        <p style={footerTextStyles}>
                            © 2025 MediGrids Healthcare Solutions. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;

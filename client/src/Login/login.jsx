// import React, { useState , useEffect} from 'react';
// import { Mail, Lock, Eye, EyeOff, Shield, ArrowRight, AlertCircle } from 'lucide-react';

// function Login() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [showPassword, setShowPassword] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState('');


//     const [tailwindReady, setTailwindReady] = useState(false);

//   useEffect(() => {
//     // Check if Tailwind is already loaded
//     const existingScript = document.querySelector('script[src="https://cdn.tailwindcss.com"]');
//     if (!existingScript) {
//       const script = document.createElement("script");
//       script.src = "https://cdn.tailwindcss.com";
//       script.onload = () => setTailwindReady(true);
//       document.head.appendChild(script);
//     } else {
//       setTailwindReady(true);
//     }

//     // Optional: Remove script when component unmounts
//     return () => {
//       const script = document.querySelector('script[src="https://cdn.tailwindcss.com"]');
//       if (script) {
//         document.head.removeChild(script);
//         setTailwindReady(false);
//       }
//     };
//   }, []);

//   if (!tailwindReady) {
//     return <div>Loading form styles...</div>;
//   }

//     const login = async () => {
//         if (!email || !password) {
//             setError('Please fill in all fields');
//             return;
//         }

//         setIsLoading(true);
//         setError('');

//         const userLogin = {
//             email,
//             password
//         };

//         try {
//             const response = await fetch('http://localhost:4000/DPR/login', {
//                 method: 'POST',
//                 headers: {
//                     Accept: "application/json",
//                     'Content-Type': "application/json"
//                 },
//                 body: JSON.stringify(userLogin)
//             });

//             const result = await response.json();

//             if (result && response.ok) {
//                 // Store authentication data
//                 localStorage.setItem("yourstorage", JSON.stringify(result));
//                 window.location.href = '/';
//             } else {
//                 setError(result.message || 'Login failed. Please check your credentials.');
//             }
//         } catch (err) {
//             console.log("error", err);
//             setError('Network error. Please try again.');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handleKeyPress = (e) => {
//         if (e.key === 'Enter') {
//             login();
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//             <div className="sm:mx-auto sm:w-full sm:max-w-md">
//                 {/* Logo/Brand Section */}
//                 <div className="flex justify-center">
//                     <div className="flex items-center space-x-2">
//                         <div className="p-2 bg-blue-600 rounded-lg">
//                             <Shield className="w-8 h-8 text-white" />
//                         </div>
//                         <h1 className="text-2xl font-bold text-gray-900">DPR</h1>
//                     </div>
//                 </div>
//                 <h2 className="mt-6 text-center text-3xl font-semibold text-gray-900">
//                     Sign in to your account
//                 </h2>
//                 <p className="mt-2 text-center text-sm text-gray-600">
//                     Welcome back! Please enter your credentials
//                 </p>
//             </div>

//             <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//                 <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 border border-gray-200">
//                     {/* Error Message */}
//                     {error && (
//                         <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
//                             <div className="flex items-center">
//                                 <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
//                                 <p className="text-sm text-red-700">{error}</p>
//                             </div>
//                         </div>
//                     )}

//                     <div className="space-y-6">
//                         {/* Email Field */}
//                         <div>
//                             <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//                                 Email Address
//                             </label>
//                             <div className="relative">
//                                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                     <Mail className="h-5 w-5 text-gray-400" />
//                                 </div>
//                                 <input
//                                     id="email"
//                                     name="email"
//                                     type="email"
//                                     autoComplete="email"
//                                     required
//                                     value={email}
//                                     onChange={(e) => setEmail(e.target.value)}
//                                     onKeyPress={handleKeyPress}
//                                     className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
//                                     placeholder="Enter your email"
//                                     disabled={isLoading}
//                                 />
//                             </div>
//                         </div>

//                         {/* Password Field */}
//                         <div>
//                             <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
//                                 Password
//                             </label>
//                             <div className="relative">
//                                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                     <Lock className="h-5 w-5 text-gray-400" />
//                                 </div>
//                                 <input
//                                     id="password"
//                                     name="password"
//                                     type={showPassword ? "text" : "password"}
//                                     autoComplete="current-password"
//                                     required
//                                     value={password}
//                                     onChange={(e) => setPassword(e.target.value)}
//                                     onKeyPress={handleKeyPress}
//                                     className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
//                                     placeholder="Enter your password"
//                                     disabled={isLoading}
//                                 />
//                                 <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
//                                     <button
//                                         type="button"
//                                         className="text-gray-400 hover:text-gray-600 focus:outline-none"
//                                         onClick={() => setShowPassword(!showPassword)}
//                                         disabled={isLoading}
//                                     >
//                                         {showPassword ? (
//                                             <EyeOff className="h-5 w-5" />
//                                         ) : (
//                                             <Eye className="h-5 w-5" />
//                                         )}
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Remember Me & Forgot Password */}
//                         <div className="flex items-center justify-between">
//                             <div className="flex items-center">
//                                 <input
//                                     id="remember-me"
//                                     name="remember-me"
//                                     type="checkbox"
//                                     className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                                 />
//                                 <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
//                                     Remember me
//                                 </label>
//                             </div>
//                             <div className="text-sm">
//                                 <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
//                                     Forgot your password?
//                                 </a>
//                             </div>
//                         </div>

//                         {/* Login Button */}
//                         <div>
//                             <button
//                                 type="button"
//                                 onClick={login}
//                                 disabled={isLoading || !email || !password}
//                                 className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white transition-all duration-200 ${
//                                     isLoading || !email || !password
//                                         ? 'bg-gray-400 cursor-not-allowed'
//                                         : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-md hover:shadow-lg'
//                                 }`}
//                             >
//                                 {isLoading ? (
//                                     <div className="flex items-center">
//                                         <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
//                                         Signing in...
//                                     </div>
//                                 ) : (
//                                     <div className="flex items-center">
//                                         <span>Sign in</span>
//                                         <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
//                                     </div>
//                                 )}
//                             </button>
//                         </div>
//                     </div>

//                     {/* Additional Links */}
//                     <div className="mt-6">
//                         <div className="relative">
//                             <div className="absolute inset-0 flex items-center">
//                                 <div className="w-full border-t border-gray-300" />
//                             </div>
//                             <div className="relative flex justify-center text-sm">
//                                 <span className="px-2 bg-white text-gray-500">
//                                     Need help?
//                                 </span>
//                             </div>
//                         </div>

//                         <div className="mt-4 text-center">
//                             <p className="text-sm text-gray-600">
//                                 Don't have an account?{' '}
//                                 <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
//                                     Contact administrator
//                                 </a>
//                             </p>
//                         </div>
//                     </div>

//                     {/* Security Notice */}
//                     <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
//                         <div className="flex items-start">
//                             <Shield className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
//                             <div className="text-sm text-blue-700">
//                                 <p className="font-medium">Secure Login</p>
//                                 <p className="mt-1">Your credentials are encrypted and protected.</p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Footer */}
//             <div className="mt-8 text-center">
//                 <p className="text-xs text-gray-500">
//                     © 2025 ProjectHub. All rights reserved.
//                 </p>
//             </div>
//         </div>
//     );
// }

// export default Login;

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
